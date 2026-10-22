import { ACCENTS, COLORWAYS, DEFAULT_DESIGN, FINISHES, type Design } from './options';

const pick = <T extends { id: string }>(
  list: readonly T[],
  value: string | null,
  fallback: T['id'],
) => (list.find((item) => item.id === value)?.id ?? fallback) as T['id'];

export function parseDesign(search: string): Design {
  const params = new URLSearchParams(search);
  return {
    colorway: pick(COLORWAYS, params.get('colorway'), DEFAULT_DESIGN.colorway),
    accent: pick(ACCENTS, params.get('accent'), DEFAULT_DESIGN.accent),
    finish: pick(FINISHES, params.get('finish'), DEFAULT_DESIGN.finish),
  };
}

export function serializeDesign(design: Design): string {
  const params = new URLSearchParams();
  (Object.keys(design) as (keyof Design)[]).forEach((key) => {
    if (design[key] !== DEFAULT_DESIGN[key]) params.set(key, design[key]);
  });
  return params.toString();
}
