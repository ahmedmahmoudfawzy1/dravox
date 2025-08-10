import { RiTwitterXFill } from "react-icons/ri";
import { IoLogoTiktok, IoLogoYoutube } from "react-icons/io5";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { useConfig } from "../../hooks/useConfig";

export default function SocialMediaIcons() {
  const { data } = useConfig()


  return (
    <div className="flex gap-4 mt-4">
      <div className="socil-icon w-[40px] h-[40px] rounded-[50%] border  border-white ele-center hover:border-[#ff1e1e] transition-all duration-300 cursor-pointer ">
        <a href={data?.social_links?.facebook} target="_blank">
          <FaFacebookF />
        </a>
      </div>
      <div className="socil-icon w-[40px] h-[40px] rounded-[50%] border border-white ele-center hover:border-[#ff1e1e] transition-all duration-300 cursor-pointer">
        <a href={data?.social_links?.twitter} target="_blank">
          <RiTwitterXFill />
        </a>
      </div>
      <div className="socil-icon w-[40px] h-[40px] rounded-[50%] border border-white ele-center hover:border-[#ff1e1e] transition-all duration-300 cursor-pointer">
        <a href={data?.social_links?.instagram} target="_blank">
          <FaInstagram />
        </a>
      </div>
      <div className="socil-icon w-[40px] h-[40px] rounded-[50%] border border-white ele-center hover:border-[#ff1e1e] transition-all duration-300 cursor-pointer">
        <a href={data?.social_links?.youtube} target="_blank">
          <IoLogoYoutube />
        </a>
      </div>
    </div>
  );
}
