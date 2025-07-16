import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { useWishlistStore } from "../../store/wishlistStore";
import { useToggleWishlist } from "../../hooks/useWishlist";
import useAuthStore from "../../store/authStore";

export default function WishlistBtn({ product }) {
  const { token } = useAuthStore();
  const { wishlist, addWishlistItem, removeWishlistItem } = useWishlistStore();
  const { mutate: toggleWishlist } = useToggleWishlist();

  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const handleToggleWishlist = () => {
    toggleWishlist(
      {
        productId: product.id,
        colorVariantId: product.color_variant?.id,
        token,
      },
      {
        onSuccess: () => {
          if (isInWishlist) {
            removeWishlistItem(product.id);
          } else {
            addWishlistItem(product);

          }
        },
        onError: (error) => {
          console.error("Wishlist Error:", error);

        },
      }
    );
  };

  return (
    <button
      onClick={handleToggleWishlist}
      className={`absolute top-3 right-3 p-2 rounded-full transition ${
        isInWishlist ? "bg-primary-color" : "bg-[#2f2d2d]"
      }`}
    >
      <FaHeart size={18} color="white" />
    </button>
  );
}
