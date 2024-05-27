import { api } from '@/utils'
import { useAuthStore, usePortalStore,useHrStore } from '@/stores'

const baseURL = 'portal/'

export const portalService = {
  async updateAvatar(formData: any) {
    const response = await api().post(`${baseURL}update-employee-avatar`, formData)
    if (response.status == 200) {
      useAuthStore().updateProfilePicture(response.data.profile_picture)
    } else {
      return response
    }
  },

  async requestLeave(formData: any) {
    const response = await api().post(`${baseURL}request-leave`, formData)
    if (response.status == 200) {
      usePortalStore().pushEventToCalendar(response.data)
      return response.status
    } else {
      return response
    }
  },

  async requestRemote(formData: any) {
    const response = await api().post(`${baseURL}request-remotely`, formData)
    if (response.status == 200) {
      usePortalStore().pushEventToCalendar(response.data)
      return response.status
    } else {
      return response
    }
  },

  async getEvents() {
    const response = await api().get(`${baseURL}events`)
    if (response.status == 200) {
      usePortalStore().setEventsToCalendar(response.data)
    } else {
      return response
    }
  },

  async getEmployees(){
    const response = await api().get('/employees/get')
    if(response.status == 200) {
      useHrStore().setEmployees(response.data.employees)
      return response
    }else{
      return response
    }
  }
}
