
import { create } from 'zustand';

const useCurrencyStore = create((set) => ({
    currency: 'USD',
    setCurrency: (newCurrency) => set({ currency: newCurrency }),
}));

export default useCurrencyStore;
