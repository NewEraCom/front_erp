import { defineStore } from 'pinia';


export const usePMStore = defineStore('PMStore', {
    state: () => ({
        purchase: null,
        stats: null,
        

       
        item: null,
        ItemId: null,
        composants: null,
        print_articles: null,
        print_facture: null
    }),
   

    actions: {
        clearStore() {
            this.purchase = null;
            this.stats = null;
        },
       

        setItemId(id) {
            this.ItemId = id;
        },
        setItem(data) {
            this.item = data;
        },
        setPurchases(data:any){
            this.purchase = data.purchases;
            // this.stats = {
            //     purchase_total: data.purchase.length,
            //     purchase_valid: data.data.purchase_done ? data.data.purchase_done : 0,
            //     purchase_refuse: data.data.purchase_refuse ? data.data.purchase_refuse : 0,
            //     purchase_in_progress: data.data.purchase_in_progress ? data.data.purchase_in_progress : 0,
            // };
        },
        setDashboardData(data:any){
            this.stats = data;
        },
    }
});
