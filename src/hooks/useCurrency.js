import { useQuery, useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axionInstance";
import { toast } from "react-toastify";

export const useGetCurrency = (token) => {
    return useQuery({
        queryKey: ["currency"],
        queryFn: () =>
            axiosInstance.get("/currencies/", {
                headers: { Authorization: `Token ${token}` },
            }),
        enabled: !!token,
        select: (data) => data.data.results,
    });
};

export const useUpdateCurrency = (token) => {
    return useMutation({
        mutationFn: (currencyValue) =>
            axiosInstance.patch(
                "/currencies/",
                { currency: currencyValue },
                {
                    headers: { Authorization: `Token ${token}` },
                }
            ),

    });
};
