import { create } from 'zustand';

import { Rate } from '@/entities';

interface CurrenciesState {
  currencies: Rate[];
  setCurrencies: (items: Rate[]) => void;
}

const initialCurrencies: Rate[] = [
  {
    Cur_ID: 431,
    Date: '2026-02-21T00:00:00',
    Cur_Abbreviation: 'USD',
    Cur_Scale: 1,
    Cur_Name: 'Доллар США',
    Cur_OfficialRate: 2.8517,
  },
  {
    Cur_ID: 451,
    Date: '2026-02-21T00:00:00',
    Cur_Abbreviation: 'EUR',
    Cur_Scale: 1,
    Cur_Name: 'Евро',
    Cur_OfficialRate: 3.365,
  },
];

export const useCurrenciesStore = create<CurrenciesState>((set) => ({
  currencies: initialCurrencies,
  setCurrencies: (items) => set({ currencies: items }),
}));
