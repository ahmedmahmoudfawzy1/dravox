import Select from "react-select";
import { toast } from "react-toastify";
import { useState } from "react";

const customStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: "#1a1a1a",
    borderColor: "#FF1E1E",
    color: "#fff",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#D30000",
    },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#1a1a1a",
    color: "#fff",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#fff",
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    backgroundColor: isSelected ? "#FF1E1E" : isFocused ? "#D30000" : "#1a1a1a",
    color: "#fff",
    cursor: "pointer",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#FF1E1E",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};

export default function Settings() {
  const [language, setLanguage] = useState({ label: "English", value: "en" });
  const [currency, setCurrency] = useState({ label: "USD ($)", value: "usd" });

  const languageOptions = [
    { value: "en", label: "English" },
    { value: "ar", label: "العربية" },
  ];

  const currencyOptions = [
    { value: "usd", label: "USD ($)" },
    { value: "eur", label: "EUR (€)" },
    { value: "ils", label: "ILS (₪)" },
  ];

  const handleSave = () => {
    // TODO: Send to backend or context
    toast.success("Settings updated!");
  };

  return (
    <div className="text-white">
      <h2 className="text-2xl font-semibold mb-6">Settings</h2>
      <div className="mb-4">
        <label className="block mb-2 text-sm text-dark-gray">Currency</label>
        <Select
          styles={customStyles}
          options={currencyOptions}
          value={currency}
          onChange={setCurrency}
          placeholder="Select Currency"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm text-dark-gray">Language</label>
        <Select
          styles={customStyles}
          options={languageOptions}
          value={language}
          onChange={setLanguage}
          placeholder="Select Language"
        />
      </div>

      <button
        onClick={handleSave}
        className="bg-primary-color px-4 py-2 rounded text-white"
      >
        Save Changes
      </button>
    </div>
  );
}
