export const COLORWAYS = [
  { id: 'midnight', label: 'Midnight' },
  { id: 'beach', label: 'Beach' },
  { id: 'street', label: 'Street' },
] as const;

export const ACCENTS = [
  { id: 'original', label: 'Original colors', hex: null },
  { id: 'coral', label: 'Coral', hex: '#ff5a4d' },
  { id: 'sun', label: 'Sun', hex: '#f2b705' },
  { id: 'moss', label: 'Moss', hex: '#2fa36b' },
  { id: 'azure', label: 'Azure', hex: '#3a6df0' },
  { id: 'ink', label: 'Ink', hex: '#2a2d33' },
] as const;

export const FINISHES = [
  { id: 'matte', label: 'Matte', price: 0 },
  { id: 'sheen', label: 'Soft sheen', price: 8 },
] as const;

export type ColorwayId = (typeof COLORWAYS)[number]['id'];
export type AccentId = (typeof ACCENTS)[number]['id'];
export type FinishId = (typeof FINISHES)[number]['id'];

export type Design = { colorway: ColorwayId; accent: AccentId; finish: FinishId };

export const DEFAULT_DESIGN: Design = { colorway: 'midnight', accent: 'original', finish: 'matte' };

export const BASE_PRICE = 129;
export const ACCENT_PRICE = 6;

export function getPrice(design: Design): number {
  const finish = FINISHES.find((f) => f.id === design.finish)?.price ?? 0;
  const accent = design.accent === 'original' ? 0 : ACCENT_PRICE;
  return BASE_PRICE + finish + accent;
}

export function getAccentHex(id: AccentId): string | null {
  return ACCENTS.find((a) => a.id === id)?.hex ?? null;
}

export function describeDesign(design: Design): string {
  const colorway = COLORWAYS.find((c) => c.id === design.colorway)?.label ?? '';
  const accent = ACCENTS.find((a) => a.id === design.accent)?.label ?? '';
  const finish = FINISHES.find((f) => f.id === design.finish)?.label ?? '';
  return `${colorway}, ${accent}, ${finish}`;
}
