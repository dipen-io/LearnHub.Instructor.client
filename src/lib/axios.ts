import axios from "axios";

//GET THE URL
const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
    baseURL: API_URL,
})

// Addting tokent to request
// TODO: if token is expired then direct calling the /refreshToken
axiosInstance.interceptors.request.use(
    (config) => {
        const token = "tken";
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
)
export {axiosInstance}
