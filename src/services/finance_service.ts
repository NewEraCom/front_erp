import { useFinanceStore } from '@/store';
import { api } from '@/utils';


async function get() {
    try {
        const FinanceStore = useFinanceStore();
        const response = await api().get('facture/get');
        if (response.status == 200) {
            FinanceStore.setFacture(response.data);
            return response.data;
        }
    } catch (error) {
        console.log(error);
        return Promise.reject(error);

    }
}


async function insert(req) {
    try {
        const FinanceStore = useFinanceStore();
        const response = await api().post('facture/insert', req);
        if (response.status == 200) {
            FinanceStore.facture.push(response.data.facture);
            console.log(response.data);
            return response.data;
        }
    } catch (error) {
        console.log(error);
        return Promise.reject(error);

    }
}

async function update(req) {
    try {
        // const FactureStore = useFactureStore();
        const response = await api().post('facture/update', req);
        if (response.status == 200) {
            console.log(response.data);
            // let facture = FactureStore.facture.find((item) => item.id === id);
            // if (facture) {
            //     Object.assign(facture, response.data.facture);
            // }
            return response.data;
        } else {

        }
    } catch (error) {
        console.log(error);
        return Promise.reject(error);

    }
}

async function ValidStatus(id, req) {
    try {
        const response = await api().post('facture/validStatus/'+id, req);
        if (response.status == 200) {
            console.log(response.data);
            return response.data;
        } else {

        }
    } catch (error) {
        console.log(error);
        return Promise.reject(error);

    }
}

async function ValidAvoir(id, req) {
    try {
        const response = await api().post('facture/validAvoir/'+id, req);
        if (response.status == 200) {
            console.log(response.data);
            return response.data;
        } else {

        }
    } catch (error) {
        console.log(error);
        return Promise.reject(error);

    }
}

async function RejectStatus(id, req) {
    try {
        const response = await api().post('facture/rejectStatus/'+id, req);
        if (response.status == 200) {
            console.log(response.data);
            return response.data;
        } else {

        }
    } catch (error) {
        console.log(error);
        return Promise.reject(error);

    }
}

async function Delete(id) {
    try {

        const response = await api().delete('facture/delete/' + id);
        if (response.status == 200) {
            console.log(response.data);

            return response.data;
        }
    } catch (error) {
        console.log(error);
        return Promise.reject(error);

    }
}

async function getCompsByProjectId(id) {
    try {
        const FinanceStore = useFinanceStore();
        const response = await api().get('facture/comp/getCompsByProjectId/' + id);
        if (response.status === 200) {
            FinanceStore.setComposants(response.data.factureComposent);
            return response.data.factureComposent;
        }
    } catch (error) {
        console.log(error);
        return Promise.reject(error);


    }
}

async function insertComp(req) {
    try {

        const response = await api().post('facture/comp/store-attachement', req);
        if (response.status == 200) {

            console.log(response.data);
            return response.data;
        }
    } catch (error) {
        console.log(error);
        return Promise.reject(error);

    }
}
async function getCaution() {
    try {
        const FinanceStore = useFinanceStore();

        const response = await api().get('cautions/index');
        if (response.status == 200) {
            FinanceStore.SetCaution(response.data);
            return response.data;
        }
    } catch (error) {
        console.log(error);
        return Promise.reject(error);

    }
}
async function recover(id) {
    try {
        const FinanceStore = useFinanceStore();



        const response = await api().post('cautions/recover/' + id);
        if (response.status == 200) {
            let caution = FinanceStore.caution.find((item) => item.id === id);
            if (caution) {
                Object.assign(caution, response.data.caution);
            }
        }
    } catch (error) {
        console.log(error);
    }
}
async function getCheque() {
    try {
        const FinanceStore = useFinanceStore();

        const response = await api().get('cheque');
        if (response.status == 200) {
            FinanceStore.SetCheque(response.data);
            return response.data;
        }
    } catch (error) {
        console.log(error);
        return Promise.reject(error);

    }
}
async function encaisser(id) {
    try {
        const FinanceStore = useFinanceStore();


        const response = await api().put('cheque/encaisser/' + id);
        if (response.status == 200) {
            let cheque = FinanceStore.cheque.find((item) => item.id === id);
            if (cheque) {
                Object.assign(cheque, response.data.cheque);
            }
        }
    } catch (error) {
        console.log(error);
    }
}

async function insertFactureAttachement(req) {
    try {
        const response = await api().post('facture/comp/store-attachement', req);
        if (response.status == 200) {
            console.log(response.data);
            return response.data;
        }
    } catch (error) {
        console.log(error);
        return Promise.reject(error);

    }
}

async function getById(id) {
    try {
        const FinanceStore = useFinanceStore();
        const response = await api().get('facture/get/' + id);
        if (response.status == 200) {
            FinanceStore.setFacture(response.data);
            return response.data;
        }
    } catch (error) {
        console.log(error);
        return Promise.reject(error);

    }
}

async function insertCheque(req) {
    try {
        const response = await api().post('cheque/', req);
        if (response.status == 200) {
            console.log(response.data);
            return response.data;
        }
    } catch (error) {
        console.log(error);
        return Promise.reject(error);

    }
}

// const getProjects = async () => {
//     try {
//         const response = await api().get('/projects/get');
//         const sharedStore = useSharedStore();
//         sharedStore.setProjects(response.data.projects);
//     } catch (error) {
//         return Promise.reject(error);
//     }
// };

const getCarnets = async () => {
    try {
        const response = await api().get('/compte-carnet/');
        const FinanceStore = useFinanceStore();
        FinanceStore.setCarnets(response.data.carnets);
    }  catch (error) {
        return Promise.reject(error);
      }
};


export default {
    get,
    insert,
    update,
    Delete,
    getCompsByProjectId,
    insertComp,
    getCaution,
    recover,
    getCheque,
    encaisser,
    insertFactureAttachement,
    ValidStatus,
    RejectStatus,
    getById,
    ValidAvoir,
    insertCheque,
    getCarnets
}
