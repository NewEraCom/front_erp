import { api } from '@/utils';
import { useRhStore } from '@/store';

const getEmployees = async () => {
    try {
        const response = await api().get('/rh/get');
        if (response.status === 200) {
            const rhStore = useRhStore();
            rhStore.setEmployees(response.data);
            return;
        }
        throw new Error('Get employees failed with status: ' + response.status);
    } catch (error) {
        console.error(error);
        return error;
    }
};

const getEmployeeById = async (id: number) => {
    try {
        const response = await api().get('/rh/get/' + id);
        if (response.status === 200) {
            const rhStore = useRhStore();
            rhStore.setEmployeeId(response.data.employee);
            return;
        }
        throw new Error('Get employees failed with status: ' + response.status);
    } catch (error) {
        console.error(error);
        return error;
    }
};

const getInterns = async () => {
    try {
        const response = await api().get('/stg/get');
        if (response.status === 200) {
            const rhStore = useRhStore();
            rhStore.setInterns(response.data.stagiaires);
            return;
        }
        throw new Error('Get interns failed with status: ' + response.status);
    } catch (error) {
        console.error(error);
        return error;
    }
};

const getLeaves = async () => {
    try {
        const response = await api().get('/conge/get');
        if (response.status === 200) {
            const rhStore = useRhStore();
            rhStore.setLeaves(response.data);
            return;
        }
        throw new Error('Get leaves failed with status: ' + response.status);
    } catch (error) {
        console.error(error);
        return error;
    }
};

const getRecrutement = async () => {
    try {
        const response = await api().get('/rh/recrute/get');
        if (response.status === 200) {
            const rhStore = useRhStore();
            rhStore.setRecrutement(response.data.recrutement);
            return;
        }
        throw new Error('Get recrutement failed with status: ' + response.status);
    } catch (error) {
        console.error(error);
        return error;
    }
};

const getDemandeRh = async () => {
    try {
        const response = await api().get('/dmnd/get');
        if (response.status === 200) {
            const rhStore = useRhStore();
            rhStore.setDemandeRh(response.data.demande);
            return;
        }
        throw new Error('Get demande RH failed with status: ' + response.status);
    } catch (error) {
        console.error(error);
        return error;
    }
};

const getSalarayAdvances = async () => {
    try {
        const response = await api().get('/pay/avance/get');
        if (response.status === 200) {
            const rhStore = useRhStore();
            rhStore.setSalaryAdvances(response.data.avance);
            return;
        }
        throw new Error('Get salary advances failed with status: ' + response.status);
    } catch (error) {
        console.error(error);
        return error;
    }
};

const getPointages = async () => {
    try {
        const response = await api().get('/rh/get-pointages');
        if (response.status === 200) {
            const rhStore = useRhStore();
            rhStore.setPointages(response.data.pointages);
            return;
        }
        throw new Error('Get pointage failed with status: ' + response.status);
    } catch (error) {
        console.error(error);
        return error;
    }
};

const getPaies = async () => {
    try {
        const response = await api().get('/rh/paie/get');
        if (response.status === 200) {
            const rhStore = useRhStore();
            rhStore.setPaies(response.data.paies);
            return;
        }
        throw new Error('Get pointage failed with status: ' + response.status);
    } catch (error) {
        console.error(error);
        return error;
    }
};

const getWorkers = async () => {
    try {
        const response = await api().get('/tiers/get-workers');
        if (response.status === 200) {
            const rhStore = useRhStore();
            rhStore.setWorkers(response.data.workers);
            return;
        }
        throw new Error('Get workers failed with status: ' + response.status);
    } catch (error) {
        console.error(error);
        return error;
    }
};

// ----------------- POST -----------------

const addPointage = async (data: any) => {
    try {
        const response = await api().post('rh/add-pointage', data);
        if (response.status === 200) {
            const rhStore = useRhStore();
            rhStore.pushPointage(response.data.pointage);

            return;
        }
        throw new Error('Add pointage failed with status: ' + response.status);
    } catch (error) {
        console.error(error);
        return error;
    }
};

const addLeave = async (data: any) => {
    try {
        const response = await api().post('/rh/add-conge', data);
        if (response.status === 200) {
            const rhStore = useRhStore();
            rhStore.pushLeave(response.data.conge);
            return;
        }
    }
    catch (error) {
        console.error(error);
        return error;
    }
};

const addSalaryAdvance = async (data: any) => {
    try {
        const response = await api().post('/pay/avance/insert', data);
        if (response.status === 200) {
            const rhStore = useRhStore();
            rhStore.pushSalaryAdvance(response.data.avance);
            return;
        }
    }
    catch (error) {
        console.error(error);
        return error;
    }
};


const deleteEmployee = async () => {
    const id = $('#deleteId').val();
    if (id) {
        try {
            const response = await api().delete('/rh/delete/' + id);
            if (response.status === 200) {
                const rhStore = useRhStore();
                rhStore.deleteEmployee(Number(id));
                return;
            }
            throw new Error('Delete employee failed with status: ' + response.status);
        } catch (error) {
            console.error(error);
            return error;
        }
    }
};

const addEmployee = async (data: any) => {
    try {
        const response = await api().post('/rh/insert/', data);
        if (response.status === 200) {
            const rhStore = useRhStore();
            rhStore.pushEmployee(response.data.employee);
            return;
        }
        throw new Error('Delete employee failed with status: ' + response.status);
    } catch (error) {
        console.error(error);
        return error;
    }
};
 async function Confirmation(id, req) {
    try {


        const response = await api().post('conge/valider/' + id, req);
        if (response.status == 200) {
            console.log(response.data);

            
            await getLeaves()

            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}
async function ValidateRecruite(id:number) {
    try {


        const response = await api().post('dmnd/validate-recruite/' + id);
        if (response.status == 200) {
            console.log(response.data);

            
            await getLeaves()

            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}


export default {
    getEmployees,
    getInterns,
    getLeaves,
    getRecrutement,
    getDemandeRh,
    getSalarayAdvances,
    getPointages,
    getPaies,
    getWorkers,
    deleteEmployee,
    addPointage,
    getEmployeeById,
    addLeave,
    addSalaryAdvance,
    addEmployee,
    Confirmation,
    ValidateRecruite
};