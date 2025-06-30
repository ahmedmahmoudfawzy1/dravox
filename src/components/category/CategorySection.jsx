import { useCategories } from "../../hooks/useCategories";
import Spinner from "../Loader/Spinner";
import CategoryCard from "./CategoryCard";

export default function CategorySection() {
  const { data, isLoading, isError, refetch } = useCategories();
  console.log(data);
  return (
    <section className="my-8">
      <h2 className="text-center mx-auto w-fit text-[35px] font-bold py-4 text-primary-color  ">
        Categories
      </h2>
      <div className="container">
        <div className="grid grid-cols-12 gap-4">
          {isLoading ? (
            <Spinner />
          ) : (
            data?.map((cat) => (
              <CategoryCard
                key={cat.slug}
                description={cat.description}
                name={cat.name}
                image={cat.category_image}
                category={cat}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
