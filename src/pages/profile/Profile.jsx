import { Outlet, useLocation } from "react-router-dom";
import {
  FaUser,
  FaShoppingCart,
  FaHeart,
  FaCog,
  FaBox,
  FaSignOutAlt,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import useAuthStore from "../../store/authStore";
import Orders from "../../components/orders/Orders";
import Cart from "../../components/cart/Cart";
import Wishlist from "../../components/wishlist/Wishlist";
import AccountDetails from "../../components/accountDetails/AccountDetails";
import Settings from "./settings/Settings";

export default function ProfilePage() {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("orders");

  useEffect(() => {
    if (location.pathname.includes("/profile/order/")) {
      setActiveTab(null);
    }
  }, [location.pathname]);

  const tabs = [
    { id: "account", label: "Account", icon: <FaUser /> },
    { id: "orders", label: "Orders", icon: <FaBox /> },
    { id: "cart", label: "Cart", icon: <FaShoppingCart /> },
    { id: "wishlist", label: "Wishlist", icon: <FaHeart /> },
    { id: "settings", label: "Settings", icon: <FaCog /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "orders":
        return <Orders />;
      case "cart":
        return <Cart />;
      case "wishlist":
        return <Wishlist />;
      case "account":
        return <AccountDetails />;
      case "settings":
        return <Settings />;
      default:
        return <Outlet />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen pt-[75px] overflow-hidden">
      {/* Sidebar */}
      <aside className="fixed top-[75px] left-0 w-full md:w-[250px] bg-secondary-color text-white p-2 md:p-6 shadow-md z-50 flex md:flex-col items-center md:items-start gap-4 overflow-x-auto md:overflow-y-auto md:h-[calc(100vh-75px)]">
        <div className="hidden md:block mb-6">
          <h2 className="text-lg font-semibold">
            Welcome back,
            <br />
            <span className="text-primary-color text-xl">
              {user?.first_name}
            </span>
          </h2>
        </div>

        <ul className="flex md:flex-col gap-4 w-full justify-around md:justify-start text-sm">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`cursor-pointer flex items-center md:gap-2 justify-center md:justify-start py-2 px-3 rounded-md transition w-full md:w-auto ${
                activeTab === tab.id
                  ? "bg-primary-color text-white"
                  : "text-dark-gray hover:text-white hover:bg-[#1a1a1a]"
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="hidden md:inline">{tab.label}</span>
            </li>
          ))}

          <li
            onClick={logout}
            className="cursor-pointer flex items-center justify-center md:justify-start gap-2 py-2 px-3 rounded-md text-dark-gray hover:text-red-500 w-full md:w-auto"
          >
            <FaSignOutAlt />
            <span className="hidden md:inline">Logout</span>
          </li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="mt-[125px] md:mt-0 md:ml-[250px] flex-1 h-[calc(100vh-75px)] overflow-y-auto p-4">
        {renderContent()}
      </main>
    </div>
  );
}
