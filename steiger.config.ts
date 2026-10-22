import { defineConfig } from 'steiger';
import fsd from '@feature-sliced/steiger-plugin';

export default defineConfig([
  ...fsd.configs.recommended,
  {
    // The Next.js router lives in the root `app/` folder and only re-exports from `src/`.
    // Single-use slices are intentional in a one-page landing.
    files: ['./src/**'],
    rules: { 'fsd/insignificant-slice': 'off' },
  },
]);
