import { Link } from "react-router-dom";


export default function CategoryCard({ category }) {
  console.log(category)
  return (
    <div className="group border rounded-2xl p-4 shadow-md bg-[#1a1a1a] text-white col-span-12 md:col-span-6 lg:col-span-4 flex flex-col items-center transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">

      <div className="category-image h-[200px] w-full rounded-xl overflow-hidden mb-4">
        <img
          src={category?.category_image}
          alt={category?.name}
          className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
      </div>


      <h2 className="text-xl font-bold mb-2 text-center line-clamp-2">
        {category.name}
      </h2>


      <p className="text-gray-300 text-sm text-center mb-4 line-clamp-2">
        {category?.description}
      </p>


      <Link
        to={`singleCategory/${category?.slug}`}
        className="mt-auto bg-primary-color hover:bg-[#c60000] transition px-6 py-2 rounded-full text-sm font-medium shadow-md"
      >
        learn More
      </Link>
    </div>

  );
}
