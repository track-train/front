<template>
  <div class="home-page">
    <template v-if="auth.user">
      <h1>Bienvenue {{ auth.user.name }}</h1>
      <div class="user-section">
        <!-- Card coach actuel -->
        <UserCoachCard :coach="auth.user.coach" />

        <!-- Section Trainings -->
        <v-card class="mb-4 section-card">
          <v-card-title class="d-flex align-center section-header">
            <v-icon class="mr-2" color="primary">mdi-dumbbell</v-icon>
            <span class="text-h6">Mes Trainings</span>
            <v-spacer />
            <v-chip color="orange" small text-color="white">
              {{ trainings.length }} training(s)
            </v-chip>
          </v-card-title>

          <v-card-text class="pa-0">
            <div v-if="trainings.length === 0" class="empty-state text-center py-8">
              <v-icon size="64" color="grey lighten-2">mdi-dumbbell</v-icon>
              <p class="text-h6 mt-4 text-grey">Aucun training assigné</p>
              <p class="text-body-2 text-grey">Votre coach vous assignera bientôt des trainings</p>
            </div>

            <v-slide-group v-else show-arrows class="pa-4">
              <v-slide-item v-for="training in trainings" :key="training.id">
                <v-card
                  class="ma-2 training-slide-card"
                  width="300"
                  @click="goToTraining(training.id)"
                  hover
                  elevation="2"
                >
                  <v-card-title class="text-h6">
                    {{ training.name }}
                  </v-card-title>
                  <v-card-text>
                    <p class="text-body-2">{{ training.description }}</p>
                    <p class="text-caption text-grey">
                      Créé le {{ formatDate(training.created_at) }}
                    </p>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="primary" text> Voir détails </v-btn>
                  </v-card-actions>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </v-card-text>
        </v-card>

        <!-- Section Diets -->
        <v-card class="mb-4 section-card">
          <v-card-title class="d-flex align-center section-header">
            <v-icon class="mr-2" color="success">mdi-food-apple</v-icon>
            <span class="text-h6">Mes Repas</span>
            <v-spacer />
            <v-chip color="orange" small text-color="white"> {{ diets.length }} repas </v-chip>
          </v-card-title>

          <v-card-text class="pa-0">
            <div v-if="diets.length === 0" class="empty-state text-center py-8">
              <v-icon size="64" color="grey lighten-2">mdi-food-apple</v-icon>
              <p class="text-h6 mt-4 text-grey">Aucun repas planifié</p>
              <p class="text-body-2 text-grey">Commencez à planifier vos repas</p>
            </div>

            <v-slide-group v-else show-arrows class="pa-4">
              <v-slide-item v-for="diet in diets" :key="diet.id">
                <v-card
                  class="ma-2 diet-slide-card"
                  width="300"
                  @click="goToDiet(diet.id)"
                  hover
                  elevation="2"
                >
                  <v-card-title class="text-h6">
                    {{ diet.name }}
                  </v-card-title>
                  <v-card-text>
                    <p class="text-body-2">{{ diet.description }}</p>
                    <p class="text-caption text-grey">Créé le {{ formatDate(diet.created_at) }}</p>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="success" text> Voir détails </v-btn>
                  </v-card-actions>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </v-card-text>
        </v-card>
      </div>
    </template>

    <!-- Section pour utilisateurs non connectés -->
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
import { useRouter } from 'vue-router'
import api from '@/plugins/axios'
import CoachCard from '@/components/CoachCard.vue'
import UserCoachCard from '@/components/UserCoachCard.vue'

// Store d'authentification
const auth = useAuthStore()
const router = useRouter()

// État pour les données utilisateur connecté
const trainings = ref([])
const diets = ref([])
const loading = ref(false)

// État pour les utilisateurs non connectés
const coaches = ref([])

onMounted(async () => {
  if (auth.user) {
    // Utilisateur connecté : charger ses trainings et diets
    await fetchUserData()
  } else {
    // Utilisateur non connecté : charger la liste des coachs
    await fetchCoaches()
  }
})

// Fonction pour récupérer les données de l'utilisateur connecté
const fetchUserData = async () => {
  loading.value = true
  try {
    // Fetch trainings
    const trainingsResponse = await api.get('/trainings/mine')
    trainings.value = trainingsResponse.data || []

    // Fetch diets
    const dietsResponse = await api.get('/diets/mine')
    diets.value = dietsResponse.data || []
  } catch (error) {
    console.error('Erreur lors du chargement des données utilisateur:', error)
  } finally {
    loading.value = false
  }
}

// Fonction pour récupérer la liste des coachs (utilisateurs non connectés)
const fetchCoaches = async () => {
  try {
    const response = await api.get('/profiles/coachs')
    coaches.value = response.data
  } catch (error) {
    console.error('Erreur lors du chargement des coachs:', error)
  }
}

// Navigation vers les pages de détail
const goToTraining = (trainingId) => {
  router.push(`/training/${trainingId}`)
}

const goToDiet = (dietId) => {
  router.push(`/diet/${dietId}`)
}

// Formatage de date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
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

.user-section {
  margin-top: 2rem;
}

.section-card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.section-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.empty-state {
  padding: 3rem 1rem;
  background-color: #fafafa;
}

.training-slide-card,
.diet-slide-card {
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
}

.training-slide-card:hover,
.diet-slide-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

/* Style pour les slide groups */
:deep(.v-slide-group__wrapper) {
  background-color: transparent;
}

:deep(.v-slide-group__content) {
  padding: 0 8px;
}
</style>
