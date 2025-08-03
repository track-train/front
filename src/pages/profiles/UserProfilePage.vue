<!-- pages/profiles/UserProfilePage.vue -->
<template>
  <div class="profile-page">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>
              <v-avatar size="48" class="mr-3">
                <v-icon size="36">mdi-account</v-icon>
              </v-avatar>
              <div>
                <h2 class="mb-0">{{ user?.name || "Profil utilisateur" }}</h2>
                <div class="text-caption text-grey">
                  <span v-if="user?.email">{{ user.email }}</span>
                  <span v-if="user?.age"> — {{ user.age }} ans</span>
                </div>
                <div class="text-body-2 text-grey" v-if="user?.description">
                  {{ user.description }}
                </div>
              </div>
            </v-card-title>
            <v-card-text>
              <div class="mb-2" v-if="user?.roles">
                <v-chip
                  v-for="role in user.roles"
                  :key="role"
                  color="primary"
                  class="mr-2"
                  small
                  text-color="white"
                >
                  {{ role }}
                </v-chip>
              </div>
              <div>
                <span class="font-weight-bold">Contact:</span>
                <span v-if="user?.contact">{{ user.contact }}</span>
                <span v-else class="text-grey">Non renseigné</span>
              </div>
              <div>
                <span class="font-weight-bold">Tarif:</span>
                <span v-if="user?.pricing">{{ user.pricing }} €</span>
                <span v-else class="text-grey">Non renseigné</span>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <TrainingList
            :trainings="trainings"
            @trainingClick="goToTraining"
          >
            <template #action v-if="canCreateForUser">
              <v-btn
                color="primary"
                @click="showCreateTraining = true"
                class="ml-2"
                elevation="1"
                style="min-width: 0; width: 40px; height: 40px;"
                icon
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
          </TrainingList>
        </v-col>
        <v-col cols="12" md="6">
          <DietList
            :diets="diets"
            @dietClick="goToDiet"
          >
            <template #action v-if="canCreateForUser">
              <v-btn
                color="success"
                @click="showCreateDiet = true"
                class="ml-2"
                elevation="1"
                style="min-width: 0; width: 40px; height: 40px;"
                icon
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
          </DietList>
        </v-col>
      </v-row>
    </v-container>

    <!-- Modale création Training -->
    <TrainingCreateDialog
      v-model="showCreateTraining"
      @created="createTraining"
    />
    <!-- Modale création Diet -->
    <DietCreateDialog
      v-model="showCreateDiet"
      @created="createDiet"
    />

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="4000">
      {{ snackbar.text }}
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import api from '@/plugins/axios'
import TrainingList from '@/components/TrainingList.vue'
import DietList from '@/components/DietList.vue'
import TrainingCreateDialog from '@/components/TrainingCreateDialog.vue'
import DietCreateDialog from '@/components/DietCreateDialog.vue'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const userId = ref(route.params.uuid)
const user = ref(null)
const trainings = ref([])
const diets = ref([])
const loading = ref(false)

const showCreateTraining = ref(false)
const showCreateDiet = ref(false)

const snackbar = ref({
  show: false,
  text: '',
  color: 'success'
})

function showSnackbar(text, color = 'success') {
  snackbar.value.text = text
  snackbar.value.color = color
  snackbar.value.show = true
}

async function fetchUserProfile() {
  loading.value = true
  try {
    const resp = await api.get(`/profiles/${userId.value}`)
    user.value = resp.data
  } catch (e) {
    user.value = null
  } finally {
    loading.value = false
  }
}

async function fetchUserTrainings() {
  try {
    const resp = await api.get(`/trainings/user/${userId.value}`)
    trainings.value = resp.data || []
  } catch {
    trainings.value = []
  }
}

async function fetchUserDiets() {
  try {
    const resp = await api.get(`/diets/user/${userId.value}`)
    diets.value = resp.data || []
  } catch {
    diets.value = []
  }
}

onMounted(() => {
  if (route.params.uuid) {
    userId.value = route.params.uuid
    fetchUserProfile()
    fetchUserTrainings()
    fetchUserDiets()
  }
})

watch(() => route.params.uuid, (newUuid) => {
  userId.value = newUuid
  fetchUserProfile()
  fetchUserTrainings()
  fetchUserDiets()
})

// Affiche le bouton + uniquement si le user connecté est coach ET n'est pas en train de voir son propre profil
const canCreateForUser = computed(() =>
  auth.userRoles?.includes('coach') && auth.userId !== userId.value
)

const goToTraining = (trainingId) => {
  router.push(`/training/${trainingId}`)
}
const goToDiet = (dietId) => {
  router.push(`/diet/${dietId}`)
}

// Création training
async function createTraining({ name, description }) {
  try {
    await api.post(`/trainings/${userId.value}`, { name, description })
    await fetchUserTrainings()
    showSnackbar('Training créé avec succès !', 'success')
  } catch (e) {
    showSnackbar("Erreur lors de la création du training.", 'error')
  }
}

// Création diet
async function createDiet({ name, description }) {
  try {
    await api.post(`/diets/${userId.value}`, { name, description })
    await fetchUserDiets()
    showSnackbar('Diet créée avec succès !', 'success')
  } catch (e) {
    showSnackbar("Erreur lors de la création du diet.", 'error')
  }
}
</script>

<style scoped>
.profile-page {
  padding: 2rem;
}
</style>