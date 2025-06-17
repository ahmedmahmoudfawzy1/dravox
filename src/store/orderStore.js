
import { create } from "zustand";

const useOrderStore = create((set) => ({
  shippingAddressId: null,
  billingAddressId: null,
  paymentMethod: "card",
  notes: "",
  couponCode: "",
  cartItems: [],

  setOrderData: (data) => set(() => ({ ...data })),
  
  clearOrder: () =>
    set({
      shippingAddressId: null,
      billingAddressId: null,
      paymentMethod: "card",
      notes: "",
      couponCode: "",
      cartItems: [],
    }),
}));

export default useOrderStore;
