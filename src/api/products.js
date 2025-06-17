import axiosInstance from "./axionInstance";


export const getAllProducts = async () => {
    const { data } = await axiosInstance.get('/products/').then(res => res);
    return data.results
};

export const getSingleProduct = async (slug) => {
    return await axiosInstance.get(`/products/${slug}/`).then(res => res.data);
};
