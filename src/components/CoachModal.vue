<template>
  <v-dialog v-model="dialog" max-width="900px" persistent>
    <v-card class="coach-modal">
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
                <v-chip v-if="coachData.sex" color="primary" class="mx-1 mb-2">
                  <v-icon start>{{ getSexIcon(coachData.sex) }}</v-icon>
                  {{ coachData.sex }}
                </v-chip>
                <v-chip v-if="coachData.age" color="secondary" class="mx-1 mb-2">
                  <v-icon start>mdi-cake</v-icon>
                  {{ coachData.age }} ans
                </v-chip>
                <v-chip v-if="coachData.pricing" color="success" class="mx-1 mb-2">
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

        <v-btn icon class="close-btn" @click="closeModal" size="small">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card>

      <div class="coach-content">
        <v-row class="ma-0">
          <v-col v-if="coachData.description" cols="12" class="pa-3">
            <v-card class="info-card">
              <v-card-title>
                <v-icon class="mr-2">mdi-text-account</v-icon>
                Description
              </v-card-title>
              <v-card-text>
                <p class="description-text">{{ coachData.description }}</p>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col v-if="coachData.legacy" cols="12" class="pa-3">
            <v-card class="info-card">
              <v-card-title>
                <v-icon class="mr-2">mdi-star</v-icon>
                Expérience
              </v-card-title>
              <v-card-text>
                <p class="legacy-text">{{ coachData.legacy }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-card-actions class="px-6 pb-6">
          <v-spacer />
          <TertiaryButton @click="closeModal"> Fermer </TertiaryButton>
          <PrimaryButton @click="selectCoach"> Choisir ce coach </PrimaryButton>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, defineEmits, defineProps } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  coachData: {
    type: Object,
    required: true,
    default: () => ({}),
  },
})

const emit = defineEmits(['update:modelValue', 'selectCoach'])

const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const defaultAvatar =
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
const defaultBackground =
  'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=1200&h=600&fit=crop'

const coachImageUrl = computed(() => {
  return props.coachData.profile_picture_url || defaultAvatar
})

const backgroundStyle = computed(() => {
  const backgroundUrl = props.coachData.background_picture_url || defaultBackground
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

const closeModal = () => {
  dialog.value = false
}

const selectCoach = () => {
  emit('selectCoach', props.coachData)
  closeModal()
}
</script>

<style lang="scss" scoped>
.coach-modal {
  background-color: #00231f !important;
}

.coach-header {
  color: white;
  position: relative;
  overflow: hidden;
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
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

.coach-content {
  background-color: #f5f5f5;
  min-height: 200px;
}

.info-card {
  margin-bottom: 0;
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

@media (max-width: 768px) {
  .close-btn {
    top: 8px;
    right: 8px;
  }

  .info-section {
    max-width: 100%;
    justify-content: flex-start;
  }

  .coach-content {
    padding: 0;
  }

  .info-card .v-card-text {
    padding: 16px;
  }
}

:deep(.v-dialog) {
  margin: 20px;
}

:deep(.v-overlay__content) {
  max-height: 90vh;
  overflow-y: auto;
}
</style>
