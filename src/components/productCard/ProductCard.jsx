import { Link, useParams } from "react-router-dom";
import { useAddToCart } from "../../hooks/useCart";
import { useProducts } from "../../hooks/useProducts";
import Spinner from "../Loader/Spinner";

import { FaShoppingCart } from "react-icons/fa";
import WishlistBtn from "../wishlistBtn/WishlistBtn";
import useAuthStore from "../../store/authStore";
import { useWishlistStore } from "../../store/wishlistStore";
import { useToggleWishlist } from "../../hooks/useWishlist";

export default function ProductCard({ product }) {
  const { slug } = useParams();
  const { data, isLoading: productsLoading } = useProducts();
  const { mutate: addItemToCart, isLoading } = useAddToCart();

  const { token } = useAuthStore();
  const { wishlist, addWishlistItem, removeWishlistItem } = useWishlistStore();
  const { mutate: toggleWishlist } = useToggleWishlist();

  if (isLoading) return <Spinner />;

  return (
    <div className="grid grid-cols-12 gap-6">
      {data?.map((product) => (
        <div
          key={product.slug}
          className="group col-span-12 sm:col-span-6 lg:col-span-4 bg-secondary-color rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-[1.02]"
        >
          <div className="relative h-[250px] bg-[#1a1a1a] flex items-center justify-center">
            <img
              src={product.primary_thumbnail}
              alt={product.name}
              className="max-h-[80%] max-w-[90%] object-contain transition-all duration-300 group-hover:scale-105"
            />

            <WishlistBtn product={product} />
          </div>

          <div className="p-4 flex flex-col justify-between h-[170px]">
            <div>
              <h2 className="text-white text-lg font-semibold mb-1 line-clamp-1">
                {product.name}
              </h2>
              <p className="text-dark-gray text-sm line-clamp-2 overflow-hidden whitespace-nowrap text-ellipsis">
                {product.short_description}
              </p>
              <p className="text-primary-color font-bold text-base my-2">
                {product.price.amount}
                <span className="text-sm">{product.price.currency}</span>
              </p>
            </div>

            <div className="mt-3 flex gap-4 items-center justify-between">
              <Link
                to={`/shop/${product.slug}`}
                className="border flex-1 rounded-md p-1 text-center hover:border-primary-color  transition-all duration-500"
              >
                Learn More
              </Link>
              <button
                onClick={() =>
                  addItemToCart({
                    product_id: product.id,
                    color_variant_id: 1,
                    quantity: 1,
                  })
                }
                className="bg-primary-color border transition-all duration-500 border-primary-color hover:bg-transparent hover:border-white text-white p-2 rounded-md"
              >
                <FaShoppingCart />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
