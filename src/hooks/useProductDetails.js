import { useQuery } from '@tanstack/react-query';
import { getSingleProduct } from '../api/products';

export const useProductDetails = (productId) => {
    return useQuery({
        queryKey: ['product', productId],
        queryFn: () => getSingleProduct(productId),
        enabled: !!productId,
    });
};