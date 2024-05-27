import { defineStore } from 'pinia'

export const useAuthStore = defineStore('AuthStore', {
  state: () => ({
    token: null as string | null,
    user: null as any | null,
    role: null as string | null
  }),
  actions: {
    login(user: any, token: string, role: string) {
      this.user = user
      this.token = token
      this.role = role
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)
      localStorage.setItem('role', role)
    },
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    },
    initializeStore() {
      const user = JSON.parse(localStorage.getItem('user'))
      const token = localStorage.getItem('token')
      const role = localStorage.getItem('role')
      if (user && token) {
        this.user = user
        this.token = token
        this.role = role
      }
    },
    updateProfilePicture(profilePicture: string) {
      this.user.user.profile_picture = profilePicture
      const updatedUser = JSON.parse(localStorage.getItem('user'))
      updatedUser.user.profile_picture = profilePicture
      localStorage.setItem('user', JSON.stringify(updatedUser))
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
    getRole: (state) => state.role
  }
})
