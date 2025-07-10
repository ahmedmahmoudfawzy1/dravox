
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useCancelOrder,
  useDeleteOrder,
  useUpdateOrder,
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

  const { mutate: cancelOrder, isPending: isCancelling } =
    useCancelOrder(token);
  const { mutate: deleteOrder } = useDeleteOrder(token);
  const { mutate: updateOrder } = useUpdateOrder(token);

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

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

  const handleDeleteOrder = () => {
    deleteOrder(order.id, {
      onSuccess: () => {
        toast.success("Order deleted");
        navigate("/profile");
      },
      onError: () => {
        toast.error("Failed to delete order");
      },
    });
  };

  const handleUpdateOrder = () => {
    updateOrder(
      { id: order.id, data: { note: "Updated via modal" } },
      {
        onSuccess: () => {
          toast.success("Order updated");
          setEditModalOpen(false);
        },
        onError: () => {
          toast.error("Failed to update order");
        },
      }
    );
  };

  if (isLoading) return <Spinner />;
  if (error) return toast.error(error.response.data.detail);

  const order = data?.data;

  return (
    <div className="text-white p-6 bg-secondary-color rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-3">
        Order #{order.order_number}
      </h2>

      <div className="grid md:grid-cols-2 gap-6 mb-8 text-sm">
        <div>
          <p>
            <span className="text-gray-400">Status:</span>
            {order.status_display}
          </p>
          <p>
            <span className="text-gray-400">Payment Status:</span>
            {order.payment_status_display}
          </p>
          <p>
            <span className="text-gray-400">Payment Method:</span>
            {order.payment_method_display}
          </p>
          <p>
            <span className="text-gray-400">Created At:</span>
            {new Date(order.created_at).toLocaleString()}
          </p>
        </div>
        <div>
          <p>
            <span className="text-gray-400">Subtotal:</span> {order.subtotal}
            {order.currency_code}
          </p>
          <p>
            <span className="text-gray-400">Shipping:</span>
            {order.shipping_cost} {order.currency_code}
          </p>
          <p>
            <span className="text-gray-400">Tax:</span> {order.tax_amount}
            {order.currency_code}
          </p>
          <p>
            <span className="text-gray-400 font-semibold">Total:</span>
            <span className="text-green-400 font-semibold">

              {order.display_total.formatted}
            </span>
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div>
          <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
          <div className="text-sm leading-6">
            <p>{order.shipping_address.full_name}</p>
            <p>{order.shipping_address.address_line1}</p>
            <p>
              {order.shipping_address.city},{" "}
              {order.shipping_address.country_display}
            </p>
            <p>{order.shipping_address.phone_number}</p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Billing Address</h3>
          <div className="text-sm leading-6">
            <p>{order.billing_address.full_name}</p>
            <p>{order.billing_address.address_line1}</p>
            <p>
              {order.billing_address.city},{" "}
              {order.billing_address.country_display}
            </p>
            <p>{order.billing_address.phone_number}</p>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4">Order Items</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="bg-[#1a1a1a] text-gray-400 uppercase">
              <th className="p-3">Product</th>
              <th className="p-3">Color</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Unit Price</th>
              <th className="p-3">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr
                key={item.id}
                className="border-b border-[#333] hover:bg-[#1f1f1f] transition"
              >
                <td className="p-3">{item.product_name}</td>
                <td className="p-3 capitalize">{item.color_name}</td>
                <td className="p-3">{item.quantity}</td>
                <td className="p-3">
                  {item.unit_price} {order.currency_code}
                </td>
                <td className="p-3">
                  {item.subtotal} {order.currency_code}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex flex-wrap gap-3 justify-end">
        {order.can_cancel && (
          <button
            onClick={handleCancelOrder}
            disabled={isCancelling}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white shadow"
          >
            {isCancelling ? "Cancelling..." : "Cancel Order"}
          </button>
        )}
        <button
          onClick={() => setEditModalOpen(true)}
          className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded text-white shadow"
        >
          Edit Order
        </button>
        <button
          onClick={() => setConfirmDeleteOpen(true)}
          className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-white shadow"
        >
          Delete Order
        </button>
      </div>


      <AlertModal
        open={editModalOpen}
        onClose={setEditModalOpen}
        onConfirm={handleUpdateOrder}
        title="Edit Order"
        description="Are you sure you want to update this order?"
      />


      <AlertModal
        open={confirmDeleteOpen}
        onClose={setConfirmDeleteOpen}
        onConfirm={handleDeleteOrder}
        title="Delete Order"
        description="Are you sure you want to delete this order? This action cannot be undone."
      />
    </div>
  );
}




