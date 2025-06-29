
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addToCart, removeFromCart, getCartProducts, updateCartItemQuantity } from '../api/cart';
import useAuthStore from '../store/authStore';
import { toast } from 'react-toastify';

export const useAddToCart = () => {
    const { token } = useAuthStore();
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (item) => addToCart(item, token),
        onSuccess: () => {
            toast.success("Added to cart successfully!");
            qc.invalidateQueries(['cart']);
        },
        onError: () => toast.error("Error adding to cart"),
    });
};

export const useCart = () => {
    const { token } = useAuthStore();
    return useQuery({
        queryKey: ['cart', token],
        queryFn: () => getCartProducts(token),
        enabled: !!token,
        staleTime: 1000 * 60 * 2,
        cacheTime: 1000 * 60 * 5,
    });
};

export const useRemoveFromCart = () => {
    const { token } = useAuthStore();
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (itemId) => removeFromCart(itemId, token),
        onSuccess: () => qc.invalidateQueries(['cart']),
    });
};


export const useUpdateCartItemQuantity = () => {
    const { token } = useAuthStore();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ itemId, quantity }) =>
            updateCartItemQuantity(itemId, quantity, token),
        onSuccess: () => {
            queryClient.invalidateQueries(["cartItems"]);
        },
    });
};