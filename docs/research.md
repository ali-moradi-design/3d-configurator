# Research: sources, models, brand (session 1)

All checked on 2026-10-22. Screenshots are in `docs/research/`, mockups in `docs/mockups/`.

## Source examples (pmndrs/examples, MIT)

Run at `https://pmndrs.github.io/examples/<slug>`; no console errors in headless Chromium.

| Example                | What we take                                                  | Screenshot                                                 |
| ---------------------- | ------------------------------------------------------------- | ---------------------------------------------------------- |
| `t-shirt-configurator` | hero → customizer flow, color swatches, PNG download button   | `research/t-shirt-configurator-1.png`, `-2-customizer.png` |
| `shoe-configurator`    | click a part, color picker, floating product with soft shadow | `research/shoe-configurator-1.png`, `-2-click-part.png`    |

Their shirt and shoe models have no credit and will NOT be shipped.

## Model: Khronos `MaterialsVariantsShoe`

- License: CC BY 4.0, © 2021 Shopify (credit "Shopify for everything"). Size 7.8 MB before compression.
- Verified structure (GLB JSON): ONE mesh, ONE primitive, 3 baked material variants
  (`midnight`, `beach`, `street`) via `KHR_materials_variants`; 5 textures.
- Consequence: per-part recoloring (laces, sole, stripes) is not possible with this model
  as the examples do it. What works: switch the 3 variants, and tint the material
  (global tint / accent via a color-multiply on the base color map, or a mask shader).

### Open decision: how to get "parts, colors, materials"

- A (recommended): keep this shoe. 3 colorways + accent tint + finish (roughness/sheen), price updates.
  Verified license, no manual hunting.
- B: a multi-mesh CC0/CC-BY product. Khronos `SheenChair` (CC0, 4 materials) works but overlaps `3d-furniture-ar`.
- C: a Sketchfab sneaker with separate meshes (CC BY candidates: "sneakers" by abazibiz, 4k faces;
  "Brown Sneakers" by yanix, 9k faces). Needs manual download and visual check; avoid anything
  that looks like a real brand.

## Lighting

Poly Haven HDRI, CC0, author Sergej Majboroda: `studio_small_09` (https://polyhaven.com/a/studio_small_09).

## Brand (fictional, not trademark-checked)

Proposed: **Tidewalk** (product "The Run 01"). Alternatives: Kinetic Lane, Orbit & Sole.
Style: warm off-white, ink black, coral accent, Inter. English only.

## Page sections (see mockups)

1. Header + hero (`01-hero`)
2. Configurator: 3D canvas, colorway, accent color, finish, live price, share link, PNG download, fake add to cart (`02-configurator`)
3. Product details, specs, call to action, credits (`03-details-credits`)
4. Mobile layout with sticky buy bar (`04-mobile`)
