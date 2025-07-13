import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

export default function FooterLinks({ links, title }) {
  return (
    <div>
      <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
        <span className="w-8 h-[2px] bg-[#FF1E1E]"></span>
        {title}
      </h4>

      <ul className="space-y-3">
        {links.map((link, index) => (
          <li
            key={index}
            className="group"
          >
            {link.link ? (
              <Link
                to={link.link}
                className="flex items-center gap-2 text-gray-400 hover:text-[#FF1E1E] transition-all duration-300 group"
              >
                <FaChevronRight className="text-xs opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                  {link.name || link}
                </span>
              </Link>
            ) : (
              <span className="flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 cursor-pointer group">
                <FaChevronRight className="text-xs opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                  {link.name || link}
                </span>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}