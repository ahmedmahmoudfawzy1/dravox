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
        colorVariantId: 1,
        token,
      },
      {
        onSuccess: () => {
          if (isInWishlist) {
            removeWishlistItem(product.id);
            toast.info("Removed from wishlist");
          } else {
            addWishlistItem(product);
            toast.success("Added to wishlist");
          }
        },
        onError: (error) => {
          console.error("Wishlist Error:", error);
          toast.error("Error updating wishlist");
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
