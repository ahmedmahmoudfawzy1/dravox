import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://api.getdravox.com/api/v0.1",
    withCredentials: true,
})


export default axiosInstance;




