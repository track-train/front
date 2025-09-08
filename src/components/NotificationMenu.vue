<template>
  <v-menu
    v-model="menu"
    offset-y
    :close-on-content-click="false"
    transition="slide-y-transition"
    max-width="400"
  >
    <template #activator="{ props }">
      <v-btn icon variant="text" class="notification-btn" v-bind="props" @click="handleMenuToggle">
        <v-icon color="white" size="24">mdi-bell-outline</v-icon>
        <v-badge
          v-if="unreadCount > 0"
          :content="unreadCount"
          color="error"
          class="notification-badge"
        >
        </v-badge>
      </v-btn>
    </template>

    <div class="notification-menu" style="min-width: 350px; max-width: 400px">
      <div class="notification-header d-flex align-center">
        <v-icon class="mr-2" color="white">mdi-bell</v-icon>
        <span class="header-title">Notifications</span>
        <v-spacer />
        <v-btn
          v-if="unreadCount > 0"
          size="small"
          variant="text"
          class="mark-all-btn"
          @click="markAllAsRead"
          :loading="loading"
        >
          Tout lire
        </v-btn>
      </div>

      <div class="notification-list" style="max-height: 400px; overflow-y: auto">
        <template v-if="loading && notifications.length === 0">
          <div class="text-center pa-4">
            <v-progress-circular indeterminate color="white" size="24" />
            <p class="text-body-2 mt-2 text-white">Chargement...</p>
          </div>
        </template>

        <template v-else-if="notifications.length === 0">
          <div class="empty-notifications text-center pa-6">
            <v-icon size="48" color="rgba(255, 255, 255, 0.7)">mdi-bell-off</v-icon>
            <p class="text-h6 mt-2 text-white">Aucune notification</p>
            <p class="text-body-2" style="color: rgba(255, 255, 255, 0.8)">Vous êtes à jour !</p>
          </div>
        </template>

        <template v-else>
          <div
            v-for="notification in notifications"
            :key="notification.id"
            class="notification-item"
            :class="{ unread: !notification.read }"
          >
            <div class="notification-content">
              <div class="notification-main">
                <div class="d-flex align-start">
                  <div class="notification-text flex-grow-1">
                    <h4 class="notification-title">{{ notification.title }}</h4>
                    <p class="notification-description">{{ notification.description }}</p>
                    <span class="notification-time">{{ formatTime(notification.created_at) }}</span>
                  </div>

                  <div v-if="!notification.read" class="unread-indicator ml-2" />
                </div>
              </div>

              <div class="notification-actions mt-2">
                <v-btn
                  v-if="!notification.read"
                  size="small"
                  variant="text"
                  class="mark-read-btn"
                  @click="markAsRead(notification.id)"
                  :loading="notification.loading"
                >
                  <v-icon size="16">mdi-check</v-icon>
                  Marquer comme lu
                </v-btn>
                <span v-else class="read-status">
                  <v-icon size="16" color="rgba(255, 255, 255, 0.9)">mdi-check-circle</v-icon>
                  Lu
                </span>
              </div>
            </div>
          </div>
        </template>
      </div>

      <div class="notification-footer">
        <v-btn variant="text" size="small" @click="closeMenu" block class="close-btn">
          Fermer
        </v-btn>
      </div>
    </div>
  </v-menu>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useNotificationsStore } from '@/stores/notifications'

const notificationsStore = useNotificationsStore()
const menu = ref(false)

const notifications = computed(() => notificationsStore.allNotifications)
const unreadCount = computed(() => notificationsStore.unreadCount)
const loading = computed(() => notificationsStore.isLoading)

const handleMenuToggle = async () => {
  if (!menu.value) {
    await notificationsStore.fetchNotifications()
  }
}

const markAsRead = async (notificationId) => {
  try {
    const notification = notifications.value.find((n) => n.id === notificationId)
    if (notification) {
      notification.loading = true
    }

    await notificationsStore.markAsRead(notificationId)
  } catch (error) {
    console.error('Erreur lors du marquage comme lu:', error)
  } finally {
    const notification = notifications.value.find((n) => n.id === notificationId)
    if (notification) {
      notification.loading = false
    }
  }
}

const markAllAsRead = async () => {
  try {
    await notificationsStore.markAllAsRead()
  } catch (error) {
    console.error('Erreur lors du marquage de toutes les notifications:', error)
  }
}

const closeMenu = () => {
  menu.value = false
}

const formatTime = (timestamp) => {
  if (!timestamp) return ''

  const date = new Date(timestamp)
  const now = new Date()
  const diffInSeconds = Math.floor((now - date) / 1000)

  if (diffInSeconds < 60) {
    return "À l'instant"
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `Il y a ${minutes} min`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `Il y a ${hours}h`
  } else {
    const days = Math.floor(diffInSeconds / 86400)
    return `Il y a ${days}j`
  }
}

onMounted(() => {
  notificationsStore.fetchNotifications()
})
</script>

<style lang="scss" scoped>
.notification-btn {
  position: relative;
}

.notification-badge {
  position: absolute;
  top: -5px;
  right: -5px;
}

.notification-menu {
  background: linear-gradient(180deg, #0a796c, #083f39);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.notification-header {
  color: white;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.header-title {
  font-weight: 600;
  font-size: 16px;
}

.mark-all-btn {
  color: white !important;
  font-size: 12px;
  background-color: rgba(255, 255, 255, 0.1) !important;
  border-radius: 6px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2) !important;
  }
}

.notification-list {
  background: transparent;
}

.notification-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 16px;
  transition: all 0.2s ease;

  &.unread {
    background-color: rgba(255, 255, 255, 0.1);
    border-left: 3px solid rgba(255, 255, 255, 0.8);
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }

  &:last-child {
    border-bottom: none;
  }
}

.notification-content {
  width: 100%;
}

.notification-title {
  font-size: 14px;
  font-weight: 600;
  color: white;
  margin-bottom: 4px;
  line-height: 1.3;
}

.notification-description {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 8px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.notification-time {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
}

.unread-indicator {
  width: 8px;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 4px;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
}

.notification-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.mark-read-btn {
  color: white !important;
  background-color: rgba(255, 255, 255, 0.1) !important;
  border-radius: 4px;
  font-size: 12px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2) !important;
  }
}

.read-status {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.9);
}

.empty-notifications {
  color: rgba(255, 255, 255, 0.9);
}

.notification-footer {
  padding: 12px 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.05);
}

.close-btn {
  color: white !important;
  background-color: rgba(255, 255, 255, 0.1) !important;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2) !important;
  }
}

@media (max-width: 768px) {
  .notification-menu {
    min-width: 300px;
    max-width: 350px;
  }

  .notification-item {
    padding: 12px;
  }

  .notification-title {
    font-size: 13px;
  }

  .notification-description {
    font-size: 12px;
  }
}
</style>
