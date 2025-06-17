import React from "react";

export default function CategoryCard({ description, name }) {
  console.log(description, name);
  return (
    <div className="border rounded-md p-4 shadow-md bg-[#A1A1]  col-span-12 md:col-span-6 lg:col-span-4 flex flex-col items-center">
      <div className="cat-image">
        <h2>{name}</h2>
      </div>
      <h3 className="text-primary-color text-[18px] font-medium text-center">
        {description}
      </h3>
    </div>
  );
}
