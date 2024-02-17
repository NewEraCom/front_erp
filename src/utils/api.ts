import axios from 'axios';

axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';

const api = (baseURL = import.meta.env.VITE_API_URL, token = JSON.parse(localStorage.getItem('token'))) => {
    const instance = axios.create({
        baseURL: baseURL,
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
        }
    });

    instance.interceptors.request.use((config) => {
        if (token) {
            config.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))}`;
        }
        return config;
    });

    return instance;
};

export default api;