import { api } from '@/utils';
import { usePMStore } from '@/store';

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
      console.log(res.data);
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
async function updateFacture(req) {
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

const deleteDemande = async () => {
  try {
    const PMStore = usePMStore();
    const id = PMStore.selectedArticle.id;
    const response = await api().delete('purchase/delete/' + id);
    if (response.status === 200) {
      const PMStore = usePMStore();
      PMStore.deletePurchaseOrderFromProject(id);
    }
  } catch (e) {
    return Promise.reject(e);
  }
};


export default {
  getDataManager,
  getPurchasesOrder,
  getFacture,
  getBorderaux,
  updateFacture,
  deleteFacture,
  getProjectById,
  deleteDemande
};
