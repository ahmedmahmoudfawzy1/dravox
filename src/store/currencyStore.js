import { create } from "zustand";

const useCurrencyStore = create((set) => ({
    currency: localStorage.getItem("currency") || "USD",
    setCurrency: (code) => {
        localStorage.setItem("currency", code);
        set({ currency: code });
    },
}));

export default useCurrencyStore;
