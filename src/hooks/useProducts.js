import { useQuery } from "@tanstack/react-query";
import { getAllProducts, getCurrencies, getSingleProduct } from "../api/products";
import useCurrencyStore from "../store/currencyStore";

export const useProducts = (filters = {}) => {
    const { currency } = useCurrencyStore();
    return useQuery({
        queryKey: ["products", currency, filters],
        queryFn: () => getAllProducts(currency, filters),
        enabled: !!currency,
    });
};
export const useCurrencies = () => {
    return useQuery({
        queryKey: ['currencies'],
        queryFn: getCurrencies
    });
};



export const useGetSingleProduct = (slug) => {
    return useQuery({
        queryKey: ["product", slug],
        queryFn: () => getSingleProduct(slug),
        enabled: !!slug,
    })
}