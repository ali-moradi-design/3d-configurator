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
