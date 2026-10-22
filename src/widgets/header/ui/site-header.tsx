'use client';

import { useCart } from '@/features/add-to-cart';
import { BRAND } from '@/shared/config';
import styles from './site-header.module.css';

export function SiteHeader() {
  const count = useCart((s) => s.count);
  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <a className={styles.logo} href="#top" aria-label={`${BRAND} home`}>
          {BRAND}
          <span aria-hidden="true">.</span>
        </a>
        <nav aria-label="Main">
          <ul className={styles.nav}>
            <li>
              <a href="#configurator">Configurator</a>
            </li>
            <li>
              <a href="#details">Details</a>
            </li>
            <li>
              <a href="#credits">Credits</a>
            </li>
          </ul>
        </nav>
        <span
          className={styles.cart}
          aria-label={`Cart, ${count} ${count === 1 ? 'item' : 'items'}`}
        >
          Cart ({count})
        </span>
      </div>
    </header>
  );
}
