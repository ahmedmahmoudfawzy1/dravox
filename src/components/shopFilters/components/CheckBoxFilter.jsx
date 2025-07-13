import { FaCheck } from "react-icons/fa";

export default function CheckBoxFilter({
  id,
  label,
  icon,
  checked,
  onChange,
  count,
  disabled = false
}) {
  return (
    <label
      htmlFor={id}
      className={`
        flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200
        ${checked
          ? 'bg-[#FF1E1E]/10 border border-[#FF1E1E]/30'
          : 'bg-white/5 border border-transparent hover:bg-white/10'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <input
        type="checkbox"
        id={id}
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />

      {/* Custom Checkbox */}
      <div className={`
        relative w-5 h-5 rounded-md border-2 transition-all duration-200
        ${checked
          ? 'bg-[#FF1E1E] border-[#FF1E1E]'
          : 'bg-transparent border-gray-500 peer-hover:border-gray-400'
        }
      `}>
        {checked && (
          <FaCheck className="absolute inset-0 m-auto text-white text-xs animate-scaleIn" />
        )}
      </div>

      {/* Label Content */}
      <div className="flex-1 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon && (
            <span className={`
              transition-colors duration-200
              ${checked ? 'text-[#FF1E1E]' : 'text-gray-400'}
            `}>
              {icon}
            </span>
          )}
          <span className={`
            text-sm font-medium transition-colors duration-200
            ${checked ? 'text-white' : 'text-gray-300'}
          `}>
            {label}
          </span>
        </div>

        {count !== undefined && (
          <span className={`
            text-xs px-2 py-0.5 rounded-full transition-all duration-200
            ${checked
              ? 'bg-[#FF1E1E]/20 text-[#FF1E1E]'
              : 'bg-white/10 text-gray-400'
            }
          `}>
            {count}
          </span>
        )}
      </div>
    </label>
  );
}