import { useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import Spinner from "../../components/Loader/Spinner";
import ProductCard from "../../components/productCard/ProductCard";
import ShopFilters from "../../components/shopFilters/ShopFilters";
import { FaFilter, FaTimes, FaSearch } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

export default function Shop() {
  const [filters, setFilters] = useState({ currency: "USD" });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading } = useProducts(filters);

  const filteredProductsCount = data?.length || 0;

  console.log(filters, "filters");

  return (
    <section className="pt-[120px] pb-12 min-h-screen bg-gradient-to-b from-[#0b0b0b] to-[#1a1a1a]">
      <div className="container mx-auto px-4">
        {/* Shop Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <HiSparkles className="text-[#FF1E1E]" />
                Premium Gaming Gear
              </h1>
              <p className="text-gray-400">
                Discover our collection of high-performance peripherals
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search for keyboards, mice..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3 pl-12 bg-white/10 border border-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-[#FF1E1E] focus:bg-white/15 transition-all duration-300"
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Results Count & Mobile Filter Toggle */}
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-400">
              Showing <span className="text-[#FF1E1E] font-semibold">{filteredProductsCount}</span> products
            </p>

            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-[#FF1E1E]/20 border border-white/10 rounded-full text-white transition-all duration-300"
            >
              <FaFilter size={14} />
              <span className="text-sm font-medium">Filters</span>
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block col-span-3">
            <ShopFilters
              onFilterChange={(f) => setFilters({ ...filters, ...f })}
              searchQuery={searchQuery}
            />
          </div>

          {/* Products Grid */}
          <div className="col-span-12 lg:col-span-9">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <Spinner />
              </div>
            ) : (
              <div className="animate-fadeIn">
                <ProductCard data={data} searchQuery={searchQuery} filters={filters} />
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filters Modal */}
        <div
          className={`fixed inset-0 bg-black/60 z-50 transition-all duration-300 lg:hidden ${mobileFiltersOpen ? "visible opacity-100" : "invisible opacity-0"
            }`}
          onClick={() => setMobileFiltersOpen(false)}
        />

        <aside
          className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-[#0b0b0b] to-[#1a1a1a] z-50 transform transition-transform duration-300 shadow-2xl lg:hidden ${mobileFiltersOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Filters</h2>
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="w-10 h-10 bg-white/10 hover:bg-[#FF1E1E]/20 rounded-full flex items-center justify-center text-white transition-all"
            >
              <FaTimes />
            </button>
          </div>
          <div className="p-6">
            <ShopFilters
              onFilterChange={(f) => {
                setFilters({ ...filters, ...f });
                setMobileFiltersOpen(false);
              }}
              isMobile={true}
              searchQuery={searchQuery}
            />
          </div>
        </aside>
      </div>
    </section>
  );
}