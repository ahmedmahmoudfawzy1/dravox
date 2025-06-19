import { useState, useEffect } from "react";
import Select from "react-select";
import AddressList from "./AddressList";
import useAuthStore from "../../../store/authStore";
import useCurrencyStore from "../../../store/currencyStore";
import { useGetCurrency, useUpdateCurrency } from "../../../hooks/useCurrency";

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
  const [activeTab, setActiveTab] = useState("general");
  const [language, setLanguage] = useState({ label: "English", value: "en" });

  const { token } = useAuthStore();
  const { currency, setCurrency } = useCurrencyStore();
  const { data: currencies } = useGetCurrency(token);
  const updateCurrencyMutation = useUpdateCurrency(token);

  const currencyOptions =
    currencies?.map((c) => ({
      value: c.code,
      label: `${c.code} (${c.symbol})`,
    })) || [];

  const selectedCurrencyOption = currencyOptions.find(
    (opt) => opt.value === currency
  );

  const handleCurrencyChange = (selectedOption) => {
    setCurrency(selectedOption.value);
    updateCurrencyMutation.mutate(selectedOption.value);
  };

  return (
    <div className="text-white">
      <h2 className="text-2xl font-semibold mb-6">Settings</h2>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("general")}
          className={`px-4 py-2 rounded ${
            activeTab === "general"
              ? "bg-primary-color text-white"
              : "bg-[#1a1a1a] text-gray-400"
          }`}
        >
          General
        </button>
        <button
          onClick={() => setActiveTab("addresses")}
          className={`px-4 py-2 rounded ${
            activeTab === "addresses"
              ? "bg-primary-color text-white"
              : "bg-[#1a1a1a] text-gray-400"
          }`}
        >
          Addresses
        </button>
      </div>

      {activeTab === "general" && (
        <>
          <div className="mb-4">
            <label className="block mb-2 text-sm text-dark-gray">
              Currency
            </label>
            <Select
              styles={customStyles}
              options={currencyOptions}
              value={selectedCurrencyOption}
              onChange={handleCurrencyChange}
              placeholder="Select Currency"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm text-dark-gray">
              Language
            </label>
            <Select
              styles={customStyles}
              options={[
                { value: "en", label: "English" },
                { value: "ar", label: "العربية" },
              ]}
              value={language}
              onChange={setLanguage}
              placeholder="Select Language"
            />
          </div>
        </>
      )}

      {activeTab === "addresses" && <AddressList />}
    </div>
  );
}
