import { useMutation } from "@tanstack/react-query";
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



export const useCancelOrder = (token) => {
    return useMutation({
        mutationFn: (orderId) =>
            axiosInstance.post(`/orders/orders/${orderId}/cancel/`, null, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
    });
};


export const useUpdateOrder = (token) => {
    return useMutation({
        mutationFn: ({ orderId, data }) =>
            axiosInstance.patch(`/orders/orders/${orderId}/`, data, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            }),
    });
};


export const useReplaceOrder = (token) => {
    return useMutation({
        mutationFn: ({ orderId, data }) =>
            axiosInstance.put(`/orders/orders/${orderId}/`, data, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            }),
    });
};



export const useDeleteOrder = (token) => {
    return useMutation({
        mutationFn: (orderId) =>
            axiosInstance.delete(`/orders/orders/${orderId}/`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            }),
    });
};
