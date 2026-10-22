import { Button } from '@/shared/ui';
import styles from './details.module.css';

const FEATURES = [
  { title: 'Breathable knit', text: 'A recycled-yarn upper that stays light and airy.' },
  { title: 'Cushioned sole', text: 'Soft foam midsole for all-day comfort.' },
  { title: 'Made to order', text: 'Ships in 10 days with free 30-day returns.' },
];

const SPECS = [
  ['Sizes', 'US 6 – 13'],
  ['Upper', 'Recycled knit'],
  ['Weight', '260 g per shoe'],
];

export function Details() {
  return (
    <section id="details" className={`container ${styles.section}`} aria-labelledby="details-title">
      <div className={styles.intro}>
        <p className="eyebrow">Details</p>
        <h2 id="details-title" className={styles.title}>
          Built for every day
        </h2>
      </div>
      <ul className={styles.cards}>
        {FEATURES.map((f) => (
          <li key={f.title} className={styles.card}>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </li>
        ))}
      </ul>
      <dl className={styles.specs}>
        {SPECS.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      <div className={styles.cta}>
        <h2>Ready to make it yours?</h2>
        <Button variant="accent" href="#configurator">
          Back to the configurator ↑
        </Button>
      </div>
    </section>
  );
}
