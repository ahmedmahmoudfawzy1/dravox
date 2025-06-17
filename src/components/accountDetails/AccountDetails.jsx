import { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import useAuthStore from "../../store/authStore";

export default function AccountDetails() {
  const { user } = useAuthStore();
  const [avatar, setAvatar] = useState(user?.avatar || null);
  const fileRef = useRef();

  const getInitials = (name) => {
    if (!name) return "U";
    const [first, second] = name.split(" ");
    return `${first?.[0] || ""}${second?.[0] || ""}`.toUpperCase();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  return (
    <div className="text-white">
      <h2 className="text-2xl font-semibold mb-6">Account Details</h2>
      <div className="flex items-center gap-4">
        <div className="relative">
          {avatar ? (
            <img
              src={avatar}
              alt="avatar"
              className="w-20 h-20 object-cover rounded-full border-2 border-primary-color"
            />
          ) : (
            <div className="w-20 h-20 bg-main-color rounded-full flex items-center justify-center text-xl font-bold">
              {getInitials(`${user?.first_name} ${user?.last_name}`)}
            </div>
          )}
          <button
            onClick={() => fileRef.current.click()}
            className="absolute bottom-0 right-0 bg-primary-color text-xs p-1 rounded-full"
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
          <p className="text-lg font-semibold">
            {user?.first_name} {user?.last_name}
          </p>
          <p className="text-dark-gray text-sm">{user?.email}</p>
        </div>
      </div>
    </div>
  );
}
