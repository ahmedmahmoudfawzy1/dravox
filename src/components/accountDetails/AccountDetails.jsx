import { useEffect, useRef, useState } from "react";
import { FaCamera, FaEnvelope, FaPhone, FaLanguage, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import useAuthStore from "../../store/authStore";
import { useGetUserDetails } from "../../hooks/useUser";
import Spinner from "../Loader/Spinner";

export default function AccountDetails() {
  const { token } = useAuthStore();
  const { data: userDetails, isLoading, isError, error } = useGetUserDetails(token);

  const [avatar, setAvatar] = useState(null);
  const fileRef = useRef();

  useEffect(() => {
    if (userDetails?.avatar_url) {
      setAvatar(userDetails.avatar_url);
    }
  }, [userDetails]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";
    const [first, second] = name.split(" ");
    return `${first?.[0] || ""}${second?.[0] || ""}`.toUpperCase();
  };

  if (isLoading) return <Spinner />;
  if (isError) return <div>Error loading user data: {error.message}</div>;

  return (
    <div className="min-h-screen bg-[#1a1a1d] text-white p-6">

      <div className="relative w-full bg-gradient-to-br from-[#FF1E1E]/40 to-[#0B0B0B]/50 p-8 rounded-3xl mb-10 shadow-xl">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative w-32 h-32">
            {avatar ? (
              <img
                src={avatar}
                alt="avatar"
                className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-full h-full bg-[#2f2d2d] rounded-full flex items-center justify-center text-4xl font-bold border-4 border-white shadow-lg">
                {getInitials(`${userDetails?.first_name} ${userDetails?.last_name}`)}
              </div>
            )}
            <button
              onClick={() => fileRef.current.click()}
              className="absolute bottom-1 right-1 bg-primary-color p-2 rounded-full text-white hover:scale-110 transition"
            >
              <FaCamera />
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold">{userDetails.full_name}</h2>
            <p className="text-dark-gray">{userDetails.email}</p>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <InfoCard icon={<FaEnvelope />} label="Email" value={userDetails.email} />
        <InfoCard icon={<FaPhone />} label="Phone" value={userDetails.phone_number || "Not Provided"} />
        <InfoCard icon={<FaLanguage />} label="Language" value={userDetails.preferred_language?.toUpperCase()} />
        <InfoCard icon={<FaMapMarkerAlt />} label="Shipping Address" value={userDetails.default_shipping_address?.address_line1 || "Not Provided"} />
        <InfoCard icon={<FaUser />} label="Username" value={userDetails.username} />
        <InfoCard icon={<FaUser />} label="Registration Method" value={userDetails.registration_method} />
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="bg-[#2f2d2d] border border-[#444] rounded-2xl p-5 shadow-md hover:shadow-lg hover:border-primary-color transition duration-300 flex items-start gap-4">
      <div className="text-primary-color text-2xl mt-1">{icon}</div>
      <div>
        <p className="text-dark-gray text-sm">{label}</p>
        <p className="text-white font-medium">{value}</p>
      </div>
    </div>
  );
}
