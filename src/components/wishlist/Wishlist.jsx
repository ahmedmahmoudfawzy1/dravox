import { FaTrashAlt, FaHeartBroken } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Loader/Spinner";
import { useWishlistStore } from "../../store/wishlistStore";
import useAuthStore from "../../store/authStore";
import { useToggleWishlist } from "../../hooks/useWishlist";
import { toast } from "react-toastify";

export default function WishlistPage() {
  const navigate = useNavigate();
  const { token } = useAuthStore();
  const { wishlist, removeWishlistItem } = useWishlistStore();
  const { mutate: toggleWishlist, isLoading } = useToggleWishlist();

  const handleRemove = (product) => {
    console.log(product);
    toggleWishlist(
    {
        productId: product.id,
        colorVariantId: product.color_variant?.id,
        token,
      },
      {
        onSuccess: () => {
          removeWishlistItem(product.id);
          toast.info("Removed from wishlist");
        },
        onError: () => {
          toast.error("Error removing from wishlist");
        },
      }
    );
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="pt-[100px] text-white font-Inter bg-[#2f2d2d] min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-primary-color">
          💖 Your Wishlist
        </h1>

        {wishlist.length === 0 ? (
          <div className="text-center bg-secondary-color p-6 rounded-xl">
            <FaHeartBroken className="text-6xl text-dark-gray mx-auto mb-4" />
            <p className="text-lg text-dark-gray">Your wishlist is empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-[#1a1a1a] rounded-xl shadow-md overflow-hidden hover:scale-[1.02] transition-all duration-300"
              >
                <img
                  src={
                    item.primary_thumbnail || item.color_variant?.thumbnail_url
                  }
                  alt={item.name}
                  className="w-full h-[200px] object-contain bg-[#0b0b0b]"
                />
                <div className="p-4 flex flex-col justify-between h-[180px]">
                  <div>
                    <h2 className="text-white text-lg font-semibold line-clamp-1 mb-1">
                      {item.localized_name || item.name}
                    </h2>
                    <p className="text-dark-gray text-sm line-clamp-2">
                      {item.short_description || item.localized_description}
                    </p>
                    <p className="text-primary-color font-bold text-base mt-2">
                      {item.price?.formatted || "$" + item.price?.amount}
                    </p>
                  </div>

                  <div className="mt-3 flex gap-3 items-center justify-between">
                    <button
                      onClick={() => navigate(`/shop/${item.slug}`)}
                      className="border flex-1 rounded-md py-1 text-center hover:border-primary-color text-white transition-all duration-300"
                    >
                      View Product
                    </button>
                    <button
                      onClick={() => handleRemove(item)}
                      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-md"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
