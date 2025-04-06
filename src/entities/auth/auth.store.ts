import * as authApi from '@/entities/auth/auth.api'
import type { LoginDto, RegisterDto, User } from '@/shared/types'
import { defineStore } from 'pinia'

interface AuthState {
  user: User | null
  token: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
  },

  actions: {
    async fetchUser() {
      const response = await authApi.getUser()
      this.user = response
    },

    async login(loginDto: LoginDto) {
      const response = await authApi.login(loginDto)
      this.user = response.user
      this.token = response.token
    },

    async register(registerDto: RegisterDto) {
      const response = await authApi.register(registerDto)
      this.user = response.user
      this.token = response.token
    },

    async logout() {
      this.$reset()
    },
  },

  persist: true,
})
