import { Link } from "react-router-dom";
import { useState } from "react";
import { useAddToCart } from "../../hooks/useCart";
import { useProducts } from "../../hooks/useProducts";
import Spinner from "../Loader/Spinner";
import WishlistBtn from "../wishlistBtn/WishlistBtn";
import { FaShoppingCart } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { toast } from "react-toastify";

export default function ProductCard({ searchQuery }) {
  const { data } = useProducts();
  const { mutate: addToCart, isLoading } = useAddToCart();
  const [loadingProducts, setLoadingProducts] = useState({});

  if (isLoading) return <Spinner />;

  // Filter products based on search query
  const filteredProducts = data?.filter(product =>
    !searchQuery ||
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.short_description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = async (product) => {
    setLoadingProducts(prev => ({ ...prev, [product.slug]: true }));
    try {
      await addToCart(product);
      toast.success(`${product.name} added to cart!`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      toast.error("Failed to add to cart");
    } finally {
      setLoadingProducts(prev => ({ ...prev, [product.slug]: false }));
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts?.map((product) => {
        const isLoading = loadingProducts[product.slug];

        return (
          <div
            key={product.slug}
            className="group relative h-[400px] sm:h-[420px] lg:h-[450px] bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#FF1E1E]/20 hover:border-[#FF1E1E]/30 hover:scale-[1.02]"
          >
            {/* New Badge */}
            {Math.random() > 0.7 && (
              <div className="absolute top-4 left-4 z-20">
                <span className="px-3 py-1 bg-[#FF1E1E] text-white text-xs font-bold rounded-full flex items-center gap-1">
                  <HiSparkles size={12} />
                  NEW
                </span>
              </div>
            )}

            {/* Wishlist Button */}
            <div className="absolute top-4 right-4 z-20">
              <WishlistBtn product={product} />
            </div>

            {/* Product Image Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] to-[#0b0b0b]">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="h-full flex items-center justify-center p-8">
                <img
                  src={product.primary_thumbnail}
                  alt={product.name}
                  className="max-h-[70%] max-w-[80%] object-contain transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                />
              </div>
            </div>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-all duration-500 translate-y-12 group-hover:translate-y-0">
              {/* Product Info */}
              <h3 className="text-white text-xl font-bold mb-2 line-clamp-1 transition-all duration-300">
                {product.name}
              </h3>

              <p className="text-gray-300 text-sm line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                {product.short_description}
              </p>

              {/* Price and Actions */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#FF1E1E] font-bold text-2xl">
                      {product.price.currency} {product.price.amount}
                    </p>
                    {Math.random() > 0.6 && (
                      <p className="text-gray-400 text-sm line-through">
                        {product.price.currency} {(parseFloat(product.price.amount) * 1.2).toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                  <Link
                    to={`/shop/${product.slug}`}
                    className="flex-1 px-4 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-[#FF1E1E]/50 text-white text-sm font-medium rounded-full text-center transition-all duration-300"
                  >
                    Details
                  </Link>

                  {/* <button
                    onClick={() => handleAddToCart(product)}
                    disabled={isLoading}
                    className="flex-1 px-4 py-2.5 bg-[#FF1E1E] hover:bg-[#ff3333] text-white text-sm font-medium rounded-full transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <FaShoppingCart size={14} />
                        Add
                      </>
                    )}
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Empty State */}
      {filteredProducts?.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-400 text-lg">No products found matching your criteria.</p>
          <p className="text-gray-500 text-sm mt-2">Try adjusting your filters or search query.</p>
        </div>
      )}
    </div>
  );
}