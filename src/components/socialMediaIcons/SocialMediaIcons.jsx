import { RiTwitterXFill } from "react-icons/ri";
import { IoLogoTiktok } from "react-icons/io5";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function SocialMediaIcons() {
  return (
    <div className="flex gap-4 mt-4">
      <div className="socil-icon w-[40px] h-[40px] rounded-[50%] border  border-white ele-center hover:border-[#ff1e1e] transition-all duration-300 cursor-pointer ">
        <a href="https://facebook.com" target="_blank">
          <FaFacebookF />
        </a>
      </div>
      <div className="socil-icon w-[40px] h-[40px] rounded-[50%] border border-white ele-center hover:border-[#ff1e1e] transition-all duration-300 cursor-pointer">
        <a href="https://twitter.com" target="_blank">
          <RiTwitterXFill />
        </a>
      </div>
      <div className="socil-icon w-[40px] h-[40px] rounded-[50%] border border-white ele-center hover:border-[#ff1e1e] transition-all duration-300 cursor-pointer">
        <a href="https://instagram.com" target="_blank">
          <FaInstagram />
        </a>
      </div>
      <div className="socil-icon w-[40px] h-[40px] rounded-[50%] border border-white ele-center hover:border-[#ff1e1e] transition-all duration-300 cursor-pointer">
        <a href="https://tiktok.com" target="_blank">
          <IoLogoTiktok />
        </a>
      </div>
    </div>
  );
}
