import { useState } from "react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { useGetAddresses, useDeleteAddress } from "../../../hooks/useAddress";
import useAuthStore from "../../../store/authStore";
import AddressFormModal from "./AddressFormModal";

import { toast } from "react-toastify";
import AlertModal from "../../../components/alertDialog/AlertModal";

export default function AddressList() {
  const { token } = useAuthStore();
  const { data: addressesData, refetch } = useGetAddresses(token);
  const addresses = addressesData?.data?.results || [];



  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const deleteMutation = useDeleteAddress(token);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleAskDelete = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteMutation.mutate(deleteId, {
      onSuccess: () => {
        toast.success("Address deleted successfully");
        refetch();
      },
      onError: (err) => {

        toast.error("Failed to delete address");
      },
    });
    setConfirmOpen(false);
  };

  const handleEdit = (address) => {
    setEditData(address);
    setIsModalOpen(true);
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">My Addresses</h3>
        <button
          onClick={() => {
            setEditData(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-primary-color text-white px-3 py-1 rounded"
        >
          <FaPlus /> Add New
        </button>
      </div>

      {addresses.length === 0 ? (
        <p className="text-gray-400">No addresses saved yet.</p>
      ) : (
        <div className="space-y-4">
          {addresses.map((address) => (
            <div
              key={address?.id}
              className="border border-gray-600 rounded-lg p-4 bg-[#2f2d2d]"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-primary-color">
                    {address.label}
                  </p>
                  <p className="text-sm">{address.full_name}</p>
                  <p className="text-sm">{address.phone_number}</p>
                  <p className="text-sm">{address.address_line1}</p>
                  <p className="text-sm">
                    {address.city}, {address.country}
                  </p>
                  <p className="text-sm">{address.postal_code}</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <button
                    onClick={() => handleEdit(address)}
                    className="text-yellow-400 hover:text-yellow-300"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleAskDelete(address?.id)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddressFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editData={editData}
        onSuccess={() => {
          setIsModalOpen(false);
          refetch();
        }}
      />

      <AlertModal
        open={confirmOpen}
        onClose={setConfirmOpen}
        onConfirm={handleConfirmDelete}
        title="Delete Address?"
        description="Are you sure you want to delete this address? This action cannot be undone."
      />
    </div>
  );
}
