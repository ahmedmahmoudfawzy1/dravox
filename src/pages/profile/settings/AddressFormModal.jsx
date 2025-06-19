import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import useAuthStore from "../../../store/authStore";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../api/axionInstance";
import { toast } from "react-toastify";

export default function AddressFormModal({
  isOpen,
  onClose,
  editData,
  onSuccess,
}) {
  const { token } = useAuthStore();
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    address_line1: "",
    city: "",
    country: "",
    postal_code: "",
    label: "",
    address_type: "shipping",
    is_default: false,
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        ...editData,
        is_default: editData.is_default || false,
      });
    } else {
      setFormData((prev) => ({ ...prev, label: "Shipping Address" }));
    }
  }, [editData]);

  const mutation = useMutation({
    mutationFn: (payload) => {
      if (editData) {
        return axiosInstance.patch(
          `/account/addresses/${editData.id}/`,
          payload,
          {
            headers: { Authorization: `Token ${token}` },
          }
        );
      } else {
        return axiosInstance.post(`/account/addresses/`, payload, {
          headers: { Authorization: `Token ${token}` },
        });
      }
    },
    onSuccess: () => {
      toast.success(editData ? "Address updated!" : "Address added!");
      onSuccess();
    },
    onError: () => {
      toast.error("Something went wrong.");
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-[#2f2d2d] rounded-xl p-6 w-full max-w-md text-white relative">
        <h2 className="text-xl font-semibold mb-4">
          {editData ? "Edit Address" : "Add New Address"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-[#1a1a1a]"
          />
          <input
            type="text"
            name="phone_number"
            placeholder="Phone Number"
            value={formData.phone_number}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-[#1a1a1a]"
          />
          <input
            type="text"
            name="address_line1"
            placeholder="Address Line"
            value={formData.address_line1}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-[#1a1a1a]"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-[#1a1a1a]"
          />
          <input
            type="text"
            name="country"
            placeholder="Country (e.g., EG)"
            value={formData.country}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-[#1a1a1a]"
          />
          <input
            type="text"
            name="postal_code"
            placeholder="Postal Code"
            value={formData.postal_code}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-[#1a1a1a]"
          />
          <input
            type="text"
            name="label"
            placeholder="Label (e.g., Home, Work)"
            value={formData.label}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-[#1a1a1a]"
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_default"
              checked={formData.is_default}
              onChange={handleChange}
            />
            <label>Set as default</label>
          </div>

          <div className="flex gap-2 justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-primary-color hover:bg-opacity-90"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
