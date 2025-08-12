

import axios from "axios";
import useAuthStore from "../store/authStore";
import axiosInstance from "./axionInstance";
import Cookies from "js-cookie"

export const signUpUser = (formData) => {
    return axiosInstance.post("/account/auth/register/", formData, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    }).then((res) => res)
};

export const loginUser = async (loginFormData) => {
    return await axiosInstance.post('/account/auth/login/', loginFormData, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },

    }).then(res => res.data);
};

export const getUserProfile = () => {
    return axiosInstance.get('account/auth/profile').then(res => res.data);
};




export const logoutUser = async () => {
    try {
        const token = Cookies.get("token");
        // console.log(token)

        await axiosInstance.post("/account/auth/logout/", {},
            {
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        );

        Cookies.remove("token");
        useAuthStore.getState().logout();
        localStorage.removeItem("user")
    } catch (error) {
        console.error("Logout Error:", error);
    }
};


export const getUserAccount = (token) => {
    return axiosInstance.get('/account/user/me/', {
        headers: {
            Authorization: `Token ${token}`
        }
    }).then((res) => {
        // console.log(res.data)
        return res.data
    })
}