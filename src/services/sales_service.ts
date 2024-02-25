import { api } from '@/utils';
import { useSalesStore } from '@/store';

const getPurchaseOrders = async (type: string) => {
    try {
        const response = await api().get('/purchase/get/' + type);
        const salesStore = useSalesStore();
        salesStore.setPurchaseOrders(response.data.purchases);
    } catch (error) {
        return Promise.reject(error);
    }
};

const getBonDeCommande = async () => {
    try {
        const response = await api().get('/logistics/bon-commande/');
        const salesStore = useSalesStore();
        salesStore.setBonDeCommande(response.data.bonCommandes);
    } catch (error) {
        return Promise.reject(error);
    }
};

const getFacturesClient = async () => {
    try {
        const response = await api().get('/facture/client/get');
        const salesStore = useSalesStore();
        salesStore.setInvoices(response.data.factures);
    } catch (error) {
        return Promise.reject(error);
    }
};



export default {
    getPurchaseOrders,
    getBonDeCommande,
    getFacturesClient
};