import { Link } from "react-router-dom";
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
} from "react-icons/fa";

export default function CartPage() {
  const { data: cartItems = [], isLoading, error } = useCart();
  const { mutate: removeItem } = useRemoveFromCart();
  const { mutate: updateQuantity, isLoading: isUpdating } = useUpdateCartItemQuantity();

  if (isLoading) return (
    <div className="pt-24">
      <Spinner />
    </div>
  );
  if (error) return <p className="text-center text-red-500 mt-10">Error loading cart</p>;

  const total = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.subtotal),
    0
  );

  return (
    <div className="container mx-auto px-4 py-24 min-h-[70vh] text-white">
      <h1 className="text-3xl font-bold mb-10 text-center text-primary-color">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <FaShoppingCart className="text-6xl text-gray-600 mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Your cart is empty</h3>
          <p className="text-gray-400">Browse our products and add items to your cart.</p>
          <Link
            to="/shop"
            className="mt-6 bg-[#ff1e1e] hover:bg-red-700 text-white py-2 px-6 rounded-xl transition duration-300"
          >
            Go to Shop
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center bg-[#121212] rounded-2xl overflow-hidden shadow-md border border-[#2c2c2c]"
              >
                {/* Thumbnail */}
                <div className="w-full md:w-32 h-32 md:h-full overflow-hidden bg-[#1a1a1a]">
                  <img
                    src={item.color_variant.thumbnail_url}
                    alt={item.product.name}
                    className="object-contain w-full h-full hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 px-6 py-4 w-full">
                  <h4 className="text-xl font-semibold mb-2">{item.product.name}</h4>
                  <div className="flex gap-2 items-center mb-2">
                    <div
                      className="h-[20px] w-[20px] rounded-full"
                      style={{ backgroundColor: item.color_variant.color_name }}
                    ></div>
                    <p className="text-sm font-semibold">{item.color_variant.color_name}</p>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">
                    <span> Price: </span>
                    <span className="text-white font-medium">
                      {item.unit_price} {item.product.price.currency}
                    </span>
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      disabled={item.quantity === 1 || isUpdating}
                      onClick={() =>
                        updateQuantity({ itemId: item.id, quantity: item.quantity - 1 })
                      }
                      className={`p-1.5 rounded-full ${isUpdating ? 'bg-transparent' : 'bg-[#1f1f1f] hover:bg-[#2b2b2b]'
                        } disabled:opacity-50 flex items-center justify-center w-9 h-9`}
                    >
                      {isUpdating ? (
                        <span className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        <FaMinus />
                      )}
                    </button>


                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      disabled={isUpdating}
                      onClick={() =>
                        updateQuantity({ itemId: item.id, quantity: item.quantity + 1 })
                      }
                      className={`p-1.5 rounded-full ${isUpdating ? 'bg-transparent' : 'bg-[#1f1f1f] hover:bg-[#2b2b2b]'
                        } disabled:opacity-50 flex items-center justify-center w-9 h-9`}
                    >
                      {isUpdating ? (
                        <span className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        <FaPlus />
                      )}
                    </button>
                  </div>
                </div>

                {/* Total & Remove */}
                <div className="flex flex-col items-center px-6 py-4 gap-2">
                  <p className="text-primary-color font-bold text-lg">
                    {item.subtotal}
                  </p>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full"
                    onClick={() => removeItem(item.id)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Section */}
          <div className="mt-12 flex flex-col md:flex-row justify-between items-center bg-[#181818] p-6 rounded-xl border border-[#2a2a2a] shadow-inner">
            <h3 className="text-2xl font-semibold mb-4 md:mb-0">Total:</h3>
            <span className="text-3xl text-primary-color font-bold">
              {total.toFixed(2)} {cartItems[0]?.product.price.currency}
            </span>
            <Link
              to="/checkout"
              className="mt-4 md:mt-0 bg-[#ff1e1e] hover:bg-red-700 text-white py-2 px-8 rounded-xl transition duration-300"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
