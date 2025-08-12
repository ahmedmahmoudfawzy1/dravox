
import Navbar from "../components/navbar/Navbar";
import { Outlet, useLocation } from "react-router";
import Footer from "../components/footer/Footer";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import { useConfig } from "../hooks/useConfig";
import { Helmet } from "@dr.pogodin/react-helmet";
import PopupModal from "../components/Popup/Popup";


export default function Mainlayout() {
  const location = useLocation();
  const noFooterInProfile = ["/profile"];
  const { data } = useConfig()
  const hideFooter = noFooterInProfile.some((path) =>
    location.pathname.startsWith(path)
  );
  return (
    <>
      <Helmet>
        <title>{data?.site_name}</title>
        <meta name="description" content={data?.seo?.description} />
        <meta
          name="keywords"
          content={data?.seo?.keywords}
        />
        <link rel="icon" type="image/x-icon" href={data?.logo_url}></link>
      </Helmet>
      <PopupModal />
      <div>

        <ScrollToTop />
        <Navbar />
        <Outlet />
        {!hideFooter && <Footer />}
      </div>
    </>
  );
}
