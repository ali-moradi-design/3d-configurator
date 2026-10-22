'use client';

import { ACCENTS, COLORWAYS, FINISHES, useDesign } from '@/entities/shoe';
import { ChoiceGroup, Chip, Swatch } from '@/shared/ui';

export function CustomizePanel() {
  const { colorway, accent, finish, set } = useDesign();

  return (
    <div>
      <ChoiceGroup id="group-colorway" label="Colorway">
        {COLORWAYS.map((c) => (
          <Chip key={c.id} selected={colorway === c.id} onSelect={() => set({ colorway: c.id })}>
            {c.label}
          </Chip>
        ))}
      </ChoiceGroup>
      <ChoiceGroup id="group-accent" label="Accent color · recolors the knit and stripes (+$6)">
        {ACCENTS.map((a) => (
          <Swatch
            key={a.id}
            selected={accent === a.id}
            onSelect={() => set({ accent: a.id })}
            label={a.label}
            color={a.hex}
          />
        ))}
      </ChoiceGroup>
      <ChoiceGroup id="group-finish" label="Knit finish">
        {FINISHES.map((f) => (
          <Chip key={f.id} selected={finish === f.id} onSelect={() => set({ finish: f.id })}>
            {f.label}
            {f.price > 0 ? ` +$${f.price}` : ''}
          </Chip>
        ))}
      </ChoiceGroup>
    </div>
  );
}
