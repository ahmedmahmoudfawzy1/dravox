
import { useQuery } from '@tanstack/react-query';
import { getAllCategories, getSingleCategory } from '../api/categories';


export const useCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: getAllCategories,
    })
}
export const useSingleCategorie = (slug) => {
    return useQuery({
        queryKey: ["singleCategorie"],
        queryFn: () => getSingleCategory(slug),
    });
};



