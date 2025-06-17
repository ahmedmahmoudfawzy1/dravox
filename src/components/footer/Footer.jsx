import { useState } from "react";
import logo from "../../assets/images/logo.png";
import "./Footer.css";
import SocialMediaIcons from "../socialMediaIcons/SocialMediaIcons";
import FooterLinks from "./components/footerLinks/FooterLinks";

export default function Footer() {
  const [contacts, setContacts] = useState([
    "+972 58-892-8927",
    "example@gmail.com",
    "support@gmail.com",
    " 111 Fisal Giza , Egypt",
  ]);
  const [categories, setCategories] = useState([
    "Keyboards",
    "Headphones",
    "Mouse",
    "Case",
  ]);
  const [quickLinks, setQuickLinks] = useState([
    "Privecy Policy",
    "Terms Of Use",
    "FAQ",
    "Contact",
  ]);
  return (
    <footer className="mt-4 py-10 border-t">
      <div className="container">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 ">
          <div className="">
            <div className="footer-image">
              <img
                src={logo}
                alt="Logo"
                className="h-[200px] w-[200px] object-cover"
              />
            </div>
            <p className="font-normal text-[1.1rem] leading-relaxed">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi
            </p>
            <SocialMediaIcons />
          </div>
          <FooterLinks links={categories} titile={"Categories"} />
          <FooterLinks links={quickLinks} titile={"Quick Links"} />
          <FooterLinks links={contacts} titile={"Contacts"} />
        </div>
      </div>
    </footer>
  );
}
