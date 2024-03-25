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
            graph: null,
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
        delivery: {
            data: null,
            stats: null,
            loading: false,
        },
        outOfStockRequests: {
            data: null,
            stats: null,
            loading: false,
        },
        subscription: null,
        gasoil: null,
        selectedJawaz: null,
        selectedItem: null,
        selectedVehicule: null,
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
        pushOperationCaisse(data: any) {
            this.opertationCaisse.data.unshift(data);
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
            this.louer.graph = {
                labels: ['Appartement', 'Villa', 'Dépôt', 'Magasin', 'Autre'],
                datasets: [
                    {
                        label: 'Nombre',
                        data: [
                            data.louers.reduce((acc: any, item: any) => {
                                if (item.type == 'Appartement' && item.a_payer == 1) {
                                    acc++;
                                }
                                return acc;
                            }, 0),
                            data.louers.reduce((acc: any, item: any) => {
                                if (item.type == 'Villa' && item.a_payer == 1) {
                                    acc++;
                                }
                                return acc;
                            }, 0),
                            data.louers.reduce((acc: any, item: any) => {
                                if (item.type == 'Dépôt' && item.a_payer == 1) {
                                    acc++;
                                }
                                return acc;
                            }, 0),
                            data.louers.reduce((acc: any, item: any) => {
                                if (item.type == 'Magasin' && item.a_payer == 1) {
                                    acc++;
                                }
                                return acc;
                            }, 0),
                            data.louers.reduce((acc: any, item: any) => {
                                if (item.type == 'Autre' && item.a_payer == 1) {
                                    acc++;
                                }
                                return acc;
                            }, 0),
                        ],
                        backgroundColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            };
        },
        clearLouer() {
            this.louer.data = null;
            this.louer.loading = false;
        },
        pushLouer(data: any) {
            this.louer.data.unshift(data);
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
                active: data.filter((item: any) => item.used == 1).length,
                inactif: data.filter((item: any) => item.used == 0).length,
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
        setOperationCaisse(data: any, solde: number) {
            this.opertationCaisse.data = data;
            this.opertationCaisse.stats = {
                requested: data.filter((item: any) => item.operation == 'sortie' && item.status == 'pending').length,
                delivered: data.filter((item: any) => item.operation == 'sortie' && item.status == 'done').length,
                total: data.length,
                ongoing: data.filter((item: any) => item.operation == 'sortie' && item.status == 'on going').length,
                solde: solde,
            };
            this.opertationCaisse.loading = true;
        },
        setDetailsOperationCaisse(data: any) {
            this.selectedItem = data;
        },
        clearDetailsOperationCaisse() {
            this.selectedItem = null;
        },
        clearOperationCaisse() {
            this.opertationCaisse.data = null;
            this.opertationCaisse.loading = false;
        },
        setVehicules(data: any) {
            this.vehicules.data = data;
            this.vehicules.stats = {
                total: data.length,
                rented: data.filter((item: any) => item.rented == 0).length,
                neweracom: data.filter((item: any) => item.rented != 0).length,
                used: data.filter((item: any) => item.used == 1).length,
            };
            this.vehicules.loading = true;
        },
        clearVehicules() {
            this.vehicules.data = null;
            this.vehicules.stats = null;
            this.vehicules.loading = false;
        },
        setVehicule(data: any) {
            this.selectedVehicule = data;
        },
        clearVehicule() {
            this.selectedVehicule = null;
        },
        setOutOfStockRequests(data: any) {
            this.outOfStockRequests.data = data;
            this.outOfStockRequests.stats = {
                total: data.length,
                pending: data.filter((item: any) => item.status == 'pending').length,
                done: data.filter((item: any) => item.status == 'done').length,
            };
        },
        clearOutOfStockRequest() {
            this.outOfStockRequests.data = null;
            this.outOfStockRequests.stats = null;
            this.outOfStockRequests.loading = false;
        },
        setDelivery(data: any) {
            this.delivery.data = data;
            this.delivery.stats = {
                total: data.length,
                pending: data.filter((item: any) => item.status == 'pending').length,
                onroad: data.filter((item: any) => item.status == 'on road').length,
                done: data.filter((item: any) => item.status == 'done').length,
            };
        },
        clearDelivery() {
            this.delivery.data = null;
            this.delivery.stats = null;
            this.delivery.loading = false;
        },
        setSubscription(data: any) {
            this.subscription = data;
        },
        clearSubscription() {
            this.subscription = null;
        },
        deleteSubscription(id: number) {
            const itemIdToDelete = id;
            const indexToDelete = this.parcGsm.data.findIndex((item) => item.id == itemIdToDelete);
            if (indexToDelete !== -1) {
                this.parcGsm.data.splice(indexToDelete, 1);
            } else {
                console.log('Item not found in array.');
            }

        },
        pushSubscription(data: any) {
            this.parcGsm.data.unshift(data);
            this.parcGsm.stats = {
                iam: this.parcGsm.data.reduce((acc: any, item: any) => {
                    if (item.operator == 'IAM') {
                        acc++;
                    }
                    return acc;
                }, 0),
                orange: this.parcGsm.data.reduce((acc: any, item: any) => {
                    if (item.operator == 'ORANGE') {
                        acc++;
                    }
                    return acc;
                }, 0),
                inwi: this.parcGsm.data.reduce((acc: any, item: any) => {
                    if (item.operator == 'INWI') {
                        acc++;
                    }
                    return acc;
                }, 0),
                total_to_payer: this.parcGsm.data.reduce((acc: any, item: any) => {

                    acc += Number(item.price);

                    return acc;
                }, 0),
            };
        },
        setGasoil(data: any) {
            this.gasoil = data;
        },
        clearGasoil() {
            this.gasoil = null;
        },
        removecardsCarburant(id: number) {
            const itemIdToDelete = id;
            const indexToDelete = this.cardsCarburant.data.findIndex((item) => item.id == itemIdToDelete);
            if (indexToDelete !== -1) {
                this.cardsCarburant.data.splice(indexToDelete, 1);
            } else {
                console.log('Item not found in array.');
            }
        },
        setSelectedJawaz(data: any) {
            this.selectedJawaz = data;
        },
        clearSelectedJawaz() {
            this.selectedJawaz = null;
        },
        setSelectedItem(data: any) {
            this.selectedItem = data;
        },
        clearSelectedItem() {
            this.selectedItem = null;
        }
    }
});