import axiosInstance from "./axionInstance";


export const getAllProducts = async (currency) => {
    const { data } = await axiosInstance.get(`/products/?currency=${currency}`);
    return data.results;
};


export const getSingleProduct = async (slug) => {
    return await axiosInstance.get(`/products/${slug}/`).then(res => res.data);
};
export const getCurrencies = async () => {
    return await axiosInstance.get(`/currencies/`).then(res => res.data);
};



