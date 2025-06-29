import { useRef } from "react";
import GoogleAuth from "./googleAuth/GoogleAuth";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/auth";
import { toast } from "react-toastify";
import useAuthStore from "../store/authStore";
import useModalStore from "../store/modalStore";
import { FaSpinner } from "react-icons/fa";

export default function LoginModal() {
  const email = useRef();
  const password = useRef();
  const { closeLogin } = useModalStore();
  const { userLogin } = useAuthStore();

  const signInMutation = useMutation({
    mutationFn: (data) => loginUser(data),
    onSuccess: (res) => {
      userLogin(res.user, res.token);
      toast.success(`Welcome back ${res.user.username}`);
      closeLogin();
    },
    onError: (err) => {
      const errors = err?.response?.data;
      if (errors) {
        Object.keys(errors).forEach((key) => {
          toast.error(errors[key][0]);
        });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    signInMutation.mutate({
      email: email.current.value,
      password: password.current.value,
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={closeLogin}
    >
      <div
        className="bg-[#0b0b0b] p-6 rounded-lg shadow-md w-80 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4">Login</h2>
        <GoogleAuth />
        <form onSubmit={handleLogin}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full mb-3 p-2 rounded bg-[#1a1a1a]"
            required
            ref={email}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full mb-3 p-2 rounded bg-[#1a1a1a]"
            required
            ref={password}
          />
          <button
            type="submit"
            disabled={signInMutation.isPending}
            className={`w-full text-white py-2 rounded flex items-center justify-center transition-colors duration-300 ${signInMutation.isPending ? "bg-transparent border border-gray-400" : "bg-[#ff1e1e]"
              }`}
          >
            {signInMutation.isPending ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
            ) : (
              "Sign In"
            )}
          </button>

        </form>
        <button
          onClick={closeLogin}
          className="mt-2 text-sm text-gray-400 hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
