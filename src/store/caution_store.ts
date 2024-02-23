import { defineStore } from 'pinia';


export const useCautionStore = defineStore('CautionStore', {
    state: () => ({
        caution: null,
        stats: null,
       
        item: null,
        ItemId: null,
       
    }),
   

    actions: {
        clearStore() {
            this.facture = null;
        },
        SetCaution(data:any){
            this.caution = data.cautions;
            this.stats = data.kpis;
        },

        setItemId(id) {
            this.ItemId = id;
        },
        setItem(data) {
            this.item = data;
        },
        
       
    }
});
