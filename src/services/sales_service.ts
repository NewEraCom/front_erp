import { api } from '@/utils';
import { usePMStore, useSalesStore } from '@/store';

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

const getBonDeCommandeById = async (id: number) => {
    try {
        const response = await api().get('/logistics/bon-commande/details/' + id);
        const salesStore = useSalesStore();
        salesStore.setOneBonDeCommande(response.data.bonCommande);
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

const commande = async (id) => {
    try {
        const salesStore = useSalesStore();

        const res = await api().get(`logistics/bon-commande/print/${id}`);
        console.log(res.data.data);
        salesStore.commande = res.data.data;
        return res.data;
    } catch (e) {
        return Promise.reject(e);
    }
};

const createPurchaseOrder = async (data: any) => {
    try {
        const response = await api().post('/purchase/create', data);
        const pmStore = usePMStore();
        pmStore.pushPurchaseOrder(response.data.purchase);
    } catch (error) {
        return Promise.reject(error);
    }
};

const createExecutionOrder = async (data: any) => {
    try {
        const response = await api().post('/purchase/execution', data);
        const pmStore = usePMStore();
        pmStore.pushPurchaseOrder(response.data.purchase);
    } catch (error) {
        return Promise.reject(error);
    }
};

const editArticle = async (id: number, data: any) => {
    try {
        const response = await api().post('/purchase/edit-articles/' + id, data);
        const pmStore = usePMStore();
        pmStore.updateProjectArticle(response.data.article);
    } catch (error) {
        return Promise.reject(error);
    }
};

const insertTableComperatif = async(data)=>{
    try {
        const res = await api().post('purchase/table-comperatif', data);
        if (res.status === 200) {
            console.log(res);
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.log(e);
        return false;
    }
};




export default {
    getPurchaseOrders,
    getBonDeCommande,
    getFacturesClient,
    getPurchaseOrdersByProjectManager,
    getPurchaseOrderById,
    ValidateArticle,
    commande,
    editArticle,
    createExecutionOrder,
    createPurchaseOrder,
    getBonDeCommandeById,
    insertTableComperatif
};