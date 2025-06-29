import Slider from "../../components/slider/Slider";
import CategorySection from "../../components/category/CategorySection";
import CustomerReviews from "../../components/customerReviews/CustomerReviews";
import TrendingProducts from "../../components/trendingProducts/TrendingProducts";
import BestSellers from "../../components/bestSellers/BestSellers";

export default function Home() {
  return (
    <div className="pt-[80px]">
      <Slider />
      <CategorySection />
      <TrendingProducts />
      <BestSellers />
      <CustomerReviews />
    </div>
  );
}
