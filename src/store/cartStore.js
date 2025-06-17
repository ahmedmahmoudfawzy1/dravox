
import { create } from "zustand";

export const useCartStore = create((set) => ({
    cartItems: [],
    setCartItems: (items) => set({ cartItems: items }),

    addToCart: (product) =>
        set((state) => {
            const exist = state.cartItems.find((item) => item.id === product.id);
            if (exist) {
                return {
                    cartItems: state.cartItems.map((item) =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                };
            } else {
                return {
                    cartItems: [...state.cartItems, { ...product, quantity: 1 }],
                };
            }
        }),

    increaseQty: (id) =>
        set((state) => ({
            cartItems: state.cartItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            ),
        })),

    decreaseQty: (id) =>
        set((state) => ({
            cartItems: state.cartItems
                .map((item) =>
                    item.id === id && item.quantity > 1
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0),
        })),

    removeItem: (id) =>
        set((state) => ({
            cartItems: state.cartItems.filter((item) => item.id !== id),
        })),

    clearCart: () => set({ cartItems: [] }),
}));
