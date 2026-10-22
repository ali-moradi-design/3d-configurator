import type { ReactNode } from 'react';
import styles from './choice.module.css';

type ChipProps = { selected: boolean; onSelect: () => void; children: ReactNode };

export function Chip({ selected, onSelect, children }: ChipProps) {
  return (
    <button
      type="button"
      className={`${styles.chip} ${selected ? styles.chipOn : ''}`}
      aria-pressed={selected}
      onClick={onSelect}
    >
      {children}
    </button>
  );
}

type SwatchProps = { selected: boolean; onSelect: () => void; label: string; color: string | null };

export function Swatch({ selected, onSelect, label, color }: SwatchProps) {
  return (
    <button
      type="button"
      className={`${styles.swatch} ${selected ? styles.swatchOn : ''}`}
      aria-pressed={selected}
      aria-label={label}
      title={label}
      onClick={onSelect}
    >
      <span
        className={color ? styles.dot : styles.dotOriginal}
        style={color ? { background: color } : undefined}
      />
    </button>
  );
}

type GroupProps = { label: string; children: ReactNode; id: string };

export function ChoiceGroup({ label, id, children }: GroupProps) {
  return (
    <div role="group" aria-labelledby={id} className={styles.group}>
      <div id={id} className={styles.label}>
        {label}
      </div>
      <div className={styles.row}>{children}</div>
    </div>
  );
}
