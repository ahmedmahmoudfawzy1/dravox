
import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '../api/categories';


export const useCategories = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: getAllCategories,
    })
}
export const useSingleCategorie = (slug) => {
    return useQuery({
        queryKey: ["categorie", slug],
        queryFn: () => getSingleCategory(slug),
    });
};



