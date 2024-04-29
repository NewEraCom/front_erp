import { defineStore } from 'pinia';

export const useSharedStore = defineStore('ShareStore', {
    state: () => ({
        events: [],
        rhRequest: {
            data: null,
            stats: null,
            loading: false,
        },
        recruitment: {
            data: null,
            stats: null,
            loading: false,
        },
        caisse: {
            data: null,
            stats: null,
            loading: false,
        },
        fournisseurs: {
            data: null,
            stats: null,
            loading: false,
        },
        soustraitants: {
            data: null,
            stats: null,
            loading: false,
        },
        stock: {
            data: null,
            stats: null,
            loading: false,
        },
        projects: {
            data: null,
            stats: null,
            loading: false,
        },
        clients: {
            data: null,
            stats: null,
            loading: false,
        },
        dashboard: {
            stats: null,
            data: null,
            loading: false
        },
        event: null,
        selectedItem: null,
        Soustraitant: null,
        mainItem:null,
        selectedCaisse:null,
        budgetSiege:{
            data:null,
            stats:null,
        },
    }),
    actions: {
        setEvents(data: any) {
            this.events = [];
            data.forEach((event: any) => {
                const item = {
                    title: event.event,
                    start: event.date + ' ' + event.start,
                    end: event.date + ' ' + event.end,
                    content: event.comment,
                    class: event.color,
                };
                this.events.push(item);
            });
        },
        addEvents(event: any) {

            const item = {
                title: event.event,
                start: event.date + ' ' + event.start,
                end: event.date + ' ' + event.end,
                content: event.comment,
                class: event.color,
            };
            this.events.push(item);
        },
        setRhRequest(data: any) {
            this.rhRequest.data = data;
            this.rhRequest.stats = {
                total: data.length,
                pending: data.filter((item: any) => item.status === 'pending').length,
                done: data.filter((item: any) => item.status === 'done').length,
                delivered: data.filter((item: any) => item.status === 'delivered').length,
            };
            this.rhRequest.loading = true;
        },
        clearRhRequest() {
            this.rhRequest.data = null;
            this.rhRequest.stats = null;
            this.rhRequest.loading = false;
        },
        pushRhRequest(data: any) {
            this.rhRequest.data.unshift(data);
        },
        setRecruitment(data: any) {
            this.recruitment.data = data;
            this.recruitment.stats = {
                total: data.length,
                pending: data.filter((item: any) => item.status === 'pending').length,
                done: data.filter((item: any) => item.status === 'done').length,
                completed: data.filter((item: any) => item.status === 'completed').length,
            };
            this.recruitment.loading = true;
        },
        clearRecruitment() {
            this.recruitment.data = null;
            this.recruitment.stats = null;
            this.recruitment.loading = false;
        },
        setFournisseurs(data: any) {
            this.fournisseurs.data = data;
            this.fournisseurs.stats = {
                total: data.length,
                actif: data.filter((item: any) => item.is_active === 1).length,
                inactif: data.filter((item: any) => item.is_active === 0).length,
            };
            this.fournisseurs.loading = true;
        },
        clearFournisseurs() {
            this.fournisseurs.data = null;
            this.fournisseurs.stats = null;
            this.fournisseurs.loading = false;
        },
        pushFournisseur(data: any) {
            console.log(data);
            this.fournisseurs.data.push(data);
        },
        deleteSoustraitant(id: number) {
            const itemIdToDelete = id;
            const indexToDelete = this.fournisseurs.data.findIndex((item: any) => item.id == itemIdToDelete);
            if (indexToDelete !== -1) {
                this.fournisseurs.data.splice(indexToDelete, 1);
            } else {
                console.log('Item not found in array.');
            }
            this.fournisseurs.stats = {
                total: this.fournisseurs.data.length,
                actif: this.fournisseurs.data.filter((item: any) => item.is_active === 1).length,
                inactif: this.fournisseurs.data.filter((item: any) => item.is_active === 0).length,
            };
        },
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
        setProjects(data: any) {
            this.projects.data = data;
            this.projects.stats = {
                total: data.length,
                ongoing: data.filter((item: any) => item.status === 'on going').length,
                completed: data.filter((item: any) => item.status === 'completed').length,
            };
        },
        clearProjects() {
            this.projects.data = null;
            this.projects.stats = null;
            this.projects.loading = false;
        },
        setClients(data: any) {
            this.clients.data = data;
            this.clients.stats = {
                total: data.length,
                actif: data.filter((item: any) => item.is_active === 1).length,
                inactif: data.filter((item: any) => item.is_active === 0).length,
            };
        },
        clearClients() {
            this.clients.data = null;
            this.clients.stats = null;
            this.clients.loading = false;
        },
        setDashboardStats(data: any) {
            console.log(data);
            this.dashboard.stats = {
                total_employees: data.total_employee.filter((item: any) => item.status == 1).length,
                male: data.total_employee.filter((e: any) => e.status === '1' && e.sexe === 'Homme').length,
                female: data.total_employee.filter((e: any) => e.status === '1' && e.sexe === 'Femme').length,
                total_projects: data.total_project.filter((item: any) => item.status == 'on going').length,
                total_clients: data.total_client.filter((item: any) => item.is_active == 1).length,
                total_purchase: data.purchase_orders.length,
                caisse: {
                    solde: data.caisse_solde,
                    total_entree: data.caisse_entree,
                    total_sortie: data.caisse_sortie,
                },
                total_invoices: data.clients_invoices.length,
            };
            this.dashboard.data = {
                purchasesOrder: data.purchase_orders,
                invoices: data.clients_invoices,
            };
            this.dashboard.loading = true;
        },
        clearDashboardStats() {
            this.dashboard.stats = null;
            this.dashboard.loading = false;
        },
        setEvent(data: any) {
            this.event = data;
        },
        clearEvent() {
            this.event = null;
        },
        deleteRecruitment(id: number) {
            const itemIdToDelete = id;
            const indexToDelete = this.recruitment.data.findIndex((item: any) => item.id == itemIdToDelete);
            if (indexToDelete !== -1) {
                this.recruitment.data.splice(indexToDelete, 1);
                this.recruitement.stats = {
                    total: this.recruitment.data.length,
                    pending: this.recruitment.data.filter((item: any) => item.status === 'pending').length,
                    done: this.recruitment.data.filter((item: any) => item.status === 'done').length,
                    completed: this.recruitment.data.filter((item: any) => item.status === 'completed').length,
                };
            } else {
                console.log('Item not found in array.');
            }
        },
        setSelectedItem(data: any) {
            this.selectedItem = data;
        },
        pushRecruitment(data: any) {
            this.recruitment.data.push(data);
            this.recruitment.stats = {
                total: this.recruitment.data.length,
                pending: this.recruitment.data.filter((item: any) => item.status === 'pending').length,
                done: this.recruitment.data.filter((item: any) => item.status === 'done').length,
                completed: this.recruitment.data.filter((item: any) => item.status === 'completed').length,
            };
        },
        setMainItem(data: any) {
            this.mainItem = data;
        },
        setCaisse(data: any) {
            this.caisse.data = data;
            this.caisse.stats = {
                total: data.length,
                pending: data.filter((item: any) => item.status === 'pending').length,
                valide: data.filter((item: any) => item.status === 'valide').length,
                rejected: data.filter((item: any) => item.status === 'rejected').length,
            };
            this.caisse.loading = true;
        },
        clearCaisse() {
            this.caisse.data = null;
            this.caisse.stats = null;
            this.caisse.loading = false;
        },
        setSelectedCaisse(data: any) {
            this.selectedCaisse = data.caisses;
            console.log(data);
            
        },
        setBudgetSiege(data: any) {            
            this.budgetSiege.data = data;
            this.budgetSiege.stats = {
                total: data.length,
                count_siege: data.filter(caisse => caisse.project.code === 'SIEGE').length,
                total_budget: data.filter(caisse => caisse.project.code === 'SIEGE').reduce((total, caisse) => total + caisse.montant, 0),
                count_projets: data.reduce((total, caisse) => total + caisse.montant, 0),
            };
            console.log(this.budgetSiege.stats);
            
        }
    },
});