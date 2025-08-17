import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaBox,
  FaSignOutAlt,
  FaBell,
  FaGamepad,
  FaEdit,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendar,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { useState, useEffect } from "react";
import useAuthStore from "../../store/authStore";
import Orders from "../../components/orders/Orders";
import { useUserInfo } from "../../hooks/useUser";

export default function ProfilePage() {
  const { user, logout } = useAuthStore();

  const { data } = useUserInfo()

  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("orders");

  // useEffect(() => {
  //   if (location.pathname.includes("/profile/order/")) {
  //     setActiveTab(null);
  //   }
  // }, [location.pathname]);

  // const tabs = [
  //   {
  //     id: "orders",
  //     label: "My Orders",
  //     icon: <FaBox />,
  //     description: "Track your purchases",
  //     color: "from-green-500 to-emerald-500",
  //     badge: "3"
  //   },
  // ];

  const renderContent = () => {
    switch (activeTab) {
      case "orders":
        return <Orders />;
      default:
        return <Outlet />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0b0b] to-[#1a1a1a] pt-24">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-20 w-96 h-96 bg-[#FF1E1E]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 pb-8">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-6">
          <div className="flex flex-col lg:flex-row gap-8 lg:justify-around">
            {/* Left Section - Avatar and Basic Info */}
            <div className="flex  flex-col sm:flex-row items-center sm:items-start gap-6 lg:w-1/3">
              {/* Avatar */}
              <div className="relative group">
                <div className="w-32 h-32 bg-gradient-to-br from-[#FF1E1E] to-[#ff4444] rounded-full p-1">
                  <div className="w-full h-full bg-[#1a1a1a] rounded-full flex items-center justify-center overflow-hidden">
                    {data?.avatar_url ? (
                      <img src={data?.avatar_url} alt={data?.first_name} className="w-full h-full object-cover" />
                    ) : (
                      <FaUser className="text-5xl text-gray-400" />
                    )}
                  </div>
                </div>

              </div>


              <div className="text-center sm:text-left">
                <div className="flex  flex-col justify-center sm:justify-start gap-3 mb-2">
                  <h5 className="text-2xl lg:text-3xl font-bold text-white">
                    {data?.first_name} {data?.last_name}
                  </h5>
                  <Link to="/edit-profile">
                    <button className="w-[50%] main-btn px-1 py-2">
                      Edit Profile
                    </button>
                  </Link>
                </div>
                {/* <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#FF1E1E] to-[#ff4444] text-white text-xs font-bold rounded-full">
                  PRO GAMER
                </span> */}
                <div className="flex items-center gap-4 mt-4">
                  {/* <div className="flex items-center gap-2">
                    <FaBox className="text-green-500" />
                    <div>
                      <p className="text-xl font-bold text-white">47</p>
                      <p className="text-xs text-gray-400">Orders</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaGamepad className="text-purple-500" />
                    <div>
                      <p className="text-xl font-bold text-white">2023</p>
                      <p className="text-xs text-gray-400">Member</p>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>


            <div className="lg:w-1/3 space-y-4">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <FaEnvelope className="text-gray-500 w-4" />
                  <span className="text-sm">{data?.email || "user@example.com"}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <FaPhone className="text-gray-500 w-4" />
                  <span className="text-sm">{data?.phone_number || "+090000000"}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <FaMapMarkerAlt className="text-gray-500 w-4" />
                  <span className="text-sm">{user?.address || "123 Gaming Street, CA"}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <FaCalendar className="text-gray-500 w-4" />
                  <span className="text-sm">Joined {data?.date_joined}</span>
                </div>
              </div>
            </div>



          </div>
        </div>


        <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <FaBox className="text-[#FF1E1E]" />
              My Orders
            </h2>
            <span className="px-3 py-1 bg-[#FF1E1E]/20 text-[#FF1E1E] text-sm font-bold rounded-full">
              3 Active Orders
            </span>
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}