// Renders the real 3D scene to transparent poster images (one per colorway).
// Run `pnpm build && pnpm start` first, then `node scripts/make-posters.mjs`.
import { chromium } from '@playwright/test';
import sharp from 'sharp';

const base = process.env.BASE_URL ?? 'http://127.0.0.1:3000';
const colorways = ['midnight', 'beach', 'street'];

const browser = await chromium.launch({
  args: [
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
    '--ignore-gpu-blocklist',
  ],
});
for (const colorway of colorways) {
  const page = await browser.newPage({
    viewport: { width: 1300, height: 1000 },
    deviceScaleFactor: 1,
  });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(`${base}/?colorway=${colorway}`);
  await page.addStyleTag({
    content:
      '[role="img"][data-ready]{width:1200px !important;max-width:none !important;} [data-ready] canvas{}',
  });
  await page.locator('#configurator').scrollIntoViewIfNeeded();
  await page.waitForSelector('[role="img"][data-ready="true"]', { timeout: 60_000 });
  await page.waitForTimeout(2500);
  const dataUrl = await page.evaluate(() =>
    document.querySelector('[data-ready] canvas').toDataURL('image/png'),
  );
  const png = Buffer.from(dataUrl.split(',')[1], 'base64');
  await sharp(png)
    .resize(1200, 900, { fit: 'cover' })
    .webp({ quality: 88, alphaQuality: 90 })
    .toFile(`public/posters/${colorway}.webp`);
  console.log('poster', colorway);
  await page.close();
}
await browser.close();
