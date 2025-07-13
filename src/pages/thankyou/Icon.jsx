export default function Icon() {
  return (
    <div className="relative flex justify-center mb-6">
      {/* Glow Effect */}
      <div className="absolute inset-0 w-32 h-32 bg-green-500/20 rounded-full blur-2xl animate-pulse" />

      {/* Main Icon */}
      <svg
        className="relative w-32 h-32 text-green-500"
        viewBox="0 0 52 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Circle */}
        <circle
          cx="26"
          cy="26"
          r="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="animate-draw-circle"
        />

        {/* Inner Circle Background */}
        <circle
          cx="26"
          cy="26"
          r="20"
          fill="currentColor"
          className="opacity-10"
        />

        {/* Checkmark */}
        <path
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 26 L22 33 L37 18"
          className="animate-draw-check"
        />
      </svg>

      {/* Inline Styles for Animations */}
      <style jsx>{`
        @keyframes drawCircle {
          0% {
            stroke-dasharray: 0 160;
            opacity: 0;
            transform: scale(0.8) rotate(-90deg);
          }
          50% {
            opacity: 1;
          }
          100% {
            stroke-dasharray: 160 160;
            opacity: 1;
            transform: scale(1) rotate(-90deg);
          }
        }

        @keyframes drawCheck {
          0% {
            stroke-dasharray: 0 50;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            stroke-dasharray: 50 50;
            opacity: 1;
          }
        }

        .animate-draw-circle {
          stroke-dasharray: 160;
          stroke-dashoffset: 0;
          transform-origin: center;
          animation: drawCircle 0.8s ease-out forwards;
        }

        .animate-draw-check {
          stroke-dasharray: 50;
          stroke-dashoffset: 50;
          animation: drawCheck 0.6s ease-out 0.5s forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}