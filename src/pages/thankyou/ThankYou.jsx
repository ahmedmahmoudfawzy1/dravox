import { Link } from "react-router-dom";

import { FaRegCheckCircle } from "react-icons/fa";
import Icon from "./Icon";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2f2d2d] text-white px-4">
      <div className="bg-[#3c3a3a] p-10 rounded-2xl shadow-lg max-w-md w-full text-center">
        <Icon />
        <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
        <p className="text-dark-gray mb-6">
          Your order has been placed successfully. We’ve sent you a confirmation
          email with the order details.
        </p>
        <Link
          to="/"
          className="inline-block mt-4 px-6 py-3 bg-primary-color text-white rounded-full hover:bg-main-color transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
