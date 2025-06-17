// pages/Checkout.jsx
import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../../store/authStore";
import Spinner from "../../components/Loader/Spinner";
import axiosInstance from "../../api/axionInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const { token } = useAuthStore();
  const navigate = useNavigate();
  const { data: cartItems = [], isLoading } = useCart();

  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    address_line1: "",
    city: "",
    country: "",
    postal_code: "",
    payment_method: "card",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addAddressMutation = useMutation({
    mutationFn: (address) =>
      axiosInstance.post("/account/addresses/", address, {
        headers: { Authorization: `Token ${token}` },
      }),
    onSuccess: (res) => {
      const addressId = res.data.id;
      placeOrderMutation.mutate({
        shipping_address_id: addressId,
        billing_address_id: addressId,
        payment_method: formData.payment_method,
        notes: "",
        coupon_code: "",
      });
    },
    onError: () => toast.error("Failed to add address."),
  });

  const placeOrderMutation = useMutation({
    mutationFn: (payload) =>
      axiosInstance.post("/orders/orders/", payload, {
        headers: { Authorization: `Token ${token}` },
      }),
    onSuccess: () => {
      toast.success("Order placed successfully!");
      navigate("/thank-you");
    },
    onError: () => toast.error("Order failed."),
  });

  const subtotal = cartItems.reduce((acc, item) => {
    const value = Number(item.subtotal);
    return acc + (isNaN(value) ? 0 : value);
  }, 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const addressId = "3823c727-72a1-4e98-98d0-63830af47e28";

    placeOrderMutation.mutate({
      shipping_address_id: addressId,
      billing_address_id: addressId,
      payment_method: formData.payment_method,
      notes: "",
      coupon_code: "",
    });
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="container py-10 text-white">
      <h2 className="text-3xl font-bold mb-6">Checkout</h2>

      {/* Summary */}
      <div className="bg-[#3c3a3a] p-6 rounded mb-6">
        <h3 className="text-xl font-bold mb-4">Order Summary</h3>
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between mb-2">
            <span>
              {item.product.name} x {item.quantity}
            </span>
            <span>${item.subtotal?.toFixed?.(2) || 0}</span>
          </div>
        ))}
        <div className="flex justify-between mt-4 font-bold">
          <span>Total</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Address Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#3c3a3a] p-6 rounded space-y-4"
      >
        <h3 className="text-xl font-bold mb-4">Shipping Address</h3>
        <input
          name="full_name"
          required
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
          className="w-full p-2 rounded bg-[#2f2d2d]"
        />
        <input
          name="phone_number"
          required
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
          className="w-full p-2 rounded bg-[#2f2d2d]"
        />
        <input
          name="address_line1"
          required
          placeholder="Address Line 1"
          value={formData.address_line1}
          onChange={handleChange}
          className="w-full p-2 rounded bg-[#2f2d2d]"
        />
        <input
          name="city"
          required
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="w-full p-2 rounded bg-[#2f2d2d]"
        />
        <input
          name="country"
          required
          placeholder="Country (e.g., EG)"
          value={formData.country}
          onChange={handleChange}
          className="w-full p-2 rounded bg-[#2f2d2d]"
        />
        <input
          name="postal_code"
          required
          placeholder="Postal Code"
          value={formData.postal_code}
          onChange={handleChange}
          className="w-full p-2 rounded bg-[#2f2d2d]"
        />

        <select
          name="payment_method"
          value={formData.payment_method}
          onChange={handleChange}
          className="w-full p-2 rounded bg-[#2f2d2d]"
        >
          <option value="card">Card</option>
          <option value="paypal">PayPal</option>
        </select>

        <button
          type="submit"
          disabled={
            addAddressMutation.isLoading || placeOrderMutation.isLoading
          }
          className="bg-primary-color text-white px-6 py-3 rounded-full"
        >
          {placeOrderMutation.isLoading || addAddressMutation.isLoading
            ? "Processing..."
            : "Pay Now"}
        </button>
      </form>
    </div>
  );
}
