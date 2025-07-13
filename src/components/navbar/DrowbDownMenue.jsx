import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { toast } from "react-toastify";
import { loginUser, logoutUser } from "../../api/auth";
import {
  FaUser,
  FaShoppingCart,
  FaHeart,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaBox,
  FaCog
} from "react-icons/fa";

const DropdownMenu = ({
  showDropdown,
  setShowDropdown,
  setShowLoginModal,
  setShowSignupModal,
  setMobileMenuOpen,
}) => {
  const { token, logout } = useAuthStore();

  const handleCloseMenu = () => {
    setShowDropdown(false);
    setMobileMenuOpen(false);
  };

  if (!showDropdown) return null;

  return (
    <div className="absolute right-0 mt-3 w-56 bg-gradient-to-br from-[#1a1a1a]/95 to-[#0b0b0b]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-50 animate-fadeIn">
      <div className="p-2">
        {token ? (
          <>
            {/* User Section Header */}
            <div className="px-3 py-2 mb-2 border-b border-white/10">
              <p className="text-xs text-gray-400 font-medium">My Account</p>
            </div>

            <Link
              to="/profile"
              className="flex items-center gap-3 px-3 py-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 group"
              onClick={handleCloseMenu}
            >
              <FaUser className="text-[#FF1E1E] group-hover:scale-110 transition-transform" size={16} />
              <span className="font-medium">Profile</span>
            </Link>

            <Link
              to="/orders"
              className="flex items-center gap-3 px-3 py-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 group"
              onClick={handleCloseMenu}
            >
              <FaBox className="text-[#FF1E1E] group-hover:scale-110 transition-transform" size={16} />
              <span className="font-medium">My Orders</span>
            </Link>

            <Link
              to="/cart"
              className="flex items-center gap-3 px-3 py-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 group"
              onClick={handleCloseMenu}
            >
              <FaShoppingCart className="text-[#FF1E1E] group-hover:scale-110 transition-transform" size={16} />
              <span className="font-medium">Shopping Cart</span>
              <span className="ml-auto bg-[#FF1E1E]/20 text-[#FF1E1E] text-xs px-2 py-0.5 rounded-full">3</span>
            </Link>

            <Link
              to="/wishlist"
              className="flex items-center gap-3 px-3 py-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 group"
              onClick={handleCloseMenu}
            >
              <FaHeart className="text-[#FF1E1E] group-hover:scale-110 transition-transform" size={16} />
              <span className="font-medium">Wishlist</span>
              <span className="ml-auto bg-[#FF1E1E]/20 text-[#FF1E1E] text-xs px-2 py-0.5 rounded-full">2</span>
            </Link>

            <Link
              to="/settings"
              className="flex items-center gap-3 px-3 py-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 group"
              onClick={handleCloseMenu}
            >
              <FaCog className="text-[#FF1E1E] group-hover:scale-110 transition-transform" size={16} />
              <span className="font-medium">Settings</span>
            </Link>

            {/* Divider */}
            <div className="my-2 border-t border-white/10"></div>

            <button
              onClick={async () => {
                await logoutUser();
                toast.success("Logged out successfully", {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                });
                handleCloseMenu();
              }}
              className="flex items-center gap-3 w-full px-3 py-2.5 text-gray-300 hover:text-white hover:bg-red-500/20 rounded-xl transition-all duration-200 group"
            >
              <FaSignOutAlt className="text-red-500 group-hover:scale-110 transition-transform" size={16} />
              <span className="font-medium">Logout</span>
            </button>
          </>
        ) : (
          <>
            {/* Welcome Section */}
            <div className="px-3 py-3 mb-2 text-center border-b border-white/10">
              <p className="text-sm text-gray-300">Welcome to Dravox</p>
              <p className="text-xs text-gray-500 mt-1">Sign in to your account</p>
            </div>

            <button
              className="flex items-center gap-3 w-full px-3 py-2.5 text-white bg-[#FF1E1E] hover:bg-[#ff3333] rounded-xl transition-all duration-200 group font-medium"
              onClick={() => {
                setShowLoginModal(true);
                handleCloseMenu();
              }}
            >
              <FaSignInAlt className="group-hover:scale-110 transition-transform" size={16} />
              <span>Sign In</span>
            </button>

            <button
              className="flex items-center gap-3 w-full px-3 py-2.5 mt-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 group border border-white/10"
              onClick={() => {
                setShowSignupModal(true);
                handleCloseMenu();
              }}
            >
              <FaUserPlus className="text-[#FF1E1E] group-hover:scale-110 transition-transform" size={16} />
              <span className="font-medium">Create Account</span>
            </button>

            {/* Guest Options */}
            <div className="mt-3 pt-3 border-t border-white/10">
              <Link
                to="/shop"
                className="flex items-center gap-3 px-3 py-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 group text-sm"
                onClick={handleCloseMenu}
              >
                <span className="text-[#FF1E1E]">→</span>
                <span>Continue Shopping</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DropdownMenu;