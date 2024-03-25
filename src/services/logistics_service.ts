import { api } from '@/utils';
import { useLogisticsStore } from '@/store';


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

const getOperationCaisse = async (from: string) => {
    try {
        const response = await api().get('/logistics/caisse/operation/' + from);
        const logisticsStore = useLogisticsStore();
        logisticsStore.setOperationCaisse(response.data.caisse, response.data.solde);
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

const getVehiculeById = async (id: number) => {
    try {
        const response = await api().get('/logistics/vehicule/getById/' + id);
        const logisticsStore = useLogisticsStore();
        logisticsStore.setVehicule(response.data.vehicule);
    }
    catch (error) {
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
async function validateCaisse(id: number) {
    try {
        const response = await api().post('logistics/caisse/validate/' + id);
        if (response.status == 200) {
            await getOperationCaisse();
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}
const getDemandeSortie = async () => {
    try {
        const logisticsStore = useLogisticsStore();
        const response = await api().get('/logistics/stock/get-all-sortie');
        logisticsStore.demandeSortie = response.data.sorties;
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

const newCaisseOperation = async (data: any, form: string) => {
    try {
        const response = await api().post('/logistics/caisse/operation', data);
        if (response.status == 201) {
            console.log(form);
            const logisticsStore = useLogisticsStore();
            logisticsStore.pushOperationCaisse(response.data.caisse_operation);


        }
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

const newSubscription = async (data: any) => {
    try {
        const response = await api().post('/logistics/pacgsm', data);
        if (response.status == 201) {
            const logisticsStore = useLogisticsStore();
            logisticsStore.pushSubscription(response.data.data);
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

const editSubscription = async (data: any) => {
    try {
        const response = await api().put('/logistics/pacgsm/' + data.id, data);
        if (response.status == 200) {
            const logisticsStore = useLogisticsStore();
            logisticsStore.setSubscription(response.data.data);
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

const affectSubscription = async (data: any) => {
    try {
        const response = await api().post('/logistics/pacgsm/affect', data);
        const logisticsStore = useLogisticsStore();
        if (response.status == 200) {
            logisticsStore.setSubscription(response.data.data);
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

const deleteSubscription = async () => {
    try {
        const logisticsStore = useLogisticsStore();
        const id = logisticsStore.selectedItem.id;
        const response = await api().delete('/logistics/pacgsm/' + id);
        if (response.status == 200) {
            logisticsStore.deleteSubscription(id);
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

const recoverSubscription = async (data: any) => {
    try {
        const response = await api().post('/logistics/pacgsm/desaffect', data);
        const LogisticsStore = useLogisticsStore();
        if (response.status == 200) {
            LogisticsStore.setSubscription(response.data.data);
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

const deleteSubscriptionById = async () => {
    try {
        const logisticsStore = useLogisticsStore();
        const id = logisticsStore.selectedItem;
        const response = await api().delete('/logistics/pacgsm/affect/' + id);
        if (response.status == 200) {
            logisticsStore.deleteSubscription(id);
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

const createLouer = async (data: any) => {
    try {
        const response = await api().post('/logistics/louer', data);
        if (response.status == 201) {
            const logisticsStore = useLogisticsStore();
            logisticsStore.pushLouer(response.data.louer);
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

const removecardsCarburant = async () => {
    try {
        const logisticsStore = useLogisticsStore();
        const id = logisticsStore.selectedItem;
        const response = await api().delete('/logistics/carte-gasoil/' + id);
        if (response.status == 200) {
            logisticsStore.removecardsCarburant(id);
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

const getAchatsForTransport = async (demandeAchatId :number) => {
    try {
        const response = await api().get('/purchase/get_achats/'+demandeAchatId);
        const logisticsStore = useLogisticsStore();
        logisticsStore.setTransport(response.data);
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
    deleteCaisseOperation,
    validateCaisse,
    getDemandeSortie,
    newSubscription,
    editSubscription,
    deleteSubscription,
    recoverSubscription,
    affectSubscription,
    createLouer,
    getVehiculeById,
    deleteSubscriptionById,
    removecardsCarburant,
    newCaisseOperation,
    getAchatsForTransport
};


