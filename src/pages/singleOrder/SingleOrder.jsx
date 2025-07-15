import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaBox,
  FaCheckCircle,
  FaClock,
  FaTruck,
  FaMapMarkerAlt,
  FaCreditCard,
  FaArrowLeft,
  FaTimesCircle,
  FaExclamationTriangle,
  FaPhone,
  FaEnvelope,
  FaUser,
  FaBarcode,
  FaCalendar,
} from "react-icons/fa";
import { HiSparkles, HiLightningBolt } from "react-icons/hi";
import { MdLocalShipping, MdReceipt } from "react-icons/md";
import { BsCircleFill } from "react-icons/bs";
import {
  useCancelOrder,
  useGetSingleOrder,
} from "../../hooks/useOrder";
import useAuthStore from "../../store/authStore";
import Spinner from "../../components/Loader/Spinner";
import { toast } from "react-toastify";
import AlertModal from "../../components/alertDialog/AlertModal";

export default function SingleOrder() {
  const { orderId } = useParams();
  const { token } = useAuthStore();
  const { data, isLoading, error } = useGetSingleOrder(orderId, token);
  const navigate = useNavigate();

  const { mutate: cancelOrder, isPending: isCancelling } = useCancelOrder(token);
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);

  const handleCancelOrder = () => {
    cancelOrder(order.id, {
      onSuccess: () => {
        toast.success("Order cancelled successfully");
        navigate("/profile");
      },
      onError: (err) => {
        const detail = err?.response?.data?.detail;
        toast.error(detail || "Failed to cancel order");
      },
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0b0b0b] to-[#1a1a1a] flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    toast.error(error.response?.data?.detail || "Failed to load order");
    return null;
  }

  const order = data?.data;

  // Status configuration
  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        color: "text-yellow-500",
        bgColor: "bg-yellow-500/20",
        borderColor: "border-yellow-500/30",
        icon: <FaClock />,
        label: "Pending"
      },
      processing: {
        color: "text-blue-500",
        bgColor: "bg-blue-500/20",
        borderColor: "border-blue-500/30",
        icon: <FaBox />,
        label: "Processing"
      },
      shipped: {
        color: "text-purple-500",
        bgColor: "bg-purple-500/20",
        borderColor: "border-purple-500/30",
        icon: <FaTruck />,
        label: "Shipped"
      },
      delivered: {
        color: "text-green-500",
        bgColor: "bg-green-500/20",
        borderColor: "border-green-500/30",
        icon: <FaCheckCircle />,
        label: "Delivered"
      },
      cancelled: {
        color: "text-red-500",
        bgColor: "bg-red-500/20",
        borderColor: "border-red-500/30",
        icon: <FaTimesCircle />,
        label: "Cancelled"
      }
    };
    return configs[status?.toLowerCase()] || configs.pending;
  };

  const statusConfig = getStatusConfig(order.status);

  // Order timeline
  const getOrderTimeline = () => {
    const timeline = [
      { step: "Order Placed", date: order.created_at, completed: true, icon: <FaCheckCircle /> },
      { step: "Payment Confirmed", date: order.paid_at, completed: order.payment_status === "paid", icon: <FaCreditCard /> },
      { step: "Processing", date: order.processing_at, completed: ["processing", "shipped", "delivered"].includes(order.status), icon: <FaBox /> },
      { step: "Shipped", date: order.shipped_at, completed: ["shipped", "delivered"].includes(order.status), icon: <FaTruck /> },
      { step: "Delivered", date: order.delivered_at, completed: order.status === "delivered", icon: <FaCheckCircle /> }
    ];
    return timeline;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0b0b] to-[#1a1a1a] py-24">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-20 w-96 h-96 bg-[#FF1E1E]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Orders</span>
          </button>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Order #{order.order_number}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <FaCalendar />
                  {new Date(order.created_at).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-2">
                  <FaClock />
                  {new Date(order.created_at).toLocaleTimeString()}
                </span>
              </div>
            </div>

            <div className="flex gap-3">


            </div>
          </div>
        </div>

        {/* Status Banner */}
        <div className={`mb-8 p-6 rounded-3xl ${statusConfig.bgColor} ${statusConfig.borderColor} border backdrop-blur-sm`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`text-3xl ${statusConfig.color}`}>
                {statusConfig.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Order {statusConfig.label}
                </h2>
                <p className="text-gray-300">
                  {order.status === "shipped" && "Your order is on its way!"}
                  {order.status === "delivered" && "Your order has been delivered successfully"}
                  {order.status === "pending" && "We're preparing your order"}
                  {order.status === "processing" && "Your order is being processed"}
                  {order.status === "cancelled" && "This order has been cancelled"}
                </p>
              </div>
            </div>
            {order.tracking_number && (
              <div className="bg-black/30 rounded-2xl px-4 py-2">
                <p className="text-xs text-gray-400">Tracking Number</p>
                <p className="text-white font-mono">{order.tracking_number}</p>
              </div>
            )}
          </div>
        </div>

        {/* Order Timeline */}
        <div className="mb-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <HiLightningBolt className="text-[#FF1E1E]" />
            Order Timeline
          </h3>
          <div className="relative">
            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-white/20" />
            <div className="space-y-6">
              {getOrderTimeline().map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all ${item.completed
                    ? "bg-[#FF1E1E] text-white shadow-lg shadow-[#FF1E1E]/30"
                    : "bg-white/10 text-gray-500"
                    }`}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${item.completed ? "text-white" : "text-gray-500"}`}>
                      {item.step}
                    </h4>
                    {item.date && (
                      <p className="text-sm text-gray-400">
                        {new Date(item.date).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <FaBox className="text-[#FF1E1E]" />
                Order Items ({order.items.length})
              </h3>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="bg-white/5 rounded-2xl p-4 hover:bg-white/10 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center">
                        <FaBox className="text-2xl text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold">{item.product_name}</h4>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <BsCircleFill className={`text-xs`} style={{ color: item.color_hex || "#999" }} />
                            {item.color_name}
                          </span>
                          <span>Qty: {item.quantity}</span>
                          <span className="flex items-center gap-1">
                            <FaBarcode className="text-xs" />
                            {item.sku || "N/A"}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">Unit Price</p>
                        <p className="text-white font-medium">
                          {item.unit_price} {order.currency_code}
                        </p>
                        <p className="text-[#FF1E1E] font-bold">
                          {item.subtotal} {order.currency_code}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping & Billing Addresses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <MdLocalShipping className="text-[#FF1E1E]" />
                  Shipping Address
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-300">
                    <FaUser className="text-gray-500" />
                    <span>{order.shipping_address.full_name}</span>
                  </div>
                  <div className="flex items-start gap-3 text-gray-300">
                    <FaMapMarkerAlt className="text-gray-500 mt-1" />
                    <div>
                      <p>{order.shipping_address.address_line1}</p>
                      {order.shipping_address.address_line2 && (
                        <p>{order.shipping_address.address_line2}</p>
                      )}
                      <p>
                        {order.shipping_address.city}, {order.shipping_address.state || ""}{" "}
                        {order.shipping_address.postal_code}
                      </p>
                      <p>{order.shipping_address.country_display}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <FaPhone className="text-gray-500" />
                    <span>{order.shipping_address.phone_number}</span>
                  </div>
                  {order.shipping_address.email && (
                    <div className="flex items-center gap-3 text-gray-300">
                      <FaEnvelope className="text-gray-500" />
                      <span>{order.shipping_address.email}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <FaCreditCard className="text-[#FF1E1E]" />
                  Billing Address
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-300">
                    <FaUser className="text-gray-500" />
                    <span>{order.billing_address.full_name}</span>
                  </div>
                  <div className="flex items-start gap-3 text-gray-300">
                    <FaMapMarkerAlt className="text-gray-500 mt-1" />
                    <div>
                      <p>{order.billing_address.address_line1}</p>
                      {order.billing_address.address_line2 && (
                        <p>{order.billing_address.address_line2}</p>
                      )}
                      <p>
                        {order.billing_address.city}, {order.billing_address.state || ""}{" "}
                        {order.billing_address.postal_code}
                      </p>
                      <p>{order.billing_address.country_display}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <FaPhone className="text-gray-500" />
                    <span>{order.billing_address.phone_number}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            {/* Payment Summary */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-6 sticky top-28">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <MdReceipt className="text-[#FF1E1E]" />
                Order Summary
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>{order.subtotal} {order.currency_code}</span>
                </div>
                {order.discount_amount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount</span>
                    <span>-{order.discount_amount} {order.currency_code}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span>{order.shipping_cost} {order.currency_code}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tax</span>
                  <span>{order.tax_amount} {order.currency_code}</span>
                </div>
                <div className="h-px bg-white/20 my-4" />
                <div className="flex justify-between text-xl font-bold text-white">
                  <span>Total</span>
                  <span className="text-[#FF1E1E]">{order.display_total.formatted}</span>
                </div>
              </div>

              {/* Payment Info */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Payment Method</span>
                    <span className="text-white">{order.payment_method_display}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Payment Status</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.payment_status === "paid"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                      }`}>
                      {order.payment_status_display}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {order.can_cancel && (
                <div className="mt-6">
                  <button
                    onClick={() => setConfirmCancelOpen(true)}
                    disabled={isCancelling}
                    className="w-full px-6 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-full transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FaTimesCircle />
                    <span>{isCancelling ? "Cancelling..." : "Cancel Order"}</span>
                  </button>
                </div>
              )}

              {/* Support Card */}
              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <FaExclamationTriangle className="text-blue-400" />
                  <h4 className="text-white font-semibold">Need Help?</h4>
                </div>
                <p className="text-sm text-gray-400 mb-3">
                  Our support team is here to help with your order
                </p>
                <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  Contact Support →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      <AlertModal
        open={confirmCancelOpen}
        onClose={setConfirmCancelOpen}
        onConfirm={handleCancelOrder}
        title="Cancel Order"
        description="Are you sure you want to cancel this order? This action cannot be undone."
      />
    </div>
  );
}