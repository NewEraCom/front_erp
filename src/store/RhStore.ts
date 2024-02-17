import { defineStore } from 'pinia';

export const useRhStore = defineStore('RhStore', {
    state: () => ({
        stats: null,
        contractsExpiredThisMonth: null,
    }),
    actions: {
        initialData(data){
            this.stats = data.stats;
            this.contractsExpiredThisMonth = data.contractsExpiredThisMonth;
        }
    }
});