import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import Select from "react-select";
import SignupModal from "../registerModal/RegisterModal";
import useAuthStore from "../../store/authStore";
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
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
      <header className="bg-[#0b0b0b] text-white py-4 px-6 flex items-center justify-between shadow-md shadow-primary-color fixed w-full z-10">
        <div className="text-[#ff1e1e] text-2xl font-bold cursor-pointer select-none">
          <Link to="/">Dravox</Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 text-sm font-medium">
          {["/", "/shop", "/about", "/contact"].map((path, idx) => (
            <Link
              key={idx}
              to={path}
              className="hover:text-[#ff1e1e] transition"
            >
              {path === "/" ? "Home" : path.replace("/", "")}
            </Link>
          ))}
        </nav>

        {/* Icons & Select */}
        <div className="flex items-center space-x-4 relative">
          <div className="hidden md:block w-28">
            <Select
              options={currencyOptions}
              value={currency}
              onChange={setCurrency}
              styles={customStyles}
              isSearchable={false}
              aria-label="Select Currency"
            />
          </div>

          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-10 h-10 bg-[#1a1a1a] flex items-center justify-center rounded-full focus:outline-none"
              aria-label="User Profile Menu"
            >
              <FaUserCircle size={22} />
            </button>
            <DropdownMenu
              showDropdown={showDropdown}
              setShowDropdown={setShowDropdown}
              setShowLoginModal={setShowLoginModal}
              setShowSignupModal={setShowSignupModal}
              setMobileMenuOpen={setMobileMenuOpen}
            />
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden text-[#ff1e1e]"
          >
            <FaBars size={22} />
          </button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      <aside
        className={`fixed top-0 left-0 w-64 h-full bg-[#0b0b0b] shadow-lg transform z-50 transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="text-[#ff1e1e] text-xl font-bold">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              Dravox
            </Link>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-white"
          >
            <FaTimes size={20} />
          </button>
        </div>
        <nav className="flex flex-col space-y-4 px-6">
          {["/", "/shop", "/about", "/contact"].map((path, idx) => (
            <Link
              key={idx}
              to={path}
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:text-[#ff1e1e] transition"
            >
              {path === "/" ? "Home" : path.replace("/", "")}
            </Link>
          ))}
        </nav>
        <div className="px-6 mt-4">
          <Select
            options={currencyOptions}
            value={currency}
            onChange={setCurrency}
            styles={customStyles}
            isSearchable={false}
            aria-label="Select Currency"
          />
        </div>
      </aside>

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
