import { create } from "zustand";
import Cookies from "js-cookie"
const useAuthStore = create((set) => {
    const userFromStorage = localStorage.getItem("user");
    let parsedUser = null;

    try {
        if (userFromStorage && userFromStorage !== "undefined") {
            parsedUser = JSON.parse(userFromStorage);
        }
    } catch (error) {
        console.error("Invalid JSON in localStorage 'user':", error);
        localStorage.removeItem("user");
    }

    return {
        token: Cookies.get("token") || null,
        user: parsedUser,
        userLogin: (user, token) => {
            Cookies.set("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            set({ user, token });
        },
        logout: () => {
            Cookies.remove("token");
            localStorage.removeItem("user");
            set({ user: null, token: null });
        },
    };
});


export default useAuthStore
