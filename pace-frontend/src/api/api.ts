import axios from "axios";
const refreshURL = import.meta.env.VITE_REFRESH_TOKEN_URL;
const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

API.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {

            if (originalRequest.url.includes(refreshURL)) {
                return Promise.reject(error);
            }

            originalRequest._retry = true;

            try {
                await API.post(refreshURL);
                return API(originalRequest);

            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default API;