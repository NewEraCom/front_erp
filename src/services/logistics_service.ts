import { api } from '@/utils';
import { useLogisticsStore } from '@/store';
import { useSalesStore } from '@/store';


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
        const response = await api().get('/logistics/transport/');
        const salesStore = useSalesStore();
        salesStore.setPurchaseOrders(response.data.purchases);
    } catch (error) {
        return Promise.reject(error);
    }
};
async function validateCaisse(id: number) {
    try {


        const response = await api().post('logistics/caisse/validate/' + id);
        if (response.status == 200) {
            console.log(response.data);

            
            await getOperationCaisse()

            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}


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
    validateCaisse
};


