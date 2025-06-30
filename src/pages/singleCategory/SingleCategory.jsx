import { useParams } from "react-router-dom";
import { useSingleCategorie } from "../../hooks/useCategories";

export default function SingleCategory() {
    const { slug } = useParams();
    console.log("slug from params:", slug);
    const { data, isLoading, isError, error } = useSingleCategorie(slug);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    console.log("data from useSingleCategorie", data);

    return (
        <div>
            <h1>Category: {data?.name}</h1>
        </div>
    );
}
