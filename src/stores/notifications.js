import { defineStore } from 'pinia'
import api from '@/plugins/axios'

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    notifications: [],
    loading: false,
  }),

  getters: {
    unreadNotifications: (state) =>
      state.notifications.filter(notification => !notification.read),

    unreadCount: (state) =>
      state.notifications.filter(notification => !notification.read).length,

    allNotifications: (state) => state.notifications,

    isLoading: (state) => state.loading,
  },

  actions: {
    async fetchNotifications() {
      this.loading = true
      try {
        const response = await api.get('/notifications/mine')
        this.notifications = response.data || []
        return this.notifications
      } catch (error) {
        console.error('Erreur lors du chargement des notifications:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async markAsRead(notificationId) {
      try {
        await api.patch(`/notifications/${notificationId}/read`)

        const notification = this.notifications.find(n => n.id === notificationId)
        if (notification) {
          notification.read = true
        }

        return true
      } catch (error) {
        console.error('Erreur lors du marquage comme lu:', error)
        throw error
      }
    },

    async markAllAsRead() {
      try {
        const unreadIds = this.unreadNotifications.map(n => n.id)

        await Promise.all(
          unreadIds.map(id => api.patch(`/notifications/${id}/read`))
        )

        this.notifications.forEach(notification => {
          if (unreadIds.includes(notification.id)) {
            notification.read = true
          }
        })

        return true
      } catch (error) {
        console.error('Erreur lors du marquage de toutes les notifications comme lues:', error)
        throw error
      }
    },

    addNotification(notification) {
      this.notifications.unshift(notification)
    },

    removeNotification(notificationId) {
      const index = this.notifications.findIndex(n => n.id === notificationId)
      if (index !== -1) {
        this.notifications.splice(index, 1)
      }
    },

    clearNotifications() {
      this.notifications = []
    }
  }
})
