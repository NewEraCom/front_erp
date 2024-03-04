import { api } from '@/utils';
import { useLogisticsStore } from '@/store';
import { useSalesStore } from '@/store';
import { log } from 'console';


const getStock = async (type: string) => {
    try {
        const response = await api().get('/logistics/stock/getAllStock/' + type);
        const logisticsStore = useLogisticsStore();
        logisticsStore.setStock(response.data.stock);
    } catch (error) {
        return Promise.reject(error);
    }
};

const getCaisse = async () => {
    try {
        const response = await api().get('/logistics/caisse/stat');
        const logisticsStore = useLogisticsStore();
        logisticsStore.setCaisse(response.data);
    } catch (error) {
        return Promise.reject(error);
    }
};

const getOperationCaisse = async () => {
    try {
        const response = await api().get('/logistics/caisse/operation');
        const logisticsStore = useLogisticsStore();
        logisticsStore.setOperationCaisse(response.data.caisse);
    } catch (error) {
        return Promise.reject(error);
    }
};

const getLouer = async () => {
    try {
        const response = await api().get('/logistics/louer');
        const logisticsStore = useLogisticsStore();
        logisticsStore.setLouer(response.data);
    } catch (error) {
        return Promise.reject(error);
    }
};

const getParcGsm = async () => {
    try {
        const response = await api().get('/logistics/pacgsm');
        const logisticsStore = useLogisticsStore();
        logisticsStore.setParcGsm(response.data.pagsm);
    } catch (error) {
        return Promise.reject(error);
    }
};

const getCarteCarburant = async () => {
    try {
        const response = await api().get('/logistics/carte-gasoil');
        const logisticsStore = useLogisticsStore();
        logisticsStore.setCarteCarburant(response.data.carburants);
    } catch (error) {
        return Promise.reject(error);
    }
};

const getJawaz = async () => {
    try {
        const response = await api().get('/logistics/pass-jawaz');
        const logisticsStore = useLogisticsStore();
        logisticsStore.setJawaz(response.data.jawaz);
    } catch (error) {
        return Promise.reject(error);
    }
};

const getCachets = async () => {
    try {
        const response = await api().get('/logistics/cachet');
        const logisticsStore = useLogisticsStore();
        logisticsStore.setCachets(response.data.cachets);
    } catch (error) {
        return Promise.reject(error);
    }
};

const getVehicules = async () => {
    try {
        const response = await api().get('/logistics/vehicule');
        const logisticsStore = useLogisticsStore();
        logisticsStore.setVehicules(response.data.vehicules);
    } catch (error) {
        return Promise.reject(error);
    }
};

const getTransport = async () => {
    try {
        const response = await api().get('/logistics/transport');
        const logisticsStore = useLogisticsStore();
        logisticsStore.setDelivery(response.data.delivery);
    } catch (error) {
        return Promise.reject(error);
    }
};

const getOutOfStockRequests = async () => {
    try {
        const response = await api().get('/logistics/stock/get-all-sortie');
        const logisticsStore = useLogisticsStore();
        logisticsStore.setOutOfStockRequests(response.data.sorties);
    } catch (error) {
        return Promise.reject(error);
    }
};

const createOutOfStock = async (data: any) => {
    try {
        const response = await api().post('/logistics/stock/demande-sortie', data);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

const getSubscriptionById = async (id: number) => {
    try {
        const response = await api().get('/logistics/pacgsm/' + id);
        const logisticsStore = useLogisticsStore();
        logisticsStore.setSubscription(response.data.pagsm);
    } catch (error) {
        return Promise.reject(error);
    }
};

const getGasoilById = async (id: number) => {
    try {
        const response = await api().get('/logistics/carte-gasoil/' + id);
        const logisticsStore = useLogisticsStore();
        logisticsStore.setGasoil(response.data.carteGasoile);
    } catch (error) {
        return Promise.reject(error);
    }
};

const getJawazById = async (id: number) => {
    try {
        const response = await api().get('/logistics/pass-jawaz/' + id);
        const logisticsStore = useLogisticsStore();
        logisticsStore.setSelectedJawaz(response.data.data);
    } catch (error) {
        return Promise.reject(error);
    }
};


const deleteCaisseOperation = async () => {
    try {
        const logisticsStore = useLogisticsStore();
        const id = logisticsStore.selectedItem.id;
        console.log(id);
        const response = await api().delete('/logistics/caisse/operation/' + id);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export default {
    getStock,
    getCaisse,
    getLouer,
    getParcGsm,
    getCarteCarburant,
    getJawaz,
    getCachets,
    getOperationCaisse,
    getVehicules,
    getTransport,
    createOutOfStock,
    getOutOfStockRequests,
    getSubscriptionById,
    getGasoilById,
    getJawazById,
    deleteCaisseOperation
};


