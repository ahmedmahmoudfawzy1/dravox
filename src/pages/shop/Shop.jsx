import { useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import Spinner from "../../components/Loader/Spinner";
import ProductCard from "../../components/productCard/ProductCard";
import ShopFilters from "../../components/shopFilters/ShopFilters";

export default function Shop() {
  const [filters, setFilters] = useState({ currency: "USD" });
  const { data, isLoading } = useProducts(filters);

  return (
    <section className="pt-[100px]">
      <div className="container">
        <div className="grid grid-cols-12 gap-4">
          <ShopFilters onFilterChange={(f) => setFilters({ ...filters, ...f })} />
          <div className="col-span-12 lg:col-span-9">
            {isLoading ? <Spinner /> : <ProductCard data={data} />}
          </div>
        </div>
      </div>
    </section>
  );
}
