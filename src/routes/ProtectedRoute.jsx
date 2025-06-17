import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import useModalStore from "./../store/modalStore";
import { toast } from "react-toastify";
import useAuthStore from "../store/authStore";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuthStore();
  console.log("routes", token);
  const { openLogin } = useModalStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
      toast.warn("Please Sign Up");
    }
  }, [token, openLogin, navigate]);

  return token ? children : null;
};

export default ProtectedRoute;
