import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../components/Loader/Spinner";
import { useCart, useRemoveFromCart } from "../../hooks/useCart";

import { FaPlus, FaMinus, FaTrashAlt } from "react-icons/fa";

export default function CartPage() {
  const { data: cartItems = [], isLoading, error } = useCart();
  const { mutate: removeItem } = useRemoveFromCart();
  if (isLoading) return <Spinner />;
  if (error) return <p>Error loading cart</p>;

  return (
    <div className="container py-8 pt-[100px]">
      <h1 className="text-2xl mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.product.id} className="flex mb-4 items-center">
            <img
              src={item.color_variant.thumbnail_url}
              className="w-16 h-16 object-cover"
            />
            <div className="flex-1 px-4">
              <h3 className="text-lg">{item.product.name}</h3>
              <p>Qty: {item.quantity}</p>
            </div>
            <button onClick={() => removeItem(item.id)}>
              <FaTrashAlt className="text-red-600" />
            </button>
          </div>
        ))
      )}
      {cartItems.length > 0 && (
        <span className="main-btn">
          <Link to="/checkout">Checkout</Link>
        </span>
      )}
    </div>
  );
}
