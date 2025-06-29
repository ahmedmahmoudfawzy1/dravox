import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import Select from "react-select";
import SignupModal from "../registerModal/RegisterModal";
import useAuthStore from "../../store/authStore";
import DropdownMenu from "./DrowbDownMenue";
import LoginModal from "../LoginModal";
import useModalStore from "../../store/modalStore";
import useCurrencyStore from "../../store/currencyStore";
import { useCurrencies } from "../../hooks/useProducts";
// import { useCurrencies } from "../../hooks/useProducts";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#1a1a1a",
    borderColor: state.isFocused ? "#FF1E1E" : "#1a1a1a",
    boxShadow: state.isFocused ? "0 0 0 1px #FF1E1E" : null,
    "&:hover": { borderColor: "#FF1E1E" },
    color: "white",
    minWidth: 90,
  }),
  singleValue: (provided) => ({ ...provided, color: "white" }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#1a1a1a",
    color: "white",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#FF1E1E" : "#1a1a1a",
    color: state.isFocused ? "black" : "white",
    cursor: "pointer",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#FF1E1E",
    "&:hover": { color: "#c60000" },
  }),
  indicatorSeparator: () => ({ display: "none" }),
};






export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data } = useCurrencies();
  const { currency, setCurrency } = useCurrencyStore();
  const { isLoginOpen, openLogin, closeLogin } = useModalStore();

  const dropdownRef = useRef(null);


  const currencyOptions =
    data?.results?.map((cur) => ({
      value: cur.code,
      label: `${cur.code} ${cur.symbol}`,
    })) || [];

  const selectedCurrency = currencyOptions.find((c) => c.value === currency);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur bg-gradient-to-r from-[#0b0b0b]/80 to-[#1a1a1a]/80 shadow shadow-[#FF1E1E]/40 px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-[#FF1E1E] text-2xl font-extrabold hover:scale-110 transition-transform duration-300"
        >
          <svg width="24" height="24" fill="currentColor" className="text-[#FF1E1E]">
            <path d="M12 2L2 7l10 5 10-5-10-5zm0 7l-10 5 10 5 10-5-10-5z" />
          </svg>
          Dravox
        </Link>

        <nav className="hidden md:flex items-center gap-10 text-sm font-medium tracking-wide">
          {["/", "/shop", "/about", "/contact"].map((path, i) => (
            <Link
              key={i}
              to={path}
              className="text-gray-300 hover:text-[#FF1E1E] transition duration-300 relative group"
            >
              {path === "/" ? "Home" : path.replace("/", "")}
              <span className="block h-0.5 bg-[#FF1E1E] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <div className="hidden md:block w-28">
            <Select
              options={currencyOptions}
              value={selectedCurrency}
              onChange={(opt) => setCurrency(opt.value)}
              isSearchable={false}
              styles={customStyles}
            />
          </div>

          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-10 h-10 bg-[#1f1f1f] border border-[#2c2c2c] hover:border-[#FF1E1E] text-white rounded-full flex items-center justify-center transition"
              aria-label="User Menu"
            >
              <FaUserCircle size={22} />
            </button>
            <DropdownMenu
              showDropdown={showDropdown}
              setShowDropdown={setShowDropdown}
              setShowLoginModal={openLogin}
              setShowSignupModal={setShowSignupModal}
              setMobileMenuOpen={setMobileMenuOpen}
            />
          </div>

          <button
            className="text-[#FF1E1E] md:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Mobile Menu"
          >
            <FaBars size={22} />
          </button>
        </div>
      </header>


      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-60 z-40 transition-all duration-300 ${mobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"}`}
        onClick={() => setMobileMenuOpen(false)}
      />
      <aside
        className={`fixed top-0 left-0 w-64 h-full bg-[#0b0b0b] z-50 transform transition-transform duration-300 shadow-lg ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 flex justify-between items-center border-b border-[#222]">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-[#FF1E1E] text-xl font-bold">
            Dravox
          </Link>
          <button className="text-white" onClick={() => setMobileMenuOpen(false)}>
            <FaTimes size={20} />
          </button>
        </div>
        <nav className="flex flex-col gap-4 px-6 py-4">
          {["/", "/shop", "/about", "/contact"].map((path, i) => (
            <Link
              key={i}
              to={path}
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-[#FF1E1E] transition"
            >
              {path === "/" ? "Home" : path.replace("/", "")}
            </Link>
          ))}
        </nav>
        <div className="px-6 mt-6">
          <Select
            options={currencyOptions}
            value={selectedCurrency}
            onChange={(opt) => setCurrency(opt.value)}
            isSearchable={false}
            styles={customStyles}
          />
        </div>
      </aside>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-[#0b0b0b] p-6 rounded-lg shadow-lg w-80 text-white">
            <h2 className="text-lg font-bold mb-4">Login</h2>
            <LoginModal />
            <button
              onClick={closeLogin}
              className="mt-3 text-sm text-gray-400 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignupModal && (
        <SignupModal
          showSignupModal={showSignupModal}
          setShowSignupModal={setShowSignupModal}
        />
      )}
    </>
  );
}
