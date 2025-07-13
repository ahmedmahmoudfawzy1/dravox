import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../api/axionInstance";
import useAuthStore from "../../store/authStore";
import Spinner from "../../components/Loader/Spinner";
import { toast } from "react-toastify";
import AddressSelect from "../../components/addressComponents/AddressSelect";
import AddressForm from "../../components/addressComponents/AddressForm";
import { useGetAddresses } from "../../hooks/useAddress";
import {
  FaShoppingCart,
  FaMapMarkerAlt,
  FaCreditCard,
  FaShieldAlt,
  FaTruck,
  FaCheck,
  FaChevronLeft,
  FaLock,
  FaTag,
  FaPaypal,
  FaStripe
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { token } = useAuthStore();
  const { data: cartItems = [] } = useCart();
  const { data: addressesData, isLoading } = useGetAddresses(token);
  const addresses = addressesData?.data?.results || [];

  const [currentStep, setCurrentStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
  const [shippingAddress, setShippingAddress] = useState(null);
  const [billingAddress, setBillingAddress] = useState(null);
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    address_line1: "",
    city: "",
    country: "",
    postal_code: "",
  });

  // Calculate totals
  const subtotal = cartItems.reduce((acc, item) => acc + Number(item.subtotal || 0), 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax - discount;
  const currency = cartItems[0]?.product?.price?.symbol || "$";

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
    onSuccess: (response) => {
      toast.success("Order placed successfully!");
      // Pass the order data to the thank you page
      navigate("/thank-you", { state: { orderData: response.data } });
    },
    onError: () => toast.error("Order failed. Please try again."),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let shippingId = shippingAddress;
      let billingId = sameAsShipping ? shippingAddress : billingAddress;

      if (shippingAddress === "new") {
        const res = await addAddressMutation.mutateAsync({
          ...formData,
          label: "Shipping Address",
          address_type: "shipping",
          is_default: false,
        });
        shippingId = res.data.id;
      }

      if (!sameAsShipping && billingAddress === "new") {
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
        payment_method: paymentMethod,
        notes: "",
        coupon_code: promoCode,
      });
    } catch {
      toast.error("Failed to save address.");
    }
  };

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "dravox10") {
      setPromoApplied(true);
      toast.success("Promo code applied! 10% discount");
    } else {
      toast.error("Invalid promo code");
    }
  };

  const steps = [
    { id: 1, name: "Shipping", icon: <FaTruck /> },
    { id: 2, name: "Payment", icon: <FaCreditCard /> },
    { id: 3, name: "Review", icon: <FaCheck /> }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0b0b0b] to-[#1a1a1a] flex items-center justify-center pt-[120px]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0b0b] to-[#1a1a1a] pt-[120px] pb-12">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-20 w-96 h-96 bg-[#FF1E1E]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-72 h-72 bg-[#FF1E1E]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        {/* Back to Cart */}
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <FaChevronLeft />
          Back to Cart
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Checkout
          </h1>
          <p className="text-gray-400">Secure checkout - Your information is safe with us</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-4 md:gap-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`
                    flex items-center gap-3 px-6 py-3 rounded-full border-2 transition-all duration-300
                    ${currentStep >= step.id
                      ? 'bg-[#FF1E1E] border-[#FF1E1E] text-white'
                      : 'bg-white/10 border-white/20 text-gray-400'
                    }
                  `}
                >
                  <span className="text-xl">{step.icon}</span>
                  <span className="hidden sm:block font-medium">{step.name}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`
                    hidden md:block w-16 h-0.5 mx-2
                    ${currentStep > step.id ? 'bg-[#FF1E1E]' : 'bg-white/20'}
                  `} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Shipping */}
              {currentStep === 1 && (
                <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <FaMapMarkerAlt className="text-[#FF1E1E]" />
                    Shipping Information
                  </h2>

                  <AddressSelect
                    addresses={addresses}
                    selected={shippingAddress}
                    onChange={setShippingAddress}
                    label="Select Shipping Address"
                  />

                  {shippingAddress === "new" && (
                    <div className="mt-6">
                      <AddressForm formData={formData} setFormData={setFormData} />
                    </div>
                  )}

                  <div className="mt-6 pt-6 border-t border-white/10">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={sameAsShipping}
                        onChange={(e) => setSameAsShipping(e.target.checked)}
                        className="w-5 h-5 rounded border-white/20 bg-white/10 text-[#FF1E1E] focus:ring-[#FF1E1E] focus:ring-offset-0"
                      />
                      <span className="text-gray-300 group-hover:text-white transition-colors">
                        Billing address same as shipping
                      </span>
                    </label>
                  </div>

                  {!sameAsShipping && (
                    <div className="mt-6">
                      <h3 className="text-xl font-semibold text-white mb-4">
                        Billing Address
                      </h3>
                      <AddressSelect
                        addresses={addresses}
                        selected={billingAddress}
                        onChange={setBillingAddress}
                        label="Select Billing Address"
                      />
                      {billingAddress === "new" && (
                        <div className="mt-6">
                          <AddressForm formData={formData} setFormData={setFormData} />
                        </div>
                      )}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    disabled={!shippingAddress || (!sameAsShipping && !billingAddress)}
                    className="w-full mt-8 px-8 py-4 bg-[#FF1E1E] hover:bg-[#ff3333] disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FF1E1E]/30"
                  >
                    Continue to Payment
                  </button>
                </div>
              )}

              {/* Step 2: Payment */}
              {currentStep === 2 && (
                <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <FaCreditCard className="text-[#FF1E1E]" />
                    Payment Method
                  </h2>

                  <div className="space-y-4">
                    {/* Payment Options */}
                    <label className="flex items-center gap-4 p-4 bg-white/5 border-2 border-white/10 rounded-2xl cursor-pointer hover:border-[#FF1E1E]/50 transition-all duration-300">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-5 h-5 text-[#FF1E1E] focus:ring-[#FF1E1E]"
                      />
                      <FaTruck className="text-2xl text-[#FF1E1E]" />
                      <div className="flex-1">
                        <p className="font-semibold text-white">Cash on Delivery</p>
                        <p className="text-sm text-gray-400">Pay when you receive your order</p>
                      </div>
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">
                        Available
                      </span>
                    </label>

                    <label className="flex items-center gap-4 p-4 bg-white/5 border-2 border-white/10 rounded-2xl cursor-not-allowed opacity-50">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        disabled
                        className="w-5 h-5 text-gray-500"
                      />
                      <FaCreditCard className="text-2xl text-gray-500" />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-500">Credit/Debit Card</p>
                        <p className="text-sm text-gray-600">Coming soon</p>
                      </div>
                      <span className="px-3 py-1 bg-gray-500/20 text-gray-500 text-xs font-semibold rounded-full">
                        Unavailable
                      </span>
                    </label>

                    <label className="flex items-center gap-4 p-4 bg-white/5 border-2 border-white/10 rounded-2xl cursor-not-allowed opacity-50">
                      <input
                        type="radio"
                        name="payment"
                        value="paypal"
                        disabled
                        className="w-5 h-5 text-gray-500"
                      />
                      <FaPaypal className="text-2xl text-gray-500" />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-500">PayPal</p>
                        <p className="text-sm text-gray-600">Coming soon</p>
                      </div>
                      <span className="px-3 py-1 bg-gray-500/20 text-gray-500 text-xs font-semibold rounded-full">
                        Unavailable
                      </span>
                    </label>
                  </div>

                  {/* Security Badge */}
                  <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <FaLock className="text-green-500 text-xl" />
                      <div>
                        <p className="text-green-400 font-semibold">Secure Payment</p>
                        <p className="text-sm text-gray-300">Your payment info is encrypted and secure</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium rounded-full transition-all duration-300"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="flex-1 px-8 py-4 bg-[#FF1E1E] hover:bg-[#ff3333] text-white font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FF1E1E]/30"
                    >
                      Review Order
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  {/* Order Review */}
                  <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <FaCheck className="text-[#FF1E1E]" />
                      Review Your Order
                    </h2>

                    {/* Items */}
                    <div className="space-y-4 pb-6 border-b border-white/10">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-4">
                          <img
                            src={item.color_variant.thumbnail_url}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-xl bg-[#1a1a1a]"
                          />
                          <div className="flex-1">
                            <h4 className="text-white font-medium">{item.product.name}</h4>
                            <p className="text-sm text-gray-400">
                              {item.color_variant.localized_color_name} • Qty: {item.quantity}
                            </p>
                          </div>
                          <p className="text-white font-semibold">
                            {currency}{item.subtotal}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Addresses Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
                      <div>
                        <h4 className="text-sm text-gray-400 mb-2">Shipping Address</h4>
                        <p className="text-white">
                          {/* Display selected address details */}
                          Selected shipping address
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm text-gray-400 mb-2">Payment Method</h4>
                        <p className="text-white capitalize">{paymentMethod}</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="flex-1 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium rounded-full transition-all duration-300"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={placeOrderMutation.isLoading}
                        className="flex-1 px-8 py-4 bg-[#FF1E1E] hover:bg-[#ff3333] disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FF1E1E]/30 flex items-center justify-center gap-2"
                      >
                        {placeOrderMutation.isLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <FaLock />
                            Place Order
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-6 space-y-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <HiSparkles className="text-[#FF1E1E]" />
                Order Summary
              </h3>

              {/* Cart Items */}
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-300">
                      {item.product.name} x{item.quantity}
                    </span>
                    <span className="text-white">{currency}{item.subtotal}</span>
                  </div>
                ))}
              </div>

              {/* Promo Code */}
              <div className="pt-4 border-t border-white/10">
                <label className="text-sm text-gray-400 mb-2 block">Promo Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-[#FF1E1E] transition-all duration-300 text-sm"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    disabled={!promoCode || promoApplied}
                    className="px-4 py-2 bg-[#FF1E1E] hover:bg-[#ff3333] disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm font-medium rounded-full transition-all duration-300"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>{currency}{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-green-400" : ""}>
                    {shipping === 0 ? "FREE" : `${currency}${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tax</span>
                  <span>{currency}{tax.toFixed(2)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount (10%)</span>
                    <span>-{currency}{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold text-white pt-3 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-[#FF1E1E]">{currency}{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <FaShieldAlt className="text-[#FF1E1E]" />
                  <span>100% Secure Checkout</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <FaTruck className="text-[#FF1E1E]" />
                  <span>Free Shipping Over $100</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}