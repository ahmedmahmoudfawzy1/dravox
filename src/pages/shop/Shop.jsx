import Spinner from "../../components/Loader/Spinner";
import ProductCard from "../../components/productCard/ProductCard";
import ShopFilters from "../../components/shopFilters/ShopFilters";
import { useProducts } from "../../hooks/useProducts";

export default function Shop() {
  const { data, isLoading: productsLoading } = useProducts();

  return (
    <section className="pt-[100px]">
      <div className="container">
        <div className="grid grid-cols-12 gap-3">
          <ShopFilters />
          {productsLoading ? (
            <div className="">
              <Spinner />
            </div>
          ) : (
            <div className="col-span-12 lg:col-span-9  min-h-[400vh]">
              <ProductCard />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
