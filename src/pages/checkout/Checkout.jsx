
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../api/axionInstance";
import useAuthStore from "../../store/authStore";
import Spinner from "../../components/Loader/Spinner";
import { toast } from "react-toastify";
import AddressSelect from "../../components/addressComponents/AddressSelect";
import AddressForm from "../../components/addressComponents/AddressForm";
import { useGetAddresses } from "../../hooks/useAddress";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { token } = useAuthStore();
  const { data: cartItems = [] } = useCart();
  const { data: addressesData, isLoading } = useGetAddresses(token);
  const addresses = addressesData?.data?.results || [];

  const [shippingAddress, setShippingAddress] = useState(null);
  const [billingAddress, setBillingAddress] = useState(null);
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    address_line1: "",
    city: "",
    country: "",
    postal_code: "",
  });

  const addAddressMutation = useMutation({
    mutationFn: (payload) =>
      axiosInstance.post("/account/addresses/", payload, {
        headers: { Authorization: `Token ${token}` },
      }),
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
    onError: () => toast.error("Order failed. Please try again."),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let shippingId = shippingAddress;
      let billingId = billingAddress;

      if (shippingAddress === "new") {
        const res = await addAddressMutation.mutateAsync({
          ...formData,
          label: "Shipping Address",
          address_type: "shipping",
          is_default: false,
        });
        shippingId = res.data.id;
      }

      if (billingAddress === "new") {
        const res = await addAddressMutation.mutateAsync({
          ...formData,
          label: "Billing Address",
          address_type: "billing",
          is_default: false,
        });
        billingId = res.data.id;
      }

      placeOrderMutation.mutate({
        shipping_address_id: shippingId,
        billing_address_id: billingId,
        payment_method: "card",
        notes: "",
        coupon_code: "",
      });
    } catch {
      toast.error("Failed to save address.");
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.subtotal || 0),
    0
  );

  if (isLoading) return <Spinner />;

  return (
    <div className="container py-10 text-white max-w-3xl mx-auto font-Inter">
      <h2 className="text-4xl font-bold mb-8 text-center text-primary-color">
        Checkout
      </h2>

      {/* Order Summary */}
      <div className="bg-[#3c3a3a] p-6 rounded-2xl mb-8 shadow-md">
        <h3 className="text-xl font-bold mb-4 border-b border-gray-600 pb-2">
          Order Summary
        </h3>
        <div className="space-y-3">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between text-sm text-gray-200"
            >
              <span>
                {item.product.name} x {item.quantity}
              </span>
              <span>${Number(item.subtotal).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-600 flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Address Section */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#3c3a3a] p-6 rounded-2xl shadow-md space-y-6"
      >
        <h3 className="text-xl font-semibold mb-4 text-primary-color">
          Shipping Address
        </h3>

        <AddressSelect
          addresses={addresses}
          selected={shippingAddress}
          onChange={setShippingAddress}
          label="Choose Shipping Address"
        />

        {shippingAddress === "new" && (
          <AddressForm formData={formData} setFormData={setFormData} />
        )}

        <h3 className="text-xl font-semibold mb-4 text-primary-color">
          Billing Address
        </h3>

        <AddressSelect
          addresses={addresses}
          selected={billingAddress}
          onChange={setBillingAddress}
          label="Choose Billing Address"
        />

        {billingAddress === "new" && (
          <AddressForm formData={formData} setFormData={setFormData} />
        )}

        <button
          type="submit"
          className="w-full mt-4 bg-primary-color text-white text-lg font-medium py-3 rounded-full hover:bg-opacity-80 transition"
          disabled={placeOrderMutation.isLoading}
        >
          {placeOrderMutation.isLoading ? "Processing..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}
