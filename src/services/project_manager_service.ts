import { api } from '@/utils'
import { usePMStore } from '@/store'

async function getDataManager() {
  const PMStore = usePMStore()
  try {
    const user = JSON.parse(localStorage.getItem('user'))
    const res = await api().get('projects/stats/' + user.id)
    if (res.status === 200) {
      PMStore.setDashboardData(res.data)
      return res.data
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

async function getPurchasesOrder() {
  try {
    const PMStore = usePMStore()

    const res = await api().get('purchase/get')
    if (res.status === 200) {
      PMStore.setPurchases(res.data)
      console.log(res.data);
      
      return res.data
    } else {
      return false
    }
  } catch (e) {
    return Promise.reject(e);
  }
}

export default {
  getDataManager,
  getPurchasesOrder
}
