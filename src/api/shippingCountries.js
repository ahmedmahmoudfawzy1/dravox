import axiosInstance from "./axionInstance"



export const getAllshippingCountries = async () => {
    const { data } = await axiosInstance.get("/shipping-countries/")
    return data.countries
}