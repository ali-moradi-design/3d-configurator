# 3d-configurator

A 3D product configurator landing page for a fictional sneaker brand, **Tidewalk**.
Change colorway, accent color and finish on a live 3D shoe, watch the price update,
share the exact design as a link, or download a PNG.

Part of a portfolio of 3D landing pages. Demo: `3d-configurator.ali-moradi-develop.com`.

## Stack

Next.js 16 (App Router, standalone server in a container), React 19, TypeScript strict, pnpm,
React Three Fiber + drei, zustand, ESLint + Prettier, Feature-Sliced Design checked with Steiger,
Playwright + axe, Lighthouse CI.

## Run

```bash
pnpm install
pnpm dev            # development
pnpm build && pnpm start   # the standalone server on :3000, like production
```

## Checks (the same ones CI runs)

```bash
pnpm format:check && pnpm lint && pnpm typecheck && pnpm steiger
pnpm build
pnpm exec playwright install chromium
pnpm test:e2e
pnpm exec lhci autorun
```

## How it works

- `app/` holds only the Next.js route. All code is in `src/` following Feature-Sliced Design
  (`app`, `pages`, `widgets`, `features`, `entities`, `shared`). The empty root `pages/` folder
  stops Next.js from reading `src/pages` as a Pages Router.
- The shoe is one mesh with three baked material variants. **Accent color** recolors only the
  saturated areas of the base color map in a small shader patch (`src/entities/shoe/lib/tint.ts`),
  so the white sole and dark laces stay untouched. **Soft sheen** switches on sheen and clearcoat.
- The design lives in a store and in the URL (`?colorway=beach&accent=coral&finish=sheen`).
  Invalid values fall back to defaults.
- Performance: a poster image is shown first; the 3D scene (about 1 MB of JavaScript, a 0.6 MB model
  and a 1.6 MB HDRI) loads only when the configurator is close to the viewport and the browser is idle.
  Mobile uses a lower pixel ratio. `prefers-reduced-motion` stops rotation and floating.
- Posters are rendered from the real scene: `pnpm build && pnpm start`, then
  `node scripts/make-posters.mjs`.
- `next.config.ts` serves `.glb` as `model/gltf-binary` and the HDRI as `image/vnd.radiance`, with a
  one-year immutable cache (also for posters).

## Deploy

`output: 'standalone'`: CI builds `.next/standalone` and `Dockerfile` puts only that folder in the image.
After CI passes on `main`, `.github/workflows/docker.yml` pushes
`ghcr.io/ali-moradi-design/3d-configurator-web:<sha>` and deploy-kit makes the VPS pull and restart it.
`deploy/compose.yaml` is the server file (port `127.0.0.1:3116`, read-only, 256 MB) and
`deploy/nginx.conf` the host Nginx site (also gzips the model and the HDRI).

## Credits and licenses

See `CREDITS.md` and `LICENSE-THIRD-PARTY.md`.
