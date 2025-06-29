import { useCategories } from "../../hooks/useCategories";
import Spinner from "../Loader/Spinner";
import CategoryCard from "./CategoryCard";

export default function CategorySection() {
  //   const categories = [
  //     {
  //       slug: 1,
  //       title: "Keyboard",
  //       image:
  //         "https://www.redragonzone.com/cdn/shop/files/keyboards.png?v=1744624741",
  //     },
  //     {
  //       slug: 2,
  //       title: "Mouse",
  //       image:
  //         "https://www.redragonzone.com/cdn/shop/files/RedragonK1NGM918MAX1KHz3-ModeWirelessAnimeGamingMouse_2_360x.png?v=1729503675",
  //     },
  //     {
  //       slug: 3,
  //       title: "HeadPhone",
  //       image:
  //         "https://www.redragonzone.com/cdn/shop/files/headsets.png?v=1744624741",
  //     },
  //     {
  //       slug: 4,
  //       title: "SPEAKER",
  //       image:
  //         "https://www.redragonzone.com/cdn/shop/products/desktopspeaker_1_360x.png?v=1653892583",
  //     },
  //     {
  //       slug: 5,
  //       title: "ACCESSORIES",
  //       image:
  //         "https://www.redragonzone.com/cdn/shop/files/RedragonGCF012Standard120mmPCCaseFan_1_360x.png?v=1739351621",
  //     },
  //     {
  //       slug: 6,
  //       title: "Gaming Combo",
  //       image:
  //         "https://www.redragonzone.com/cdn/shop/files/headsets.png?v=1744624741",
  //     },
  //   ];
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
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
