import "./IconStyle.css";

export default function Icon() {
  return (
    <div className="flex justify-center mb-6">
      <svg
        className="w-20 h-20 text-green-500 animate-success-check"
        viewBox="0 0 52 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="26"
          cy="26"
          r="25"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14 27 L22 35 L38 19"
        />
      </svg>
    </div>
  );
}
