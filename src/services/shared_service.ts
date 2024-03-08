import { api } from '@/utils';
import { useSharedStore } from '@/store';

const createEvent = async (data: any) => {
    try {
        const response = await api().post('/events/create', data);
        const sharedStore = useSharedStore();
        sharedStore.addEvents(response.data.event);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
};

const getEvent = async (type: string) => {
    try {
        const response = await api().get('/events/get/' + type);
        const sharedStore = useSharedStore();
        sharedStore.setEvents(response.data.events);
    } catch (error) {
        return Promise.reject(error);
    }
};

const getRhRequest = async () => {
    try {
        const response = await api().get('/dmnd/get-by-id');
        const sharedStore = useSharedStore();
        sharedStore.setRhRequest(response.data.demande);
    } catch (error) {
        return Promise.reject(error);
    }
};

const getRecruitment = async () => {
    try {
        const response = await api().get('/dmnd/get-recruitement-by-id');
        const sharedStore = useSharedStore();
        sharedStore.setRecruitment(response.data.recruitments);
    } catch (error) {
        return Promise.reject(error);
    }
};

const getFournisseurs = async () => {
    try {
        const response = await api().get('/tiers/getFournisseur');
        const sharedStore = useSharedStore();
        sharedStore.setFournisseurs(response.data.fournisseur);
    } catch (error) {
        return Promise.reject(error);
    }
};

const getSoustraitant = async () => {
    try {
        const response = await api().get('/tiers/getSoustraitant');
        const sharedStore = useSharedStore();
        sharedStore.setFournisseurs(response.data.fournisseur);
    } catch (error) {
        return Promise.reject(error);
    }
};

const getProjects = async () => {
    try {
        const response = await api().get('/projects/get');
        const sharedStore = useSharedStore();
        sharedStore.setProjects(response.data.projects);
    } catch (error) {
        return Promise.reject(error);
    }
};

const getClients = async () => {
    try {
        const response = await api().get('/clients/get');
        const sharedStore = useSharedStore();
        sharedStore.setClients(response.data.clients);
    } catch (error) {
        return Promise.reject(error);
    }
};

const getDashboard = async () => {
    try {
        const role = localStorage.getItem('role');
        const response = await api().get('/dashboard/' + role);
        const sharedStore = useSharedStore();
        sharedStore.setDashboardStats(response.data.stats);
    } catch (error) {
        return Promise.reject(error);
    }
};


const deleteRecruitment = async () => {
    try {
        const sharedStore = useSharedStore();
        const id = sharedStore.selectedItem.id;
        const response = await api().delete('/dmnd/delete-recruitement/' + id);
        if (response.status == 200) {
            sharedStore.deleteRecruitment(id);
            // const dmndIndex = sharedStore.recruitment.data.findIndex((item) => item.id === id);
            // if (dmndIndex !== -1) {
            //     sharedStore.recruitment.data.splice(dmndIndex, 1);
            // }
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

const addNewRecruitment = async (data: any) => {
    try {
        const response = await api().post('rh/recrute/request', data);
        if (response.status == 200) {
            const sharedStore = useSharedStore();
            sharedStore.pushRecruitment(response.data.recrutement);
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

const createTier = async (data: any) => {
    try {
        const response = await api().post('/tiers/insert', data);
        if (response.status == 201) {
            const sharedStore = useSharedStore();
            sharedStore.pushFournisseur(response.data.tier);
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

const deleteSoustraitant = async () => {
    try {
        const sharedStore = useSharedStore();
        const id = sharedStore.selectedItem;
        const response = await api().delete('/tiers/delete/' + id);
        if (response.status == 200) {
            sharedStore.deleteSoustraitant(id);
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

export default {
    createEvent,
    getEvent,
    getRhRequest,
    getRecruitment,
    getFournisseurs,
    getSoustraitant,
    getProjects,
    getClients,
    getDashboard,
    deleteRecruitment,
    addNewRecruitment,
    createTier,
    deleteSoustraitant
};