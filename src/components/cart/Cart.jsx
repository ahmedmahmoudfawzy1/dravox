import { useQuery } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";
import { getCartProducts } from "../../api/cart";
import useAuthStore from "../../store/authStore";

export default function Cart() {
  const { token } = useAuthStore();
  const {
    data: cartItems = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cartItems"],
    queryFn: async () => {
      const res = await getCartProducts(token);
      return res.items || [];
    },
    enabled: !!token,
  });

  console.log(cartItems);
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="text-white">
      <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-dark-gray">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center bg-secondary-color rounded p-4 gap-4"
            >
              <img
                src={item.product.primary_thumbnail}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="text-base font-medium">{item.name}</h4>
                <p className="text-dark-gray text-sm">
                  Quantity: {item.quantity}
                </p>
                <p className="text-sm text-primary-color">
                  {item.product.price.amount * item.quantity +
                    " " +
                    `${item.product.price.currency}`}
                </p>
              </div>
              <button className="text-red-500 hover:text-red-600">
                <FaTrash />
              </button>
            </div>
          ))}

          <div className="flex justify-between mt-4 border-t border-[#444] pt-4">
            <span className="font-medium text-lg">Total:</span>
            {cartItems.map((item) => (
              <span className="text-primary-color font-bold text-lg">
                {item.product.price.amount * item.quantity +
                  " " +
                  `${item.product.price.currency}`}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
