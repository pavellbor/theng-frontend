import axios from 'axios'
import { useAuthStore } from '@/entities/auth'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const api = axios.create({
  baseURL: API_URL,
})

export const setupApiInterceptors = (authStore: ReturnType<typeof useAuthStore>,) => {
  api.interceptors.request.use((config) => {
    const token = authStore.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        authStore.logout()
      }
      return Promise.reject(error)
    },
  )
}
