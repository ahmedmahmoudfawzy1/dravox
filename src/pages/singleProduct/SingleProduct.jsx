import { useParams, Link } from "react-router-dom";
import { useGetSingleProduct } from "../../hooks/useProducts";
import {
  FaCheckCircle,
  FaShoppingCart,
  FaHeart,
  FaShare,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaStar,
  FaChevronRight,
  FaCheck
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import Spinner from "../../components/Loader/Spinner";
import { useState, useEffect } from "react";
import { useAddToCart } from "../../hooks/useCart";
import { toast } from "react-toastify";
import useCurrencyStore from "../../store/currencyStore";
import WishlistBtn from "../../components/wishlistBtn/WishlistBtn";

export default function SingleProduct() {
  const { slug } = useParams();
  const { mutate: addItemToCart, isPending } = useAddToCart();
  const { currency } = useCurrencyStore();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("features");

  const { data: product, isLoading, error } = useGetSingleProduct(slug);
  const handleShareClick = () => {
    const productUrl = window.location.href;
    navigator.clipboard.writeText(productUrl)
      .then(() => {
        console.log("Product link copied to clipboard!");
      })
      .catch(() => {
        console.log("Failed to copy link.");
      });
  };

  const handleAddToCart = () => {
    if (!selectedColor) return toast.error("Please select a color");
    addItemToCart({
      product_id: product.id,
      color_variant_id: selectedColor.id,
      quantity: quantity,
    });
  };

  useEffect(() => {
    if (product?.color_variants?.length > 0) {
      setSelectedColor(product.color_variants[0]);
    }
  }, [product]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0b0b0b] to-[#1a1a1a] flex items-center justify-center pt-[120px]">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0b0b0b] to-[#1a1a1a] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">Something went wrong</p>
          <Link to="/shop" className="text-[#FF1E1E] hover:text-white transition-colors">
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  const currentPrice = product.prices?.find(p => p.currency === currency) || product.prices?.[0];
  const images = selectedColor?.media_files?.length > 0
    ? selectedColor.media_files
    : [{ url: selectedColor?.thumbnail_url }];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0b0b] to-[#1a1a1a] pt-[120px] pb-12">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-20 w-96 h-96 bg-[#FF1E1E]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-72 h-72 bg-[#FF1E1E]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <FaChevronRight className="text-xs" />
          <Link to="/shop" className="hover:text-white transition-colors">Shop</Link>
          <FaChevronRight className="text-xs" />
          <Link to={`/singleCategory/${product.category.slug}`} className="hover:text-white transition-colors">
            {product.category.localized_name}
          </Link>
          <FaChevronRight className="text-xs" />
          <span className="text-[#FF1E1E]">{product.localized_name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8 h-[500px] flex items-center justify-center overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF1E1E]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src={images[selectedImage]?.url || selectedColor?.thumbnail_url}
                alt={product.localized_name}
                className="max-w-full max-h-full object-contain transform transition-transform duration-700 group-hover:scale-110"
              />

              {/* Zoom Hint */}
              <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                Hover to zoom
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`
                      flex-shrink-0 w-20 h-20 bg-white/5 border-2 rounded-xl overflow-hidden transition-all duration-300
                      ${selectedImage === index
                        ? 'border-[#FF1E1E] scale-105'
                        : 'border-white/10 hover:border-white/30'
                      }
                    `}
                  >
                    <img
                      src={img.url}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title & Category */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-[#FF1E1E]/20 border border-[#FF1E1E]/30 rounded-full text-[#FF1E1E] text-xs font-semibold">
                  {product.category.localized_name}
                </span>
                {product.is_in_stock && product.total_stock < 5 && (
                  <span className="px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full text-orange-400 text-xs font-semibold">
                    Only {product.total_stock} left!
                  </span>
                )}
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                {product.localized_name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={`${i < 4 ? 'text-yellow-500' : 'text-gray-600'} text-sm`} />
                  ))}
                </div>
                <span className="text-gray-400 text-sm">4.5 (127 reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-end gap-4">
              <p className="text-4xl font-bold text-[#FF1E1E]">
                {currentPrice?.formatted || `${currentPrice?.symbol}${currentPrice?.amount}`}
              </p>
              {Math.random() > 0.5 && (
                <p className="text-xl text-gray-500 line-through">
                  {currentPrice?.symbol}{(parseFloat(currentPrice?.amount) * 1.3).toFixed(2)}
                </p>
              )}
            </div>

            {/* Color Selection */}
            {product.color_variants?.length > 0 && (
              <div>
                <h3 className="text-white font-semibold mb-3">Color: {selectedColor?.localized_color_name}</h3>
                <div className="flex gap-3">
                  {product.color_variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedColor(variant)}
                      className={`
                        relative w-12 h-12 rounded-full border-2 transition-all duration-300
                        ${selectedColor?.id === variant.id
                          ? 'border-[#FF1E1E] scale-110 shadow-lg shadow-[#FF1E1E]/30'
                          : 'border-white/20 hover:border-white/40'
                        }
                        ${!variant.is_available ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                      `}
                      style={{ backgroundColor: variant.hex_code }}
                      title={variant.localized_color_name}
                      disabled={!variant.is_available}
                    >
                      {selectedColor?.id === variant.id && (
                        <FaCheck className="absolute inset-0 m-auto text-white text-xs drop-shadow-lg" />
                      )}
                      {!variant.is_available && (
                        <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">X</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {selectedColor?.stock_quantity > 0 ? (
                <span className="text-green-400 flex items-center gap-2">
                  <FaCheckCircle /> In Stock ({selectedColor.stock_quantity} available)
                </span>
              ) : (
                <span className="text-red-400">Out of Stock</span>
              )}
            </div>

            {/* Quantity & Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center gap-3">
                <span className="text-gray-400">Quantity:</span>
                <div className="flex items-center bg-white/10 rounded-full">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-white/20 rounded-l-full transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-white font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(selectedColor?.stock_quantity || 10, quantity + 1))}
                    className="px-4 py-2 hover:bg-white/20 rounded-r-full transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedColor || isPending || selectedColor?.stock_quantity === 0}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-[#FF1E1E] hover:bg-[#ff3333] disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FF1E1E]/30"
                >
                  {isPending ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <FaShoppingCart />
                      {selectedColor?.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </>
                  )}
                </button>

                <WishlistBtn product={product} className="w-12 h-12" />

                <button
                  onClick={handleShareClick}
                  className="w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300"
                >
                  <FaShare />
                </button>

              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-white/10">
              <div className="text-center">
                <FaTruck className="text-[#FF1E1E] text-2xl mx-auto mb-2" />
                <p className="text-sm text-gray-400">Free Shipping</p>
              </div>
              <div className="text-center">
                <FaShieldAlt className="text-[#FF1E1E] text-2xl mx-auto mb-2" />
                <p className="text-sm text-gray-400">2 Year Warranty</p>
              </div>
              <div className="text-center">
                <FaUndo className="text-[#FF1E1E] text-2xl mx-auto mb-2" />
                <p className="text-sm text-gray-400">30 Day Returns</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-white font-semibold mb-3">Description</h3>
              <p className="text-gray-300 leading-relaxed">
                {product.localized_description || product.short_description}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          {/* Tab Headers */}
          <div className="flex flex-wrap gap-4 border-b border-white/10">
            {["features", "specifications", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  px-6 py-3 font-semibold capitalize transition-all duration-300
                  ${activeTab === tab
                    ? 'text-[#FF1E1E] border-b-2 border-[#FF1E1E]'
                    : 'text-gray-400 hover:text-white'
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="py-8">
            {activeTab === "features" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.features?.map((feature, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                    <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <HiSparkles className="text-[#FF1E1E]" />
                      {feature.localized_title}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {feature.localized_description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                {Object.entries(product.specifications || {}).map(([category, specs]) => (
                  <div key={category} className="mb-6 last:mb-0">
                    <h4 className="text-white font-semibold mb-4">{category}</h4>
                    <div className="space-y-3">
                      {specs.map((spec) => (
                        <div key={spec.id} className="flex justify-between py-2 border-b border-white/10 last:border-0">
                          <span className="text-gray-400">{spec.localized_name}</span>
                          <span className="text-white font-medium">{spec.display_value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="text-center py-12">
                <p className="text-gray-400">No reviews yet. Be the first to review this product!</p>
                <button className="mt-4 px-6 py-2 bg-[#FF1E1E] hover:bg-[#ff3333] text-white rounded-full transition-all duration-300">
                  Write a Review
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}