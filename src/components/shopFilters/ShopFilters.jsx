import { useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import Select from "react-select";

const categories = [
  "Keyboard",
  "Mouse",
  "Headphone",
  "Headphone Stand",
  "Case",
  "Converters",
  "Fan RGB",
];

export default function ShopFilters() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const checkInp = useRef();
  const [priceSort, setPriceSort] = useState("");

  const primaryColor = "#FF1E1E";

  const priceOptions = [
    { value: "ltoh", label: "Low to High" },
    { value: "htol", label: "High to Low" },
  ];

  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "#0b0b0b",
      borderColor: state.isFocused ? primaryColor : "#444",
      boxShadow: state.isFocused ? `0 0 0 1px ${primaryColor}` : "none",
      color: "white",
      transition: "all 0.3s ease",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#1a1a1a",
      color: "#fff",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#ff1e1e" : "#1a1a1a",
      color: state.isFocused ? "#000" : "#fff",
      transition: "background-color 0.2s ease",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#fff",
    }),
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <aside className="hidden lg:grid col-span-12 lg:col-span-3 sticky top-24 self-start p-6 rounded-2xl bg-[#1a1a1a] shadow-lg shadow-primary-color/10">
      {/* Price Sort */}
      <h2 className="text-xl font-bold mb-4 text-primary-color border-b border-gray-700 pb-2">
        Sort by Price
      </h2>
      <Select
        options={priceOptions}
        value={priceOptions.find((option) => option.value === priceSort)}
        onChange={(selectedOption) => setPriceSort(selectedOption.value)}
        placeholder="Choose..."
        className="mb-6 text-sm"
        styles={customStyles}
      />

      {/* Category Filters */}
      <h2 className="text-xl font-bold mb-4 text-primary-color border-b border-gray-700 pb-2">
        Filter by Category
      </h2>
      <div className="flex flex-col gap-4">
        {categories.map((cat) => (
          <label
            key={cat}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <input
              type="checkbox"
              className="peer hidden"
              checked={selectedCategories.includes(cat)}
              onChange={() => handleCategoryChange(cat)}
              ref={checkInp}
            />
            <div className="w-5 h-5 border-2 border-gray-500 rounded-sm flex items-center justify-center peer-checked:bg-primary-color peer-checked:border-primary-color transition-all duration-200 group-hover:border-white">
              {selectedCategories.includes(cat) && (
                <FaCheck size={12} className="text-white" />
              )}
            </div>
            <span className="text-sm text-gray-200 group-hover:text-white transition">
              {cat}
            </span>
          </label>
        ))}
      </div>
    </aside>
  );
}
