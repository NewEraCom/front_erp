import { api } from '@/utils';
import { usePMStore } from '@/store';
import { useRouter } from 'vue-router';

const router = useRouter();

async function getDataManager() {
  const PMStore = usePMStore();
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const res = await api().get('projects/stats/' + user.id);
    if (res.status === 200) {
      PMStore.setDashboardData(res.data);
      return res.data;
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

async function getPurchasesOrder(type: string) {
  try {
    const PMStore = usePMStore();

    const res = await api().get('purchase/get/' + type);
    if (res.status === 200) {
      PMStore.setPurchases(res.data);
      return res.data;
    } else {
      return false;
    }
  } catch (e) {
    return Promise.reject(e);
  }
}

async function getFacture() {
  try {
    const PMStore = usePMStore();

    const response = await api().get('facture/get');
    if (response.status == 200) {
      PMStore.setFacture(response.data);
      return response.data;
    }
  } catch (error) {
    return Promise.reject(error);
  }
}
async function getBorderaux(id) {
  try {
    const PMStore = usePMStore();

    const res = await api().get('purchase/get-articles/' + id);
    if (res.status === 200) {
      PMStore.setBorderaux(res.data.articles);
    }
  } catch (e) {
    return Promise.reject(e);
  }
}
async function updateFacture(req: any) {
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
      return false;
    }
  } catch (error) {
    return Promise.reject(error);
  }
}
async function deleteFacture(id) {
  try {
    const response = await api().delete('facture/delete/' + id);
    if (response.status == 200) {
      console.log(response.data);

      return response.data;
    }
  } catch (error) {
    return Promise.reject(error);
  }
}
async function getPreProject() {
  try {
    const PMStore = usePMStore();

    const response = await api().get('preprojects');
    if (response.status === 200) {
      PMStore.setPreProject(response.data);
    }
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}


const getProjectById = async (id: string) => {
  try {
    const response = await api().get('projects/details/' + id);
    if (response.status === 200) {
      const PMStore = usePMStore();
      PMStore.setProject(response.data.project);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

const getProjects = async () => {
  try {
    const response = await api().get('projects/get');
    if (response.status === 200) {
      const PMStore = usePMStore();
      PMStore.projects = response.data.projects;
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

const deleteDemande = async () => {
  try {
    const PMStore = usePMStore();
    const id = PMStore.selectedArticle.id;
    const response = await api().delete('purchase/delete/' + id);
    if (response.status === 200) {
      PMStore.deletePurchaseOrderFromProject(id);
    }
  } catch (e) {
    return Promise.reject(e);
  }
};

const getOutOfStockRequests = async () => {
  try {
    const response = await api().get('logistics/stock/get-project-sortie');
    if (response.status === 200) {
      const PMStore = usePMStore();
      PMStore.setOutOfStockRequests(response.data.demandes);
    }
  } catch (e) {
    return Promise.reject(e);
  }
};

async function getPreProjectById(req: string) {
  try {
    const PMStore = usePMStore();

    PMStore.preprojectDetail = null;
    const response = await api().get('preprojects' + '/' + req);
    if (response.status == 200) {
      PMStore.preprojectDetail = null;
      if (response.data.projectManagers.length > 0) {
        PMStore.projectManager = response.data.projectManagers;
      } else {
        PMStore.projectManager = [];
      }
      PMStore.setPreProjectDetail(response.data.preProject);
    } else {
      router.push('*');
    }
  } catch (error) {
    router.push('/*');
  }
}

async function deleteArticle(id: number) {
  try {
    const PMStore = usePMStore();

    const response = await api().delete('preprojects/delete-article/' + id);
    console.log(response.data);
    if (response.status == 200) {
      PMStore.preprojectDetail.articles_lot = PMStore.preprojectDetail.articles_lot.filter((doc: { id: number; }) => doc.id !== id);
    }
  } catch (error) {
    return error;
  }
}

async function addLots(req: any) {
  try {
    const PMStore = usePMStore();

    const response = await api().post('preprojects/add-lots', req);
    console.log(response.data);
    if (response.status == 200) {
      PMStore.preproject = null;
      PMStore.setPreProject(response.data[0]);
    }
  } catch (error) {
    return error;
  }
}
async function cancel(req: any) {
  try {
    const PMStore = usePMStore();

    const response = await api().post('preprojects/cancel-submission/', req);
    if (response.status == 200) {
      PMStore.setPreProject(response.data[0].preProject);
    }
    return response.status;
  } catch (error) {
    console.log(error);
  }
}
export async function markChiffrageDone(req: string) {
  try {
    const PMStore = usePMStore();

    const response = await api().post('chiffrage/close/' + req);
    if (response.status == 200) {
      PMStore.closeChiffratePreProject(response.data.chiffrage_status);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function clotureLostProject(req: any) {
  try {
    const PMStore = usePMStore();

    const response = await api().post('chiffrage/mark', req);
    console.log(response.data);
    if (response.status == 200) {
      PMStore.preprojectDetail = null;
      PMStore.setPreProject(response.data[0]);
      return response.status;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function clotureComplex(req: any) {
  try {
    const PMStore = usePMStore();

    const response = await api().post('preprojects/cloture-complex', req);
    if (response.status == 200) {
      console.log(response.data);
      PMStore.setPreProject(response.data.pre_project);
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function clotureSimple(req: any) {
  try {
    const PMStore = usePMStore();

    const response = await api().post('preprojects/cloture-simple', req);
    if (response.status == 200) {
      PMStore.setPreProject(response.data.pre_project);
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}
async function remove(req: string) {
  try {
    const PMStore = usePMStore();

    const response = await api().delete('chiffrage/delete/' + req);
    if (response.status == 200) {

      await PMStore.removeChiffragePreProject(req);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function update(req: any) {
  try {
    const PMStore = usePMStore();

    const response = await api().put('preprojects/update', req);
    console.log(response.data);
    if (response.status == 200) {
      PMStore.setPreProject(response.data.preProject);
    }
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function uploadFiles(req: any) {

  try {
    const PMStore = usePMStore();

    const response = await api().post('preprojects/upload-files', req);
    if (response.status == 200) {
      PMStore.preprojectDetail = null;
      PMStore.setPreProject(response.data[0]);
    }
    return response.status;
  } catch (error) {
    return error;
  }
}

async function setFiles(req: any) {
  try {
    const PMStore = usePMStore();

    const response = await api().post('preprojects/set-files', req);
    if (response.status == 200) {
      PMStore.preprojectDetail = null;
      PMStore.setPreProject(response.data[0]);
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function setFilesDone(req: any) {
  try {
    const PMStore = usePMStore();

    const response = await api().post('preprojects/set-files-done', req);
    if (response.status == 200) {
      PMStore.preprojectDetail = null;
      PMStore.setPreProject(response.data[0]);
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}
async function importBordereau(req: any) {

  try {
    const PMStore = usePMStore();

    const response = await api().post('bordereau/import', req);
    if (response.status == 200) {
      console.log(response.data);
      PMStore.setBordereauOnMass(response.data.lots, response.data.bordereau);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function importChiffrage(req: any) {

  try {
    const PMStore = usePMStore();

    const response = await api().post('chiffrage/import', req);
    await PMStore.setChiffrageOnMass(response.data.chiffrages);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function create(req: any) {

  try {
    const PMStore = usePMStore();

    const response = await api().post('chiffrage/insert', req);
    PMStore.setChiffragePreProject(response.data.chiffrages);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function refuser(req: any) {

  try {
    const PMStore = usePMStore();

    const response = await api().post('preprojects/refuser/', req);
    if (response.status == 200) {
      PMStore.pushPreProjects(response.data);
      PMStore.setPreProject(response.data.preProject);
    }
    return response.status;
  } catch (error) {
    console.log(error);
  }
}

async function validate(req: any) {

  try {
    const PMStore = usePMStore();

    const response = await api().post('preprojects/validate', req);
    if (response.status == 200) {
      PMStore.pushPreProjects(response.data);
      PMStore.setPreProject(response.data.preProject);
    }
    return response.status;
  } catch (error) {
    console.log(error);
  }
}


export default {
  getDataManager,
  getPurchasesOrder,
  getFacture,
  getBorderaux,
  updateFacture,
  deleteFacture,
  getProjectById,
  deleteDemande,
  getOutOfStockRequests,
  getPreProject,
  getPreProjectById,
  addLots,
  cancel,
  clotureLostProject,
  clotureComplex,
  clotureSimple,
  remove,
  update,
  uploadFiles,
  setFiles,
  setFilesDone,
  importBordereau,
  importChiffrage,
  create,
  refuser,
  validate,
  getProjects, deleteArticle,
};
