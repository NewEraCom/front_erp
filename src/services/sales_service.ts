import { api } from '@/utils';
import { useSalesStore } from '@/store';

const getPurchaseOrders = async () => {
    try {
        const response = await api().get('/purchase/get');
        const salesStore = useSalesStore();
        salesStore.setPurchaseOrders(response.data.purchases);
    } catch (error) {
        return Promise.reject(error);
    }
};


export default {
    getPurchaseOrders
};