import { useCategories } from "../../hooks/useCategories";
import Spinner from "../Loader/Spinner";
import CategoryCard from "./CategoryCard";
import { HiSparkles } from "react-icons/hi";

export default function CategorySection() {
  const { data, isLoading, isError, refetch } = useCategories();

  return (
    <section className="py-2 bg-gradient-to-b from-[#1a1a1a] to-[#0b0b0b] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF1E1E]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#FF1E1E]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-[#FF1E1E] to-transparent w-12" />
            <HiSparkles className="text-[#FF1E1E] text-2xl" />
            <div className="h-px bg-gradient-to-r from-transparent via-[#FF1E1E] to-transparent w-12" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore our premium collection of gaming peripherals
          </p>
        </div>

        {/* Categories Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data?.map((cat) => (
              <CategoryCard
                key={cat.slug}
                category={cat}
              // avalibleProducts={couunt}
              />
            ))}
          </div>
        )}

        {/* View All Link */}
        {/* {data?.length > 0 && (
          <div className="text-center mt-12">
            <a
              href="/categories"
              className="inline-flex items-center gap-2 text-[#FF1E1E] hover:text-white transition-colors duration-300 font-medium"
            >
              View All Categories
              <span className="text-xl">→</span>
            </a>
          </div>
        )} */}
      </div>
    </section>
  );
}