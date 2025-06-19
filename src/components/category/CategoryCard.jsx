export default function CategoryCard({ description, name, image }) {
  console.log(description, name);
  return (
    <div className="border rounded-md p-4 shadow-md bg-[#A1A1]  col-span-12 md:col-span-6 lg:col-span-4 flex flex-col items-center">
      <div className="category-image h-[200px]">
        <img src={image} alt="" className="h-[100%] w-[100%] object-cover " />
      </div>
      <div className="cat-image">
        <h2>{name}</h2>
      </div>
      <h3 className="text-primary-color text-[18px] font-medium text-center">
        {description}
      </h3>
    </div>
  );
}
