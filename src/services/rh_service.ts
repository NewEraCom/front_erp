import { api } from '@/utils';
import { useRhStore, useSharedStore } from '@/store';

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
            console.log(response.data);
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
const getWorkerById = async (id) => {
    try {
        const response = await api().get('/tiers/get-worker/' + id);
        if (response.status === 200) {
            const rhStore = useRhStore();
            rhStore.worker = response.data.worker;
            return;
        }
        throw new Error('Get workers failed with status: ' + response.status);
    } catch (error) {
        console.error(error);
        return error;
    }
};
const getInternById = async (id) => {
    try {
        const response = await api().get('/stg/get/' + id);
        if (response.status === 200) {
            const rhStore = useRhStore();
            rhStore.intern = response.data.stagiaire;
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
            if (rhStore.employee && rhStore.employee.id === response.data.pointage.employee_id) {
                rhStore.employee.pointages.push(response.data.pointage);
            }
            rhStore.pointages.push(response.data.pointage);
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
            // rhStore.leaves.data.push(response.data.conge);
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

const deleteSalaryAdvance = async () => {
    const id = $('#deleteId').val();
    if (id) {
        try {
            const response = await api().delete('/pay/avance/delete/' + id);
            if (response.status === 200) {
                const rhStore = useRhStore();
                rhStore.deleteSalaryAdvance(Number(id));
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
        const response = await api().post('/rh/insert', data);
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

        const rhStore = useRhStore();
        const response = await api().post('conge/valider/' + id, req);
        if (response.status == 200) {
            console.log(response.data);
            const dmndIndex = rhStore.leaves.data.findIndex((item) => item.id === id);
            if (dmndIndex !== -1) {
                rhStore.leaves.data.splice(dmndIndex, 1, response.data.conge);
            }

            // await getLeaves();

            // return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}
async function ConfirmationResponsable(id, req) {
    try {

        const rhStore = useRhStore();
        const response = await api().post('conge/valide-respo/' + id, req);
        if (response.status == 200) {
            console.log(response.data);
            const dmndIndex = rhStore.leaves.data.findIndex((item) => item.id === id);
            if (dmndIndex !== -1) {
                rhStore.leaves.data.splice(dmndIndex, 1, response.data.conge);
            }

            await getLeaves();

            // return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}

async function deleteLeave(id) {
    try {
        const response = await api().delete('conge/delete/' + id);
        if (response.status == 200) {
            console.log(response.data);
            const rhStore = useRhStore();
            rhStore.leaves.data = rhStore.leaves.data.filter(w => w.id !== id);
            const dmndIndex = rhStore.leaves.data.findIndex((item) => item.id === id);
            if (dmndIndex !== -1) {
                rhStore.leaves.data.splice(dmndIndex, 1);
            }
            await getLeaves();

            // return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}
async function ValidateRecruite(id: number) {
    try {


        const response = await api().post('dmnd/validate-recruite/' + id);
        if (response.status == 200) {
            console.log(response.data);


            await getLeaves();

            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}

const addInterns = async (data: any) => {
    try {
        const response = await api().post('/stg/insert', data);
        if (response.status === 200) {
            const rhStore = useRhStore();
            rhStore.pushIntern(response.data.stagiaire);
            return;
        }
        throw new Error('Insert Intern failed with status: ' + response.status);
    } catch (error) {
        console.error(error);
        return error;
    }
};

const addWorker = async (data: any) => {
    try {
        const response = await api().post('/tiers/add-worker', data);
        if (response.status === 200) {
            const rhStore = useRhStore();
            rhStore.pushWorker(response.data.worker);
            return;
        }
        throw new Error('Get workers failed with status: ' + response.status);
    } catch (error) {
        console.error(error);
        return error;
    }
};

const deleteWorker = async () => {
    try {
        const rhStore = useRhStore();
        const id = rhStore.ItemId;
        const response = await api().delete('/tiers/delete-worker/' + id);
        if (response.status === 200) {
            rhStore.deleteWorker(id);
            return;
        }
        throw new Error('Get workers failed with status: ' + response.status);
    } catch (error) {
        console.error(error);
        return error;
    }
};
const updateWorker = async (data: any, id: any) => {
    try {
        const response = await api().post('/tiers/update-worker/' + id, data);
        if (response.status === 200) {
            const rhStore = useRhStore();
            // rhStore.setWorkers(response.data.workers);
            rhStore.worker = response.data.worker;
            return;
        }
        throw new Error('Update worker failed with status: ' + response.status);
    } catch (error) {
        console.error(error);
        return error;
    }
};

const getSousTaraitant = async () => {
    try {
        const response = await api().get('/tiers/getSoustraitant');
        if (response.status === 200) {
            const rhStore = useRhStore();
            rhStore.setSousTraitants(response.data.fournisseur);
            return;
        }
        throw new Error('Get interns failed with status: ' + response.status);
    } catch (error) {
        console.error(error);
        return error;
    }
};

const addDemandeRh = async (data: any, src: string = 'rh') => {
    try {
        const response = await api().post('/dmnd/insert', data);
        if (response.status === 200) {
            const rhStore = useRhStore();
            const sharedStore = useSharedStore();
            if (src === 'rh') {
                rhStore.demandeRh.data.push(response.data.demande);
            }
            console.log(response.data.demande);
            sharedStore.pushRhRequest(response.data.demande);
            return;
        }
        throw new Error('Get demande RH failed with status: ' + response.status);
    } catch (error) {
        console.error(error);
        return error;
    }
};
const ReceivedDemandeRh = async (id: any) => {
    try {
        const response = await api().post('/dmnd/valider/' + id);
        if (response.status === 200) {
            const rhStore = useRhStore();
            const dmnd = rhStore.demandeRh.data.find((item) => item.id === id);
            if (dmnd) {
                Object.assign(dmnd, response.data.demande);
            }
            return;
        }
        throw new Error('Get demande RH failed with status: ' + response.status);
    } catch (error) {
        console.error(error);
        return error;
    }
};
const DeleteDemandeRh = async (id: any) => {
    try {
        const response = await api().delete('/dmnd/delete/' + id);
        if (response.status === 200) {
            const rhStore = useRhStore();
            rhStore.deleteDemandeRh(id);
        }
        throw new Error('Get demande RH failed with status: ' + response.status);
    } catch (error) {
        console.error(error);
        return error;
    }
};
async function UpdateSalaire(id, req) {
    try {


        const response = await api().post('rh/update-salaire/' + id, req);
        if (response.status == 200) {
            const rhStore = useRhStore();

            console.log(response.data);

            rhStore.employee = response.data.employee;

            // await getEmployeeById(id);

            // return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}
async function AugmentationSalaire(id, req) {
    try {


        const response = await api().post('rh/augement-salaire/' + id, req);
        if (response.status == 200) {
            const rhStore = useRhStore();

            console.log(response.data);

            rhStore.employee = response.data.employee;

            // await getEmployeeById(id);

            // return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}
async function EditLeaveEmployee(id, req) {
    try {


        const response = await api().post('rh/edit-conge/' + id, req);
        if (response.status == 200) {
            const rhStore = useRhStore();

            console.log(response.data);

            rhStore.employee = response.data.employee;

            // await getEmployeeById(id);

            // return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}

async function EditBankEmployee(id, req) {
    try {


        const response = await api().post('rh/update-bank/' + id, req);
        if (response.status == 200) {
            const rhStore = useRhStore();

            console.log(response.data);

            rhStore.employee = response.data.employee;

            // await getEmployeeById(id);

            // return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}
async function EditCnssEmployee(id, req) {
    try {


        const response = await api().post('rh/update-cnss/' + id, req);
        if (response.status == 200) {
            const rhStore = useRhStore();

            console.log(response.data);

            rhStore.employee = response.data.employee;

            // await getEmployeeById(id);

            // return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}
async function UploadDocEmployee(id, req) {
    try {


        const response = await api().post('rh/upload-documents/' + id, req);
        if (response.status == 200) {
            const rhStore = useRhStore();

            console.log(response.data);

            rhStore.employee = response.data.employee;

            // await getEmployeeById(id);

            // return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}
async function DeleteDocEmployee(id) {
    try {


        const response = await api().delete('docs/delete/' + id);
        if (response.status == 200) {
            const rhStore = useRhStore();

            console.log(response.data);

            rhStore.employee.documents = rhStore.employee.documents.filter(doc => doc.id !== id);


        }
    } catch (error) {
        console.log(error);
    }
}
async function EditEmployee(id, req) {
    try {


        const response = await api().post('rh/update/' + id, req);
        if (response.status == 200) {
            const rhStore = useRhStore();

            console.log(response.data);

            rhStore.employee = response.data.employee;

            // await getEmployeeById(id);

            // return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}
async function RuptureContractEmployee(id, req) {
    try {


        const response = await api().post('rh/repture/' + id, req);
        if (response.status == 200) {
            const rhStore = useRhStore();

            console.log(response.data);

            rhStore.employee = response.data.employee;

            // await getEmployeeById(id);

            // return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}
async function updateIntern(id, req) {
    try {


        const response = await api().post('stg/update/' + id, req);
        if (response.status == 200) {
            const rhStore = useRhStore();

            console.log(response.data);
            const stg = rhStore.interns.data.find((item) => item.id === id);
            if (stg) {
                Object.assign(stg, response.data.stg);
            }
            console.log(response.data);
        }
    } catch (error) {
        console.log(error);
    }
}
async function deleteIntern(id) {
    try {


        const response = await api().delete('stg/delete/' + id);
        if (response.status == 200) {
            const rhStore = useRhStore();
            rhStore.interns.data = rhStore.interns.data.filter(i => i.id !== id);
            const dmndIndex = rhStore.interns.data.findIndex((item) => item.id === id);
            if (dmndIndex !== -1) {
                rhStore.interns.data.splice(dmndIndex, 1);
            }
            console.log(response.data);

            // rhStore.interns.data = rhStore.interns.data.filter(stg => stg.id !== id);
            getInterns();

            console.log(response.data);
        }
    } catch (error) {
        console.log(error);
    }
}
async function potentielIntern(id, req) {
    try {
        const response = await api().post('stg/potentiel/' + id, req);
        if (response.status == 200) {
            console.log(response.data);
            const rhStore = useRhStore();

            const stg = rhStore.interns.data.find((item) => item.id === id);
            if (stg) {
                Object.assign(stg, response.data.stg);
            }
        }
    } catch (error) {
        console.log(error);
    }
}

const addPayImport = async (data: any) => {
    try {
        const response = await api().post('/pay/prime/import', data);
        if (response.status === 200) {
            getPaies();
            return;
        }
        throw new Error('Get demande RH failed with status: ' + response.status);
    } catch (error) {
        console.error(error);
        return error;
    }
};
const PayExport = async (data: any) => {
    try {
        const response = await api().post('/pay/prime/export', data, { responseType: 'blob' });
        if (response.status === 200) {

            return response.data;
        }
        throw new Error('Get demande RH failed with status: ' + response.status);
    } catch (error) {
        console.error(error);
        return error;
    }
};
const validateAvavnce = async (id, data: any) => {
    try {
        const response = await api().post('/pay/avance/valider/' + id, data);
        if (response.status === 200) {
            const rhStore = useRhStore();

            const avance = rhStore.salaryAdvances.data.find((item) => item.id === id);
            if (avance) {
                Object.assign(avance, response.data.avance);
            }
            return;
        }
        throw new Error('Get demande RH failed with status: ' + response.status);
    } catch (error) {
        console.error(error);
        return error;
    }
};
async function UploadDocIntern(req) {
    try {


        const response = await api().post('stg/uploadDoc', req);
        if (response.status == 200) {
            const rhStore = useRhStore();

            console.log(response.data);

            rhStore.intern = response.data.stagiaire;

            // await getEmployeeById(id);

            // return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}
async function DeleteDocIntern(id) {
    try {


        const response = await api().delete('stg/deleteDoc/' + id);
        if (response.status == 200) {
            const rhStore = useRhStore();

            console.log(response.data);

            rhStore.intern.documents = rhStore.intern.documents.filter(doc => doc.id !== id);


        }
    } catch (error) {
        console.log(error);
    }
}
const updateAttachement = async (id: number, data: any) => {
    try {
        const response = await api().post('stg/updateAttachement/' + id, data);
        if (response.status === 200) {
            const rhStore = useRhStore();
            rhStore.intern = response.data.stg;

            return;
        }
        throw new Error('Add pointage failed with status: ' + response.status);
    } catch (error) {
        console.error(error);
        return error;
    }
};

const downloadFile = async () => {
    try {
        const response = await api().get('rh/pointage-file', { responseType: 'blob' });
        return response;

    } catch (error) {
        console.error(error);
        return error;
    }
};

const importPointage = async (data: any) => {
    try {
        const response = await api().post('rh/pointage-import', data);
        if (response.status === 200) {
            const rhStore = useRhStore();
            rhStore.setPointages(response.data.pointages);
            return;
        }
    } catch (error) {
        console.log(error);
    }
};
const AffecterEmpProjet = async (id,data: any) => {
    try {
        const response = await api().post('rh/affecter-employe/'+id, data);
        if (response.status === 200) {
            const rhStore = useRhStore();
            rhStore.employee = response.data.employee;
            return;
        }
    } catch (error) {
        console.log(error);
    }
};


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
    ValidateRecruite,
    deleteSalaryAdvance,
    addInterns,
    addWorker,
    getSousTaraitant,
    addDemandeRh,
    UpdateSalaire,
    AugmentationSalaire,
    EditLeaveEmployee,
    EditBankEmployee,
    EditCnssEmployee,
    UploadDocEmployee,
    DeleteDocEmployee,
    EditEmployee,
    RuptureContractEmployee,
    updateIntern,
    deleteIntern,
    potentielIntern,
    deleteWorker,
    deleteLeave,
    ReceivedDemandeRh,
    DeleteDemandeRh,
    addPayImport,
    validateAvavnce,
    PayExport,
    getWorkerById,
    getInternById,
    UploadDocIntern,
    DeleteDocIntern,
    updateWorker,
    downloadFile,
    updateAttachement,
    importPointage,
    AffecterEmpProjet,
    ConfirmationResponsable
};