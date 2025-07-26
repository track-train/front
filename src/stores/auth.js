import { defineStore } from 'pinia'
import api from '@/plugins/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
  }),

  actions: {
    async login(email, password) {
      this.loading = true
      this.error = null
      try {
        const response = await api.post('/profiles/login', { email, password })
        this.token = response.data.access_token
        localStorage.setItem('token', this.token)

        this.user = response.data.user || null
        this.error = null
      } catch (err) {
        console.error('Erreur de connexion', err)
        if (err.response?.data?.message) {
          this.error = err.response.data.message
        } else {
          this.error = 'Erreur de connexion'
        }
        this.token = null
        this.error = null
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.token = null
      this.user = null
      this.error = null
      localStorage.removeItem('token')
    },

    async fetchUser() {
      if (!this.token) return
      try {
        const response = await api.get('/me')
        this.user = response.data
        this.error = null
      } catch (err) {
        console.error('Erreur fetch user', err)
        if (err.response?.status === 401) {
          this.logout()
        }
      }
    },
    clearError() {
      this.error = null
    },
  },
})
