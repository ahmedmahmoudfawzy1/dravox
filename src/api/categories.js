import axiosInstance from "./axionInstance";

export const getAllCategories = async () => {
    const { data } = await axiosInstance.get("/categories/");

    return data.results;
};

export const getSingleCategory = async (slug) => {

    try {
        const { data } = await axiosInstance.get(`/categories/${slug}/`);
        console.log("Data from API:", data);
        return data;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};
