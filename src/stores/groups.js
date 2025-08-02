import { defineStore } from 'pinia'
import api from '@/plugins/axios'

export const useGroupsStore = defineStore('groups', {
  state: () => ({
    groups: [],
    fetchError: null,
    loading: false,
  }),

  getters: {
    hasGroups: (state) => state.groups.length > 0,
  },

  actions: {
    async fetchGroups(ownerId) {
      this.loading = true
      this.fetchError = null
      try {
        const response = await api.get(`/groups/owner/${ownerId}`)
        this.groups = response.data || []
      } catch (err) {
        if (err.response?.status === 404) {
          this.groups = []
          this.fetchError = null
        } else {
          this.fetchError = "Erreur lors du chargement des groupes."
          this.groups = []
        }
      } finally {
        this.loading = false
      }
    },
    async createGroup(payload) {
      this.loading = true
      try {
        const response = await api.post('/groups', payload)
        this.groups.push(response.data)
        return response.data
      } finally {
        this.loading = false
      }
    },
    async deleteGroup(groupId) {
      this.loading = true
      try {
        await api.delete(`/groups/${groupId}`)
        this.groups = this.groups.filter(g => g.id !== groupId)
      } finally {
        this.loading = false
      }
    },
    reset() {
      this.groups = []
      this.fetchError = null
    }
  }
})