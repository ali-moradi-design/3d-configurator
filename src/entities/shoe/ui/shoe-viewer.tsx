'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ErrorBoundary } from '@/shared/ui';
import { describeDesign, type Design } from '../model/options';
import styles from './shoe-viewer.module.css';

const ShoeCanvas = dynamic(() => import('./shoe-canvas'), { ssr: false });

type Props = { design: Design };

/** Shows a poster first and starts the 3D scene only when it is near the viewport and the browser is idle. */
export function ShoeViewer({ design }: Props) {
  const stage = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [ready, setReady] = useState(false);
  const handleReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    let idle: number | undefined;
    let timer: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = () => setArmed(true);
        if (typeof window.requestIdleCallback === 'function') {
          idle = window.requestIdleCallback(start, { timeout: 1200 });
        } else {
          timer = window.setTimeout(start, 200);
        }
      },
      { rootMargin: '50px' },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (idle !== undefined) window.cancelIdleCallback(idle);
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, []);

  return (
    <div
      ref={stage}
      className={styles.stage}
      role="img"
      aria-label={`Interactive 3D preview of the shoe: ${describeDesign(design)}`}
      data-ready={ready}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`${styles.poster} ${ready ? styles.posterHidden : ''}`}
        src={`/posters/${design.colorway}.webp`}
        alt=""
        width={1200}
        height={900}
        decoding="async"
      />
      {armed && (
        <ErrorBoundary fallback={null}>
          <ShoeCanvas design={design} onReady={handleReady} />
        </ErrorBoundary>
      )}
    </div>
  );
}
