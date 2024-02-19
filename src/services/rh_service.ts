import { api } from '@/utils';
import { useRhStore } from '@/store';

const getEmployees = async () => {
    try {
        const response = await api().get('/rh/get');
        if (response.status === 200) {
            const rhStore = useRhStore();
            rhStore.setEmployees(response.data.employee);
            return;
        }
        throw new Error('Get employees failed with status: ' + response.status);
    } catch (error) {
        console.error(error);
        return error;
    }
};

const getInterns = async () => {
    try {
        const response = await api().get('/stg/get');
        if (response.status === 200) {
            const rhStore = useRhStore();
            rhStore.setInterns(response.data.stagiaires);
            return;
        }
        throw new Error('Get employees failed with status: ' + response.status);
    } catch (error) {
        console.error(error);
        return error;
    }
};

const getLeaves = async () => {
    try {
        const response = await api().get('/conge/get');
        if (response.status === 200) {
            const rhStore = useRhStore();
            rhStore.setLeaves(response.data);
            return;
        }
        throw new Error('Get employees failed with status: ' + response.status);
    } catch (error) {
        console.error(error);
        return error;
    }
};

const getRecrutement = async () => {
    try {
        const response = await api().get('/rh/recrute/get');
        if (response.status === 200) {
            const rhStore = useRhStore();
            rhStore.setRecrutement(response.data.recrutement);
            return;
        }
        throw new Error('Get employees failed with status: ' + response.status);
    } catch (error) {
        console.error(error);
        return error;
    }
};

export default {
    getEmployees,
    getInterns,
    getLeaves,
    getRecrutement
};