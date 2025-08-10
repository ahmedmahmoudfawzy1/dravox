import axiosInstance from "./axionInstance"


export const dravoxInfo = async () => {
    const { data } = await axiosInstance("/store/info/")
    return data
}