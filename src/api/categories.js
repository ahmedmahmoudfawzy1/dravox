import axiosInstance from "./axionInstance";

export const getAllCategories = async () => {
    const { data } = await axiosInstance.get("/categories/");
    return data.results;
};

export const getSingleCategory = async (slug) => {
    const { data } = await axiosInstance.get(`/categories/${slug}/`)
    console.log(data)
    return data
};
