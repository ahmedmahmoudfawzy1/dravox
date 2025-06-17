import { useRef } from "react";
import GoogleAuth from "./googleAuth/GoogleAuth";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/auth";
import { toast } from "react-toastify";
import useAuthStore from "../store/authStore";

export default function LoginModal() {
  const email = useRef();
  const password = useRef();

  const handelLogin = (e) => {
    e.preventDefault();
    const formLoginData = {
      email: email.current.value,
      password: password.current.value,
    };
    console.log(formLoginData);
    signInMutation.mutate(formLoginData);
  };
  const { user, userLogin } = useAuthStore();
  console.log(user);
  const signInMutation = useMutation({
    mutationFn: (data) => loginUser(data),
    onSuccess: (res) => {
      console.log(res);
      userLogin(res.user, res.token);
      toast.success(`Welcome back ${res.user.username}`);
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
  return (
    <div>
      <GoogleAuth />
      <form onSubmit={handelLogin}>
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
          className="w-full bg-[#ff1e1e] text-white py-2 rounded"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
