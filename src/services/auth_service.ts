import router from '@/router';
import { api, helpers } from '@/utils';

const login = async (formData: { email: string, password: string }) => {
    try {
        const response = await api().post('/auth/login', formData);
        helpers.setSavedUser(response.data);
        helpers.redirectBasedOnRole(response.data.user.roles[0].name);
        return response;
    } catch (error) {
        return Promise.reject(error);

    }
};

const logout = async () => {
    try {
        const response = await api().post('/auth/logout');
        localStorage.clear();
        return response.status;
    } catch (error) {
        return Promise.reject(error);
    }
};

const refreshToken = async () => {
    try {
        localStorage.clear();
        router.push({ name: 'Login' });
    } catch (error) {
        return Promise.reject(error);
    }
};

export default {
    login,
    logout,
    refreshToken
};