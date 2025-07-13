import { useState } from "react";
import { Link } from "react-router-dom";
import { HiShoppingBag } from "react-icons/hi";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import SocialMediaIcons from "../socialMediaIcons/SocialMediaIcons";
import FooterLinks from "./components/footerLinks/FooterLinks";

export default function Footer() {
  // api endPoint
  const [contacts] = useState([
    { icon: <FaPhone />, text: "+01099876482", type: "phone" },
    { icon: <FaEnvelope />, text: "support@getdravox.com", type: "email" },
    { icon: <FaMapMarkerAlt />, text: "111 Fisal Giza, Egypt", type: "address" }
  ]);

  const [categories] = useState([
    { name: "Keyboards", link: "/shop?category=keyboards" },
    { name: "Gaming Mice", link: "/shop?category=mice" },
    { name: "Headsets", link: "/shop?category=headsets" },
    { name: "Accessories", link: "/shop?category=accessories" }
  ]);

  const [quickLinks] = useState([
    { name: "About Us", link: "/about" },
    { name: "Privacy Policy", link: "/privacy" },
    { name: "Terms of Service", link: "/terms" },
    { name: "FAQ", link: "/faq" },
    { name: "Contact", link: "/contact" }
  ]);

  const [company] = useState([
    { name: "Our Story", link: "/story" },
    { name: "Careers", link: "/careers" },
    { name: "Press Kit", link: "/press" },
    { name: "Affiliates", link: "/affiliates" }
  ]);

  return (
    <footer className="relative bg-gradient-to-b from-[#1a1a1a] to-[#0b0b0b] border-t border-white/10 mt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF1E1E]/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#FF1E1E]/5 rounded-full blur-3xl" />
      </div>

      {/* Newsletter Section */}
      <div className="relative z-10 border-b border-white/10">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Stay in the Game
            </h3>
            <p className="text-gray-400 mb-6">
              Get exclusive deals and be the first to know about new gaming gear
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-[#FF1E1E] focus:bg-white/15 transition-all duration-300"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-[#FF1E1E] hover:bg-[#ff3333] text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FF1E1E]/30"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="relative">
                <HiShoppingBag size={36} className="text-[#FF1E1E] transform group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#FF1E1E] rounded-full animate-pulse" />
              </div>
              <span className="text-2xl font-bold text-white">Dravox</span>
            </Link>

            <p className="text-gray-400 mb-6 max-w-sm">
              Premium gaming peripherals designed for champions. Elevate your gameplay with cutting-edge technology and unmatched performance.
            </p>

            <SocialMediaIcons />

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400">
                🔒 Secure Checkout
              </div>
              <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400">
                🚚 Free Shipping
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <FooterLinks links={categories} title="Shop" />
          </div>

          <div>
            <FooterLinks links={company} title="Company" />
          </div>

          <div>
            <FooterLinks links={quickLinks} title="Support" />
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contacts.map((contact, index) => (
              <div
                key={index}
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-[#FF1E1E] group-hover:bg-[#FF1E1E]/20 transition-all duration-300">
                  {contact.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-500">
                    {contact.type === "phone" && "Call Us"}
                    {contact.type === "email" && "Email Us"}
                    {contact.type === "address" && "Visit Us"}
                  </p>
                  <p className="text-white group-hover:text-[#FF1E1E] transition-colors duration-300">
                    {contact.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-white/10 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2025 Dravox. All rights reserved. Made with ❤️ for gamers
            </p>

            <div className="flex items-center gap-6">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Privacy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Terms
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}