import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "vue3-toastify";

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = Cookies.get("auth_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    toast.error("Bad request. Please verify your input.");
                    break;
                case 401:
                    toast.error("Unauthorized: Incorrect email or password.");
                    break;
                case 403:
                    toast.error("Forbidden: You don't have access.");
                    break;
                case 404:
                    toast.error("Resource not found.");
                    break;
                case 500:
                    toast.error("Server error. Please try again later.");
                    break;
                default:
                    toast.error(`Error: ${error.response.statusText}`);
            }
        } else if (error.request) {
            toast.error("Network error. No response from server.");
        } else {
            toast.error(`Error: ${error.message}`);
        }
        return Promise.reject(error);
    }
);

export default api;