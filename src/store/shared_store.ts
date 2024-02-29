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
                actif: data.filter((item: any) => item.status === 'pending').length,
                inactif: data.filter((item: any) => item.status === 'completed').length,
            };
            this.fournisseurs.loading = true;
        },
        clearFournisseurs() {
            this.fournisseurs.data = null;
            this.fournisseurs.stats = null;
            this.fournisseurs.loading = false;
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
                ongoing: data.filter((item: any) => item.status === 'ongoing').length,
                completed: data.filter((item: any) => item.status === 'completed').length,
            };
            console.log(this.projects.data);
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
    },
});