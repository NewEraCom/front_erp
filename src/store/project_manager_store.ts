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
        },
        preproject: {
            data: null,
            stats: null,
        },
        projectManager: null,
        preprojectDetail: null,
        projects: null,
        selectedItem: null,
        caisse_project: null,
        caisse_project_sum: null,
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
            // .reduce((acc, item) => acc + item.montant, 0)
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


        setPreProject(data: any) {
            this.preproject.data = data.preProjects;
            this.preproject.stats = data.stats;

        },
        setPreProjectDetail(data: any) {
            this.preprojectDetail = data;
        },
        async closeChiffratePreProject(data) {
            // eslint-disable-next-line camelcase
            this.preproject.data.chiffrage_status = data;
        },
        async removeChiffragePreProject(id) {
            const itemIdToDelete = id;
            const indexToDelete = this.preproject.data.chiffrages.findIndex(
                (item) => item.id == itemIdToDelete
            );
            if (indexToDelete !== -1) {
                this.preproject.data.chiffrages.splice(indexToDelete, 1);
            } else {
                console.log('Item not found in array.');
            }
        },
        async setBordereauOnMass(id, data) {
            if (this.preproject.data.type_project === 'simple') {
                for (const item in data) {
                    this.preproject.data.articles.push(data[item]);
                }
            } else {
                const lot = this.preproject.data.lots.find((item) => item.id == id);
                for (const item in data) {
                    lot.articles_lot.push(data[item]);
                }
            }
        },
        async setChiffrageOnMass(data) {
            for (const item in data) {
                this.preproject.data.chiffrages.unshift(data[item]);
            }
        },
        async setChiffragePreProject(data) {
            this.preproject.data.chiffrages.push(data);
        },
        async pushPreProjects(res) {
            for (const item in this.preproject.data) {
                if (this.preproject.data[item].id === res.preProject.id) {
                    this.preproject.data[item] = res.preProject;
                }
            }

            this.stats = [
                res.stats.pre_projects_win,
                res.stats.pre_projects_lost,
                res.stats.pre_projects_waiting_validation,
                res.stats.pre_projects_in_submission
            ];
        },
        setSelectedItem(data: any) {
            this.selectedItem = data;
        },
        setCaisseProject(data: any) {
            this.caisse_project = data;
        }
    },
});
