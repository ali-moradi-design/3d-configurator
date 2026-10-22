import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

async function open(page: Page, path = '/') {
  const errors: string[] = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(path);
  return errors;
}

async function waitFor3d(page: Page) {
  await page.locator('#configurator').scrollIntoViewIfNeeded();
  await expect(page.locator('[data-ready="true"]')).toBeVisible({ timeout: 60_000 });
  await expect(page.locator('[data-ready="true"] canvas')).toBeVisible();
}

test('page loads, renders the 3D scene and has no console errors', async ({ page }) => {
  const errors = await open(page);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Your shoe');
  await waitFor3d(page);
  expect(errors).toEqual([]);
});

test('choices update the price and the share URL, and the URL restores the design', async ({
  page,
}) => {
  await open(page);
  const price = page.getByTestId('price');
  await expect(price).toHaveText('$129');

  await page.getByRole('button', { name: 'Beach' }).click();
  await page.getByRole('button', { name: 'Coral' }).click();
  await page.getByRole('button', { name: /Soft sheen/ }).click();
  await expect(price).toHaveText('$143');
  await expect(page).toHaveURL(/colorway=beach/);
  await expect(page).toHaveURL(/accent=coral/);
  await expect(page).toHaveURL(/finish=sheen/);

  await page.reload();
  await expect(price).toHaveText('$143');
  await expect(page.getByRole('button', { name: 'Beach' })).toHaveAttribute('aria-pressed', 'true');

  await page.getByRole('button', { name: 'Reset' }).click();
  await expect(price).toHaveText('$129');
  await expect(page).not.toHaveURL(/colorway=/);
});

test('invalid URL values fall back to the defaults', async ({ page }) => {
  await open(page, '/?colorway=nope&accent=%3Cscript%3E&finish=x');
  await expect(page.getByTestId('price')).toHaveText('$129');
  await expect(page.getByRole('button', { name: 'Midnight' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
});

test('add to cart is a fake action that only counts items', async ({ page }) => {
  await open(page);
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await expect(page.getByText('Cart (1)')).toBeVisible();
  await expect(page.getByText(/nothing was charged/)).toBeVisible();
});

test('share link copies the current URL', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await open(page, '/?colorway=street');
  await page.getByRole('button', { name: 'Copy share link' }).click();
  await expect(page.getByText(/Link copied/)).toBeVisible();
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(copied).toContain('colorway=street');
});

test('download PNG saves an image of the 3D view', async ({ page }) => {
  await open(page);
  await waitFor3d(page);
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download PNG' }).click();
  expect((await download).suggestedFilename()).toBe('tidewalk-midnight.png');
});

test('page has no detectable accessibility violations', async ({ page }) => {
  await open(page);
  await waitFor3d(page);
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(results.violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
});

test('reduced motion still shows the shoe', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const errors = await open(page);
  await waitFor3d(page);
  expect(errors).toEqual([]);
});
