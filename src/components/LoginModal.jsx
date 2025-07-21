import { useRef, useState } from "react";
import GoogleAuth from "./googleAuth/GoogleAuth";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/auth";
import { toast } from "react-toastify";
import useAuthStore from "../store/authStore";
import useModalStore from "../store/modalStore";
import {
  FaEnvelope,
  FaLock,
  FaTimes,
  FaEye,
  FaEyeSlash,
  FaSignInAlt,
  FaQuestionCircle
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

export default function LoginModal() {
  const email = useRef();
  const password = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { closeLogin } = useModalStore();
  const { userLogin } = useAuthStore();

  const signInMutation = useMutation({
    mutationFn: (data) => loginUser(data),
    onSuccess: (res) => {
      userLogin(res.user, res.token);
      toast.success(`Welcome back ${res.user.username}! 👋`);
      closeLogin();
    },
    onError: (err) => {
      const errors = err?.response?.data;
      if (errors) {
        Object.keys(errors).forEach((key) => {
          toast.error(errors[key][0]);
        });
      } else {
        toast.error("Invalid email or password. Please try again.");
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
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={closeLogin}
    >
      <div
        className="bg-gradient-to-br from-[#1a1a1a] to-[#0b0b0b] p-8 rounded-3xl shadow-2xl w-full max-w-md text-white border border-white/10 relative animate-slideIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeLogin}
          className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
        >
          <FaTimes className="text-gray-400" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <HiSparkles className="text-[#FF1E1E] text-2xl" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-gray-400 text-sm">Sign in to continue to Dravox</p>
        </div>

        {/* Google Auth */}
        <GoogleAuth closeLogin={closeLogin} />

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-white/20"></div>
          <span className="text-gray-500 text-sm">or sign in with email</span>
          <div className="flex-1 h-px bg-white/20"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-[#FF1E1E] focus:bg-white/15 transition-all duration-300"
              required
              ref={email}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-[#FF1E1E] focus:bg-white/15 transition-all duration-300"
              required
              ref={password}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-white/10 text-[#FF1E1E] focus:ring-[#FF1E1E] focus:ring-offset-0"
              />
              <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                Remember me
              </span>
            </label>

            <a
              href="/forgot-password"
              className="text-sm text-[#FF1E1E] hover:underline flex items-center gap-1"
            >
              <FaQuestionCircle className="text-xs" />
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={signInMutation.isPending}
            className="w-full py-4 bg-[#FF1E1E] hover:bg-[#ff3333] disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FF1E1E]/30 flex items-center justify-center gap-2"
          >
            {signInMutation.isPending ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <FaSignInAlt />
                Sign In
              </>
            )}
          </button>
        </form>



        {/* Sign Up Link */}
        <p className="text-center mt-6 text-gray-400 text-sm">
          Don't have an account?{" "}
          <button
            onClick={() => {
              closeLogin();
              // Open signup modal
            }}
            className="text-[#FF1E1E] hover:underline font-medium"
          >
            Create Account
          </button>
        </p>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}