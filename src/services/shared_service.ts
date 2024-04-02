import { api } from '@/utils';
import { useRhStore, useSharedStore } from '@/store';

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

const deleteRhRequest = async () => {
    try {
        const sharedStore = useSharedStore();
        const id = sharedStore.selectedItem;
        const response = await api().delete('rh/document-rh/delete/' + id);
        if (response.status == 200) {
            const dmndIndex = sharedStore.rhRequest.data.findIndex((item) => item.id === id);
            if (dmndIndex !== -1) {
                sharedStore.rhRequest.data.splice(dmndIndex, 1);
            }
        }
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


const deleteRecruitment = async (from: string | null) => {
    try {
        const sharedStore = useSharedStore();
        const rhStore = useRhStore();
        const id = sharedStore.selectedItem.id;
        const response = await api().delete('/dmnd/delete-recruitement/' + id);
        if (response.status == 200) {
            if (from === 'rh') {
                rhStore.deleteRecruitment(id);
            } else {
                const sharedStore = useSharedStore();
                sharedStore.deleteRecruitment(id);
            }
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

const addNewRecruitment = async (data: any, from: string | null) => {
    try {
        const response = await api().post('rh/recrute/request', data);
        if (response.status == 200) {
            if (from === 'rh') {
                const rhStore = useRhStore();
                rhStore.pushRecruitment(response.data.recrutement);
            } else {
                const sharedStore = useSharedStore();
                sharedStore.pushRecruitment(response.data.recrutement);
            }
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

async function updateSousTraitants(id, req) {
    try {


        const response = await api().post('tiers/update/' + id, req);
        if (response.status == 200) {
            const sharedStore = useSharedStore();

            console.log(response.data);
            const Soustraitant = sharedStore.soustraitants.data.find((item) => item.id === id);
            if (Soustraitant) {
                Object.assign(Soustraitant, response.data.tier);
            }
            console.log(response.data);
        }
    } catch (error) {
        console.log(error);
    }
}

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
const getFournisseur = async () => {
    try {
        const sharedStore = useSharedStore();

        const response = await api().get('tiers/getFournisseur');
        if (response.status == 200) {
            // sharedStore.fournisseurs.data = response.data.fournisseur;
            sharedStore.setFournisseurs(response.data.fournisseur);
            return response.data.fournisseur;
        }
    } catch (error) {
        console.log(error);
    }
};
const getSoustraitantById = async (id) => {
    try {
        const sharedStore = useSharedStore();

        const response = await api().get('tiers/get/' + id);
        if (response.status == 200) {
            sharedStore.Soustraitant = response.data.soustraitant;
            return response.data.soustraitant;
        }
    } catch (error) {
        console.log(error);
    }
};


const addLeave = async (data: any) => {
    try {
        const response = await api().post('rh/conge/request', data);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
};
const getItems = async () => {
    try {
        const sharedStore = useSharedStore();

        const response = await api().get('/purchase/getItems');
        if (response.status == 200) {
            sharedStore.setMainItem(response.data.mainItem) ;
            return response.data.mainItem;
        }
        return response;
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
    deleteSoustraitant,
    deleteRhRequest,
    updateSousTraitants,
    getFournisseur,
    getSoustraitantById,
    addLeave,
    getItems
};