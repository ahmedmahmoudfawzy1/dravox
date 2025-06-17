import {
  FaUser,
  FaShoppingCart,
  FaHeart,
  FaCog,
  FaBox,
  FaSignOutAlt,
} from "react-icons/fa";
import { useState } from "react";
import useAuthStore from "../../store/authStore";
import Orders from "../../components/orders/Orders";
import Cart from "../../components/cart/Cart";
import Wishlist from "../../components/wishlist/Wishlist";
import AccountDetails from "../../components/accountDetails/AccountDetails";
import Settings from "./settings/Settings";

export default function ProfilePage() {
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState("orders");

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
        return <div>Account</div>;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen pt-[75px]">
      {/* Sidebar */}
      <aside className="w-full md:w-[250px] bg-secondary-color text-white p-4 md:p-6 shadow-md h-auto md:h-screen fixed md:static top-0 left-0 ">
        <div className="mb-8 hidden md:block">
          <h2 className="text-lg font-semibold">
            Welcome back,
            <br />
            <span className="text-primary-color text-xl">
              {user?.first_name}
            </span>
          </h2>
        </div>

        <ul className="flex md:flex-col gap-4 justify-around md:justify-start text-sm">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`cursor-pointer flex items-center gap-2 py-2 px-3 rounded-md transition ${
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
            className="cursor-pointer flex items-center gap-2 py-2 px-3 rounded-md  text-dark-gray hover:text-red-500"
          >
            <FaSignOutAlt />
            <span className="hidden md:inline">Logout</span>
          </li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="mt-[70px] md:mt-0  flex-1 p-4 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
}
