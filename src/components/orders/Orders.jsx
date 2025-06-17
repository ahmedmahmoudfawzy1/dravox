// src/components/profile/Orders.jsx

import React from "react";
import { FaEye } from "react-icons/fa";

const orders = [
  {
    id: "#ORD12345",
    date: "2025-06-12",
    status: "Delivered",
    itemsCount: 3,
    total: "1500 EGP",
  },
  {
    id: "#ORD12346",
    date: "2025-06-08",
    status: "Pending",
    itemsCount: 1,
    total: "500 EGP",
  },
  {
    id: "#ORD12347",
    date: "2025-06-02",
    status: "Cancelled",
    itemsCount: 2,
    total: "900 EGP",
  },
];

const statusColor = {
  Delivered: "text-green-500",
  Pending: "text-yellow-400",
  Cancelled: "text-red-500",
};

export default function Orders() {
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
            {orders.map((order, index) => (
              <tr
                key={index}
                className="border-t border-[#333] hover:bg-[#1f1f1f] transition"
              >
                <td className="p-4">{order.id}</td>
                <td className="p-4">{order.date}</td>
                <td className={`p-4 font-medium ${statusColor[order.status]}`}>
                  {order.status}
                </td>
                <td className="p-4">{order.itemsCount}</td>
                <td className="p-4">{order.total}</td>
                <td className="p-4">
                  <button className="flex items-center gap-2 text-primary-color hover:underline">
                    <FaEye />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="text-center py-8 text-gray-400">You have no orders.</p>
        )}
      </div>
    </div>
  );
}
