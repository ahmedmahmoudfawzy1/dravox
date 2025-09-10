import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../layout/Mainlayout";
import Error from "../pages/Error/Error";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Contact from "./../pages/contact/Contact";
import Shop from "../pages/shop/Shop";
import SingleProduct from "../pages/singleProduct/SingleProduct";
import Wishlist from "../pages/wishlist/Wishlist";
import Cart from "../pages/cart/Cart";
import Profile from "../pages/profile/Profile";
import Order from "../pages/profile/orders/Order";
import Tracking from "../pages/profile/tracking/Tracking";
import Settings from "../pages/profile/settings/Settings";
import ProtectedRoute from "./ProtectedRoute";
import CheckoutPage from "../pages/checkout/Checkout";
import ThankYouPage from "../pages/thankyou/ThankYou";
import SingleOrder from "../pages/singleOrder/SingleOrder";
import SingleCategory from "../pages/singleCategory/SingleCategory";
import EditProfile from "../pages/EditProfile/EditProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: <ProtectedRoute>
          <Wishlist />
        </ProtectedRoute>,
      },
      {
        path: "shop/:slug",
        element: <SingleProduct />,
      },
      {
        path: "singleCategory/:slug",
        element: <SingleCategory />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/thank-you",
        element: (
          <ProtectedRoute>
            <ThankYouPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
        // children: [
        //   {
        //     path: "order",
        //     element: <Order />,
        //   },
        //   {
        //     path: "order/:orderId",
        //     element: <SingleOrder />,
        //   },
        //   {
        //     path: "traking",
        //     element: <Tracking />,
        //   },
        //   {
        //     path: "settings",
        //     element: <Settings />,
        //   },
        // ],
      },
      {
        path: "singleOrder/:orderId",
        element: <SingleOrder />
      },
      {
        path: "edit-profile",
        element: <EditProfile />
      }
    ],
  },
]);

export default router;
