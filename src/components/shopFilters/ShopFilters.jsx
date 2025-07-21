import { useState, useEffect } from "react";
import { FaCheck, FaStar, FaKeyboard, FaMouse, FaHeadphones, FaDesktop, FaGamepad } from "react-icons/fa";
import { HiCurrencyDollar } from "react-icons/hi";
import Select from "react-select";
import { useCategories } from "../../hooks/useCategories";
import CheckBoxFilter from "./components/CheckBoxFilter";

export default function ShopFilters({ onFilterChange, isMobile, searchQuery }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceSort, setPriceSort] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedRating, setSelectedRating] = useState(0);

  const { data: categories } = useCategories();



  const categoryIcons = {
    "Keyboards": <FaKeyboard />,
    "Mice": <FaMouse />,
    "Headsets": <FaHeadphones />,
    "Monitors": <FaDesktop />,
    "Controllers": <FaGamepad />,
  };

  const priceOptions = [
    { value: "", label: "Default" },
    { value: "ltoh", label: "Price: Low to High" },
    { value: "htol", label: "Price: High to Low" },
    { value: "popular", label: "Most Popular" },
    { value: "newest", label: "Newest First" },
  ];

  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      borderColor: state.isFocused ? "#FF1E1E" : "rgba(255, 255, 255, 0.1)",
      borderRadius: "9999px",
      padding: "4px 8px",
      boxShadow: state.isFocused ? "0 0 0 3px rgba(255, 30, 30, 0.2)" : "none",
      "&:hover": {
        borderColor: "#FF1E1E",
        backgroundColor: "rgba(255, 30, 30, 0.1)",
      },
      transition: "all 0.3s ease",
    }),
    singleValue: (base) => ({
      ...base,
      color: "white",
      fontSize: "14px",
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
      backgroundColor: "rgba(26, 26, 26, 0.98)",
      backdropFilter: "blur(10px)",
      borderRadius: "16px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      marginTop: "8px",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "rgba(255, 30, 30, 0.2)" : "transparent",
      color: state.isFocused ? "white" : "#e5e5e5",
      padding: "12px 16px",
      borderRadius: "12px",
      margin: "2px 8px",
      cursor: "pointer",
      transition: "all 0.2s ease",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "rgba(255, 255, 255, 0.6)",
      "&:hover": { color: "#FF1E1E" },
    }),
    indicatorSeparator: () => ({ display: "none" }),
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };



  useEffect(() => {
    onFilterChange({
      categories: selectedCategories,
      priceSort,
      priceRange,
      rating: selectedRating,
    });
  }, [selectedCategories, priceSort, priceRange, selectedRating]);

  return (
    <aside className={`${!isMobile ? 'sticky top-28' : ''} space-y-6`}>
      {/* Sort Options */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <HiCurrencyDollar className="text-[#FF1E1E]" />
          Sort By
        </h3>
        <Select
          options={priceOptions}
          value={priceOptions.find((option) => option.value === priceSort)}
          onChange={(selectedOption) => setPriceSort(selectedOption.value)}
          placeholder="Select sorting..."
          styles={customStyles}
          isSearchable={false}
          menuPortalTarget={document.body}
          menuPosition="fixed"
        />
      </div>

      {/* Price Range */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
        <h3 className="text-white font-semibold mb-4">Price Range</h3>
        <div className="space-y-4">
          <input
            type="range"
            min="0"
            max="500"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full accent-[#FF1E1E]"
          />
          <div className="flex items-center justify-between text-sm">
            <span className="bg-white/10 px-3 py-1 rounded-full text-gray-300">
              ${priceRange[0]}
            </span>
            <span className="text-gray-400">to</span>
            <span className="bg-white/10 px-3 py-1 rounded-full text-gray-300">
              ${priceRange[1]}
            </span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
        <h3 className="text-white font-semibold mb-4">Categories</h3>
        <div className="space-y-2">
          {categories?.map((cat) => (
            <CheckBoxFilter
              key={cat.id}
              id={`cat-${cat.id}`}
              label={cat.name}
              icon={categoryIcons[cat.name]}
              checked={selectedCategories.includes(cat.id)}
              onChange={() => handleCategoryChange(cat.id)}
              count={cat.products_count || 0}
            />
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
        <h3 className="text-white font-semibold mb-4">Customer Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => setSelectedRating(rating === selectedRating ? 0 : rating)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 ${selectedRating === rating
                ? "bg-[#FF1E1E]/20 border border-[#FF1E1E]"
                : "bg-white/5 border border-transparent hover:bg-white/10"
                }`}
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`${i < rating ? "text-yellow-500" : "text-gray-600"
                      } text-sm`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-300">& Up</span>
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {(selectedCategories.length > 0 || selectedRating > 0 || priceSort) && (
        <button
          onClick={() => {
            setSelectedCategories([]);
            setSelectedRating(0);
            setPriceSort("");
            setPriceRange([0, 500]);
          }}
          className="w-full px-4 py-3 bg-[#FF1E1E]/10 hover:bg-[#FF1E1E]/20 border border-[#FF1E1E]/30 text-[#FF1E1E] rounded-full font-medium transition-all duration-300"
        >
          Clear All Filters
        </button>
      )}
    </aside>
  );
}
