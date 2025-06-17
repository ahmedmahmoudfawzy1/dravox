import React from "react";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className="container">
      <div className="ele-center flex-col  min-h-[100vh] gap-5">
        <h2 className="text-primary-color  text-[30px] font-bold sm:font-medium sm:text-[90px] text-center ">
          <p>404</p>
          Page Not Found
        </h2>
        <p className="font-normal text-[1.4rem]">
          Your Visted Page not found. You may go home page.
        </p>
        <div className="mt-4">
          <Link to="/" className="main-btn rounded-[12px]">
            Back To Home Page
          </Link>
        </div>
      </div>
    </div>
  );
}
