<template>
  <div class="daily-checkups-page">
    <div class="page-header mb-6">
      <div class="d-flex align-center justify-space-between">
        <div>
          <h1 class="page-title">Mes Daily Checkups</h1>
          <p class="page-subtitle">Suivez vos progrès quotidiens</p>
        </div>

        <v-btn color="primary" size="large" @click="openCreateModal" class="create-btn">
          <v-icon start>mdi-plus</v-icon>
          Nouveau Checkup
        </v-btn>
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
              : "Commencez dès aujourd'hui votre suivi quotidien !"
          }}
        </p>
        <v-btn
          v-if="!searchQuery"
          color="primary"
          class="create-btn"
          size="large"
          @click="openCreateModal"
        >
          <v-icon start>mdi-plus</v-icon>
          Créer mon premier checkup
        </v-btn>
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
      :view-mode="!!selectedCheckup"
      @checkup-created="onCheckupCreated"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useDailyCheckupStore } from '@/stores/dailyCheckup'
import DailyCheckupCard from '@/components/DailyCheckupCard.vue'
import DailyCheckupModal from '@/components/DailyCheckupModal.vue'

const dailyCheckupStore = useDailyCheckupStore()

const loading = computed(() => dailyCheckupStore.isLoading)
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

const allCheckups = computed(() => dailyCheckupStore.getAllCheckups)

const filteredAndSortedCheckups = computed(() => {
  let filtered = [...allCheckups.value]

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (checkup) =>
        checkup.sleep_duration?.toLowerCase().includes(query) ||
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

const totalCheckups = computed(() => allCheckups.value.length)

const thisWeekCheckups = computed(() => {
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  return allCheckups.value.filter((checkup) => new Date(checkup.created_at) >= weekAgo).length
})

const averageShape = computed(() => {
  if (allCheckups.value.length === 0) return 0
  const total = allCheckups.value.reduce((sum, checkup) => sum + (checkup.shape || 0), 0)
  return Math.round(total / allCheckups.value.length)
})

const currentStreak = computed(() => {
  const sortedCheckups = [...allCheckups.value].sort(
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

watch([searchQuery, sortBy, filterBy], () => {
  currentPage.value = 1
})

const openCreateModal = () => {
  selectedCheckup.value = null
  showModal.value = true
}

const openViewModal = (checkup) => {
  selectedCheckup.value = checkup
  showModal.value = true
}

const onCheckupCreated = () => {
  dailyCheckupStore.fetchDailyCheckups()
}

onMounted(() => {
  dailyCheckupStore.fetchDailyCheckups()
})
</script>

<style lang="scss" scoped>
.daily-checkups-page {
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

.create-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);

  &:hover {
    box-shadow: 0 6px 16px rgba(34, 197, 94, 0.4);
    transform: translateY(-1px);
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
  background: rgba(140, 245, 235, 0.15);
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
  .daily-checkups-page {
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
