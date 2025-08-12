import { Link } from "react-router-dom";
import { FaArrowRight, FaGamepad, FaKeyboard, FaMouse, FaHeadphones, FaDesktop } from "react-icons/fa";
import { HiCube } from "react-icons/hi";

export default function CategoryCard({ category }) {
  // console.log(category)
  // // Icon mapping for different categories
  // const categoryIcons = {
  //   "keyboards": <FaKeyboard className="text-3xl" />,
  //   "mice": <FaMouse className="text-3xl" />,
  //   "headsets": <FaHeadphones className="text-3xl" />,
  //   "monitors": <FaDesktop className="text-3xl" />,
  //   "controllers": <FaGamepad className="text-3xl" />,
  //   "default": <HiCube className="text-3xl" />
  // };

  // const getCategoryIcon = (name) => {
  //   const key = name?.toLowerCase() || "default";
  //   return categoryIcons[key] || categoryIcons.default;
  // };




  return (
    <Link
      to={`/singleCategory/${category?.slug}`}
      className="group relative h-[320px] bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#FF1E1E]/20 hover:border-[#FF1E1E]/30 hover:scale-[1.02] block"
    >
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

      {/* Category Image */}
      <div className="absolute inset-0">
        <img
          src={category?.category_image}
          alt={category?.name}
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        {/* Content Shadow Background */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent -z-10" />
        {/* Icon Badge */}
        {/* <div className="absolute top-6 right-6 w-14 h-14 bg-black/60 backdrop-blur-md border border-white/30 rounded-2xl flex items-center justify-center text-white group-hover:bg-[#FF1E1E]/80 group-hover:border-[#FF1E1E] transition-all duration-300 shadow-xl">
          {getCategoryIcon(category?.name)}
        </div> */}

        {/* Category Info */}
        <div className="transform transition-all duration-500 translate-y-4 group-hover:translate-y-0 relative z-10">
          {/* Product Count */}
          {/* <span className="inline-block px-3 py-1 bg-black/60 backdrop-blur-sm border border-white/20 rounded-full text-white text-xs font-semibold mb-3 shadow-lg">
            Products
          </span> */}

          {/* Category Name */}
          <h3 className="text-2xl font-bold text-white mb-2 line-clamp-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {category.name}
          </h3>

          {/* Description */}
          <p className="text-gray-200 text-sm line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            {category?.description || "Discover our premium selection of gaming gear"}
          </p>

          {/* CTA */}
          <div className="flex items-center gap-2 text-white font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            <span className="bg-[#FF1E1E] px-4 py-2 rounded-full text-sm">Explore Collection</span>
            <FaArrowRight className="transform group-hover:translate-x-2 transition-transform duration-300" />
          </div>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-[#FF1E1E] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </Link>
  );
}