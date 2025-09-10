import { RouterProvider } from "react-router";
import router from "./routes/Router";

export default function App() {
  return (
    <>
      <div id="zoom-portal"></div>
      <RouterProvider router={router} />
    </>
  );
}
