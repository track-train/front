import { defineStore } from 'pinia'
import api from '@/plugins/axios'
import { useSnackbarStore } from '@/stores/snackbar'

export const useDailyCheckupStore = defineStore('dailyCheckup', {
  state: () => ({
    dailyCheckups: [],
    loading: false,
    submitting: false,
  }),

  getters: {
    getAllCheckups: (state) => state.dailyCheckups,
    isLoading: (state) => state.loading,
    isSubmitting: (state) => state.submitting,
    getLatestCheckup: (state) => {
      if (state.dailyCheckups.length === 0) return null
      return state.dailyCheckups.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0]
    },
    getTodayCheckup: (state) => {
      const today = new Date().toISOString().split('T')[0]
      return state.dailyCheckups.find((checkup) => {
        const checkupDate = new Date(checkup.created_at).toISOString().split('T')[0]
        return checkupDate === today
      })
    },
  },

  actions: {
    async fetchDailyCheckups() {
      this.loading = true
      const snackbar = useSnackbarStore()

      try {
        const response = await api.get('/daily-checkups/mine')
        this.dailyCheckups = response.data || []

        if (this.dailyCheckups.length > 0) {
          snackbar.success(
            `${this.dailyCheckups.length} Daily Checkup${this.dailyCheckups.length > 1 ? 's' : ''} chargé${this.dailyCheckups.length > 1 ? 's' : ''} avec succès`,
          )
        }

        return this.dailyCheckups
      } catch (error) {
        console.error('❌ Erreur lors du chargement des daily checkups:', error)

        if (error.response?.status === 401) {
          snackbar.error('Vous devez être connecté pour accéder à vos Daily Checkups')
        } else if (error.response?.status === 403) {
          snackbar.error("Vous n'avez pas les permissions pour accéder à ces données")
        } else if (error.response?.status >= 500) {
          snackbar.error('Erreur serveur lors du chargement de vos Daily Checkups')
        } else if (error.code === 'NETWORK_ERROR') {
          snackbar.error('Problème de connexion. Vérifiez votre réseau.')
        } else {
          snackbar.error('Impossible de charger vos Daily Checkups')
        }

        throw error
      } finally {
        this.loading = false
      }
    },

    async createDailyCheckup(formData) {
      this.submitting = true
      const snackbar = useSnackbarStore()

      try {
        const response = await api.post('/daily-checkups', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        this.dailyCheckups.unshift(response.data)

        snackbar.success('🎉 Daily Checkup créé avec succès !', 3000)

        return response.data
      } catch (error) {
        console.error('❌ Erreur lors de la création du daily checkup:', error)

        if (error.response?.status === 400) {
          const errorData = error.response.data
          if (errorData.detail) {
            if (errorData.detail === 'Daily checkup already exists for today') {
              snackbar.error("Vous avez déjà soumis un Daily Checkup aujourd'hui")
            } else snackbar.error(`Erreur de validation : ${errorData.detail}`)
          } else {
            snackbar.error('Données invalides. Vérifiez les champs requis.')
          }
        } else if (error.response?.status === 401) {
          snackbar.error('Vous devez être connecté pour créer un Daily Checkup')
        } else if (error.response?.status === 413) {
          snackbar.error('Les fichiers sont trop volumineux (max 3MB par photo)')
        } else if (error.response?.status >= 500) {
          snackbar.error('Erreur serveur lors de la création du Daily Checkup')
        } else if (error.code === 'NETWORK_ERROR') {
          snackbar.error('Problème de connexion. Vérifiez votre réseau.')
        } else {
          snackbar.error('Échec de la création du Daily Checkup')
        }

        throw error
      } finally {
        this.submitting = false
      }
    },

    async deleteDailyCheckup(checkupId) {
      const snackbar = useSnackbarStore()

      try {
        await api.delete(`/daily-checkups/${checkupId}`)

        const index = this.dailyCheckups.findIndex((checkup) => checkup.id === checkupId)
        if (index !== -1) {
          this.dailyCheckups.splice(index, 1)

          snackbar.success('🗑️ Daily Checkup supprimé avec succès', 3000)
        }

        return true
      } catch (error) {
        console.error('❌ Erreur lors de la suppression du daily checkup:', error)

        if (error.response?.status === 401) {
          snackbar.error('Vous devez être connecté pour supprimer un Daily Checkup')
        } else if (error.response?.status === 403) {
          snackbar.error("Vous n'avez pas le droit de supprimer ce Daily Checkup")
        } else if (error.response?.status === 404) {
          snackbar.error('Daily Checkup introuvable ou déjà supprimé')
        } else if (error.response?.status >= 500) {
          snackbar.error('Erreur serveur lors de la suppression')
        } else if (error.code === 'NETWORK_ERROR') {
          snackbar.error('Problème de connexion. Vérifiez votre réseau.')
        } else {
          snackbar.error('Échec de la suppression du Daily Checkup')
        }

        throw error
      }
    },

    async updateDailyCheckup(checkupId, formData) {
      this.submitting = true
      const snackbar = useSnackbarStore()

      try {
        const response = await api.put(`/daily-checkups/${checkupId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        const index = this.dailyCheckups.findIndex((checkup) => checkup.id === checkupId)
        if (index !== -1) {
          this.dailyCheckups[index] = response.data
        }

        snackbar.success('✅ Daily Checkup modifié avec succès !', 3000)

        return response.data
      } catch (error) {
        console.error('❌ Erreur lors de la modification du daily checkup:', error)

        if (error.response?.status === 400) {
          snackbar.error('Données invalides pour la modification')
        } else if (error.response?.status === 401) {
          snackbar.error('Vous devez être connecté pour modifier un Daily Checkup')
        } else if (error.response?.status === 403) {
          snackbar.error("Vous n'avez pas le droit de modifier ce Daily Checkup")
        } else if (error.response?.status === 404) {
          snackbar.error('Daily Checkup introuvable')
        } else if (error.response?.status >= 500) {
          snackbar.error('Erreur serveur lors de la modification')
        } else {
          snackbar.error('Échec de la modification du Daily Checkup')
        }

        throw error
      } finally {
        this.submitting = false
      }
    },

    handleValidationError(error) {
      const snackbar = useSnackbarStore()

      if (error.response?.data?.errors) {
        const errors = error.response.data.errors
        const errorMessages = Object.values(errors).flat()

        errorMessages.forEach((message, index) => {
          setTimeout(() => {
            snackbar.error(message, 4000)
          }, index * 500)
        })
      }
    },

    notifyCheckupStatus(status, customMessage = null) {
      const snackbar = useSnackbarStore()

      const messages = {
        created: customMessage || '🎉 Daily Checkup créé !',
        updated: customMessage || '✅ Daily Checkup mis à jour !',
        deleted: customMessage || '🗑️ Daily Checkup supprimé !',
        loaded: customMessage || '📋 Daily Checkups chargés',
        error: customMessage || '❌ Une erreur est survenue',
      }

      const colors = {
        created: 'success',
        updated: 'success',
        deleted: 'success',
        loaded: 'info',
        error: 'error',
      }

      if (colors[status] === 'error') {
        snackbar.error(messages[status])
      } else {
        snackbar.notify({
          message: messages[status],
          color: colors[status],
          timeout: status === 'loaded' ? 2000 : 3000,
        })
      }
    },

    addCheckup(checkup) {
      this.dailyCheckups.unshift(checkup)

      const snackbar = useSnackbarStore()
      snackbar.info('📋 Nouveau Daily Checkup ajouté', 2000)
    },

    clearCheckups() {
      this.dailyCheckups = []

      const snackbar = useSnackbarStore()
      snackbar.info('🧹 Daily Checkups effacés', 2000)
    },
  },
})
