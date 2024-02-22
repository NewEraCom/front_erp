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


export default {
    login
};