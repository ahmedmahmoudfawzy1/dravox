import { useState } from "react";
import { Link } from "react-router-dom";
import { FaFire, FaShoppingCart, FaEye } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import useCurrencyStore from "../../store/currencyStore";
import WishlistBtn from "../wishlistBtn/WishlistBtn";
import { toast } from "react-toastify";
import Spinner from "../Loader/Spinner";
import { useProducts } from "../../hooks/useProducts";

export default function TrendingProducts() {
    const [loadingProducts, setLoadingProducts] = useState({});
    const { currency } = useCurrencyStore();

    // Use the products hook with currency filter
    const { data: products, isLoading } = useProducts({ currency });

    // Get only the first 4 products for trending section
    const trendingProducts = products?.slice(0, 4) || [];

    const handleAddToCart = async (product) => {
        setLoadingProducts(prev => ({ ...prev, [product.id]: true }));
        try {
            // Add to cart logic here
           
        } catch (error) {
            // toast.error("Failed to add to cart");
        } finally {
            setLoadingProducts(prev => ({ ...prev, [product.id]: false }));
        }
    };

    return (
        <section className="py-4 bg-gradient-to-b from-[#1a1a1a] to-[#0b0b0b] relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FF1E1E]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#FF1E1E]/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px bg-gradient-to-r from-transparent via-[#FF1E1E] to-transparent w-12" />
                        <FaFire className="text-[#FF1E1E] text-3xl animate-pulse" />
                        <div className="h-px bg-gradient-to-r from-transparent via-[#FF1E1E] to-transparent w-12" />
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                        Trending Products
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Discover what's hot in gaming gear right now
                    </p>
                </div>

                {/* Products Grid */}
                {isLoading ? (
                    <div className="flex items-center justify-center h-64">
                        <Spinner />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product, index) => {
                            const isLoadingProduct = loadingProducts[product.id];

                            return (
                                <div
                                    key={product.id}
                                    className="group relative h-[380px] bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#FF1E1E]/20 hover:border-[#FF1E1E]/30 hover:scale-[1.02] animate-fadeIn"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    {/* Trending Badge */}
                                    <div className="absolute top-4 left-4 z-20">
                                        <span className="px-3 py-1 bg-gradient-to-r from-[#FF1E1E] to-[#ff4444] text-white text-xs font-bold rounded-full flex items-center gap-1">
                                            <FaFire size={10} />
                                            TRENDING
                                        </span>
                                    </div>

                                    {/* Wishlist Button */}
                                    <div className="absolute top-4 right-4 z-20">
                                        <WishlistBtn product={product} />
                                    </div>

                                    {/* Product Image Background */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] to-[#0b0b0b]">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                        <div className="h-full flex items-center justify-center p-6">
                                            <img
                                                src={product.primary_thumbnail}
                                                alt={product.name}
                                                className="max-h-[65%] max-w-[75%] object-contain transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                                            />
                                        </div>
                                    </div>

                                    {/* Content Overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-5 transform transition-all duration-500 translate-y-10 group-hover:translate-y-0">
                                        {/* Content Shadow Background */}
                                        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent -z-10" />

                                        {/* Product Info */}
                                        <div className="relative z-10">
                                            {/* Category */}
                                            <p className="text-[#FF1E1E] text-xs font-semibold uppercase tracking-wider mb-1 opacity-80">
                                                {product.category?.name || "Gaming Gear"}
                                            </p>

                                            <h3 className="text-white text-lg font-bold mb-1 line-clamp-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                                {product.name}
                                            </h3>

                                            <p className="text-gray-200 text-xs line-clamp-1 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                                                {product.short_description}
                                            </p>

                                            {/* Price */}
                                            <p className="text-[#FF1E1E] font-bold text-xl mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                                {product.price?.formatted || `$${product.base_price}`}
                                            </p>

                                            {/* Action Buttons */}
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                                                <Link
                                                    to={`/shop/${product.slug}`}
                                                    className="flex-1 px-3 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-[#FF1E1E]/50 text-white text-xs font-medium rounded-full flex items-center justify-center gap-1 transition-all duration-300"
                                                >
                                                    <FaEye size={12} />
                                                    View
                                                </Link>

                                                <button
                                                    onClick={() => handleAddToCart(product)}
                                                    disabled={isLoadingProduct || !product.is_in_stock}
                                                    className="flex-1 px-3 py-2 bg-[#FF1E1E] hover:bg-[#ff3333] disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-xs font-medium rounded-full transition-all duration-300 flex items-center justify-center gap-1"
                                                >
                                                    {isLoadingProduct ? (
                                                        <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    ) : (
                                                        <>
                                                            <FaShoppingCart size={12} />
                                                            Add
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            );
                        })}
                    </div>
                )}

                {/* View All Link */}
                {/* {trendingProducts.length > 0 && (
                    <div className="text-center mt-12">
                        <Link
                            to="/shop"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-[#FF1E1E] hover:bg-[#ff3333] text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FF1E1E]/30"
                        >
                            View All Products
                            <span className="text-xl">→</span>
                        </Link>
                    </div>
                )} */}
            </div>
        </section>
    );
}