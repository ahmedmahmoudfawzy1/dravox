import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axionInstance";

export const useCreateOrder = () => {
    return useMutation({
        mutationFn: (orderData) =>
            axiosInstance.post("/orders/orders/", orderData),
    });
};
