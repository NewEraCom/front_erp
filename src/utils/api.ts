import router from '@/router';
import axios, { AxiosError } from 'axios';

axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';


const api = (baseURL = import.meta.env.VITE_API_URL, token = localStorage.getItem('token')) => {
    const instance = axios.create({
        baseURL: baseURL,
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
        }
    });

    instance.interceptors.request.use((config) => {
        // Ensure the latest token is always used
        const updatedToken = localStorage.getItem('token');
        if (updatedToken) {
            config.headers.Authorization = `Bearer ${updatedToken}`;
        }
        return config;
    });

    instance.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
            if (error.response && error.response.status === 401) {
                try {
                    localStorage.clear();
                    router.push('/login');
                    return;
                } catch (refreshError) {
                    // Handle failure to refresh the token, e.g., logging out the user
                    router.push('/login');
                    return Promise.reject(refreshError);
                }
            }
            return Promise.reject(error);
        }
    );

    return instance;
};

export default api;
