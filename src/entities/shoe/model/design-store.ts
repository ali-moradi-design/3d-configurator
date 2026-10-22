'use client';

import { useEffect } from 'react';
import { create } from 'zustand';
import { DEFAULT_DESIGN, type Design } from './options';
import { parseDesign, serializeDesign } from './url';

type DesignState = Design & {
  set: (patch: Partial<Design>) => void;
  reset: () => void;
};

export const useDesign = create<DesignState>((set) => ({
  ...DEFAULT_DESIGN,
  set: (patch) => set(patch),
  reset: () => set(DEFAULT_DESIGN),
}));

/** Restores the design from the URL once, then keeps the URL in sync with the design. */
export function useDesignUrlSync() {
  useEffect(() => {
    useDesign.setState(parseDesign(window.location.search));
    return useDesign.subscribe((state) => {
      const query = serializeDesign(state);
      const url = `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`;
      window.history.replaceState(null, '', url);
    });
  }, []);
}
