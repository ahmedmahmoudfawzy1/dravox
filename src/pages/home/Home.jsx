import Slider from "../../components/slider/Slider";
import CategorySection from "../../components/category/CategorySection";
import CustomerReviews from "../../components/customerReviews/CustomerReviews";

export default function Home() {
  return (
    <div className="pt-[80px]">
      <Slider />
      <CategorySection />
      <CustomerReviews />
    </div>
  );
}
