import { defineStore } from 'pinia';

export const useSalesStore = defineStore('SalesStore', {
    state: () => ({
        purchaseOrders: {
            data: null,
            stats: null,
            chart: null,
        },
    }),
    actions: {
        setPurchaseOrders(purchases: any) {
            this.purchaseOrders.data = purchases;
            this.purchaseOrders.stats = {
                total: purchases.length,
                pending: purchases.filter((p: any) => p.status === 'pending').length,
                ongoing: purchases.filter((p: any) => p.status === 'on going').length,
                completed: purchases.filter((p: any) => p.status === 'done').length,
            };
            this.purchaseOrders.chart = {
                labels: ['En attente', 'En cours', 'Traitée'],
                datasets: [
                    {
                        label: 'Commandes',
                        data: [
                            this.purchaseOrders.stats.pending,
                            this.purchaseOrders.stats.ongoing,
                            this.purchaseOrders.stats.completed,
                        ],
                        backgroundColor: ['#FFC107', '#17A2B8', '#28A745'],
                    },
                ],
            };
        }
    }
});