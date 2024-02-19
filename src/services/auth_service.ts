import { api } from '@/utils';
import { helpers } from '@/utils';

const login = async (formData: { email: string, password: string }) => {
    try {
        const response = await api().post('/auth/login', formData);
        if (response.status === 200) {
            helpers.setSavedUser(response.data);
            helpers.redirectBasedOnRole(response.data.user.roles[0].name);
            return response;
        }
        throw new Error('Login failed with status: ' + response.status);
    } catch (error) {
        console.error(error);
        return error;
    }
};


export default {
    login
};