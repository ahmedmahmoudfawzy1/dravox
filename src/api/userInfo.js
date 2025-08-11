import useAuthStore from "../store/authStore"
import axiosInstance from "./axionInstance"



export const getUserInfo = async () => {
    const { token } = useAuthStore.getState()
    const { data } = await axiosInstance.get("/account/user/me/", {
        headers: {
            Authorization: `Token ${token}`
        }
    })
    return data
}