import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { toast } from "react-toastify";
import { loginUser, logoutUser } from "../../api/auth";

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

  return (
    showDropdown && (
      <div className="absolute right-0 mt-2 w-40 bg-[#1a1a1a] border border-[#ff1e1e] rounded shadow-lg z-50">
        {token ? (
          <>
            <Link
              to="/profile"
              className="block px-4 py-2 hover:bg-[#ff1e1e] hover:text-black"
              onClick={handleCloseMenu}
            >
              My Account
            </Link>
            <Link
              to="/cart"
              className="block px-4 py-2 hover:bg-[#ff1e1e] hover:text-black"
              onClick={handleCloseMenu}
            >
              Cart
            </Link>
            <Link
              to="/wishlist"
              className="block px-4 py-2 hover:bg-[#ff1e1e] hover:text-black"
              onClick={handleCloseMenu}
            >
              Wishlist
            </Link>
            <button
              onClick={async () => {
                await logoutUser();
                toast("Logout Successfully");
                handleCloseMenu();
              }}
              className="block w-full text-left px-4 py-2 hover:bg-red-600 hover:text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-[#ff1e1e] hover:text-black"
              onClick={() => {
                setShowLoginModal(true);
                handleCloseMenu();
              }}
            >
              Sign In
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-[#ff1e1e] hover:text-black"
              onClick={() => {
                setShowSignupModal(true);
                handleCloseMenu();
              }}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    )
  );
};

export default DropdownMenu;
