<template>
  <div class="home-page">
    <template v-if="auth.user">
      <h1>Bienvenue {{ auth.user.name }}</h1>
      <div class="user-section">
        <!-- Card coach actuel -->
        <UserCoachCard :coach="auth.user.coach" />
        <!-- Cards personnalisées -->
        <UserTrainingsCard :trainings="auth.user.trainings" />
        <UserMealsCard :meals="auth.user.meals" />
        <UserGraphs :data="auth.user.stats" />
      </div>
    </template>
    <template v-else>
      <h1>Coach Profiles</h1>
      <p>
        Bienvenue sur TrackTrain! Trouvez votre coach et suivez vos progrès. Inscrivez-vous pour une
        expérience personnalisée.
      </p>
      <div class="coach-list">
        <CoachCard
          v-for="coach in coaches"
          :key="coach.id"
          :name="coach.name"
          :description="coach.description"
        />
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import api from '@/plugins/axios'
import CoachCard from '@/components/CoachCard.vue'

// Store d'authentification
const auth = useAuthStore()
console.log('Auth Store:', auth)
const coaches = ref([])

onMounted(async () => {
  // Charger la liste des coachs si besoin
  const response = await api.get('/profiles/coachs')
  coaches.value = response.data
})
</script>

<style scoped>
.home-page {
  padding: 2rem;
}
.coach-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
