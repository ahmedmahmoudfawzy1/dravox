import { FaShoppingCart } from "react-icons/fa";
import { useAddToCart } from "../../hooks/useCart";
import { toast } from "react-toastify";

export default function CartButton({ product }) {
  // console.log(product);
  const { mutate: addItemToCart, isPending } = useAddToCart();

  const handleAddToCart = () => {
    addItemToCart({
      product_id: product.id,
      color_variant_id: product.color_variant?.id,
      quantity: 1,
    });

  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isPending}
      className="bg-primary-color border transition-all duration-500 border-primary-color hover:bg-transparent hover:border-white text-white p-2 rounded-md"
    >
      {isPending ? "Adding..." : <FaShoppingCart />}
    </button>
  );
}
