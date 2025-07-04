import { useParams } from "react-router-dom";
import { useGetSingleProduct } from "../../hooks/useProducts";
import { FaCheckCircle, FaShoppingCart } from "react-icons/fa";
import Spinner from "../../components/Loader/Spinner";
import { useState, useEffect } from "react";
import { useAddToCart } from "../../hooks/useCart";
import { toast } from "react-toastify";
import useCurrencyStore from "../../store/currencyStore";

export default function SingleProduct() {
  const { slug } = useParams();
  const { mutate: addItemToCart, isPending } = useAddToCart();
  const { currency } = useCurrencyStore();
  const [selectedColor, setSelectedColor] = useState(null);

  const { data: product, isLoading, error } = useGetSingleProduct(slug);
  console.log(product)

  const handleAddToCart = () => {
    if (!selectedColor) return toast.error("Please select a color");
    addItemToCart({
      product_id: product.id,
      color_variant_id: selectedColor.id,
      quantity: 1,
    });
  };

  useEffect(() => {
    if (product?.color_variants?.length > 0) {
      setSelectedColor(product.color_variants[0]);
    }
  }, [product]);

  if (isLoading)
    return (
      <div className="pt-[100px] height-[100vh]">
        <Spinner />
      </div>
    );

  if (error)
    return <p className="text-center text-red-500">Something went wrong</p>;

  return (
    <div className="pt-[130px] text-white bg-[#2f2d2d] font-Inter">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex items-center justify-center bg-secondary-color rounded-2xl p-4">
          <img
            src={selectedColor?.thumbnail_url}
            alt={product.localized_name}
            className="max-w-full max-h-[400px] rounded-xl"
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-color">
            {product.localized_name}
          </h1>
          <p className="text-lg text-dark-gray">
            {product.localized_description || product.short_description}
          </p>

          <div>
            {product.prices
              .filter((price) => price.currency === currency)
              .map((price, i) => (
                <p key={i} className="text-xl">
                  <span className="font-semibold">{price.symbol}</span>
                  {price.amount}
                </p>
              ))}
          </div>

          <p className="text-sm">
            {product.is_in_stock ? (
              <span className="text-green-400 flex items-center gap-1">
                <FaCheckCircle /> In Stock ({product.total_stock})
              </span>
            ) : (
              <span className="text-red-400">Out of Stock</span>
            )}
          </p>

          {product.color_variants?.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Available Colors:</h2>
              <div className="flex gap-2">
                {product.color_variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedColor(variant)}
                    className={`w-4 h-4 rounded-full border-2 ${
                      selectedColor?.id === variant.id
                        ? "border-white scale-110"
                        : "border-gray-500"
                    } transition-all`}
                    style={{ backgroundColor: variant.hex_code }}
                    title={variant.localized_color_name}
                  ></button>
                ))}
              </div>
            </div>
          )}

          <div className="pt-6 flex justify-start">
            {product.is_in_stock === false ? (
              <button disabled className="flex items-center gap-2  hover:bg-transparent border border-primary-color hover:border-white transition-all duration-300 text-white px-6 py-2 rounded-lg font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                Out Of stock
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                disabled={!selectedColor || isPending}
                className="flex items-center gap-2 bg-primary-color hover:bg-transparent border border-primary-color hover:border-white transition-all duration-300 text-white px-6 py-2 rounded-lg font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <Spinner />
                ) : (
                  <>
                    <FaShoppingCart />
                    Add to Cart
                  </>
                )}
              </button>
            )}
          </div>

          <div className="pt-4">
            <p className="text-sm text-gray-400">
              Category:
              <span className="text-white font-medium">
                {product.category.localized_name}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
