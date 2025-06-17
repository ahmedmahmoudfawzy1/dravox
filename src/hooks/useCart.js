// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { addToCart, removeFromCart, getCartProducts } from '../api/cart';
// import useAuthStore from './../store/authStore';
// import { useCartStore } from '../store/cartStore';
// import { toast } from 'react-toastify';


// export const useAddToCart = () => {
//     const { token } = useAuthStore();
//     return useMutation({
//         mutationFn: (item) => addToCart(item, token),
//         onSuccess: () => toast.success("Added to cart successfully!"),
//         onError: () => {
//             toast.error("Error");
//         }
//     });
// };



// export const useCart = () => {
//     return useQuery({
//         queryKey: ['cart'],
//         queryFn: getCartProducts,
//     });
// };



// export const useRemoveFromCart = () => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: ({ itemId, token }) => removeFromCart(itemId, token),
//         onSuccess: () => queryClient.invalidateQueries(['cart']),
//     });
// };



// hooks/useCart.js
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addToCart, removeFromCart, getCartProducts } from '../api/cart';
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
