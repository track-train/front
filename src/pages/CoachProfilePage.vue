<template>
  <div class="coach-page">
    <div v-if="selectedCoachStore.hasSelectedCoach" class="coach-profile">
      <v-card class="coach-header" :style="backgroundStyle">
        <v-card-text class="text-center py-4">
          <v-row>
            <v-col cols="12" class="d-flex">
              <div class="d-flex flex-column align-center">
                <v-avatar size="120" class="coach-avatar mb-4">
                  <v-img :src="coachImageUrl" :alt="`Photo de ${coachData.name}`" cover />
                </v-avatar>
              </div>
              <v-spacer />
              <div class="info-section mt-3">
                <v-chip v-if="coachData.sex" color="primary" class="role-chip mx-1 mb-2">
                  <v-icon start>{{ getSexIcon(coachData.sex) }}</v-icon>
                  {{ coachData.sex }}
                </v-chip>
                <v-chip v-if="coachData.age" color="secondary" class="role-chip mx-1 mb-2">
                  <v-icon start>mdi-cake</v-icon>
                  {{ coachData.age }} ans
                </v-chip>
                <v-chip v-if="coachData.pricing" color="warning" class="role-chip mx-1 mb-2">
                  <v-icon start>mdi-currency-eur</v-icon>
                  {{ coachData.pricing }}€
                </v-chip>
              </div>
            </v-col>
            <v-col cols="12" class="d-flex flex-column align-start">
              <h1 class="text-h4">{{ coachData.name }}</h1>
              <p v-if="coachData.contact" class="text-h6 text-white">
                <v-icon class="mr-2">mdi-phone</v-icon>
                {{ coachData.contact }}
              </p>
            </v-col>
          </v-row>
        </v-card-text>

        <v-btn icon class="back-btn" @click="goBack" size="small">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-card>

      <v-row class="mt-4">
        <v-col v-if="coachData.description" cols="12" md="6">
          <v-card class="info-card">
            <v-card-title>
              <v-icon class="mr-2">mdi-text-account</v-icon>
              Description
            </v-card-title>
            <v-card-text>
              <p class="description-text" style="color: white">{{ coachData.description }}</p>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col v-if="coachData.legacy" cols="12" md="6">
          <v-card class="info-card">
            <v-card-title>
              <v-icon class="mr-2">mdi-star</v-icon>
              Expérience
            </v-card-title>
            <v-card-text>
              <p class="legacy-text" style="color: white">{{ coachData.legacy }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div v-else class="no-coach">
      <v-card class="text-center pa-8">
        <v-card-text>
          <v-icon size="64" color="grey" class="mb-4">mdi-account-question</v-icon>
          <h2 class="text-h5 mb-4">Aucun coach sélectionné</h2>
          <p class="text-body-1 mb-4">
            Vous devez sélectionner un coach pour accéder à cette page.
          </p>
          <PrimaryButton @click="goToHome"> Retour à l'accueil </PrimaryButton>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSelectedCoachStore } from '@/stores/selectedCoach'
import { useSnackbarStore } from '@/stores/snackbar'

const router = useRouter()
const selectedCoachStore = useSelectedCoachStore()

const defaultAvatar =
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
const defaultBackground =
  'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=1200&h=600&fit=crop'

const coachData = computed(() => selectedCoachStore.getCoach)

const coachImageUrl = computed(() => {
  return coachData.value?.profile_picture_url || defaultAvatar
})

const backgroundStyle = computed(() => {
  const backgroundUrl = coachData.value?.background_picture_url || defaultBackground
  return {
    backgroundImage: `linear-gradient(180deg, rgba(0, 188, 167, 0.15) 0%, rgba(0, 35, 31, 0.3) 100%), url(${backgroundUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }
})

const getSexIcon = (sex) => {
  const icons = {
    Homme: 'mdi-human-male',
    Femme: 'mdi-human-female',
    Autre: 'mdi-human',
  }
  return icons[sex] || 'mdi-human'
}

const goBack = () => {
  router.back()
}

const goToHome = () => {
  selectedCoachStore.clearSelectedCoach()
  router.push('/')
}

onMounted(() => {
  if (!selectedCoachStore.hasSelectedCoach) {
    const snackbarStore = useSnackbarStore()
    snackbarStore.showSnackbar({
      message: "Aucun coach sélectionné, redirection vers l'accueil",
      color: 'warning',
    })
    router.push('/')
  }
})
</script>

<style lang="scss" scoped>
.coach-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.coach-header {
  color: white;
  position: relative;
  overflow: hidden;
}

.back-btn {
  position: absolute;
  top: 12px;
  left: 12px;
  background-color: rgba(0, 0, 0, 0.5) !important;
  color: white !important;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7) !important;
    transform: scale(1.05);
  }

  .v-icon {
    color: white;
  }
}

.coach-avatar {
  border: 4px solid white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.info-section {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  max-width: 300px;
}

.info-card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.info-card .v-card-title {
  background-color: #00231f;
  color: white;
  padding: 16px;
  border-radius: 12px 12px 0 0;
}

.info-card .v-card-text {
  padding: 20px;
}

.description-text,
.legacy-text {
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  margin: 0;
  white-space: pre-wrap;
}

.no-coach {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.role-chip {
  background-color: white !important;
}

@media (max-width: 768px) {
  .coach-page {
    padding: 1rem;
  }

  .back-btn {
    top: 8px;
    left: 8px;
  }

  .info-section {
    max-width: 100%;
    justify-content: flex-start;
  }
}
</style>
