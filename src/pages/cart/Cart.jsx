import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../../components/Loader/Spinner";
import {
  useCart,
  useRemoveFromCart,
  useUpdateCartItemQuantity,
} from "../../hooks/useCart";
import {
  FaPlus,
  FaMinus,
  FaTrashAlt,
  FaShoppingCart,
  FaTag,
  FaTruck,
  FaShieldAlt,
  FaChevronRight,
  FaPercent,
  FaGift
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { toast } from "react-toastify";

export default function CartPage() {
  const { data: cartItems = [], isLoading, error } = useCart();
  console.log("cart items now", cartItems)
  const { mutate: removeItem } = useRemoveFromCart();
  const { mutate: updateQuantity, isLoading: isUpdating } = useUpdateCartItemQuantity();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  // Calculate totals from cart items
  const subtotal = cartItems.reduce((acc, item) => acc + parseFloat(item.subtotal || 0), 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;

  let cartItemsLength = cartItems?.length

  useEffect(() => {
    localStorage.setItem("cartLength", cartItemsLength)
  }, [cartItems?.length])


  // Get currency from first item or default
  const currency = cartItems[0]?.product?.price?.symbol || localStorage.getItem("currency");
  console.log(currency)

  const handleRemoveItem = (itemId, productName) => {
    removeItem(itemId);
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    updateQuantity({ itemId, quantity: newQuantity });
  };

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "dravox10") {
      setPromoApplied(true);
      toast.success("Promo code applied! 10% discount");
    } else {
      toast.error("Invalid promo code");
    }
  };

  if (isLoading) return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0b0b] to-[#1a1a1a] flex items-center justify-center pt-[120px]">
      <Spinner />
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0b0b] to-[#1a1a1a] flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-500 text-xl mb-4">Error loading cart</p>
        <Link to="/shop" className="text-[#FF1E1E] hover:text-white transition-colors">
          Return to Shop
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0b0b] to-[#1a1a1a] pt-[120px] pb-12">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-20 w-96 h-96 bg-[#FF1E1E]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-72 h-72 bg-[#FF1E1E]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaShoppingCart className="text-[#FF1E1E] text-3xl" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">Shopping Cart</h1>
          <p className="text-gray-400">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="max-w-md mx-auto text-center py-20">
            <div className="relative mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-[#FF1E1E]/20 to-[#FF1E1E]/10 rounded-full flex items-center justify-center mx-auto">
                <FaShoppingCart className="text-5xl text-[#FF1E1E]" />
              </div>
              <div className="absolute inset-0 w-32 h-32 bg-[#FF1E1E]/20 rounded-full blur-xl mx-auto animate-pulse" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">Your cart is empty</h3>
            <p className="text-gray-400 mb-8">
              Looks like you haven't added any gaming gear to your cart yet.
            </p>

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#FF1E1E] hover:bg-[#ff3333] text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FF1E1E]/30"
            >
              Start Shopping
              <FaChevronRight />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Free Shipping Banner */}
              {/* {subtotal < 100 && (
                <div className="bg-gradient-to-r from-[#FF1E1E]/20 to-[#ff4444]/20 border border-[#FF1E1E]/30 rounded-2xl p-4 flex items-center gap-4">
                  <FaTruck className="text-[#FF1E1E] text-2xl" />
                  <div className="flex-1">
                    <p className="text-white font-semibold">
                      Add ${(100 - subtotal).toFixed(2)} more for FREE shipping!
                    </p>
                    <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                      <div
                        className="bg-[#FF1E1E] h-full rounded-full transition-all duration-500"
                        style={{ width: `${(subtotal / 100) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              )} */}

              {/* Cart Items */}
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-6 transition-all duration-500 hover:shadow-2xl hover:shadow-[#FF1E1E]/10 hover:border-[#FF1E1E]/20"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Product Image */}
                    <div className="relative w-full md:w-32 h-32 bg-gradient-to-br from-[#1a1a1a] to-[#0b0b0b] rounded-2xl overflow-hidden group">
                      <img
                        src={item.color_variant.thumbnail_url}
                        alt={item.product.name}
                        className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <h4 className="text-xl font-bold text-white mb-1 hover:text-[#FF1E1E] transition-colors">
                          <Link to={`/shop/${item.product.slug}`}>
                            {item.product.name}
                          </Link>
                        </h4>
                        <p className="text-sm text-gray-400">
                          {item.product.category.name}
                        </p>
                      </div>

                      {/* Color */}
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">Color:</span>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-6 h-6 rounded-full border-2 border-white/20"
                            style={{ backgroundColor: item.color_variant.hex_code }}
                          />
                          <span className="text-sm text-white">
                            {item.color_variant.localized_color_name}
                          </span>
                        </div>
                      </div>

                      {/* Price & Quantity */}
                      <div className="flex flex-wrap items-end justify-between gap-4">
                        <div>
                          <p className="text-2xl font-bold text-[#FF1E1E]">
                            {currency}{item.unit_price}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <button
                            disabled={item.quantity === 1 || isUpdating}
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-10 h-10 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center text-white transition-all duration-300"
                          >
                            <FaMinus size={14} />
                          </button>

                          <span className="w-12 text-center font-bold text-white">
                            {item.quantity}
                          </span>

                          <button
                            disabled={isUpdating || item.quantity >= item.color_variant.stock_quantity}
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-10 h-10 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center text-white transition-all duration-300"
                          >
                            <FaPlus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Subtotal & Remove */}
                    <div className="flex md:flex-col items-center justify-between md:justify-end gap-4">
                      <div className="text-center">
                        <p className="text-xs text-gray-400 mb-1">Subtotal</p>
                        <p className="text-2xl font-bold text-white">
                          {currency}{item.subtotal}
                        </p>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item.id, item.product.name)}
                        className="w-10 h-10 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-full flex items-center justify-center text-red-400 hover:text-red-300 transition-all duration-300 hover:scale-110"
                      >
                        <FaTrashAlt size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-6 sticky top-28">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <HiSparkles className="text-[#FF1E1E]" />
                  Order Summary
                </h3>

                {/* Summary Items */}
                <div className="space-y-4 pb-6 border-b border-white/10">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>{currency}{subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-gray-300">
                    <span className="flex items-center gap-2">
                      <FaTruck size={14} />
                      Shipping
                    </span>
                    <span className={shipping === 0 ? "text-green-400" : ""}>
                      {shipping === 0 ? "FREE" : `${currency}${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  {promoApplied && (
                    <div className="flex justify-between text-green-400">
                      <span className="flex items-center gap-2">
                        <FaTag size={14} />
                        Promo (10% off)
                      </span>
                      <span>-{currency}{discount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                {/* Promo Code */}
                <div className="py-6 border-b border-white/10">
                  <label className="text-sm text-gray-400 mb-2 block">Have a promo code?</label>
                  <div className="flex flex-wrap gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-[#FF1E1E] transition-all duration-300"
                    />
                    <button
                      onClick={handleApplyPromo}
                      disabled={!promoCode || promoApplied}
                      style={{ flexGrow: "1" }}
                      className="px-6 py-2 bg-[#FF1E1E] hover:bg-[#ff3333] disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-full transition-all duration-300 "
                    >
                      Apply
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Try: DRAVOX10</p>
                </div>

                {/* Total */}
                <div className="pt-6 pb-6 border-b border-white/10">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-white">Total</span>
                    <span className="text-3xl font-bold text-[#FF1E1E]">
                      {currency}{total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Benefits */}
                <div className="py-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <FaShieldAlt className="text-[#FF1E1E]" />
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <FaGift className="text-[#FF1E1E]" />
                    <span>Free gift with orders over $200</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <FaPercent className="text-[#FF1E1E]" />
                    <span>Member exclusive discounts</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link
                  to="/checkout"
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#FF1E1E] hover:bg-[#ff3333] text-white font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FF1E1E]/30"
                >
                  Proceed to Checkout
                  <FaChevronRight />
                </Link>

                {/* Continue Shopping */}
                <Link
                  to="/shop"
                  className="w-full flex items-center justify-center gap-2 px-8 py-3 mt-3 bg-transparent hover:bg-white/10 border border-white/20 text-white font-medium rounded-full transition-all duration-300"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Recommended Products */}
        {cartItems.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <HiSparkles className="text-[#FF1E1E]" />
              Complete Your Setup
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Placeholder for recommended products */}
              <p className="text-gray-400 col-span-full text-center py-8">
                Loading recommendations...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}