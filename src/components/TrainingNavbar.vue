<template>
  <v-navigation-drawer permanent class="sidebar-menu" expand-on-hover rail>
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
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const allMenuItems = ref([
  {
    title: 'Accueil',
    icon: 'mdi-dumbbell',
    hasSubmenu: false,
    route: 'home',
    roles: ['user', 'coach', 'admin'],
    requiresAuth: true,
  },
  // {
  //   title: 'Statistiques',
  //   icon: 'mdi-chart-bar',
  //   hasSubmenu: false,
  //   route: null, // Pas encore de route spécifique
  //   roles: ['user', 'coach', 'admin'],
  //   requiresAuth: true,
  // },
  // {
  //   title: 'Recherche de coach',
  //   icon: 'mdi-account-plus',
  //   hasSubmenu: true,
  //   route: null, // Action spéciale pour recherche
  //   roles: ['user'],
  //   requiresAuth: true,
  // },
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

  // {
  //   title: 'Messagerie',
  //   icon: 'mdi-message-text',
  //   hasSubmenu: false,
  //   route: null, // Pas encore de route spécifique
  //   roles: ['user', 'coach', 'admin'],
  //   requiresAuth: true,
  // },
  // {
  //   title: 'Support',
  //   icon: 'mdi-help-circle',
  //   hasSubmenu: false,
  //   route: null, // Pas encore de route spécifique
  //   roles: ['user', 'coach', 'admin'],
  //   requiresAuth: true,
  // },
  // {
  //   title: 'Paramètres',
  //   icon: 'mdi-cog',
  //   hasSubmenu: false,
  //   route: 'profile',
  //   roles: ['user', 'coach', 'admin'],
  //   requiresAuth: true,
  // },
])

// Filtrer les éléments du menu selon le rôle de l'utilisateur
const filteredMenuItems = computed(() => {
  if (!authStore.isAuthenticated) {
    return []
  }

  return allMenuItems.value.filter((item) => {
    // Vérifier si l'utilisateur a au moins un des rôles requis
    return authStore.hasRole(item.roles)
  })
})

// Vérifier si la route est active
const isActiveRoute = (item) => {
  if (!item.route) return false

  // Pour GroupsCoach, on vérifie aussi les routes liées aux groupes
  if (item.route === 'GroupsCoach') {
    return (
      route.name === 'GroupsCoach' ||
      route.name === 'GroupsMember' ||
      route.name === 'UserProfilePage'
    )
  }

  return route.name === item.route
}

// Gérer les clics sur les éléments du menu
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
  } else {
    // Actions spéciales pour les éléments sans route
    switch (item.title) {
      case 'Recherche de coach':
        handleCoachSearch()
        break
      case 'Diététique':
        // Logique pour la diététique
        console.log('Fonctionnalité diététique à implémenter')
        break
      case 'Calendrier':
        // Logique pour le calendrier
        console.log('Fonctionnalité calendrier à implémenter')
        break
      case 'Statistiques':
        // Logique pour les statistiques
        console.log('Fonctionnalité statistiques à implémenter')
        break
      case 'Messagerie':
        // Logique pour la messagerie
        console.log('Fonctionnalité messagerie à implémenter')
        break
      case 'Support':
        // Logique pour le support
        console.log('Fonctionnalité support à implémenter')
        break
      default:
        console.log('Action non définie pour:', item.title)
    }
  }
}

// Gestion spéciale pour la recherche de coach
const handleCoachSearch = () => {
  // Logique pour ouvrir un modal ou naviguer vers une page de recherche
  console.log('Ouvrir la recherche de coach')
  // Vous pouvez émettre un événement ou ouvrir un modal ici
}

// Debug : affichage des informations utilisateur (à supprimer en production)
console.log('User info:', {
  isAuthenticated: authStore.isAuthenticated,
  user: authStore.user,
  roles: authStore.userRoles,
  isAdmin: authStore.isAdmin,
  isCoach: authStore.isCoach,
})
</script>

<style lang="scss" scoped>
.sidebar-menu {
  background-color: #1a4d4d !important;
  border-right: none !important;
  top: 0 !important;
  height: 100% !important;
  z-index: 1500 !important;
}

/* Section profil utilisateur */
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

/* Liste de navigation */
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

/* Icônes */
.sidebar-item .v-list-item__prepend .v-icon {
  color: #ffffff !important;
  font-size: 25px !important;
}

/* Texte */
.sidebar-item .v-list-item-title {
  font-family: 'Spectral', serif !important;
  font-weight: 400 !important;
  font-size: 14px !important;
  line-height: 120% !important;
  color: #ffffff !important;
}

/* Flèche pour sous-menus */
.sidebar-item .v-list-item__append .v-icon {
  color: #ffffff !important;
}

/* Mode rail (replié) */
.v-navigation-drawer--rail .sidebar-item .v-list-item-title {
  font-size: 10px !important;
  text-align: center !important;
  line-height: 100% !important;
}

/* Import Google Font */
@import url('https://fonts.googleapis.com/css2?family=Spectral:wght@400&display=swap');

/* Personnalisation du divider */
.v-divider {
  margin: 8px 16px !important;
}

/* Responsive */
@media (max-width: 768px) {
  .sidebar-menu {
    position: fixed !important;
  }
}
</style>
