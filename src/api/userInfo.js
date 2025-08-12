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


// Edit Profile Information


export const editUserProfile = async () => {
    try {
        const { token } = useAuthStore.getState();

        await axiosInstance.post(
            "/account/user/profile/",
            {
                first_name: "Ahmed",
                last_name: "Fawzy",
                phone_number: "+9999453853234",
                preferred_language: "en",
                preferred_currency: 1
            },
            {
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                }
            }
        ).then((res) => res.json()).then((data) => console.log(data))
    } catch (error) {
        console.error("Edit Profile Error:", error);
    }
};
