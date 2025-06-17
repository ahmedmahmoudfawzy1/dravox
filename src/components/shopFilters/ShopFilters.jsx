// components/shopFilters/ShopFilters.jsx
import { useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import Select from "react-select";

const categories = [
  "Keyboard",
  "Mause",
  "Headphone",
  "HeadPhone Stand",
  "Case",
  "converters",
  "Fan RGB",
];

export default function ShopFilters() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const checkInp = useRef();
  //   console.log(checkInp.current.value);
  const priceOptions = [
    { value: "ltoh", label: "Low to High" },
    { value: "htol", label: "High to Low" },
  ];
  const [priceSort, setPriceSort] = useState("");
  const primaryColor = "#FF1E1E";

  const customStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? primaryColor : "#ccc",
      boxShadow: state.isFocused ? `0 0 0 1px ${primaryColor}` : "none",
      "&:hover": {
        borderColor: primaryColor,
      },
    }),
    option: (base, state) => {
      console.log(base);
      return {
        ...base,
        backgroundColor: state.isFocused ? "#ffe5e5" : "white",
        color: "#000",
        "&:hover": {
          backgroundColor: "#ffd6d6",
        },
      };
    },
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <aside className="hidden lg:grid col-span-12 lg:col-span-3  sticky top-24 self-start  p-4 rounded bg-main-color">
      <h2 className="text-lg font-semibold mb-2">Sort by Price</h2>
      <Select
        options={priceOptions}
        value={priceOptions.find((option) => option.value === priceSort)}
        onChange={(selectedOption) => setPriceSort(selectedOption.value)}
        placeholder="Price"
        className="mb-2 text-sm "
        classNamePrefix="react-select"
        styles={customStyles}
      />
      <h2 className="text-lg font-semibold ">Filter by Category</h2>
      <div className="flex flex-col gap-2 mb-6">
        {categories.map((cat) => (
          <label key={cat} className="flex items-center gap-2 cursor-pointer mt-4">
            <input
              type="checkbox"
              className="peer hidden"
              id="customCheckbox"
              checked={selectedCategories.includes(cat)}
              onChange={() => handleCategoryChange(cat)}
              ref={checkInp}
            />
            <div className="w-5 h-5 border-2 border-#A1A1A1 rounded-sm peer-checked:bg-primary-color peer-checked:border-white flex items-center justify-center transition">
              {selectedCategories.includes(cat) ? <FaCheck /> : null}
            </div>
            <span>{cat}</span>
          </label>
        ))}
      </div>
    </aside>
  );
}
