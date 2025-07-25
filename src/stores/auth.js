import { defineStore } from 'pinia'
import api from '@/plugins/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
  }),

  actions: {
    async login(email, password) {
      this.loading = true
      try {
        console.log('login', { email, password })
        const response = await api.post('/profiles/login', { email, password })
        this.token = response.data.access_token
        localStorage.setItem('token', this.token)

        this.user = response.data.user || null
      } catch (err) {
        console.error('Erreur de connexion', err)
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
    },

    async fetchUser() {
      if (!this.token) return
      try {
        const response = await api.get('/me')
        this.user = response.data
      } catch (err) {
        console.error('Erreur fetch user', err)
      }
    },
  },
})
