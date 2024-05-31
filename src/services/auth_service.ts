import router from '@/router'
import { useAuthStore } from '@/stores'
import { api, helpers } from '@/utils'

const baseURL = 'auth/'

export const authService = {
  async login(formData: { email: string; password: string }) {
    return await api()
      .post(`${baseURL}login`, formData)
      .then((response) => {
        useAuthStore().login(response.data.user, response.data.role)
        router.push({ name: helpers.initialHomePage(response.data.role) })
        return { success: true, message: 'Connexion réussie' }
      })
      .catch((error) => {
        const res = { success: false, message: 'Erreur de système' }
        switch (error.response.status) {
          case 401:
            res.message =
              "Nous n'avons pas pu trouver de compte avec cette adresse e-mail et ce mot de passe."
            break
          case 403:
            res.message = "Vous n'êtes pas autorisé à accéder à cette ressource."
            break
          default:
            break
        }
        return res
      })
  },

  async logout() {
    return await api()
      .post(`${baseURL}logout`)
      .then(() => {
        useAuthStore().logout()
        return { success: true, message: 'Déconnexion réussie' }
      })
      .catch(() => {
        return { success: false, message: 'Erreur de système' }
      })
      .finally(() => {
        helpers.closeModal()
      })
  },

  async forgotPassword(email: string) {
    return await api()
      .post(`${baseURL}reset-password`, { email })
      .then(() => {
        return { success: true, message: 'Un e-mail a été envoyé à votre adresse e-mail' }
      })
      .catch(() => {
        return { success: false, message: 'Erreur de système' }
      })
  },

  async resetPassword(query: any) {
    return await api()
      .post(`${baseURL}reset-new-password`, query)
      .then(() => {
        return { success: true, message: 'Mot de passe réinitialisé avec succès' }
      })
      .catch(() => {
        return { success: false, message: 'Erreur de système' }
      })
  }
}
