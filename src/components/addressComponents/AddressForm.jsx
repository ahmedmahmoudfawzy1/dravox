import CountrySelect from "../AvailableCountries/AvailableCountries";

// components/addressComponents/AddressForm.jsx
export default function AddressForm({ formData, setFormData }) {
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="grid grid-cols-1 gap-4">
      <input
        name="full_name"
        required
        placeholder="Full Name"
        value={formData.full_name}
        onChange={handleChange}
        className="w-full p-3 rounded bg-[#2f2d2d] text-white placeholder-gray-400"
      />
      <input
        name="phone_number"
        required
        placeholder="Phone Number"
        value={formData.phone_number}
        onChange={handleChange}
        className="w-full p-3 rounded bg-[#2f2d2d] text-white placeholder-gray-400"
      />
      <input
        name="address_line1"
        required
        placeholder="Address Line 1"
        value={formData.address_line1}
        onChange={handleChange}
        className="w-full p-3 rounded bg-[#2f2d2d] text-white placeholder-gray-400"
      />
      <input
        name="city"
        required
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        className="w-full p-3 rounded bg-[#2f2d2d] text-white placeholder-gray-400"
      />
      {/* <input
        name="country"
        required
        placeholder="Country (e.g., EG)"
        value={formData.country}
        onChange={handleChange}
        className="w-full p-3 rounded bg-[#2f2d2d] text-white placeholder-gray-400"
      /> */}
      <CountrySelect
        onSelect={(countryCode) =>
          setFormData({ ...formData, country: countryCode })
        }
      />
      <input
        name="postal_code"
        required
        placeholder="Postal Code"
        value={formData.postal_code}
        onChange={handleChange}
        className="w-full p-3 rounded bg-[#2f2d2d] text-white placeholder-gray-400"
      />
    </div>
  );
}
