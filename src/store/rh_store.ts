import { defineStore } from 'pinia';

export const useRhStore = defineStore('RhStore', {
    state: () => ({
        stats: null,
        contractsExpiredThisMonth: null,
        employees: null,
        employeeExpire: null,
        employee: null,
        worker: null,
        intern: null,
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
        },
        demandeRh: {
            data: null,
            stats: null,
        },
        salaryAdvances: {
            data: null,
            stats: null,
        },
        pointages: null,
        paies: {
            data: null,
            stats: null,
        },
        workers: {
            data: null,
            stats: null,
        },
        sousTraitants: {
            data: null,
            stats: null,
        },
        ItemId: null,
        Item: null,

        salaryAdvanceSelected: null,
        demande : null,
    }),
    actions: {
        setEmployees(data: any) {
            this.employees = data.employee;
            this.stats = {
                total: data.employee.filter((e: any) => e.status == '1').length,
                cdi: data.employee.filter((e: any) => e.status == '1' && e.type_contrat == 'CDI').length,
                cdd: data.employee.filter((e: any) => e.status == 1 && e.type_contrat == 'CDD').length,
                chantier: data.employee.filter((e: any) => e.status == '1' && e.type_contrat === 'Chantier').length,
                commercial: data.employee.filter((e: any) => e.status == '1' && e.type_contrat === 'COMMERCIALE').length,
                male: data.employee.filter((e: any) => e.status == '1' && e.sexe === 'Homme').length,
                female: data.employee.filter((e: any) => e.status == '1' && e.sexe === 'Femme').length,
                salaryMass: data.employee.reduce((accumulator: number, currentEmployee: any) => {
                    if (currentEmployee.status === '1') {
                        return accumulator + Number(currentEmployee.salary);
                    } else {
                        return accumulator;
                    }
                }, 0),
                employee_per_month: data.employee_per_month,
                mass_salariale_per_month: data.mass_salarial
            };
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-11, adding 1 adjusts to 1-12 format

            this.employeeExpire = data.employee.filter((e: any) => {
                const contractEndDate = new Date(e.fin_contrat);
                const contractEndYear = contractEndDate.getFullYear();
                const contractEndMonth = contractEndDate.getMonth() + 1; // Adjust month format to 1-12

                return e.status === '1' && contractEndYear === currentYear && contractEndMonth === currentMonth;
            });
        },
        deleteEmployee(id: number) {
            const itemIdToDelete = id;
            const indexToDelete = this.employees.findIndex((item) => item.id == itemIdToDelete);
            if (indexToDelete !== -1) {
                this.employees.splice(indexToDelete, 1);
            } else {
                console.log('Item not found in array.');
            }
        },
        pushEmployee(data: any) {
            this.employees.push(data);
        },
        psuhOneEmployee(data: any) {
            this.employee = data;
        },
        pushIntern(data: any) {
            this.interns.data.push(data);
        },
        pushPointageToUser(data: any) {
            this.employee.pointages.push(data);
            console.log(this.employee.pointages);
        },
        clearEmployees() {
            this.employees = null;
        },
        clearStats() {
            this.stats = null;
        },
        setEmployeeId(data: any) {
            this.employee = data;
        },
        clearEmployee() {
            this.employee = null;
        },
        setInterns(data: any) {
            this.interns.data = data;
            this.interns.stats = {
                total: data.length,
                actif: data.filter((e: any) => e.status === '1').length,
                inactif: data.filter((e: any) => e.status === '0').length,
                potentialHiring: data.filter((e: any) => e.status === '1' && e.potentiel === '1').length,
            };
        },
        setLeaves(data: any) {
            this.leaves.data = data.conge;
            this.leaves.stats = {
                total: data.conge.length,
                accepted: data.conge.filter((e: any) => e.status === 'approved').length,
                pending: data.conge.filter((e: any) => e.status === 'pending').length,
                sick: data.conge.filter((e: any) => e.type === 'Maladie').length,
            };
        },
        pushLeave(data: any) {
            this.leaves.data.push(data);
        },
        setRecrutement(data: any) {
            this.recrutement.data = data;
            this.recrutement.stats = {
                total: data.length,
                pending: data.filter((e: any) => e.status === 'pending').length,
                accepted: data.filter((e: any) => e.status === 'accepted').length,
            };
        },
        deleteRecruitment(id: number) {
            const itemIdToDelete = id;
            const indexToDelete = this.recrutement.data.findIndex((item: any) => item.id == itemIdToDelete);
            if (indexToDelete !== -1) {
                this.recrutement.data.splice(indexToDelete, 1);
                this.recrutement.stats = {
                    total: this.recrutement.data.length,
                    pending: this.recrutement.data.filter((e: any) => e.status === 'pending').length,
                    accepted: this.recrutement.data.filter((e: any) => e.status === 'accepted').length,
                };
            } else {
                console.log('Item not found in array.');
            }
        },
        pushRecruitment(data: any) {
            this.recrutement.data.push(data);
            this.recrutement.stats = {
                total: this.recrutement.data.length,
                pending: this.recrutement.data.filter((e: any) => e.status === 'pending').length,
                accepted: this.recrutement.data.filter((e: any) => e.status === 'accepted').length,
            };
        },
        setDemandeRh(data: any) {
            this.demandeRh.data = data;
            this.demandeRh.stats = {
                total: data.length,
                pending: data.filter((e: any) => e.status === 'pending').length,
                done: data.filter((e: any) => e.status === 'done').length,
                delivered: data.filter((e: any) => e.status === 'delivered').length,
            };
        },
        clearDemandeRh() {
            this.demandeRh = {
                data: null,
                stats: null,
            };
        },
        deleteDemandeRh(id: number) {
            const itemIdToDelete = id;
            const indexToDelete = this.demandeRh.data.findIndex((item: any) => item.id == itemIdToDelete);
            if (indexToDelete !== -1) {
                this.demandeRh.data.splice(indexToDelete, 1);
                this.demandeRh.stats = {
                    total: this.demandeRh.data.length,
                    pending: this.demandeRh.data.filter((e: any) => e.status === 'pending').length,
                    done: this.demandeRh.data.filter((e: any) => e.status === 'done').length,
                    delivered: this.demandeRh.data.filter((e: any) => e.status === 'delivered').length,
                };
            } else {
                console.log('Item not found in array.');
            }
        },
        setSalaryAdvances(data: any) {
            this.salaryAdvances.data = data;
            this.salaryAdvances.stats = {
                total: this.salaryAdvances.data.reduce((accumulator: number, current: any) => {
                    let total = 0;
                    if (current.approval_responsable === 'approved' && current.approval_rh === '1') {
                        total = accumulator + Number(current.avance);
                    }
                    return total;
                }, 0),
                remaining: this.salaryAdvances.data.reduce((accumulator: number, current: any) => {
                    let total = 0;
                    if (current.approval_responsable === 'approved' && current.approval_rh === '1') {
                        total = accumulator + Number(current.restant);
                    }
                    return total;
                }, 0),
            };
            console.log(this.salaryAdvances.stats);
        },
        deleteSalaryAdvance(id: number) {
            const itemIdToDelete = id;
            const indexToDelete = this.salaryAdvances.data.findIndex((item) => item.id == itemIdToDelete);
            if (indexToDelete !== -1) {
                this.salaryAdvances.data.splice(indexToDelete, 1);
            } else {
                console.log('Item not found in array.');
            }
        },
        pushSalaryAdvance(data: any) {
            this.salaryAdvances.data.push(data);
            this.salaryAdvances.stats = {
                total: this.salaryAdvances.data.reduce((accumulator: number, current: any) => {
                    let total = 0;
                    if (current.status === 'approved') {
                        total = accumulator + Number(current.avance);
                    }
                    return total;
                }, 0),
                remaining: this.salaryAdvances.data.reduce((accumulator: number, current: any) => {
                    let total = 0;
                    if (current.status === 'approved') {
                        total = accumulator + Number(current.restant);
                    }
                    return total;
                }, 0),
            };

        },
        setPointages(data: any) {
            this.pointages = data;
        },
        setPaies(data: any) {
            this.paies.data = data;
            this.paies.stats = data
                .filter(e => e.status === 'closed')
                .sort((a, b) => b.id - a.id)[0];
        },
        setWorkers(data: any) {
            this.workers.data = data;
            this.workers.stats = {
                actif: data.filter((e: any) => e.status == 1).length,
                inactif: data.filter((e: any) => e.status == 0).length,
                totalSoustraitant: new Set(data.map(item => item.tier_id)).size,
            };
        },
        pushWorker(data: any) {
            this.workers.data.push(data);
            console.log(this.workers.data);
            this.workers.stats = {
                actif: this.workers.data.filter((e: any) => e.status == 1).length,
                inactif: this.workers.data.filter((e: any) => e.status == 0).length,
                totalSoustraitant: new Set(this.workers.data.map(item => item.tier_id)).size,
            };
        },
        deleteWorker(id: number) {
            const itemIdToDelete = id;
            const indexToDelete = this.workers.data.findIndex((item) => item.id == itemIdToDelete);
            if (indexToDelete !== -1) {
                this.workers.data.splice(indexToDelete, 1);
                this.workers.stats = {
                    actif: this.workers.data.filter((e: any) => e.status == 1).length,
                    inactif: this.workers.data.filter((e: any) => e.status == 0).length,
                    totalSoustraitant: new Set(this.workers.data.map(item => item.tier_id)).size,
                };
            } else {
                console.log('Item not found in array.');
            }
        },
        setSousTraitants(data: any) {
            this.sousTraitants.data = data;
            this.sousTraitants.stats = {
                actif: data.filter((e: any) => e.status === 1).length,
                inactif: data.filter((e: any) => e.status === 0).length,
                totalSoustraitant: new Set(data.map(item => item.tier_id)).size,
            };
        },
        pushPointage(data: any) {
            this.pointages.push(data);
            console.log('pointage pushed');
            console.log(this.pointages);
        },
        setItemId(id: number) {
            this.ItemId = id;
        },
        setItem(data: any) {
            this.Item = data;
        },

    }
});