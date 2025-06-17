import { create } from "zustand";

const LOCAL_STORAGE_KEY = "wishlist";

export const useWishlistStore = create((set) => ({
  wishlist: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [],

  setWishlist: (items) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    set({ wishlist: items });
  },

  addWishlistItem: (item) =>
    set((state) => {
      const exists = state.wishlist.some((i) => i.id === item.id);
      if (exists) return state;

      const updated = [...state.wishlist, item];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      return { wishlist: updated };
    }),

  removeWishlistItem: (id) =>
    set((state) => {
      const updated = state.wishlist.filter((item) => item.id !== id);
      localStorage.setItem("wishlist", JSON.stringify(updated));
      return { wishlist: updated };
    }),
}));
