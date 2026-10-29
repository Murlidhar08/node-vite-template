import { getBaseApiURL } from "@/utils/common-function";
import axios from "axios";

const API_BASE = getBaseApiURL();
const axiosLib = axios.create({
    baseURL: API_BASE,
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Request interceptor
axiosLib.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
axiosLib.interceptors.response.use(
    (response) => response,
    (error) => {
        const message =
            error.response?.data?.message ||
            error.message ||
            "Something went wrong";

        return Promise.reject(new Error(message));
    }
);

export default axiosLib;
export { axiosLib };