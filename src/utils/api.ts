import router from '@/router'
import axios, { AxiosError } from 'axios'
import Cookies from 'js-cookie'

axios.defaults.headers.common['Content-Type'] = 'multipart/form-data'

export const api = (baseURL = import.meta.env.VITE_API_URL) => {
  const instance = axios.create({
    baseURL: baseURL,
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json'
    }
  })

  instance.interceptors.request.use((config) => {
    // Ensure the latest token is always used
    const updatedToken = Cookies.get('token')
    if (updatedToken) {
      config.headers.Authorization = `Bearer ${updatedToken}`
    }
    return config
  })

  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      localStorage.clear()
      Cookies.remove('token')
      router.push({ name: 'Login' })
      return Promise.reject(error)
    }
  )

  return instance
}
