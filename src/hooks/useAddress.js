import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axionInstance";

export const useGetAddresses = (token) =>
    useQuery({
        queryKey: ["addresses"],
        queryFn: () =>
            axiosInstance.get("/account/addresses/", {
                headers: { Authorization: `Token ${token}` },
            }),
        enabled: !!token,
    });

export const useGetAddressById = (id, token) =>
    useQuery({
        queryKey: ["address", id],
        queryFn: () =>
            axiosInstance.get(`/account/addresses/${id}/`, {
                headers: { Authorization: `Token ${token}` },
            }),
        enabled: !!id && !!token,
    });

export const useCreateAddress = (token) =>
    useMutation({
        mutationFn: (data) =>
            axiosInstance.post("/account/addresses/", data, {
                headers: { Authorization: `Token ${token}` },
            }),
    });

export const useUpdateAddress = (token) =>
    useMutation({
        mutationFn: ({ id, data }) =>
            axiosInstance.patch(`/account/addresses/${id}/`, data, {
                headers: { Authorization: `Token ${token}` },
            }),
    });


export const useDeleteAddress = (token) =>
    useMutation({
        mutationFn: (id) =>
            axiosInstance.delete(`/account/addresses/${id}/`, {
                headers: { Authorization: `Token ${token}` },
            }),
    });
