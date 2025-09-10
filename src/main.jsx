import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import 'react-medium-image-zoom/dist/styles.css'

import App from "./App.jsx";

import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import { HelmetProvider } from "@dr.pogodin/react-helmet";

const queryClient = new QueryClient();

const clientId =
  "721421361181-4gmcl3ce29cckd65tt6e4umho1901vlu.apps.googleusercontent.com";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <GoogleOAuthProvider clientId={clientId}>
        <QueryClientProvider client={queryClient}>
          <App />
          <ToastContainer />
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </HelmetProvider>
  </StrictMode>
);


