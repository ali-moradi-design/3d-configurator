# Build log

## 2026-10-22: session 1 (prerequisites, brief, research)

- Checked prerequisites: git 2.43.0, node v22.22.0, npm 10.9.4, pnpm 10.28.0,
  Playwright 1.56.1 (Chromium launches and loads a page). Folder is a clean,
  empty clone (no commits) of `ali-moradi-design/3d-configurator`.
- `gh auth status` fails: the `GH_TOKEN` in the environment is invalid. Access to
  the private `roadmap-portfolio` repo works through the GitHub MCP tools instead.
- Copied the common part and the `3d-configurator` section into `docs/brief.md`.
- Decision: English-only site.
- Ran `t-shirt-configurator` and `shoe-configurator` from pmndrs examples; screenshots in `docs/research/`.
- Verified licenses: `MaterialsVariantsShoe` CC BY 4.0 (Shopify); Poly Haven HDRI CC0.
- Finding: the Khronos shoe is a single mesh with 3 baked variants, so per-part recoloring needs a decision (see `docs/research.md`).
- Proposed fictional brand "Tidewalk" and 4 mockups (`docs/mockups/`). Waiting for approval before building.

## 2026-10-22: session 1 (build, after approval)

- Decision: option A. Keep the Khronos shoe (CC BY 4.0) and make it feel premium with HDRI lighting,
  soft contact shadow, floating motion and a bolder page design. Real brands (for example New Balance)
  are not allowed, and no better licensed sneaker was found on Sketchfab.
- Scaffolded Next.js 16 static export, TypeScript strict, pnpm, ESLint, Prettier, Steiger (FSD).
  The empty root `pages/` folder keeps Next from treating `src/pages` as a Pages Router.
- Model compressed from 7.8 MB to 0.6 MB (Meshopt + WebP). KTX2 was skipped because the `toktx` binary
  is not available; WebP at 1024 px is used instead.
- Findings while building:
  - drei `<Center bottom>` put the shoe BELOW the origin; `<Center top>` puts the sole on the floor.
  - Three.js has no built-in `KHR_materials_variants` support in this loader path, so the variant
    materials are read from the glTF JSON and loaded with `parser.getDependency`.
  - The React Compiler lint rule rejects mutating three.js objects inside effects; imperative updates
    live in plain functions outside the component.
  - The 3D scene was loading on mobile before scrolling (IntersectionObserver margin 200 px was too big);
    with 50 px, Lighthouse mobile performance went from 0.65 to 0.96.
- Tests: 8 Playwright tests on desktop and mobile (load without console errors, price and URL state,
  invalid URL values, fake add to cart, share link, PNG download, axe, reduced motion). All pass.
- Lighthouse (mobile, simulated): performance 0.96, accessibility 1.0, best practices 1.0, SEO 1.0.
- CI workflow `.github/workflows/ci.yml` has one job named `ci` (format, lint, types, Steiger, build,
  e2e, Lighthouse). Not yet run on GitHub: the remote has no `main` branch yet.
- Not done: real-device check, deploy (roadmap phase 7), LICENSE for our own code (owner decides).
