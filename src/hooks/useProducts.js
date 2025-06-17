import { useQuery } from "@tanstack/react-query";
import { getAllProducts, getSingleProduct } from "../api/products";

export const useProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: getAllProducts
    });
};



export const useGetSingleProduct = (slug) => {
    return useQuery({
        queryKey: ["product", slug],
        queryFn: () => getSingleProduct(slug),
        enabled: !!slug,
    })
}