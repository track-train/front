<template>
  <div class="user-daily-checkups-page">
    <div class="page-header mb-6">
      
              <div class="d-flex align-center">
                <PrimaryButton color="secondary" size="large" @click="goBack">
                  <v-icon start>mdi-arrow-left</v-icon>
                  Retour
                </PrimaryButton>
              </div>
      <div class="d-flex align-center justify-space-between">
        <div>
          <h1 class="page-title">Daily Checkups</h1>
          <p class="page-subtitle" v-if="user">{{ user.name || 'Utilisateur' }}</p>
        </div>
      </div>

      <div class="stats-overview mt-4">
        <v-row>
          <v-col cols="6" md="3">
            <v-card class="stat-card">
              <v-card-text class="text-center">
                <v-icon size="32" color="primary" class="mb-2">mdi-calendar-check</v-icon>
                <div class="stat-number">{{ totalCheckups }}</div>
                <div class="stat-label">Total</div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6" md="3">
            <v-card class="stat-card">
              <v-card-text class="text-center">
                <v-icon size="32" color="success" class="mb-2">mdi-trending-up</v-icon>
                <div class="stat-number">{{ thisWeekCheckups }}</div>
                <div class="stat-label">Cette semaine</div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6" md="3">
            <v-card class="stat-card">
              <v-card-text class="text-center">
                <v-icon size="32" color="info" class="mb-2">mdi-chart-line</v-icon>
                <div class="stat-number">{{ averageShape }}/10</div>
                <div class="stat-label">Forme moy.</div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6" md="3">
            <v-card class="stat-card">
              <v-card-text class="text-center">
                <v-icon size="32" color="orange" class="mb-2">mdi-fire</v-icon>
                <div class="stat-number">{{ currentStreak }}</div>
                <div class="stat-label">Série actuelle</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>

    <div class="filters-section mb-4">
      <v-row align="center">
        <v-col cols="12" md="6">
          <v-text-field
            v-model="searchQuery"
            prepend-inner-icon="mdi-magnify"
            label="Rechercher..."
            variant="outlined"
            density="compact"
            clearable
          />
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            v-model="sortBy"
            :items="sortOptions"
            label="Trier par"
            variant="outlined"
            density="compact"
          />
        </v-col>
        <v-col cols="12" md="3">
          <v-select
            v-model="filterBy"
            :items="filterOptions"
            label="Filtrer"
            variant="outlined"
            density="compact"
          />
        </v-col>
      </v-row>
    </div>

    <div class="checkups-list">
      <div v-if="loading" class="text-center py-8">
        <v-progress-circular indeterminate color="primary" size="48" />
        <p class="text-h6 mt-4">Chargement des checkups...</p>
      </div>

      <div v-else-if="filteredCheckups.length === 0" class="empty-state text-center py-12">
        <v-icon size="80" color="grey-lighten-1" class="mb-4">mdi-clipboard-outline</v-icon>
        <h2 class="text-h4 mb-2 text-grey-darken-1">
          {{ searchQuery ? 'Aucun résultat' : 'Aucun checkup' }}
        </h2>
        <p class="text-body-1 text-grey-darken-1 mb-4">
          {{
            searchQuery
              ? 'Aucun checkup ne correspond à votre recherche'
              : "Cet utilisateur n'a pas encore de daily checkup"
          }}
        </p>
      </div>

      <v-row v-else>
        <v-col v-for="checkup in filteredCheckups" :key="checkup.id" cols="12" sm="6" lg="4">
          <DailyCheckupCard :checkup="checkup" @click="openViewModal(checkup)" />
        </v-col>
      </v-row>

      <div v-if="totalPages > 1" class="pagination-section mt-6 d-flex justify-center">
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          :total-visible="7"
          color="primary"
        />
      </div>
    </div>

    <DailyCheckupModal
      v-model="showModal"
      :checkup-data="selectedCheckup"
      :view-mode="true"
      disabled="true"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSnackbarStore } from '@/stores/snackbar'
import api from '@/plugins/axios'
import DailyCheckupCard from '@/components/DailyCheckupCard.vue'
import DailyCheckupModal from '@/components/DailyCheckupModal.vue'

const route = useRoute()
const router = useRouter()
const snackbarStore = useSnackbarStore()

const userId = ref(route.params.userId)
const user = ref(null)
const dailyCheckups = ref([])
const loading = ref(false)
const showModal = ref(false)
const selectedCheckup = ref(null)

const searchQuery = ref('')
const sortBy = ref('date-desc')
const filterBy = ref('all')
const currentPage = ref(1)
const itemsPerPage = 12

const sortOptions = [
  { title: 'Plus récent', value: 'date-desc' },
  { title: 'Plus ancien', value: 'date-asc' },
  { title: 'Meilleure forme', value: 'shape-desc' },
  { title: 'Plus de pas', value: 'steps-desc' },
]

const filterOptions = [
  { title: 'Tous', value: 'all' },
  { title: 'Avec entraînement', value: 'training' },
  { title: 'Sans entraînement', value: 'no-training' },
  { title: 'Cette semaine', value: 'week' },
  { title: 'Ce mois', value: 'month' },
]

const filteredAndSortedCheckups = computed(() => {
  let filtered = [...dailyCheckups.value]

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (checkup) =>
        checkup.sleepduration?.toLowerCase().includes(query) ||
        new Date(checkup.created_at).toLocaleDateString('fr-FR').includes(query),
    )
  }

  if (filterBy.value !== 'all') {
    const now = new Date()
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    filtered = filtered.filter((checkup) => {
      const checkupDate = new Date(checkup.created_at)

      switch (filterBy.value) {
        case 'training':
          return checkup.dayon
        case 'no-training':
          return !checkup.dayon
        case 'week':
          return checkupDate >= weekAgo
        case 'month':
          return checkupDate >= monthAgo
        default:
          return true
      }
    })
  }

  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'date-desc':
        return new Date(b.created_at) - new Date(a.created_at)
      case 'date-asc':
        return new Date(a.created_at) - new Date(b.created_at)
      case 'shape-desc':
        return (b.shape || 0) - (a.shape || 0)
      case 'steps-desc':
        return (b.steps || 0) - (a.steps || 0)
      default:
        return 0
    }
  })

  return filtered
})

const filteredCheckups = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredAndSortedCheckups.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(filteredAndSortedCheckups.value.length / itemsPerPage))

const totalCheckups = computed(() => dailyCheckups.value.length)

const thisWeekCheckups = computed(() => {
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  return dailyCheckups.value.filter((checkup) => new Date(checkup.created_at) >= weekAgo).length
})

const averageShape = computed(() => {
  if (dailyCheckups.value.length === 0) return 0
  const total = dailyCheckups.value.reduce((sum, checkup) => sum + (checkup.shape || 0), 0)
  return Math.round(total / dailyCheckups.value.length)
})

const currentStreak = computed(() => {
  const sortedCheckups = [...dailyCheckups.value].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at),
  )

  let streak = 0
  let currentDate = new Date()

  for (const checkup of sortedCheckups) {
    const checkupDate = new Date(checkup.created_at)
    const diffDays = Math.floor((currentDate - checkupDate) / (1000 * 60 * 60 * 24))

    if (diffDays === streak) {
      streak++
      currentDate = checkupDate
    } else {
      break
    }
  }

  return streak
})

async function fetchUserProfile() {
  try {
    const response = await api.get(`/profiles/${userId.value}`)
    user.value = response.data
  } catch (error) {
    console.error('Error fetching user profile:', error)
    snackbarStore.error('Erreur lors du chargement du profil utilisateur.')
  }
}

async function fetchUserDailyCheckups() {
  loading.value = true

  try {
    const response = await api.get(`/daily-checkups/user/${userId.value}`)
    dailyCheckups.value = response.data || []

    if (dailyCheckups.value.length > 0) {
      snackbarStore.success(
        `${dailyCheckups.value.length} Daily Checkup${dailyCheckups.value.length > 1 ? 's' : ''} chargé${dailyCheckups.value.length > 1 ? 's' : ''} avec succès`,
      )
    }
  } catch (error) {
    console.error('❌ Erreur lors du chargement des daily checkups:', error)

    if (error.response?.status === 401) {
      snackbarStore.error('Vous devez être connecté pour accéder aux Daily Checkups')
    } else if (error.response?.status === 403) {
      snackbarStore.error("Vous n'avez pas les permissions pour accéder à ces données")
    } else if (error.response?.status === 404) {
      snackbarStore.error('Utilisateur introuvable')
    } else if (error.response?.status >= 500) {
      snackbarStore.error('Erreur serveur lors du chargement des Daily Checkups')
    } else if (error.code === 'NETWORK_ERROR') {
      snackbarStore.error('Problème de connexion. Vérifiez votre réseau.')
    } else {
      snackbarStore.error('Impossible de charger les Daily Checkups')
    }

    dailyCheckups.value = []
  } finally {
    loading.value = false
  }
}

watch([searchQuery, sortBy, filterBy], () => {
  currentPage.value = 1
})

const openViewModal = (checkup) => {
  selectedCheckup.value = checkup
  showModal.value = true
}

const goBack = () => {
  router.go(-1)
}

onMounted(() => {
  if (userId.value) {
    fetchUserProfile()
    fetchUserDailyCheckups()
  }
})

watch(
  () => route.params.userId,
  (newUserId) => {
    if (newUserId) {
      userId.value = newUserId
      fetchUserProfile()
      fetchUserDailyCheckups()
    }
  },
)
</script>

<style lang="scss" scoped>
.user-daily-checkups-page {
  padding: 2rem;
  min-height: 100vh;
}

.page-header {
  .page-title {
    font-size: 2.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #22c55e, #2dd4bf);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    margin-bottom: 0.5rem;
  }

  .page-subtitle {
    color: #666;
    font-size: 1.1rem;
    margin: 0;
  }
}

.stats-overview {
  .stat-card {
    border-radius: 12px;
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    }
  }

  .stat-number {
    font-size: 1.8rem;
    font-weight: 700;
    color: #1a1a1a;
    line-height: 1;
  }

  .stat-label {
    font-size: 0.9rem;
    color: #666;
    font-weight: 500;
  }
}

.filters-section {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
}

.empty-state {
  .v-icon {
    opacity: 0.6;
  }
}

.pagination-section {
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .user-daily-checkups-page {
    padding: 1rem;
  }

  .page-header {
    .page-title {
      font-size: 2rem;
    }

    .d-flex {
      flex-direction: column;
      align-items: stretch;
      gap: 1rem;
    }
  }

  .stats-overview .stat-number {
    font-size: 1.4rem;
  }

  .filters-section {
    padding: 1rem;
  }
}
</style>
