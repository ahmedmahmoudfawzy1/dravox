import { FaEye } from "react-icons/fa";
import { useGetOrders } from "../../hooks/useOrder";
import useAuthStore from "../../store/authStore";
import { Link } from "react-router-dom";
const statusColor = {
  delivered: "text-green-500",
  pending: "text-yellow-400",
  cancelled: "text-red-500",
};
export default function Orders() {
  const { token } = useAuthStore();
  const { data, isLoading, error } = useGetOrders(token);

  const orders = data?.data?.results;
  console.log(orders);
  return (
    <div className="text-white">
      <h2 className="text-2xl font-semibold mb-6">Your Orders</h2>

      <div className="overflow-x-auto bg-secondary-color rounded-lg">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-[#1a1a1a] text-left uppercase text-xs text-gray-400">
              <th className="p-4">Order ID</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Items</th>
              <th className="p-4">Total</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order, index) => (
              <tr
                key={order.id}
                className="border-t border-[#333] hover:bg-[#1f1f1f] transition"
              >
                <td className="p-4">{order.order_number}</td>
                <td className="p-4">{order.created_at}</td>
                <td
                  className={`p-4 font-medium ${
                    statusColor[order.payment_status]
                  }`}
                >
                  {order.status}
                </td>
                <td className="p-4">{order.items_count}</td>
                <td className="p-4">{order.total_amount}</td>
                <td className="p-4">
                  <Link to={`/profile/order/${order.id}`}>
                    <button className="flex items-center gap-2 text-primary-color hover:underline">
                      <FaEye />
                      View
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders?.length === 0 && (
          <p className="text-center py-8 text-gray-400">You have no orders.</p>
        )}
      </div>
    </div>
  );
}
