import { useGoogleLogin } from "@react-oauth/google";
import axiosInstance from "../../api/axionInstance";
import { FaGoogle } from "react-icons/fa";
import Cookies from "js-cookie";
import useAuthStore from "../../store/authStore";
import { toast } from "react-toastify";
export default function GoogleAuth() {
  const { userLogin } = useAuthStore();
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const accessToken = tokenResponse.access_token;

        const res = await axiosInstance.post("/account/auth/google/", {
          access_token: accessToken,
        });
        console.log("Google Login Response:", res);
        if (res.data?.token) {
          Cookies.set("token", res.data.token, { expires: 7 });
          userLogin(res.data.user, res.data.token);
          toast.success("Logged in successfully with Google");
        } else {
          console.warn("Google login response missing token:", res.data);
          toast.error("Login with Google failed: No token in response");
        }
      } catch (error) {
        console.error("Google login error:", error);
        toast.error("Login with Google failed");
      }
    },
    onError: (err) => {
      console.error("Google auth error:", err);
      toast.error("Google Login Failed");
    },
  });
  return (
    <button
      onClick={() => googleLogin()}
      className="google-btn mb-3 bg-white w-[100%] rounded rounded-4 p-2 text-black flex gap-2 justify-center align-middle items-center"
    >
      <FaGoogle className="text-primary-color" />
      <span className="">Sign in with Google</span>
    </button>
  );
}
