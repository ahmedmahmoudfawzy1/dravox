import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import Select from "react-select";
import SignupModal from "../registerModal/RegisterModal";
import useAuthStore from "../../store/authStore";
import Spinner from "../Loader/Spinner";
import DropdownMenu from "./DrowbDownMenue";
import LoginModal from "../LoginModal";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#1a1a1a",
    borderColor: state.isFocused ? "#ff1e1e" : "#1a1a1a",
    boxShadow: state.isFocused ? "0 0 0 1px #ff1e1e" : null,
    "&:hover": { borderColor: "#ff1e1e" },
    color: "white",
    minWidth: 90,
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "white",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#1a1a1a",
    color: "white",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#ff1e1e" : "#1a1a1a",
    color: state.isFocused ? "black" : "white",
    cursor: "pointer",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#ff1e1e",
    "&:hover": { color: "#af1e1e" },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};

const currencyOptions = [
  { value: "USD", label: "USD $" },
  { value: "EUR", label: "EUR €" },
  { value: "ILS", label: "ILS ₪" },
];

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [currency, setCurrency] = useState(currencyOptions[0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { token, user } = useAuthStore();

  useEffect(() => {
    if ((token, user)) {
    }
  }, [token]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <>
      <header className="bg-[#0b0b0b] text-white py-4 px-6 flex items-center justify-between   shadow-md shadow-primary-color fixed w-[100%] z-10">
        <div className="text-[#ff1e1e] text-2xl font-bold cursor-pointer select-none">
          <Link to="/">Dravox</Link>
        </div>

        <nav className="hidden md:flex space-x-8 text-sm font-medium">
          <Link
            to="/"
            className="hover:text-[#ff1e1e] transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/shop"
            className="hover:text-[#ff1e1e] transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            Shop
          </Link>
          <Link
            to="/about"
            className="hover:text-[#ff1e1e] transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-[#ff1e1e] transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center space-x-4 relative">
          <div className="w-28">
            <Select
              options={currencyOptions}
              value={currency}
              onChange={setCurrency}
              styles={customStyles}
              isSearchable={false}
              aria-label="Select Currency"
              className="text-red"
            />
          </div>

          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-10 h-10 bg-[#1a1a1a] flex items-center justify-center rounded-full focus:outline-none"
              aria-haspopup="true"
              aria-expanded={showDropdown}
              aria-label="User Profile Menu"
              type="button"
            >
              <FaUserCircle size={22} aria-hidden="true" />
            </button>
            <DropdownMenu
              showDropdown={showDropdown}
              setShowDropdown={setShowDropdown}
              setShowLoginModal={setShowLoginModal}
              setShowSignupModal={setShowSignupModal}
              setMobileMenuOpen={setMobileMenuOpen}
            />
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-[#0b0b0b] text-white px-6 py-4 space-y-4 shadow-md z-40 absolute top-full left-0 w-full">
          <Link
            to="/"
            className="block hover:text-[#ff1e1e] transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/shop"
            className="block hover:text-[#ff1e1e] transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            Shop
          </Link>
          <Link
            to="/about"
            className="block hover:text-[#ff1e1e] transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block hover:text-[#ff1e1e] transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </Link>
        </nav>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#0b0b0b] p-6 rounded-lg shadow-md w-80 text-white">
            <h2 className="text-lg font-bold mb-4">Login</h2>
            <LoginModal />
            <button
              onClick={() => setShowLoginModal(false)}
              className="mt-2 text-sm text-gray-400 hover:underline"
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
};

export default Navbar;
