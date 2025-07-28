import { defineStore } from 'pinia'
import api from '@/plugins/axios'
import { useSnackbarStore } from '@/stores/snackbar'

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
      const snackbar = useSnackbarStore()
      try {
        const response = await api.post('/profiles/login', { email, password })
        this.token = response.data.access_token
        localStorage.setItem('token', this.token)

        this.user = response.data.user || null
        this.error = null
        snackbar.success(`Bienvenue ${this.user?.name || email} !`)
      } catch (err) {
        console.error('Erreur de connexion', err)
        console.log(err.response.message)
        console.log(err.response.status)
        if (err.response?.status === 401) {
          this.error = 'Identifiants incorrects. Veuillez réessayer.'
        } else {
          this.error = 'Une erreur est survenue lors de la connexion. Veuillez réessayer.'
        }
        this.token = null
        snackbar.error(this.error)
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.token = null
      this.user = null
      this.error = null
      localStorage.removeItem('token')

      const snackbar = useSnackbarStore()
      snackbar.info('Vous avez été déconnecté.')
    },

    async fetchUser() {
      if (!this.token) return
      const snackbar = useSnackbarStore()
      try {
        const response = await api.get('/me')
        this.user = response.data
        this.error = null
      } catch (err) {
        console.error('Erreur fetch user', err)
        if (err.response?.status === 401) {
          snackbar.error('Session expirée, veuillez vous reconnecter.')
          this.logout()
        }
      }
    },
    clearError() {
      this.error = null
    },
  },
})
