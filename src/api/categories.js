import axiosInstance from "./axionInstance";

export const getAllCategories = async () => {
    const { data } = await axiosInstance.get("/categories/");
    return data.results;
};

export const getSingleCategory = (slug) => {
    const { data } = axiosInstance.get(`/categories/${slug}/`)
    return data.results;
}