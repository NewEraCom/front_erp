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
        invoices: {
            data: null,
            stats: null,
        },
        purchase: null,
        ItemId: null,
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
        }
    }
});