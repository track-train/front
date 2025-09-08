<template>
  <div class="home-page">
    <template v-if="auth.user">
      <h1 class="my-4">Bienvenue {{ auth.user.name }}</h1>
      <v-row>
        <v-col cols="12" md="5">
          <TrainingList :trainings="trainings" @trainingClick="goToTraining" />
        </v-col>
        <v-col cols="12" md="7">
          <CoachList :coaches="userCoaches" />
        </v-col>
        <v-col cols="12">
          <DietList :diets="diets" @dietClick="goToDiet" />
        </v-col>
      </v-row>

      <DailyCheckupFab @open-modal="showDailyCheckupModal = true" />
      <DailyCheckupModal v-model="showDailyCheckupModal" @checkup-created="onCheckupCreated" />
    </template>

    <template v-else>
      <div class="landing-container">
        <div class="welcome-card">
          <div class="welcome-header">
            <h1 class="welcome-title">
              <svg class="title-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Bienvenue sur TrackTrain
            </h1>
            <p class="welcome-subtitle">
              Votre plateforme complète pour la transformation physique et le coaching sportif
            </p>
          </div>

          <div class="info-content">
            <div class="benefits-section">
              <h2 class="section-title">
                <svg class="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Pourquoi créer un compte ?
              </h2>

              <div class="benefits-grid">
                <div class="benefit-card">
                  <div class="benefit-icon client-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3>Suivi personnalisé</h3>
                  <p>
                    Accédez à un tableau de bord complet avec vos statistiques, progressions et
                    programmes d'entraînement personnalisés.
                  </p>
                </div>

                <div class="benefit-card">
                  <div class="benefit-icon client-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <h3>Coaching professionnel</h3>
                  <p>
                    Connectez-vous avec des coachs certifiés qui vous accompagnent dans l'atteinte
                    de vos objectifs fitness.
                  </p>
                </div>

                <div class="benefit-card">
                  <div class="benefit-icon client-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <h3>Nutrition adaptée</h3>
                  <p>
                    Plans nutritionnels personnalisés et suivi alimentaire pour maximiser vos
                    résultats.
                  </p>
                </div>
              </div>
            </div>

            <div class="coach-benefits-section">
              <h2 class="section-title">
                <svg class="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                Rejoignez-nous en tant que Coach
              </h2>

              <div class="coach-benefits-grid">
                <div class="benefit-card">
                  <div class="benefit-icon coach-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3>Gestion simplifiée</h3>
                  <p>
                    Gérez tous vos clients depuis une interface unique. Planification, suivi centralisés.
                  </p>
                </div>

                <div class="benefit-card">
                  <div class="benefit-icon coach-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      />
                    </svg>
                  </div>
                  <h3>Revenus optimisés</h3>
                  <p>
                    Développez votre clientèle et maximisez vos revenus grâce à notre plateforme de
                    mise en relation.
                  </p>
                </div>
              </div>
            </div>

            <div class="cta-section">
              <div class="cta-buttons">
                <button class="btn-primary" @click="navigateToRegister">
                  Commencer gratuitement
                </button>
                <button class="btn-secondary" @click="navigateToBecomeCoach">Devenir coach</button>
              </div>
            </div>
          </div>
        </div>

        <div class="coaches-showcase">
          <div class="coaches-container">
            <div class="coaches-header">
              <h2 class="coaches-title">Nos Coachs</h2>
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

            <div class="pagination" v-if="totalPages > 1">
              <button
                class="pagination-btn"
                :disabled="currentPage === 1"
                @click="changePage(currentPage - 1)"
              >
                ←
              </button>

              <span class="pagination-info"> {{ currentPage }} / {{ totalPages }} </span>

              <button
                class="pagination-btn"
                :disabled="currentPage === totalPages"
                @click="changePage(currentPage + 1)"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useDailyCheckupStore } from '@/stores/dailyCheckup'
import { useRouter } from 'vue-router'
import api from '@/plugins/axios'

import CoachCard from '@/components/CoachCard.vue'
import CoachList from '@/components/CoachList.vue'
import TrainingList from '@/components/TrainingList.vue'
import DietList from '@/components/DietList.vue'
import DailyCheckupFab from '@/components/DailyCheckupFab.vue'
import DailyCheckupModal from '@/components/DailyCheckupModal.vue'

const auth = useAuthStore()
const dailyCheckupStore = useDailyCheckupStore()
const router = useRouter()

const trainings = ref([])
const diets = ref([])
const userCoaches = ref([])
const loading = ref(false)
const coaches = ref([])
const showDailyCheckupModal = ref(false)

const currentPage = ref(1)
const coachesPerPage = 6

const totalPages = computed(() => {
  return Math.ceil(coaches.value.length / coachesPerPage)
})

const paginatedCoaches = computed(() => {
  const start = (currentPage.value - 1) * coachesPerPage
  const end = start + coachesPerPage
  return coaches.value.slice(start, end)
})

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

onMounted(async () => {
  if (auth.user) {
    await fetchUserData()
    await dailyCheckupStore.fetchDailyCheckups()
  } else {
    await fetchCoaches()
  }
})

const fetchUserData = async () => {
  loading.value = true
  try {
    const trainingsResponse = await api.get('/trainings/mine')
    trainings.value = trainingsResponse.data || []

    const dietsResponse = await api.get('/diets/mine')
    diets.value = dietsResponse.data || []

    const CoachResponse = await api.get('/groups/coachs/mine')
    userCoaches.value = CoachResponse.data || []
  } catch (error) {
    console.error('Erreur lors du chargement des données utilisateur:', error)
  } finally {
    loading.value = false
  }
}

const fetchCoaches = async () => {
  try {
    const response = await api.get('/profiles/coachs')
    coaches.value = response.data
  } catch (error) {
    console.error('Erreur lors du chargement des coachs:', error)
  }
}

const navigateToRegister = () => {
  router.push('/register')
}

const navigateToBecomeCoach = () => {
  router.push('/become-coach')
}

const onCheckupCreated = () => {
  showDailyCheckupModal.value = false
}

const goToTraining = (trainingId) => {
  router.push(`/training/${trainingId}`)
}

const goToDiet = (dietId) => {
  router.push(`/diet/${dietId}`)
}
</script>

<style lang="scss" scoped>
.home-page {
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.home-page > template:first-child {
  padding: 2rem;
  position: relative;
}

.landing-container {
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.welcome-card {
  background: rgb(20, 65, 60);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.welcome-header {
  background: linear-gradient(135deg, #db7edb 0%, #8b5cf6 100%);
  padding: 40px 30px;
  text-align: center;
}

.welcome-title {
  color: white;
  margin: 0 0 15px 0;
  font-size: 32px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.title-icon {
  width: 36px;
  height: 36px;
}

.welcome-subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 18px;
  margin: 0;
}

.info-content {
  padding: 40px;
  color: #ffffff;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 2px solid rgba(191, 121, 201, 0.3);
}

.section-icon {
  width: 28px;
  height: 28px;
  color: #bf79c9;
}

.benefits-section,
.coach-benefits-section {
  margin-bottom: 50px;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.coach-benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.benefit-card {
  background: rgba(99, 102, 241, 0.05);
  padding: 30px;
  border-radius: 15px;
  border: 2px solid rgba(191, 121, 201, 0.2);
  transition: all 0.3s ease;
}

.benefit-card:hover {
  transform: translateY(-5px);
  border-color: #bf79c9;
  box-shadow: 0 10px 30px rgba(191, 121, 201, 0.2);
}

.benefit-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.benefit-icon svg {
  width: 24px;
  height: 24px;
  color: white;
}

.client-icon {
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
}

.coach-icon {
  background: linear-gradient(135deg, #db7edb 0%, #bf79c9 100%);
}

.benefit-card h3 {
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 15px;
}

.benefit-card p {
  font-size: 14px;
  color: #ffffff;
  line-height: 1.6;
}

.cta-section {
  text-align: center;
  background: rgba(6, 182, 212, 0.1);
  padding: 40px;
  border-radius: 20px;
  border: 2px solid rgba(191, 121, 201, 0.3);
}

.cta-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  padding: 15px 30px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 200px;
}

.btn-primary {
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(6, 182, 212, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(6, 182, 212, 0.4);
}

.btn-secondary {
  background: transparent;
  color: #bf79c9;
  border: 2px solid #bf79c9;
}

.btn-secondary:hover {
  background: #bf79c9;
  color: white;
  transform: translateY(-2px);
}

.coaches-showcase {
  width: 100%;
  display: flex;
  justify-content: center;
}

.coaches-container {
  background: rgb(20, 65, 60);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 1200px;
  width: 100%;
}

.coaches-header {
  text-align: center;
  margin-bottom: 40px;
  background: linear-gradient(135deg, #db7edb 0%, #8b5cf6 100%);
  padding: 30px;
  border-radius: 15px;
  margin: -40px -40px 40px -40px;
}

.coaches-title {
  color: white;
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 10px 0;
}

.coaches-subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  margin: 0;
}

.coaches-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 20px 0;
}

.pagination-btn {
  background: linear-gradient(135deg, #db7edb 0%, #8b5cf6 100%);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(219, 126, 219, 0.3);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-info {
  color: #ffffff;
  font-weight: 600;
  font-size: 16px;
}

@media (max-width: 768px) {
  .landing-container {
    padding: 15px;
  }

  .info-content {
    padding: 25px;
  }

  .benefits-grid,
  .coach-benefits-grid {
    grid-template-columns: 1fr;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .coaches-container {
    padding: 25px;
  }

  .coaches-header {
    margin: -25px -25px 25px -25px;
    padding: 20px;
  }

  .coaches-grid {
    grid-template-columns: 1fr;
  }
}
</style>
