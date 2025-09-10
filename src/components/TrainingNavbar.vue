<template>
  <v-navigation-drawer v-if="!mobile" permanent class="sidebar-menu" expand-on-hover rail>
    <v-list density="compact" nav class="sidebar-list">
      <v-list-item
        v-for="item in filteredMenuItems"
        :key="item.title"
        :prepend-icon="item.icon"
        :title="item.title"
        :value="item.route"
        class="sidebar-item"
        :class="{ active: isActiveRoute(item) }"
        @click="handleItemClick(item)"
      >
        <template #append v-if="item.hasSubmenu">
          <v-icon icon="mdi-chevron-right" size="16" color="white" />
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-fab
    v-else
    :absolute="false"
    :app="true"
    location="top left"
    size="large"
    icon
    class="fab-menu"
    @click="open = !open"
  >
    <v-icon>{{ open ? 'mdi-close' : 'mdi-menu' }}</v-icon>
    <v-speed-dial
      v-model="open"
      location="bottom center"
      transition="slide-y-reverse-transition"
      activator="parent"
      open-on-hover="false"
    >
      <v-btn
        v-for="item in filteredMenuItems"
        :key="item.title"
        rounded
        class="fab-item"
        @click="handleItemClick(item)"
      >
        <v-icon size="28" class="mr-2">{{ item.icon }}</v-icon>
        <span class="visually-hidden">{{ item.title }}</span>
      </v-btn>
    </v-speed-dial>
  </v-fab>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useDisplay } from 'vuetify'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const { mobile } = useDisplay()

const open = ref(false)

const allMenuItems = ref([
  {
    title: 'Accueil',
    icon: 'mdi-dumbbell',
    hasSubmenu: false,
    route: 'home',
    roles: ['user', 'coach', 'admin'],
    requiresAuth: true,
  },
  {
    title: 'Daily Checkups',
    icon: 'mdi-clipboard-check',
    hasSubmenu: false,
    route: 'DailyCheckups',
    roles: ['user', 'coach', 'admin'],
    requiresAuth: true,
  },
  {
    title: 'Trouver un coach',
    icon: 'mdi-magnify',
    hasSubmenu: false,
    route: 'FindCoach',
    roles: ['user', 'coach', 'admin'],
    requiresAuth: true,
  },
  {
    title: 'Groupes',
    icon: 'mdi-account-group',
    hasSubmenu: false,
    route: 'GroupsCoach',
    roles: ['coach', 'admin'],
    requiresAuth: true,
  },
  {
    title: 'Panel Admin',
    icon: 'mdi-shield-crown',
    hasSubmenu: false,
    route: 'adminPanel',
    roles: ['admin'],
    requiresAuth: true,
  },
])

const filteredMenuItems = computed(() => {
  if (!authStore.isAuthenticated) {
    return []
  }

  return allMenuItems.value.filter((item) => {
    return authStore.hasRole(item.roles)
  })
})

const isActiveRoute = (item) => {
  if (!item.route) return false

  if (item.route === 'GroupsCoach') {
    return (
      route.name === 'GroupsCoach' ||
      route.name === 'GroupsMember' ||
      route.name === 'UserProfilePage'
    )
  }

  if (item.route === 'DailyCheckups') {
    return route.name === 'DailyCheckups'
  }

  return route.name === item.route
}

const handleItemClick = (item) => {
  if (item.route) {
    if (item.route === 'GroupsCoach') {
      router.push({
        name: 'GroupsCoach',
        params: { ownerId: authStore.userId },
      })
    } else {
      router.push({ name: item.route })
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar-menu {
  background-color: #1a4d4d !important;
  border-right: none !important;
  top: 0 !important;
  height: 100% !important;
  z-index: 1500 !important;
}

.user-profile {
  padding: 16px !important;
  margin-bottom: 8px !important;
}

.user-profile .v-list-item__prepend {
  margin-inline-end: 12px !important;
}

.user-profile .v-list-item-title {
  color: #ffffff !important;
  font-weight: 500 !important;
  font-size: 14px !important;
}

.user-profile .v-list-item-subtitle {
  color: rgba(255, 255, 255, 0.7) !important;
  font-size: 12px !important;
}

.sidebar-list {
  padding-top: 8px !important;
  gap: 15px;
}

.sidebar-item {
  margin-bottom: 12px !important;
  border-radius: 8px !important;
  transition: all 0.2s ease !important;
  color: white;
}

.sidebar-item:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

.sidebar-item.active {
  background-color: rgba(255, 255, 255, 0.2) !important;
}

.sidebar-item .v-list-item__prepend .v-icon {
  color: #ffffff !important;
  font-size: 25px !important;
}

.sidebar-item .v-list-item-title {
  font-family: 'Spectral', serif !important;
  font-weight: 400 !important;
  font-size: 14px !important;
  line-height: 120% !important;
  color: #ffffff !important;
}

.sidebar-item .v-list-item__append .v-icon {
  color: #ffffff !important;
}

.v-navigation-drawer--rail .sidebar-item .v-list-item-title {
  font-size: 10px !important;
  text-align: center !important;
  line-height: 100% !important;
}

@import url('https://fonts.googleapis.com/css2?family=Spectral:wght@400&display=swap');

.v-divider {
  margin: 8px 16px !important;
}

@media (max-width: 768px) {
  .sidebar-menu {
    position: fixed !important;
  }
}

.fab-menu {
  top: 5px !important;
  left: 5px !important;
  z-index: 3000 !important;
  :deep(.v-fab__container) {
    .v-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
      color: #ffffff;
    }
  }
}

.fab-item {
   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
      color: #ffffff;
}
</style>
