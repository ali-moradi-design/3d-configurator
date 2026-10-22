import { Button } from '@/shared/ui';
import { PRODUCT_NAME } from '@/shared/config';
import styles from './hero.module.css';

export function Hero() {
  return (
    <section className={`container ${styles.hero}`} aria-labelledby="hero-title">
      <div className={styles.copy}>
        <p className="eyebrow">{PRODUCT_NAME} · Made to order</p>
        <h1 id="hero-title" className={styles.title}>
          Your shoe.
          <br />
          Your colors.
        </h1>
        <p className={styles.lead}>
          Pick a colorway, tune the details and spin it in 3D before it is ever made. The price
          updates as you design.
        </p>
        <div className={styles.actions}>
          <Button variant="accent" href="#configurator">
            Start customizing →
          </Button>
          <Button variant="ghost" href="#details">
            See details
          </Button>
        </div>
        <dl className={styles.stats}>
          <div>
            <dt>colorways</dt>
            <dd>3</dd>
          </div>
          <div>
            <dt>accent colors</dt>
            <dd>5</dd>
          </div>
          <div>
            <dt>live 3D</dt>
            <dd>360°</dd>
          </div>
        </dl>
      </div>
      <div className={styles.card}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/posters/midnight.webp"
          alt="Tidewalk The Run 01 sneaker in the Midnight colorway, blue knit with a white sole"
          width={1200}
          height={900}
          fetchPriority="high"
        />
      </div>
    </section>
  );
}
