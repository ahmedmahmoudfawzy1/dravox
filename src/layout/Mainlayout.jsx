import React from "react";
import Navbar from "../components/navbar/Navbar";
import { Outlet, useLocation } from "react-router";
import Footer from "../components/footer/Footer";

export default function Mainlayout() {
  const location = useLocation();
  const noFooterInProfile = ["/profile"];
  const hideFooter = noFooterInProfile.some((path) =>
    location.pathname.startsWith(path)
  );
  return (
    <div>
      <Navbar />
      <Outlet />
      {!hideFooter && <Footer />}
    </div>
  );
}
