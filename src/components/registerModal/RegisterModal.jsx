import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useRef } from "react";
import useAuthStore from "../../store/authStore";
import GoogleAuth from "../googleAuth/GoogleAuth";
import { signUpUser } from "./../../api/auth";

const SignupModal = ({ showSignupModal, setShowSignupModal }) => {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const phone = useRef();

  const { userLogin } = useAuthStore();

  const handleFormSubmit = (e) => {
    e.preventDefault();
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
      console.log(res.data.token, res.data.user);
      userLogin(res.data.user, res.data.token);
      toast.success(`Welcome ${res.data.user.username}`);
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

  return (
    showSignupModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-[#0b0b0b] p-6 rounded-lg shadow-md w-80 text-white">
          <h2 className="text-lg font-bold mb-4">Sign Up</h2>
          <GoogleAuth setShowSignupModal={setShowSignupModal} />
          <form onSubmit={handleFormSubmit}>
            <input
              name="first_name"
              type="text"
              placeholder="First Name"
              className="w-full mb-3 p-2 rounded bg-[#1a1a1a]"
              required
              ref={firstName}
            />
            <input
              name="last_name"
              type="text"
              placeholder="Last Name"
              className="w-full mb-3 p-2 rounded bg-[#1a1a1a]"
              required
              ref={lastName}
            />
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
            <input
              name="password_confirm"
              type="password"
              placeholder="Confirm Password"
              className="w-full mb-3 p-2 rounded bg-[#1a1a1a]"
              required
              ref={confirmPassword}
            />
            <input
              name="phone_number"
              type="tel"
              placeholder="Phone"
              className="w-full mb-3 p-2 rounded bg-[#1a1a1a]"
              required
              ref={phone}
            />
            <button
              type="submit"
              className="w-full bg-[#ff1e1e] text-white py-2 rounded"
            >
              Sign Up
            </button>
          </form>

          <button
            onClick={() => setShowSignupModal(false)}
            className="mt-2 text-sm text-gray-400 hover:underline"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  );
};

export default SignupModal;
