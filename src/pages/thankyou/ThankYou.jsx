import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaCheckCircle,
  FaEnvelope,
  FaTruck,
  FaBox,
  FaHome,
  FaShoppingBag,
  FaClock,
  FaMapMarkerAlt,
  FaCreditCard,
  FaUser,
  FaPhone
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import Icon from "./Icon";

export default function ThankYouPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [emailSent, setEmailSent] = useState(false);

  // Get order data from navigation state
  const orderData = location.state?.orderData;

  // Redirect if no order data
  useEffect(() => {
    if (!orderData) {
      navigate('/');
    }
  }, [orderData, navigate]);

  useEffect(() => {
    // Simulate email being sent
    setTimeout(() => setEmailSent(true), 2000);
  }, []);

  if (!orderData) {
    return null;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'confirmed': return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
      case 'shipped': return 'text-purple-400 bg-purple-400/20 border-purple-400/30';
      case 'delivered': return 'text-green-400 bg-green-400/20 border-green-400/30';
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0b0b] to-[#1a1a1a] pt-[120px] pb-12">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-20 w-72 h-72 bg-[#FF1E1E]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Success Card */}
          <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 text-center mb-8">
            {/* Animated Icon */}
            <div className="mb-8">
              <Icon />
            </div>

            {/* Success Message */}
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 animate-fadeIn">
              Order Confirmed!
            </h1>

            <p className="text-xl text-gray-300 mb-2 animate-fadeIn animation-delay-200">
              Thank you for your purchase
            </p>

            <p className="text-gray-400 mb-8 max-w-md mx-auto animate-fadeIn animation-delay-400">
              Your order has been successfully placed and is being processed.
              We'll notify you when it's on the way!
            </p>

            {/* Order Number and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-white/10 border border-white/20 rounded-2xl p-6 animate-fadeIn animation-delay-600">
                <p className="text-sm text-gray-400 mb-2">Order Number</p>
                <p className="text-xl font-bold text-[#FF1E1E] font-mono">{orderData.order_number}</p>
              </div>

              <div className="bg-white/10 border border-white/20 rounded-2xl p-6 animate-fadeIn animation-delay-600">
                <p className="text-sm text-gray-400 mb-2">Order Status</p>
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(orderData.status)}`}>
                  {orderData.status_display}
                </span>
              </div>
            </div>

            {/* Email Status */}
            <div className={`
              inline-flex items-center gap-2 px-6 py-3 rounded-full mb-8 transition-all duration-500
              ${emailSent
                ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                : 'bg-yellow-500/20 border border-yellow-500/30 text-yellow-400'
              }
            `}>
              <FaEnvelope />
              <span className="text-sm font-medium">
                {emailSent ? 'Confirmation email sent!' : 'Sending confirmation email...'}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={`/singleOrder/${orderData.id}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#FF1E1E] hover:bg-[#ff3333] text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FF1E1E]/30"
              >
                <FaBox />
                View Order Details
              </Link>

              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-full transition-all duration-300"
              >
                <FaShoppingBag />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Order Items */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FaBox className="text-[#FF1E1E]" />
                Order Items
              </h3>
              <div className="space-y-3">
                {orderData.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                    <div>
                      <p className="text-white font-medium">{item.product_name}</p>
                      <p className="text-sm text-gray-400">
                        {item.color_name} • Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-white font-semibold">
                      {orderData.display_total.symbol}{item.subtotal}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FaCreditCard className="text-[#FF1E1E]" />
                Price Breakdown
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>{orderData.display_total.symbol}{orderData.subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span>{orderData.display_total.symbol}{orderData.shipping_cost}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tax</span>
                  <span>{orderData.display_total.symbol}{orderData.tax_amount}</span>
                </div>
                {parseFloat(orderData.discount_amount) > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount</span>
                    <span>-{orderData.display_total.symbol}{orderData.discount_amount}</span>
                  </div>
                )}
                <div className="pt-3 border-t border-white/10 flex justify-between text-xl font-bold">
                  <span className="text-white">Total</span>
                  <span className="text-[#FF1E1E]">{orderData.display_total.formatted}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping & Payment Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Shipping Address */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <FaTruck className="text-[#FF1E1E]" />
                Shipping Address
              </h4>
              <div className="space-y-2 text-gray-300">
                <p className="flex items-center gap-2">
                  <FaUser className="text-gray-500 text-sm" />
                  {orderData.shipping_address.full_name}
                </p>
                <p className="flex items-center gap-2">
                  <FaPhone className="text-gray-500 text-sm" />
                  {orderData.shipping_address.phone_number}
                </p>
                <p className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-gray-500 text-sm" />
                  {orderData.shipping_address.address_line1}
                  {orderData.shipping_address.address_line2 && `, ${orderData.shipping_address.address_line2}`}
                </p>
                <p className="pl-6 text-sm">
                  {orderData.shipping_address.city}, {orderData.shipping_address.postal_code}
                </p>
                <p className="pl-6 text-sm">
                  {orderData.shipping_address.country_display}
                </p>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <FaCreditCard className="text-[#FF1E1E]" />
                Payment Information
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-400">Payment Method</p>
                  <p className="text-white font-medium">{orderData.payment_method_display}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Payment Status</p>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${orderData.payment_status === 'pending'
                    ? 'bg-yellow-400/20 text-yellow-400'
                    : 'bg-green-400/20 text-green-400'
                    }`}>
                    {orderData.payment_status_display}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* What's Next Section */}
          <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <HiSparkles className="text-[#FF1E1E]" />
              What Happens Next?
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#FF1E1E]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#FF1E1E] font-bold">1</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Order Processing</h4>
                  <p className="text-gray-400 text-sm">
                    We're preparing your items for shipment
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#FF1E1E]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#FF1E1E] font-bold">2</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Shipment Notification</h4>
                  <p className="text-gray-400 text-sm">
                    You'll receive tracking info once shipped
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#FF1E1E]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#FF1E1E] font-bold">3</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Delivery</h4>
                  <p className="text-gray-400 text-sm">
                    Your order will arrive at your doorstep
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Home Button */}
          <div className="text-center mt-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <FaHome />
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Confetti Effect (CSS) */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }

        .animation-delay-600 {
          animation-delay: 600ms;
        }
      `}</style>
    </div>
  );
}