import { create } from 'zustand';

type CartState = { count: number; add: () => void };

export const useCart = create<CartState>((set) => ({
  count: 0,
  add: () => set((s) => ({ count: s.count + 1 })),
}));
