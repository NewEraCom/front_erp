import { defineStore } from 'pinia';

export const useRhStore = defineStore('RhStore', {
    state: () => ({
        stats: null,
        contractsExpiredThisMonth: null,
        employees: null,
        interns: {
            data: null,
            stats: null,
        },
        leaves: {
            data: null,
            stats: null,
        },
        recrutement: {
            data: null,
            stats: null,
        }
    }),
    actions: {
        setEmployees(data: any) {
            this.employees = data;
            this.stats = {
                total: data.filter((e: any) => e.status === '1').length,
                cdi: data.filter((e: any) => e.status === '1' && e.type_contrat === 'CDI').length,
                cdd: data.filter((e: any) => e.status === '1' && e.type_contrat === 'CDD').length,
                chantier: data.filter((e: any) => e.status === '1' && e.type_contrat === 'Chantier').length,
                commercial: data.filter((e: any) => e.status === '1' && e.type_contrat === 'COMMERCIALE').length,
                male: data.filter((e: any) => e.status === '1' && e.sexe === 'Homme').length,
                female: data.filter((e: any) => e.status === '1' && e.sexe === 'Femme').length,
                salaryMass: data.reduce((accumulator: number, currentEmployee: any) => {
                    if (currentEmployee.status === '1') {
                        return accumulator + Number(currentEmployee.salary);
                    } else {
                        return accumulator;
                    }
                }, 0),
            };
        },
        setInterns(data: any) {
            this.interns.data = data;
            this.interns.stats = {
                total: data.length,
                actif: data.filter((e: any) => e.status === '1').length,
                inactif: data.filter((e: any) => e.status === '0').length,
                potentialHiring: data.filter((e: any) => e.status === '1' && e.potential === '1').length,
            };
        },
        setLeaves(data: any) {
            this.leaves.data = data.conge;
            this.leaves.stats = {
                total: data.conge.length,
                accepted: data.conge.filter((e: any) => e.status === 'approved').length,
                pending: data.conge.filter((e: any) => e.status === 'pending').length,
                sick: data.conge.filter((e: any) => e.type === 'Conge Maladie').length,
            };
        },
        setRecrutement(data: any) {
            this.recrutement.data = data;
            this.recrutement.stats = {
                total: data.length,
                pending: data.filter((e: any) => e.status === 'pending').length,
                accepted: data.filter((e: any) => e.status === 'accepted').length,
            };
        }
    }
});