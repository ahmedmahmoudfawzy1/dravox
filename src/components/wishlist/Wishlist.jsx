import { FaTrashAlt, FaHeartBroken, FaHeart, FaShoppingCart, FaArrowRight } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../components/Loader/Spinner";
import { useWishlistStore } from "../../store/wishlistStore";
import useAuthStore from "../../store/authStore";
import { useToggleWishlist } from "../../hooks/useWishlist";
import { toast } from "react-toastify";
import { useState } from "react";

export default function WishlistPage() {
  const navigate = useNavigate();
  const { token } = useAuthStore();
  const { wishlist, removeWishlistItem } = useWishlistStore();
  const { mutate: toggleWishlist, isLoading } = useToggleWishlist();
  const [removingId, setRemovingId] = useState(null);

  const handleRemove = (product) => {
    setRemovingId(product.id);
    toggleWishlist(
      {
        productId: product.id,
        colorVariantId: product.color_variant?.id,
        token,
      },
      {
        onSuccess: () => {
          removeWishlistItem(product.id);
          setRemovingId(null);
        },
        onError: (err) => {
          console.log(err);
          setRemovingId(null);
        },
      }
    );
  };



  if (isLoading && !removingId) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0b0b0b] to-[#1a1a1a] flex items-center justify-center pt-[120px]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0b0b] to-[#1a1a1a] pt-[120px] pb-12">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-20 w-96 h-96 bg-[#FF1E1E]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-20 w-72 h-72 bg-[#FF1E1E]/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-[#FF1E1E] to-transparent w-20" />
            <FaHeart className="text-[#FF1E1E] text-3xl" />
            <div className="h-px bg-gradient-to-r from-transparent via-[#FF1E1E] to-transparent w-20" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            My Wishlist
          </h1>
          <p className="text-gray-400 text-lg">
            {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved for later
          </p>
        </div>

        {wishlist.length === 0 ? (
          /* Empty Wishlist */
          <div className="max-w-md mx-auto text-center py-20">
            <div className="relative mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-[#FF1E1E]/20 to-[#FF1E1E]/10 rounded-full flex items-center justify-center mx-auto">
                <FaHeartBroken className="text-5xl text-[#FF1E1E]" />
              </div>
              <div className="absolute inset-0 w-32 h-32 bg-[#FF1E1E]/20 rounded-full blur-xl mx-auto animate-pulse" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">Your wishlist is empty</h3>
            <p className="text-gray-400 mb-8">
              Save your favorite gaming gear for later and never miss out on what you love!
            </p>

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#FF1E1E] hover:bg-[#ff3333] text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FF1E1E]/30"
            >
              Browse Products
              <FaArrowRight />
            </Link>
          </div>
        ) : (
          <>
            {/* Wishlist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlist.map((item, index) => (
                <div
                  key={item.id}
                  className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#FF1E1E]/20 hover:border-[#FF1E1E]/30 hover:scale-[1.02] animate-fadeIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Stock Badge */}
                  {item.is_in_stock && item.total_stock < 5 && (
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold rounded-full">
                        Only {item.total_stock} left!
                      </span>
                    </div>
                  )}

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(item)}
                    disabled={removingId === item.id}
                    className="absolute top-4 right-4 z-20 w-10 h-10 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-full flex items-center justify-center text-red-400 hover:text-red-300 transition-all duration-300 hover:scale-110"
                  >
                    {removingId === item.id ? (
                      <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <FaTrashAlt size={14} />
                    )}
                  </button>

                  {/* Product Image */}
                  <div className="relative h-64 bg-gradient-to-b from-[#1a1a1a] to-[#0b0b0b] p-6">
                    <img
                      src={item.primary_thumbnail || item.color_variant?.thumbnail_url}
                      alt={item.name}
                      className="w-full h-full object-contain transform transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    {/* Category */}
                    <p className="text-[#FF1E1E] text-xs font-semibold uppercase tracking-wider mb-2 opacity-80">
                      {item.category?.name || "Gaming Gear"}
                    </p>

                    {/* Name */}
                    <h3 className="text-white text-lg font-bold mb-2 line-clamp-1 group-hover:text-[#FF1E1E] transition-colors">
                      {item.localized_name || item.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                      {item.short_description || item.localized_description}
                    </p>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-2xl font-bold text-[#FF1E1E]">
                        {item.price?.formatted || `$${item.price?.amount || item.base_price}`}
                      </p>
                      {item.is_in_stock ? (
                        <span className="text-xs text-green-400">In Stock</span>
                      ) : (
                        <span className="text-xs text-red-400">Out of Stock</span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Link
                        to={`/shop/${item.slug}`}
                        className="flex-1 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium rounded-full text-center transition-all duration-300"
                      >
                        View Details
                      </Link>

                      <button
                        onClick={() => handleAddToCart(item)}
                        disabled={!item.is_in_stock}
                        className="flex-1 px-4 py-2.5 bg-[#FF1E1E] hover:bg-[#ff3333] disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm font-medium rounded-full transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <FaShoppingCart size={14} />
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Out of Stock Overlay */}
                  {!item.is_in_stock && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                      <span className="bg-red-500/90 text-white px-6 py-3 rounded-full font-semibold">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Actions Bar */}
            <div className="mt-12 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Ready to checkout?</h3>
                  <p className="text-gray-400">Add these items to your cart and complete your purchase</p>
                </div>
                <div className="flex gap-4">
                  <Link
                    to="/shop"
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium rounded-full transition-all duration-300"
                  >
                    Continue Shopping
                  </Link>
                  <button
                    className="px-6 py-3 bg-[#FF1E1E] hover:bg-[#ff3333] text-white font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FF1E1E]/30 flex items-center gap-2"
                  >
                    <FaShoppingCart />
                    Add All to Cart
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}