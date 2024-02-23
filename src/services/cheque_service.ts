import { useChequeStore } from '@/store';
import { api } from '@/utils';


 async function get() {
    try {
        const ChequeStore = useChequeStore();
                const response = await api().get('cheque');
        if (response.status == 200) {
            ChequeStore.SetCheque(response.data);
            return response.data;
        }
    } catch (error) {
        console.log(error);
        return Promise.reject(error);

    }
}
 async function encaisser(id) {
    try {
        const ChequeStore = useChequeStore();


        const response = await api().put('cheque/encaisser/' + id);
        if (response.status == 200) {
            let cheque = ChequeStore.cheque.find((item) => item.id === id);
            if (cheque) {
                Object.assign(cheque, response.data.cheque);
            }
        } 
    } catch (error) {
        console.log(error);
    }
}

export default {
    get,
    encaisser
}