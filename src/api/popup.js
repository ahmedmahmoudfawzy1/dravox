import axiosInstance from "./axionInstance"



export const getPopup = async () => {
    const { data } = await axiosInstance("/popups/")
    return data.results
}