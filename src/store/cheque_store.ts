import { defineStore } from 'pinia';


export const useChequeStore = defineStore('ChequeStore', {
    state: () => ({
        cheque: null,
        stats: null,
       
        item: null,
        ItemId: null,
       
    }),
   

    actions: {
        clearStore() {
            this.facture = null;
        },
        SetCheque(data:any){
            this.cheque = data.cheques;
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
