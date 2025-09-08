<template>
  <v-container class="coaches-container">
    <v-card class="main-coaches-card">
      <div class="coaches-header">
        <h1 class="coaches-title">Nos Coachs</h1>
        <p class="coaches-subtitle">Découvrez notre équipe de coachs professionnels</p>
      </div>

      <div class="coaches-grid">
        <CoachCard
          v-for="coach in paginatedCoaches"
          :key="coach.id"
          :id="coach.id"
          :name="coach.name"
          :description="coach.description"
          :picture="coach.profile_picture_url"
          :sex="coach.sex"
          :age="coach.age"
          :contact="coach.contact"
          :pricing="coach.pricing"
          :legacy="coach.legacy"
          :background-picture="coach.background_picture_url"
        />
      </div>

      <div class="pagination-container" v-if="totalPages > 1">
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          :total-visible="5"
          color="primary"
        />
        <p class="pagination-info">{{ currentPage }}/{{ totalPages }}</p>
      </div>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import CoachCard from '@/components/CoachCard.vue'
import api from '@/plugins/axios'

const coaches = ref([])
const currentPage = ref(1)
const itemsPerPage = 6
const loading = ref(false)

const totalPages = computed(() => {
  return Math.ceil(coaches.value.length / itemsPerPage)
})

const paginatedCoaches = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return coaches.value.slice(start, end)
})

const fetchCoaches = async () => {
  loading.value = true
  try {
    const response = await api.get('/profiles/coachs')
    coaches.value = response.data
  } catch (error) {
    console.error('Erreur lors du chargement des coachs:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCoaches()
})
</script>

<style lang="scss" scoped>
.coaches-container {
  padding: 24px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.main-coaches-card {
  width: 100%;
  max-width: 1200px;
  padding: 32px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.coaches-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
}

.coaches-title {
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 8px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.coaches-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0;
}

.coaches-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.pagination-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.pagination-info {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

@media (max-width: 768px) {
  .coaches-container {
    padding: 16px;
  }

  .main-coaches-card {
    padding: 20px;
  }

  .coaches-title {
    font-size: 2rem;
  }

  .coaches-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .coaches-header {
    padding: 16px;
  }

  .coaches-title {
    font-size: 1.5rem;
  }

  .coaches-subtitle {
    font-size: 1rem;
  }
}
</style>
