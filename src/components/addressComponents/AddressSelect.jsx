// components/addressComponents/AddressSelect.jsx
import Select from "react-select";

export default function AddressSelect({ addresses, selected, onChange }) {
  const options = addresses.map((addr) => ({
    value: addr.id,
    label: `${addr.label} - ${addr.city}, ${addr.country}`,
  }));

  return (
    <Select
      options={[...options, { value: "new", label: "➕ Add New Address" }]}
      value={
        selected === "new"
          ? { value: "new", label: "➕ Add New Address" }
          : options.find((opt) => opt.value === selected)
      }
      onChange={(option) => onChange(option.value)}
      placeholder="Select address"
      className="text-black"
    />
  );
}
