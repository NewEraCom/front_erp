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


const getPurchaseOrdersByProjectManager = async (type: string) => {
    try {
        const response = await api().get('/purchase/get-by-project-manager/' + type);
        const salesStore = useSalesStore();
        salesStore.setPurchaseOrders(response.data.purchases);
    } catch (error) {
        return Promise.reject(error);
    }
};

const getPurchaseOrderById = async (id: number) => {
    try {
        const response = await api().get('/purchase/get-purchase-order/' + id);
        const salesStore = useSalesStore();
        salesStore.setPurchase(response.data.order);
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
async function ValidateArticle(id: number) {
    try {


        const response = await api().post('purchase/validate-article/' + id);
        if (response.status == 200) {
            console.log(response.data);
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}



export default {
    getPurchaseOrders,
    getBonDeCommande,
    getFacturesClient,
    getPurchaseOrdersByProjectManager,
    getPurchaseOrderById,
    ValidateArticle
};