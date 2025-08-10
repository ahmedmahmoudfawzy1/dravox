import axiosInstance from "./axionInstance"



export const seoCongig = async () => {
    const { data } = await axiosInstance("/store/meta/")
    return data
}