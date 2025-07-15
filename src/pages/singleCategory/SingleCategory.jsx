import { useParams } from "react-router-dom";
import { useState } from "react";
import { useSingleCategorie } from "../../hooks/useCategories";
import { FaArrowLeft, FaFilter, FaShoppingCart, FaStar, FaCheck } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import WishlistBtn from "../../components/wishlistBtn/WishlistBtn";
import Spinner from "../../components/Loader/Spinner";

export default function SingleCategory() {
    const { slug } = useParams();
    const [selectedColorVariants, setSelectedColorVariants] = useState({});
    const [loadingProducts, setLoadingProducts] = useState({});
    const { data, isLoading, isError, error } = useSingleCategorie(slug);

    const handleColorSelect = (productId, colorId) => {
        setSelectedColorVariants(prev => ({
            ...prev,
            [productId]: colorId
        }));
    };

    const handleAddToCart = async (product) => {
        setLoadingProducts(prev => ({ ...prev, [product.id]: true }));
        try {
            // Add to cart logic here
            toast.success(`${product.name} added to cart!`, {
                position: "bottom-right",
                autoClose: 3000,
            });
        } catch (error) {
            toast.error("Failed to add to cart");
        } finally {
            setLoadingProducts(prev => ({ ...prev, [product.id]: false }));
        }
    };

    if (isLoading) return (
        <div className="min-h-screen bg-gradient-to-b from-[#0b0b0b] to-[#1a1a1a] flex items-center justify-center">
            <Spinner />
        </div>
    );

    if (isError) return (
        <div className="min-h-screen bg-gradient-to-b from-[#0b0b0b] to-[#1a1a1a] flex items-center justify-center">
            <div className="text-center">
                <p className="text-red-500 text-xl mb-4">Error: {error.message}</p>
                <Link to="/shop" className="text-[#FF1E1E] hover:text-white transition-colors">
                    Return to Shop
                </Link>
            </div>
        </div>
    );

    const products = data?.results || [];

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0b0b0b] to-[#1a1a1a] pt-[120px] pb-12">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-40 left-20 w-96 h-96 bg-[#FF1E1E]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-40 right-20 w-72 h-72 bg-[#FF1E1E]/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Category Section - Original Layout with Modern Styling */}
                <div className="max-w-6xl mx-auto mb-12">
                    <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl shadow-2xl p-8 md:p-12">
                        {/* Category Header */}
                        <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                            <div className="flex-1 space-y-4">
                                <h1 className="text-4xl md:text-5xl font-bold text-[#FF1E1E] tracking-tight">
                                    {data?.category.localized_name || data?.category.name}
                                </h1>
                                <p className="text-gray-300 text-lg">
                                    {data?.category.localized_description || data?.category.description}
                                </p>
                            </div>

                            <div className="flex-1">
                                <img
                                    src={data?.category.category_image}
                                    alt={data?.category.name}
                                    className="rounded-2xl  object-contain w-full h-72 md:h-96"
                                />
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="mt-10 border-t border-white/10" />

                        {/* Feature Cards */}
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                            <div className="p-4 bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl">
                                <h2 className="text-xl font-semibold text-white">Premium Quality</h2>
                                <p className="text-sm text-gray-400 mt-2">Top-tier gaming peripherals for professionals</p>
                            </div>
                            <div className="p-4 bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl">
                                <h2 className="text-xl font-semibold text-white">Fast Performance</h2>
                                <p className="text-sm text-gray-400 mt-2">Lightning-fast response times for competitive gaming</p>
                            </div>
                            <div className="p-4 bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl">
                                <h2 className="text-xl font-semibold text-white">Reliable Support</h2>
                                <p className="text-sm text-gray-400 mt-2">24/7 customer service and 2-year warranty</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Grid - Simplified */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => {
                        const isLoadingProduct = loadingProducts[product.id];
                        const price = product.prices?.find(p => p.currency === "USD") || product.prices?.[0];
                        const primaryImage = product.color_variants?.[0]?.thumbnail_url;

                        return (
                            <div
                                key={product.id}
                                className="group relative h-[400px] sm:h-[420px] lg:h-[450px] bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#FF1E1E]/20 hover:border-[#FF1E1E]/30 hover:scale-[1.02]"
                            >
                                {/* Stock Badge */}
                                {product.total_stock < 5 && product.is_in_stock && (
                                    <div className="absolute top-4 left-4 z-20">
                                        <span className="px-3 py-1 bg-[#FF1E1E] text-white text-xs font-bold rounded-full flex items-center gap-1">
                                            <HiSparkles size={12} />
                                            LIMITED
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
                                            src={primaryImage}
                                            alt={product.name}
                                            className="max-h-[70%] max-w-[80%] object-contain transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                                        />
                                    </div>
                                </div>

                                {/* Content Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-all duration-500 translate-y-12 group-hover:translate-y-0">
                                    {/* Content Shadow Background */}
                                    <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent -z-10" />

                                    {/* Product Info */}
                                    <div className="relative z-10">
                                        <h3 className="text-white text-xl font-bold mb-2 line-clamp-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                            {product.name}
                                        </h3>

                                        <p className="text-gray-200 text-sm line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                                            {product.short_description}
                                        </p>

                                        {/* Price and Actions */}
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-[#FF1E1E] font-bold text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                                        {price?.formatted || `${product.base_price}`}
                                                    </p>
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

                                                <button
                                                    onClick={() => handleAddToCart(product)}
                                                    disabled={isLoadingProduct || !product.is_in_stock}
                                                    className="flex-1 px-4 py-2.5 bg-[#FF1E1E] hover:bg-[#ff3333] disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm font-medium rounded-full transition-all duration-300 flex items-center justify-center gap-2"
                                                >
                                                    {isLoadingProduct ? (
                                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    ) : (
                                                        <>
                                                            <FaShoppingCart size={14} />
                                                            Add
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Empty State */}
                {products.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-xl mb-4">No products found in this category.</p>
                        <Link
                            to="/shop"
                            className="inline-flex items-center gap-2 text-[#FF1E1E] hover:text-white transition-colors"
                        >
                            <FaArrowLeft />
                            Back to Shop
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}