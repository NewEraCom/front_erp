import { defineStore } from 'pinia';


export const usePMStore = defineStore('PMStore', {
    state: () => ({
        purchase: null,
        stats: null,
        facture: null,
        borderaux: null,
        item: null,
        ItemId: null,
        composants: null,
        print_articles: null,
        print_facture: null,
        project: null,
        selectedArticle: null,
        outOfStock: {
            data: null,
            stats: null,
        }
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
        setPurchases(data: any) {
            this.purchase = data.purchases;

        },
        clearPurchase() {
            this.purchase = null;
        },
        clearStats() {
            this.stats = null;
        },
        setDashboardData(data: any) {
            this.stats = data;
        },
        setFacture(data) {
            this.facture = data.facture;
            this.stats = data.stats;
        },
        setBorderaux(data) {
            this.borderaux = data;
        },
        setProject(data: any) {
            this.project = data;
        },
        clearProject() {
            this.project = null;
        },
        setSelectedArticle(data: any) {
            this.selectedArticle = data;
        },
        clearSelectedArticle() {
            this.selectedArticle = null;
        },
        pushPurchaseOrder(data: any) {
            this.project.purchase.push(data);
        },
        deletePurchaseOrderFromProject(id: number) {
            const itemIdToDelete = id;
            const indexToDelete = this.project.purchase.findIndex((item: any) => item.id == itemIdToDelete);
            if (indexToDelete !== -1) {
                this.project.purchase.splice(indexToDelete, 1);
            } else {
                console.log('Item not found in array.');
            }
        },
        updateProjectArticle(data: any) {
            const indexToUpdate = this.project.pre_project.articles.findIndex((item: any) => item.id == data.id);
            if (indexToUpdate !== -1) {
                this.project.pre_project.articles.splice(indexToUpdate, 1, data);
            } else {
                console.log('Item not found in array.');
            }
        },
        setOutOfStockRequests(data: any) {
            this.outOfStock.data = data;
            this.outOfStock.stats = {
                pending: data.filter((item: any) => item.status === 'pending').length,
                ongoing: data.filter((item: any) => item.status === 'on going').length,
                completed: data.filter((item: any) => item.status === 'done').length,
            };
        },
        clearOutOfStockRequests() {
            this.outOfStock.data = null;
            this.outOfStock.stats = null;
        },

    },
});
