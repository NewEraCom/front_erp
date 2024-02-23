import { useCautionStore } from '@/store';
import { api } from '@/utils';


 async function get() {
    try {
        const CautionStore = useCautionStore();
                const response = await api().get('cautions/index');
        if (response.status == 200) {
            CautionStore.SetCaution(response.data);
            return response.data;
        }
    } catch (error) {
        console.log(error);
        return Promise.reject(error);

    }
}
 async function recover(id) {
    try {
        const CautionStore = useCautionStore();


        const response = await api().post('cautions/recover/' + id);
        if (response.status == 200) {
            let caution = CautionStore.caution.find((item) => item.id === id);
            if (caution) {
                Object.assign(caution, response.data.caution);
            }
        } 
    } catch (error) {
        console.log(error);
    }
}

export default {
    get,
    recover
}