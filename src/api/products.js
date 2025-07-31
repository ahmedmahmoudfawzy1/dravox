import axiosInstance from "./axionInstance";


export const getAllProducts = async (currency, filters) => {
    let constructedFilters = {}

    if(filters?.categories?.[0]) constructedFilters = {...constructedFilters, category_id: filters?.categories?.[0]}
    if(filters?.priceRange?.[1] || filters?.priceRange?.[1] == 0) constructedFilters = {...constructedFilters, max_price: filters?.priceRange?.[1]}
    if(filters?.priceRange?.[0] || filters?.priceRange?.[0] == 0) constructedFilters = {...constructedFilters, min_price: filters?.priceRange?.[0]}

    const { data } = await axiosInstance.get(`/products/?currency=${currency}`, {
        params: constructedFilters
    });
    return data.results;
};


export const getSingleProduct = async (slug) => {
    return await axiosInstance.get(`/products/${slug}/`).then(res => res.data);
};
export const getCurrencies = async () => {
    return await axiosInstance.get(`/currencies/`).then(res => res.data);
};



