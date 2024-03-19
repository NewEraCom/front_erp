import { defineStore } from 'pinia';

export const useSalesStore = defineStore('SalesStore', {
    state: () => ({
        purchaseOrders: {
            data: null,
            stats: null,
            chart: null,
        },
        bonDeCommande: {
            data: null,
            stats: null,
            chart: null,
        },
        selectedBonDeCommande: null,
        invoices: {
            data: null,
            stats: null,
        },
        demande_caisse: {
            data: null,
            stats: null,
        },
        purchase: null,
        ItemId: null,
        print_commande: null,
        print_bonCommande: null,
        commande: null,
        article: null,
        table_comperatif: null,
    }),
    actions: {
        setPurchaseOrders(purchases: any) {
            this.purchaseOrders.data = purchases;
            this.purchaseOrders.stats = {
                total: purchases.length,
                pending: purchases.filter((p: any) => p.status === 'pending').length,
                ongoing: purchases.filter((p: any) => p.status === 'en cours').length,
                waiting: purchases.filter((p: any) => p.status === 'waiting').length,
                onroad: purchases.filter((p: any) => p.status === 'on road').length,
                completed: purchases.filter((p: any) => p.status === 'valide').length,
            };
        },
        setPurchase(purchase: any) {
            this.purchase = purchase;
        },
        clearPurchase() {
            this.purchase = null;
        },
        clearPurchaseOrders() {
            this.purchaseOrders.data = null;
            this.purchaseOrders.stats = null;
            this.purchaseOrders.chart = null;
        },
        setBonDeCommande(data: any) {
            this.bonDeCommande.data = data;
            this.bonDeCommande.stats = {
                total: data.length,
                pending: data.filter((p: any) => p.status === 'pending').length,
                ongoing: data.filter((p: any) => p.status === 'on going').length,
                completed: data.filter((p: any) => p.status === 'done').length,
            };
        },
        clearBonDeCommande() {
            this.bonDeCommande.data = null;
            this.bonDeCommande.stats = null;
            this.bonDeCommande.chart = null;
        },
        setOneBonDeCommande(data: any) {
            this.selectedBonDeCommande = data;
        },
        clearOneBonDeCommande() {
            this.selectedBonDeCommande = null;
        },
        setInvoices(data: any) {
            this.invoices.data = data;
            this.invoices.stats = {
                total: data.length,
                pending: data.filter((p: any) => p.status === 'pending').length,
                ongoing: data.filter((p: any) => p.status === 'on going').length,
                completed: data.filter((p: any) => p.status === 'done').length,
            };
        },
        clearInvoices() {
            this.invoices.data = null;
            this.invoices.stats = null;
        },
        setItemId(id: number) {
            this.ItemId = id;
        },
        setPrintCommande(data) {
            this.print_commande = data;
        },
        setPrintBonCommande(data) {
            this.print_bonCommande = data;
        },
        setDemandeCaisse(data: any) {
            this.demande_caisse.data = data;
            this.demande_caisse.stats = {
                total: data.length,
                pending: data.filter((p: any) => p.status === 'pending').length,
                ongoing: data.filter((p: any) => p.status === 'on going').length,
                completed: data.filter((p: any) => p.status === 'done').length,
            };
        },
        setTableComperatif(data: any) {
            this.table_comperatif = data;
        }
    }
});