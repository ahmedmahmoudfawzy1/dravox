import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axionInstance";
import { useQuery } from "@tanstack/react-query";


export const useCreateOrder = () => {
    return useMutation({
        mutationFn: (orderData) =>
            axiosInstance.post("/orders/orders/", orderData),
    });
};



export const useGetOrders = (token) => {
    return useQuery({
        queryKey: ["orders"],
        queryFn: () => axiosInstance.get("/orders/orders/", {
            headers: {
                Authorization: `Token ${token}`,
            },
        })
    });
};



export const useGetSingleOrder = (orderId, token) => {
    return useQuery({
        queryKey: ["single-order", orderId],
        queryFn: () =>
            axiosInstance.get(`/orders/orders/${orderId}/`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            }),
        enabled: !!token && !!orderId,
    });
};




// export const useCancelOrder = (token) => {
//     return useMutation({
//         mutationFn: (orderId) =>
//             axiosInstance.post(`/orders/orders/${orderId}/cancel/`, null, {
//                 headers: {
//                     Authorization: `Token ${token}`,
//                 },
//             })
//     });
// };

// hooks/useOrder.js - Improved cancel order hook



export const useCancelOrder = (token) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (orderId) => {
            try {
                // Send empty object instead of null
                const response = await axiosInstance.post(
                    `/orders/orders/${orderId}/cancel/`,
                    {}, // Empty object instead of null
                    {
                        headers: {
                            Authorization: `Token ${token}`,
                            'Content-Type': 'application/json', // Explicitly set content type
                        },
                    }
                );
                return response;
            } catch (error) {
                // If we get a 500 error, check if the order was actually cancelled
                if (error.response?.status === 500) {

                    // Wait a bit longer for the server to complete the operation
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    // Check the order status
                    try {
                        const orderCheck = await axiosInstance.get(
                            `/orders/orders/${orderId}/`,
                            {
                                headers: {
                                    Authorization: `Token ${token}`,
                                },
                            }
                        );

                        // If the order is cancelled, consider it a success
                        if (orderCheck.data?.data?.status?.toLowerCase() === 'cancelled') {

                            return orderCheck;
                        }
                    } catch (checkError) {
                        // If we can't check, still might be successful
                        console.error('Failed to verify order status:', checkError);

                        // If we get a 404, the order might have been cancelled and removed
                        if (checkError.response?.status === 404) {
                            return { data: { success: true } };
                        }
                    }
                }
                // Re-throw the error if it's not a 500 or if the order wasn't cancelled
                throw error;
            }
        },
        onMutate: async (orderId) => {
            // Cancel any outgoing refetches to prevent overwriting our optimistic update
            await queryClient.cancelQueries(["single-order", orderId]);
            await queryClient.cancelQueries(["orders"]);

            // Snapshot the previous value
            const previousOrder = queryClient.getQueryData(["single-order", orderId]);

            // Optimistically update the order to show it as cancelled
            queryClient.setQueryData(["single-order", orderId], (old) => {
                if (!old?.data) return old;
                return {
                    ...old,
                    data: {
                        ...old.data,
                        status: 'cancelled',
                        can_cancel: false
                    }
                };
            });

            // Return a context with the snapshotted value
            return { previousOrder, orderId };
        },
        onError: (err, orderId, context) => {
            // If the mutation fails, use the context to roll back
            if (context?.previousOrder) {
                queryClient.setQueryData(["single-order", orderId], context.previousOrder);
            }
            console.error('Cancel order error:', err);
        },
        onSuccess: (data, orderId) => {
            // Invalidate and refetch
            queryClient.invalidateQueries(["single-order", orderId]);
            queryClient.invalidateQueries(["orders"]);
        },
        onSettled: (data, error, orderId) => {
            // Always refetch after mutation
            queryClient.invalidateQueries(["single-order", orderId]);
            queryClient.invalidateQueries(["orders"]);
        },
        retry: false, // Don't retry since we handle the error manually
    });
};

// export const useUpdateOrder = (token) => {
//     return useMutation({
//         mutationFn: ({ orderId, data }) =>
//             axiosInstance.patch(`/orders/orders/${orderId}/`, data, {
//                 headers: {
//                     Authorization: `Token ${token}`,
//                 },
//             }),
//     });
// };


// export const useReplaceOrder = (token) => {
//     return useMutation({
//         mutationFn: ({ orderId, data }) =>
//             axiosInstance.put(`/orders/orders/${orderId}/`, data, {
//                 headers: {
//                     Authorization: `Token ${token}`,
//                 },
//             }),
//     });
// };



// export const useDeleteOrder = (token) => {
//     return useMutation({
//         mutationFn: (orderId) =>
//             axiosInstance.delete(`/orders/cart/items/${orderId}/`, {
//                 headers: {
//                     Authorization: `Token ${token}`,
//                 },
//             }),
//     });
// };

