import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaUserCircle,
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaHeart,
  FaSearch,
  FaStore,
  FaHome,
  FaInfoCircle,
  FaEnvelope
} from "react-icons/fa";
import { HiShoppingBag } from "react-icons/hi";
import Select from "react-select";
import SignupModal from "../registerModal/RegisterModal";

import DropdownMenu from "./DrowbDownMenue";
import LoginModal from "../LoginModal";
import useModalStore from "../../store/modalStore";
import useCurrencyStore from "../../store/currencyStore";
import { useCurrencies } from "../../hooks/useProducts";
import { useConfig } from './../../hooks/useConfig';


const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: state.isFocused ? "#FF1E1E" : "rgba(255, 255, 255, 0.1)",
    borderWidth: "1px",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(255, 30, 30, 0.2)" : "none",
    "&:hover": {
      borderColor: "#FF1E1E",
      backgroundColor: "rgba(255, 30, 30, 0.1)",
    },
    color: "white",
    minWidth: 90,
    height: 40,
    minHeight: 40,
    borderRadius: "9999px",
    paddingLeft: "12px",
    paddingRight: "4px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "white",
    fontSize: "14px",
    fontWeight: "500",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "rgba(26, 26, 26, 0.98)",
    backdropFilter: "blur(10px)",
    color: "white",
    borderRadius: "20px",
    overflow: "hidden",
    marginTop: "8px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
  }),
  menuList: (provided) => ({
    ...provided,
    padding: "8px",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused
      ? "rgba(255, 30, 30, 0.2)"
      : state.isSelected
        ? "rgba(255, 30, 30, 0.3)"
        : "transparent",
    color: state.isFocused || state.isSelected ? "white" : "#e5e5e5",
    cursor: "pointer",
    padding: "10px 16px",
    borderRadius: "12px",
    margin: "2px 0",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "rgba(255, 30, 30, 0.2)",
      color: "white",
    },
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused ? "#FF1E1E" : "rgba(255, 255, 255, 0.6)",
    "&:hover": { color: "#FF1E1E" },
    padding: "4px",
    transition: "all 0.3s ease",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  placeholder: (provided) => ({
    ...provided,
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: "14px",
  }),
  input: (provided) => ({
    ...provided,
    color: "white",
  }),
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

  const navItems = [
    { path: "/", label: "Home", icon: <FaHome /> },
    { path: "/shop", label: "Shop", icon: <FaStore /> },
    { path: "/about", label: "About", icon: <FaInfoCircle /> },
    { path: "/contact", label: "Contact", icon: <FaEnvelope /> },
  ];
  const { data: config } = useConfig()
  // console.log(config)
  return (
    <>
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-7xl z-50">
        <div className="backdrop-blur-xl bg-gradient-to-r from-[#0b0b0b]/90 to-[#1a1a1a]/90 rounded-full shadow-2xl shadow-black/50 border border-white/10 px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link
            to={data?.site_url}
            className="flex items-center gap-2 text-[#FF1E1E] font-extrabold hover:scale-105 transition-all duration-300"
          >
            <div className="relative">
              {/* <HiShoppingBag size={28} className="text-[#FF1E1E]" /> */}
              <img src={config?.logo_url} alt="" className="w-[50px] h-[50px] object-contain" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#FF1E1E] rounded-full animate-pulse" />
            </div>
            <span className="text-xl hidden sm:block">{config?.site_name}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2 bg-black/30 rounded-full px-2 py-1 ms-[80px]">
            {navItems.map((item, i) => (
              <Link
                key={i}
                to={item.path}
                className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-[#FF1E1E]/20 px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium"
              >
                <span className="text-[#FF1E1E]/70">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Search Button - Hidden on mobile */}
            {/* <button className="hidden sm:flex w-10 h-10 bg-white/10 hover:bg-[#FF1E1E]/20 text-white rounded-full items-center justify-center transition-all duration-300 hover:scale-110">
              <FaSearch size={16} />
            </button> */}

            {/* Wishlist - Hidden on mobile */}
            <button className="hidden sm:flex relative w-10 h-10 bg-white/10 hover:bg-[#FF1E1E]/20 text-white rounded-full items-center justify-center transition-all duration-300 hover:scale-110">
              <Link to="/wishlist"> <FaHeart size={16} /></Link>
              {/* {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF1E1E] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )} */}
            </button>

            {/* Cart */}
            <button className="relative w-10 h-10 bg-white/10 hover:bg-[#FF1E1E]/20 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
              <Link to="/cart">
                <FaShoppingCart size={16} />
                {/* <span className="absolute -top-1 -right-1 bg-[#FF1E1E] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span> */}
              </Link>
            </button>

            {/* Currency Selector - Hidden on mobile */}
            <div className="hidden md:block w-28">
              <Select
                options={currencyOptions}
                value={selectedCurrency}
                onChange={(opt) => setCurrency(opt.value)}
                isSearchable={false}
                styles={customStyles}
              />
            </div>

            {/* User Menu */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-10 h-10 bg-gradient-to-br from-[#FF1E1E]/20 to-[#FF1E1E]/10 hover:from-[#FF1E1E]/30 hover:to-[#FF1E1E]/20 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-[#FF1E1E]/30"
                aria-label="User Menu"
              >
                <FaUserCircle size={20} />
              </button>
              <DropdownMenu
                showDropdown={showDropdown}
                setShowDropdown={setShowDropdown}
                setShowLoginModal={openLogin}
                setShowSignupModal={setShowSignupModal}
                setMobileMenuOpen={setMobileMenuOpen}
              />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="text-[#FF1E1E] lg:hidden w-10 h-10 bg-white/10 hover:bg-[#FF1E1E]/20 rounded-full flex items-center justify-center transition-all duration-300"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Mobile Menu"
            >
              <FaBars size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-60 z-40 transition-all duration-300 ${mobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
          }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-72 h-full bg-gradient-to-b from-[#0b0b0b] to-[#1a1a1a] z-50 transform transition-transform duration-300 shadow-2xl ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="p-6 flex justify-between items-center border-b border-white/10">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-[#FF1E1E] text-xl font-bold"
          >
            <HiShoppingBag size={24} />
            Dravox
          </Link>
          <button
            className="text-white w-10 h-10 bg-white/10 hover:bg-[#FF1E1E]/20 rounded-full flex items-center justify-center transition-all"
            onClick={() => setMobileMenuOpen(false)}
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex flex-col gap-2 px-4 py-6">
          {navItems.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 text-white hover:text-white hover:bg-[#FF1E1E]/20 px-4 py-3 rounded-full transition-all duration-300"
            >
              <span className="text-[#FF1E1E]">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile E-commerce Actions */}
        <div className="px-4 space-y-3">
          <button className="w-full flex items-center gap-3 bg-white/10 hover:bg-[#FF1E1E]/20 px-4 py-3 rounded-full transition-all">
            <FaSearch className="text-[#FF1E1E]" />
            <span className="text-white">Search Products</span>
          </button>

          <button className="w-full flex items-center justify-between bg-white/10 hover:bg-[#FF1E1E]/20 px-4 py-3 rounded-full transition-all">
            <Link to="/wishlist" className="w-full inline-block">
              <span className="flex items-center gap-3 ">
                <FaHeart className="text-[#FF1E1E] " />
                <span className="text-white">Wishlist</span>
              </span>
            </Link>
          </button>
        </div>

        {/* Currency Selector for Mobile */}
        <div className="px-4 mt-6">
          <p className="text-gray-400 text-sm mb-2">Currency</p>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-[#0b0b0b] to-[#1a1a1a] p-6 rounded-3xl shadow-2xl w-full max-w-sm text-white border border-white/10">
            <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>
            <LoginModal />
            <button
              onClick={closeLogin}
              className="mt-4 w-full text-sm text-gray-400 hover:text-white transition-colors"
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