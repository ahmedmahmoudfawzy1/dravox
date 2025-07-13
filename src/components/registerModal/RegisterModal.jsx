import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRef, useState } from "react";
import useAuthStore from "../../store/authStore";
import GoogleAuth from "../googleAuth/GoogleAuth";
import { signUpUser } from "./../../api/auth";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaTimes,
  FaEye,
  FaEyeSlash,
  FaCheckCircle
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

const SignupModal = ({ showSignupModal, setShowSignupModal }) => {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const phone = useRef();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const { userLogin } = useAuthStore();

  const checkPasswordStrength = (pass) => {
    let strength = 0;
    if (pass.length > 6) strength++;
    if (pass.length > 10) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;
    setPasswordStrength(strength);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (password.current.value !== confirmPassword.current.value) {
      toast.error("Passwords do not match!");
      return;
    }

    const formData = {
      first_name: firstName.current.value,
      last_name: lastName.current.value,
      email: email.current.value,
      password: password.current.value,
      password_confirm: confirmPassword.current.value,
      phone_number: phone.current.value,
      preferred_language: "en",
    };

    signUpMutation.mutate(formData);
  };

  const signUpMutation = useMutation({
    mutationFn: (data) => signUpUser(data),
    onSuccess: (res) => {
      userLogin(res.data.user, res.data.token);
      toast.success(`Welcome ${res.data.user.username}! 🎉`);
      setShowSignupModal(false);
    },
    onError: (err) => {
      console.error(err);
      const errors = err?.response?.data;
      if (errors && typeof errors === "object") {
        Object.keys(errors).forEach((key) => {
          toast.error(errors[key][0] || "Unknown error");
        });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  const getStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    showSignupModal && (
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={() => setShowSignupModal(false)}
      >
        <div
          className="bg-gradient-to-br from-[#1a1a1a] to-[#0b0b0b] p-8 rounded-3xl shadow-2xl w-full max-w-md text-white border border-white/10 relative animate-fadeIn"
          onClick={e => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={() => setShowSignupModal(false)}
            className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            <FaTimes className="text-gray-400" />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <HiSparkles className="text-[#FF1E1E] text-2xl" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Create Account</h2>
            <p className="text-gray-400 text-sm">Join the Dravox gaming community</p>
          </div>

          {/* Google Auth */}
          <GoogleAuth setShowSignupModal={setShowSignupModal} />

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="text-gray-500 text-sm">or sign up with email</span>
            <div className="flex-1 h-px bg-white/20"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleFormSubmit} className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  name="first_name"
                  type="text"
                  placeholder="First Name"
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-[#FF1E1E] focus:bg-white/15 transition-all duration-300"
                  required
                  ref={firstName}
                />
              </div>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  name="last_name"
                  type="text"
                  placeholder="Last Name"
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-[#FF1E1E] focus:bg-white/15 transition-all duration-300"
                  required
                  ref={lastName}
                />
              </div>
            </div>

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

            {/* Phone */}
            <div className="relative">
              <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                name="phone_number"
                type="tel"
                placeholder="Phone Number"
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-[#FF1E1E] focus:bg-white/15 transition-all duration-300"
                required
                ref={phone}
              />
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-[#FF1E1E] focus:bg-white/15 transition-all duration-300"
                  required
                  ref={password}
                  onChange={(e) => checkPasswordStrength(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {password.current?.value && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i < passwordStrength ? getStrengthColor() : 'bg-gray-600'
                          }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {passwordStrength <= 2 ? "Weak" : passwordStrength <= 3 ? "Medium" : "Strong"} password
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                name="password_confirm"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-[#FF1E1E] focus:bg-white/15 transition-all duration-300"
                required
                ref={confirmPassword}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                required
                className="mt-1 w-4 h-4 rounded border-white/20 bg-white/10 text-[#FF1E1E] focus:ring-[#FF1E1E] focus:ring-offset-0"
              />
              <p className="text-xs text-gray-400">
                I agree to the{" "}
                <a href="/terms" className="text-[#FF1E1E] hover:underline">
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-[#FF1E1E] hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={signUpMutation.isPending}
              className="w-full py-4 bg-[#FF1E1E] hover:bg-[#ff3333] disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FF1E1E]/30 flex items-center justify-center gap-2"
            >
              {signUpMutation.isPending ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <FaCheckCircle />
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="text-center mt-6 text-gray-400 text-sm">
            Already have an account?{" "}
            <button
              onClick={() => {
                setShowSignupModal(false);
                // Open login modal
              }}
              className="text-[#FF1E1E] hover:underline font-medium"
            >
              Sign In
            </button>
          </p>
        </div>

        {/* Animation Styles */}
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
        `}</style>
      </div>
    )
  );
};

export default SignupModal;