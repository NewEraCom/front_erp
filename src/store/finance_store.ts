import { defineStore } from 'pinia';


export const useFinanceStore = defineStore('FinanceStore', {
    state: () => ({
        facture: null,
        stats: null,
        caution: null,
        cheque: null,

       
        item: null,
        ItemId: null,
        composants: null,
        print_articles: null,
        print_facture: null,
        print_facture_attachement: null,
        print_facture_composant: null,

        comment: 'comment',
        objet:'objet',
    }),
   

    actions: {
        clearStore() {
            this.facture = null;
        },
        setFacture(data) {
            this.facture = data.facture;
            this.stats = data.stats;
        },
        setComposants(data) {
            this.composants = data;
        },

        setItemId(id) {
            this.ItemId = id;
        },
        setItem(data) {
            this.item = data;
        },
        
        PrintClear() {
            this.print_articles = null;
            this.print_facture = null;
            this.print_facture_attachement = null;
        },
        Print(data) {
            this.PrintClear();
            this.print_articles = data.facture_article;
            this.print_facture = data;
            this.print_facture_attachement = data.facture_attachement;
            console.log(data);
        },
        SetCaution(data:any){
            this.caution = data.cautions;
            this.stats = data.kpis;
        },
        SetCheque(data:any){
            this.cheque = data.cheques;
            this.stats = data.kpis;
        },
        setAttachementFacture(data) {
            this.facture_attachement = data.facture_attachement;
            this.stats = data.stats;
        },
    }
});
