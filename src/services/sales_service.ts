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
// async function getBonCommandeByAchatId(id: number) {
//     try {
//         const salesStore = useSalesStore();
//         const response = await api().get('purchase/bon-commande/' + id);
//         if (response.status == 200) {
//             salesStore.bonDeCommande.data = response.data;
//             return response.data;
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }
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



export default {
    getPurchaseOrders,
    getBonDeCommande,
    getFacturesClient,
    getPurchaseOrdersByProjectManager,
    getPurchaseOrderById,
    ValidateArticle,
    // getBonCommandeByAchatId,
    commande
};