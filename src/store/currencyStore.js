
import { create } from "zustand";

const useCurrencyStore = create((set) => ({
    currency: "USD",
    setCurrency: (code) => set({ currency: code }),
}));

export default useCurrencyStore;
