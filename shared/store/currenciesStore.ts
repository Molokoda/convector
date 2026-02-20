import { create } from 'zustand';

import { Rate } from '@/entities';

interface CurrenciesState {
  currencies: Rate[];
  setCurrencies: (items: Rate[]) => void;
}

export const useCurrenciesStore = create<CurrenciesState>((set) => ({
  currencies: [],
  setCurrencies: (items) => set({ currencies: items }),
}));
