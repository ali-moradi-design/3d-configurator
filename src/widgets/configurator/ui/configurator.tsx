'use client';

import { getPrice, ShoeViewer, useDesign, useDesignUrlSync } from '@/entities/shoe';
import { AddToCartButton } from '@/features/add-to-cart';
import { DownloadButton } from '@/features/capture-image';
import { CustomizePanel } from '@/features/customize-shoe';
import { ShareButton } from '@/features/share-design';
import { PRODUCT_NAME } from '@/shared/config';
import { Button } from '@/shared/ui';
import styles from './configurator.module.css';

export function Configurator() {
  useDesignUrlSync();
  const colorway = useDesign((s) => s.colorway);
  const accent = useDesign((s) => s.accent);
  const finish = useDesign((s) => s.finish);
  const reset = useDesign((s) => s.reset);
  const price = getPrice({ colorway, accent, finish });

  return (
    <section
      id="configurator"
      className={`container ${styles.section}`}
      aria-labelledby="configurator-title"
    >
      <div className={styles.stage}>
        <ShoeViewer design={{ colorway, accent, finish }} />
        <p className={styles.hint}>Drag to rotate</p>
        <div className={styles.tools}>
          <ShareButton />
          <DownloadButton />
          <Button variant="ghost" onClick={reset}>
            Reset
          </Button>
        </div>
      </div>
      <div className={styles.panel}>
        <p className="eyebrow">{PRODUCT_NAME}</p>
        <h2 id="configurator-title" className={styles.title}>
          Design your pair
        </h2>
        <CustomizePanel />
        <div className={styles.buy}>
          <div>
            <div className="eyebrow">Total</div>
            <div className={styles.price} aria-live="polite" data-testid="price">
              ${price}
            </div>
          </div>
          <AddToCartButton />
        </div>
      </div>
    </section>
  );
}
