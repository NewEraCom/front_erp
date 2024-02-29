import { defineStore } from 'pinia';

export const useLogisticsStore = defineStore('LogisticsStore', {
    state: () => ({
        stock: {
            data: null,
            stats: null,
            loading: false,
        },
        caisse: {
            data: null,
            stats: null,
            loading: false,
        },
        opertationCaisse: {
            data: null,
            stats: null,
            loading: false,
        },
        louer: {
            data: null,
            stats: null,
            loading: false,
        },
        parcGsm: {
            data: null,
            stats: null,
            loading: false,
        },
        cardsCarburant: {
            data: null,
            stats: null,
            loading: false,
        },
        jawaz: {
            data: null,
            stats: null,
            loading: false,
        },
        cachets: {
            data: null,
            stats: null,
            loading: false,
        },
        vehicules: {
            data: null,
            stats: null,
            loading: false,
        },
        ItemId:null,
        demandeSortie:null,
        SelecteddemandeSortie:null,
    }),
    actions: {
        setStock(data: any) {
            this.stock.data = data;
            this.stock.stats = {
                total: data.length,
                alert: data.reduce((acc: any, item: any) => {
                    if (item.qte_restant <= item.alert && item.qte_restant > 0) {
                        acc++;
                    }
                    return acc;
                }, 0),
                rupture: data.reduce((acc: any, item: any) => {
                    if (item.qte_restant == 0) {
                        acc++;
                    }
                    return acc;
                }, 0),
                totalValue: data.reduce((acc: any, item: any) => {
                    acc += item.qte_restant * item.prix_ht;
                    return acc;
                }, 0),
            };
            this.stock.loading = true;
        },
        clearStock() {
            this.stock.data = null;
            this.stock.stats = null;
            this.stock.loading = false;
        },
        setCaisse(data: any) {
            this.caisse.stats = {
                solde: data.stats.solde,
                total_entree: data.stats.entree,
                total_sortie: data.stats.sortie,
            };
            this.caisse.loading = true;
        },
        clearCaisse() {
            this.caisse.data = null;
            this.caisse.stats = null;
            this.caisse.loading = false;
        },
        setLouer(data: any) {
            this.louer.data = data.louers;
            this.louer.stats = {
                appartement: data.louers.reduce((acc: any, item: any) => {
                    if (item.type == 'Appartement' && item.a_payer == 1) {
                        acc++;
                    }
                    return acc;
                }, 0),
                villa: data.louers.reduce((acc: any, item: any) => {
                    if (item.type == 'Villa' && item.a_payer == 1) {
                        acc++;
                    }
                    return acc;
                }, 0),
                depot: data.louers.reduce((acc: any, item: any) => {
                    if (item.type == 'Dépôt' && item.a_payer == 1) {
                        acc++;
                    }
                    return acc;
                }, 0),
                magasin: data.louers.reduce((acc: any, item: any) => {
                    if (item.type == 'Magasin' && item.a_payer == 1) {
                        acc++;
                    }
                    return acc;
                }, 0),
                autre: data.louers.reduce((acc: any, item: any) => {
                    if (item.type == 'Autre' && item.a_payer == 1) {
                        acc++;
                    }
                    return acc;
                }, 0),
                total_a_payer: data.louers.reduce((acc: any, item: any) => {
                    if (item.a_payer == 1) {
                        acc += Number(item.montant);
                    }
                    return acc;
                }, 0),
            };
            this.louer.loading = true;
        },
        clearLouer() {
            this.louer.data = null;
            this.louer.loading = false;
        },
        setParcGsm(data: any) {
            this.parcGsm.data = data;
            this.parcGsm.stats = {
                iam: data.reduce((acc: any, item: any) => {
                    if (item.operator == 'IAM') {
                        acc++;
                    }
                    return acc;
                }, 0),
                orange: data.reduce((acc: any, item: any) => {
                    if (item.operator == 'ORANGE') {
                        acc++;
                    }
                    return acc;
                }, 0),
                inwi: data.reduce((acc: any, item: any) => {
                    if (item.operator == 'INWI') {
                        acc++;
                    }
                    return acc;
                }, 0),
                total_to_payer: data.reduce((acc: any, item: any) => {

                    acc += Number(item.price);

                    return acc;
                }, 0),
            };
            this.parcGsm.loading = true;

        },
        clearParcGsm() {
            this.parcGsm.data = null;
            this.parcGsm.stats = null;
            this.parcGsm.loading = false;
        },
        setCarteCarburant(data: any) {
            this.cardsCarburant.data = data;
            this.cardsCarburant.stats = {
                total: data.length,
                active: data.reduce((acc: any, item: any) => {
                    if (item.used == 1) {
                        acc++;
                    }
                    return acc;
                }, 0),
                inactif: data.reduce((acc: any, item: any) => {
                    if (item.used == 0) {
                        acc++;
                    }
                    return acc;
                }, 0),

            };
            this.cardsCarburant.loading = true;
        },
        clearCarteCarburant() {
            this.cardsCarburant.data = null;
            this.cardsCarburant.stats = null;
            this.cardsCarburant.loading = false;
        },
        setJawaz(data: any) {
            this.jawaz.data = data;
            this.jawaz.stats = {
                total: data.length,
                active: data.reduce((acc: any, item: any) => {
                    if (item.status == 'active') {
                        acc++;
                    }
                    return acc;
                }, 0),
                inactif: data.reduce((acc: any, item: any) => {
                    if (item.status == 'in stock') {
                        acc++;
                    }
                    return acc;
                },
                    0),
            };
            this.jawaz.loading = true;
        },
        clearJawaz() {
            this.jawaz.data = null;
            this.jawaz.stats = null;
            this.jawaz.loading = false;
        },
        setCachets(data: any) {
            this.cachets.data = data;
            this.cachets.stats = {
                total: data.length,
                active: data.reduce((acc: any, item: any) => {
                    if (item.status == 'active') {
                        acc++;
                    }
                    return acc;
                }, 0),
                inactif: data.reduce((acc: any, item: any) => {
                    if (item.status == 'in stock') {
                        acc++;
                    }
                    return acc;
                },
                    0),
            };
            this.cachets.loading = true;
        },
        clearCachets() {
            this.cachets.data = null;
            this.cachets.stats = null;
            this.cachets.loading = false;
        },
        setOperationCaisse(data: any) {
            this.opertationCaisse.data = data;
            this.opertationCaisse.stats = {
                requested: data.reduce((acc: any, item: any) => {
                    if (item.status == 'en cours') {
                        acc++;
                    }
                    return acc;
                }, 0),
                delivered: data.reduce((acc: any, item: any) => {
                    if (item.status == 'livré') {
                        acc++;
                    }
                    return acc;
                }, 0),
            };
            this.opertationCaisse.loading = true;
        },
        clearOperationCaisse() {
            this.opertationCaisse.data = null;
            this.opertationCaisse.loading = false;
        },
        setVehicules(data: any) {
            this.vehicules.data = data;
            this.vehicules.stats = {
                total: data.length,
                rented: data.reduce((acc: any, item: any) => {
                    if (item.rented === 1) {
                        acc++;
                    }
                    return acc;
                }, 0),
                neweracom: data.reduce((acc: any, item: any) => {
                    if (item.rented === 0) {
                        acc++;
                    }
                    return acc;
                }, 0),
            };
            this.vehicules.loading = true;
        },
        clearVehicules() {
            this.vehicules.data = null;
            this.vehicules.stats = null;
            this.vehicules.loading = false;
        },
        setItemId(id: any) {
            this.ItemId = id;
        },
        setSelectedDemandeSortie(data: any) {
            this.SelecteddemandeSortie = data;
        }
    }
});