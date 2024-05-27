import { api, helpers } from '@/utils'
import { useAuthStore } from '@/stores'
import router from '@/router'

const baseURL = 'auth/'

export const authService = {
  async login(formData: { email: string; password: string }) {
    const response = await api().post(`${baseURL}login`, formData)
    if (response.status == 200) {
      useAuthStore().login(response.data.employee, response.data.token, response.data.role)
      router.push(helpers.initialHomePage(response.data.role))
    } else {
      return response
    }
  }
}
