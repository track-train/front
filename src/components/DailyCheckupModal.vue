<template>
  <v-dialog
    v-model="dialog"
    max-width="600px"
    persistent
    :fullscreen="$vuetify.display.mobile"
    class="daily-checkup-dialog"
  >
    <div class="daily-checkup-modal" :class="{ mobile: $vuetify.display.mobile }">
      <div class="modal-header d-flex align-center">
        <v-icon class="mr-2" color="white">
          {{ viewMode ? 'mdi-eye' : 'mdi-clipboard-check' }}
        </v-icon>
        <span class="header-title">
          {{ viewMode ? 'Daily Checkup' : 'Nouveau Daily Checkup' }}
        </span>
        <v-spacer />
        <v-btn icon variant="text" @click="closeModal" class="close-btn">
          <v-icon color="white">mdi-close</v-icon>
        </v-btn>
      </div>

      <div class="modal-content-wrapper">
        <div class="modal-content pa-6">
          <div v-if="viewMode && checkupData" class="checkup-date mb-4">
            <v-chip color="rgba(255, 255, 255, 0.2)" text-color="white" size="small">
              <v-icon start>mdi-calendar</v-icon>
              {{ formatDate(checkupData.created_at) }}
            </v-chip>
          </div>

          <v-form ref="checkupForm" v-model="formValid" @submit.prevent="submitCheckup">
            <v-row>
              <v-col cols="12">
                <div class="form-section">
                  <h3 class="section-title">Photos du jour</h3>

                  <v-file-input
                    v-if="!viewMode"
                    v-model="form.pictures"
                    label="Sélectionner des photos"
                    prepend-icon="mdi-camera"
                    accept="image/*"
                    show-size
                    multiple
                    :rules="pictureRules"
                    variant="outlined"
                    class="mb-2 custom-input"
                    color="white"
                  />

                  <div v-if="displayImages.length > 0" class="image-previews">
                    <div
                      v-for="(image, index) in displayImages"
                      :key="index"
                      class="image-preview-item"
                    >
                      <img
                        :src="image"
                        :alt="`Photo ${index + 1}`"
                        class="preview-img"
                        @error="onImageError"
                        @load="onImageLoad"
                        @click="openLightbox(index)"
                      />
                      <v-btn
                        v-if="!viewMode"
                        size="x-small"
                        icon
                        class="remove-image-btn"
                        @click="removeImage(index)"
                      >
                        <v-icon size="14">mdi-close</v-icon>
                      </v-btn>

                      <div class="zoom-indicator">
                        <v-icon size="16" color="white">mdi-magnify-plus</v-icon>
                      </div>
                    </div>
                  </div>

                  <p v-else-if="viewMode" class="no-photos">Aucune photo</p>
                </div>
              </v-col>

              <v-col cols="12" :md="$vuetify.display.mobile ? 12 : 6">
                <div class="form-section">
                  <h3 class="section-title">Sommeil</h3>
                  <v-text-field
                    v-model="form.sleepDuration"
                    label="Durée de sommeil"
                    type="text"
                    placeholder="8h"
                    :rules="viewMode ? [] : sleepDurationRules"
                    :readonly="viewMode"
                    variant="outlined"
                    prepend-inner-icon="mdi-sleep"
                    class="custom-input"
                    color="white"
                  />
                  <v-rating
                    v-model="form.sleepQuality"
                    color="white"
                    active-color="white"
                    half-increments
                    :readonly="viewMode"
                    :hover="!viewMode"
                    :length="5"
                    :size="$vuetify.display.mobile ? 'default' : 'large'"
                    class="mb-2 rating-mobile"
                  />
                  <p class="rating-label">Qualité du sommeil: {{ Math.round(form.sleepQuality * 2) }}/10</p>
                </div>
              </v-col>

              <v-col cols="12" :md="$vuetify.display.mobile ? 12 : 6">
                <div class="form-section">
                  <h3 class="section-title">Forme physique</h3>
                  <v-text-field
                    v-model="form.weight"
                    label="Poids (kg)"
                    type="number"
                    :rules="viewMode ? [] : weightRules"
                    :readonly="viewMode"
                    variant="outlined"
                    prepend-inner-icon="mdi-scale"
                    class="custom-input"
                    color="white"
                  />
                  <v-rating
                    v-model="form.shape"
                    color="white"
                    active-color="white"
                    half-increments
                    :readonly="viewMode"
                    :hover="!viewMode"
                    :length="5"
                    :size="$vuetify.display.mobile ? 'default' : 'large'"
                    class="mb-2 rating-mobile"
                  />
                  <p class="rating-label">Forme générale: {{ Math.round(form.shape * 2) }}/10</p>
                </div>
              </v-col>

              <v-col cols="12" :md="$vuetify.display.mobile ? 12 : 6">
                <div class="form-section">
                  <h3 class="section-title">Douleurs</h3>
                  <v-rating
                    v-model="form.soreness"
                    color="white"
                    active-color="white"
                    half-increments
                    :readonly="viewMode"
                    :hover="!viewMode"
                    :length="5"
                    :size="$vuetify.display.mobile ? 'default' : 'large'"
                    class="mb-2 rating-mobile"
                  />
                  <p class="rating-label">Douleurs: {{ Math.round(form.soreness * 2) }}/10</p>
                </div>
              </v-col>

              <v-col cols="12" :md="$vuetify.display.mobile ? 12 : 6">
                <div class="form-section">
                  <h3 class="section-title">Activité</h3>
                  <v-text-field
                    v-model="form.steps"
                    label="Nombre de pas"
                    type="number"
                    :rules="viewMode ? [] : stepsRules"
                    :readonly="viewMode"
                    variant="outlined"
                    prepend-inner-icon="mdi-walk"
                    class="custom-input"
                    color="white"
                  />
                </div>
              </v-col>

              <v-col cols="12" :md="$vuetify.display.mobile ? 12 : 6">
                <div class="form-section">
                  <h3 class="section-title">Digestion</h3>
                  <v-rating
                    v-model="form.digestion"
                    color="white"
                    active-color="white"
                    half-increments
                    :readonly="viewMode"
                    :hover="!viewMode"
                    :length="5"
                    :size="$vuetify.display.mobile ? 'default' : 'large'"
                    class="mb-2 rating-mobile"
                  />
                  <p class="rating-label">Digestion: {{ Math.round(form.digestion * 2) }}/10</p>
                </div>
              </v-col>

              <v-col cols="12" :md="$vuetify.display.mobile ? 12 : 6">
                <div class="form-section">
                  <h3 class="section-title">Entraînement</h3>
                  <v-switch
                    v-model="form.dayOn"
                    label="Jour d'entraînement"
                    color="white"
                    :readonly="viewMode"
                    class="custom-switch"
                    inset
                  />
                </div>
              </v-col>
            </v-row>
          </v-form>
        </div>
      </div>

      <div class="modal-footer d-flex justify-end pa-4 gap-2">
        <v-btn
          variant="text"
          @click="closeModal"
          :disabled="submitting || deleting"
          class="cancel-btn"
          :size="$vuetify.display.mobile ? 'default' : 'large'"
        >
          Fermer
        </v-btn>

        <v-btn
          v-if="!viewMode"
          @click="submitCheckup"
          :loading="submitting"
          :disabled="!formValid"
          class="submit-btn"
          :size="$vuetify.display.mobile ? 'default' : 'large'"
        >
          Enregistrer
        </v-btn>

        <v-btn
          v-else
          @click="deleteCheckup"
          :loading="deleting"
          class="delete-btn"
          :size="$vuetify.display.mobile ? 'default' : 'large'"
        >
          <v-icon start>mdi-delete</v-icon>
          Supprimer
        </v-btn>
      </div>
    </div>
  </v-dialog>

  <v-dialog
    v-model="lightboxOpen"
    max-width="90vw"
    max-height="90vh"
    class="lightbox-dialog"
    :fullscreen="$vuetify.display.mobile"
  >
    <div class="lightbox-container">
      <div class="lightbox-header">
        <div class="image-counter">
          {{ currentImageIndex + 1 }} / {{ displayImages.length }}
        </div>
        <v-btn icon variant="text" @click="closeLightbox" class="lightbox-close">
          <v-icon color="white" size="32">mdi-close</v-icon>
        </v-btn>
      </div>

      <div class="lightbox-content">
        <v-btn
          v-if="displayImages.length > 1"
          icon
          variant="text"
          class="nav-btn prev-btn"
          @click="previousImage"
          :disabled="currentImageIndex === 0"
        >
          <v-icon color="white" size="32">mdi-chevron-left</v-icon>
        </v-btn>

        <div class="image-container">
          <img
            :src="displayImages[currentImageIndex]"
            :alt="`Photo ${currentImageIndex + 1}`"
            class="lightbox-image"
            @load="onLightboxImageLoad"
            @error="onLightboxImageError"
          />

          <div v-if="lightboxImageLoading" class="image-loading-overlay">
            <v-progress-circular indeterminate color="white" size="48" />
          </div>
        </div>

        <v-btn
          v-if="displayImages.length > 1"
          icon
          variant="text"
          class="nav-btn next-btn"
          @click="nextImage"
          :disabled="currentImageIndex === displayImages.length - 1"
        >
          <v-icon color="white" size="32">mdi-chevron-right</v-icon>
        </v-btn>
      </div>

      <div v-if="displayImages.length > 1" class="lightbox-footer">
        <div class="image-dots">
          <v-btn
            v-for="(image, index) in displayImages"
            :key="index"
            icon
            size="small"
            variant="text"
            class="dot-btn"
            :class="{ active: index === currentImageIndex }"
            @click="goToImage(index)"
          >
            <div class="dot"></div>
          </v-btn>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useDailyCheckupStore } from '@/stores/dailyCheckup'

const props = defineProps({
  modelValue: Boolean,
  checkupData: {
    type: Object,
    default: null,
  },
  viewMode: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'checkup-created', 'checkup-deleted'])

const dailyCheckupStore = useDailyCheckupStore()

const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const lightboxOpen = ref(false)
const currentImageIndex = ref(0)
const lightboxImageLoading = ref(false)

const checkupForm = ref(null)
const formValid = ref(false)
const submitting = computed(() => dailyCheckupStore.isSubmitting)
const deleting = ref(false)
const previewImages = ref([])

const form = ref({
  pictures: [],
  sleepDuration: '',
  sleepQuality: 2.5,
  weight: null,
  shape: 2.5,
  soreness: 0.5,
  steps: null,
  digestion: 2.5,
  dayOn: false,
})

const displayImages = computed(() => {
  if (props.viewMode && props.checkupData) {

    if (props.checkupData.picture) {
      if (Array.isArray(props.checkupData.picture)) {
        return props.checkupData.picture
      } else {
        return [props.checkupData.picture]
      }
    }
    return []
  }
  return previewImages.value
})

const openLightbox = (imageIndex) => {
  currentImageIndex.value = imageIndex
  lightboxOpen.value = true
  lightboxImageLoading.value = true
}

const closeLightbox = () => {
  lightboxOpen.value = false
  currentImageIndex.value = 0
}

const nextImage = () => {
  if (currentImageIndex.value < displayImages.value.length - 1) {
    currentImageIndex.value++
    lightboxImageLoading.value = true
  }
}

const previousImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
    lightboxImageLoading.value = true
  }
}

const goToImage = (index) => {
  currentImageIndex.value = index
  lightboxImageLoading.value = true
}

const onLightboxImageLoad = () => {
  lightboxImageLoading.value = false
}

const onLightboxImageError = () => {
  lightboxImageLoading.value = false
  console.error('❌ Erreur chargement lightbox image')
}

const handleKeydown = (event) => {
  if (!lightboxOpen.value) return

  switch (event.key) {
    case 'Escape':
      closeLightbox()
      break
    case 'ArrowLeft':
      previousImage()
      break
    case 'ArrowRight':
      nextImage()
      break
  }
}

watch(lightboxOpen, (isOpen) => {
  if (isOpen) {
    document.addEventListener('keydown', handleKeydown)
  } else {
    document.removeEventListener('keydown', handleKeydown)
  }
})

const pictureRules = [
  (v) =>
    !v ||
    !v.length ||
    v.every((file) => file.size < 5000000) ||
    'Chaque photo doit faire moins de 5MB',
]

const sleepDurationRules = [
  (v) => !!v || 'La durée de sommeil est requise',
  (v) => /^\d+h?$/.test(v) || 'Format: 8h ou 8',
]

const weightRules = [
  (v) => !!v || 'Le poids est requis',
  (v) => v > 0 || 'Le poids doit être positif',
  (v) => v < 300 || 'Poids invalide',
]

const stepsRules = [
  (v) => !!v || 'Le nombre de pas est requis',
  (v) => v >= 0 || 'Le nombre de pas doit être positif',
]

watch(
  () => props.checkupData,
  (newData) => {
    if (newData && props.viewMode) {
      loadCheckupData(newData)
    }
  },
  { immediate: true }
)

watch(
  () => form.value.pictures,
  (newFiles) => {
    if (!props.viewMode) {
      previewImages.value = []
      if (newFiles && newFiles.length > 0) {
        Array.from(newFiles).forEach((file) => {
          const reader = new FileReader()
          reader.onload = (e) => {
            previewImages.value.push(e.target.result)
          }
          reader.readAsDataURL(file)
        })
      }
    }
  },
  { deep: true }
)

const loadCheckupData = (data) => {

  form.value = {
    pictures: [],
    sleepDuration: data.sleepduration || data.sleep_duration || '',
    sleepQuality: (data.sleepquality || data.sleep_quality || 5) / 2,
    weight: data.weight || null,
    shape: (data.shape || 5) / 2,
    soreness: (data.soreness || 1) / 2,
    steps: data.steps || null,
    digestion: (data.digestion || 5) / 2,
    dayOn: data.dayon || data.day_on || false,
  }

}

const removeImage = (index) => {
  if (!props.viewMode) {
    const filesArray = Array.from(form.value.pictures)
    filesArray.splice(index, 1)

    const dataTransfer = new DataTransfer()
    filesArray.forEach((file) => dataTransfer.items.add(file))
    form.value.pictures = dataTransfer.files

    previewImages.value.splice(index, 1)
  }
}

const resetForm = () => {
  form.value = {
    pictures: [],
    sleepDuration: '',
    sleepQuality: 2.5,
    weight: null,
    shape: 2.5,
    soreness: 0.5,
    steps: null,
    digestion: 2.5,
    dayOn: false,
  }
  previewImages.value = []
  if (checkupForm.value) {
    checkupForm.value.resetValidation()
  }
}

const submitCheckup = async () => {
  if (!formValid.value || props.viewMode) return

  try {
    const formData = new FormData()

    if (form.value.pictures && form.value.pictures.length > 0) {
      Array.from(form.value.pictures).forEach((file) => {
        formData.append('pictures', file)
      })
    }

    formData.append('sleepduration', form.value.sleepDuration)
    formData.append('sleepquality', Math.round(form.value.sleepQuality * 2).toString())
    formData.append('weight', form.value.weight.toString())
    formData.append('shape', Math.round(form.value.shape * 2).toString())
    formData.append('soreness', Math.round(form.value.soreness * 2).toString())
    formData.append('steps', form.value.steps.toString())
    formData.append('digestion', Math.round(form.value.digestion * 2).toString())
    formData.append('dayon', form.value.dayOn.toString())

    const result = await dailyCheckupStore.createDailyCheckup(formData)

    emit('checkup-created', result)
    closeModal()
    resetForm()

  } catch (error) {
    console.error('❌ Erreur lors de la création du daily checkup:', error)
  }
}

const deleteCheckup = async () => {
  if (!props.checkupData?.id) return

  try {
    deleting.value = true
    await dailyCheckupStore.deleteDailyCheckup(props.checkupData.id)

    emit('checkup-deleted', props.checkupData.id)
    closeModal()

  } catch (error) {
    console.error('❌ Erreur lors de la suppression du daily checkup:', error)
  } finally {
    deleting.value = false
  }
}

const formatDate = (timestamp) => {
  if (!timestamp) return ''

  const date = new Date(timestamp)
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const onImageLoad = () => {
}

const onImageError = (event) => {
  console.error('❌ Erreur de chargement d\'image:', event.target.src)
}

const closeModal = () => {
  dialog.value = false
  setTimeout(() => {
    if (!props.viewMode) {
      resetForm()
    }
  }, 300)
}
</script>

<style lang="scss" scoped>

.daily-checkup-dialog {
  &.v-dialog--fullscreen .daily-checkup-modal {
    height: 100vh;
    max-height: 100vh;
  }
}

.daily-checkup-modal {
  background: linear-gradient(180deg, #0a796c, #083f39);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  &.mobile {
    height: 100vh;
    max-height: 100vh;
    border-radius: 0;
  }
}

.modal-header {
  color: white;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
}

.header-title {
  font-weight: 600;
  font-size: 18px;
}

.close-btn {
  background-color: rgba(255, 255, 255, 0.1) !important;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2) !important;
  }
}

.modal-content-wrapper {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}

.modal-content {
  background: transparent;
  min-height: min-content;
}

.checkup-date {
  text-align: center;
}

.form-section {
  margin-bottom: 20px;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: white;
  margin-bottom: 12px;
  display: flex;
  align-items: center;

  &::before {
    content: '';
    width: 3px;
    height: 16px;
    background: rgba(255, 255, 255, 0.8);
    margin-right: 8px;
    border-radius: 2px;
  }
}

.rating-label {
  text-align: center;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 4px;
}

.rating-mobile {
  justify-content: center;
}

.image-previews {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 12px;
}

.image-preview-item {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.preview-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
    border-color: rgba(255, 255, 255, 0.4);
  }
}

.zoom-indicator {
  position: absolute;
  top: 4px;
  left: 4px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  padding: 2px 4px;
  opacity: 0;
  transition: opacity 0.2s ease;

  .image-preview-item:hover & {
    opacity: 1;
  }
}

.remove-image-btn {
  position: absolute;
  top: -6px;
  right: -6px;
  background-color: rgba(255, 0, 0, 0.8) !important;
  color: white !important;
  min-width: 20px !important;
  width: 20px !important;
  height: 20px !important;
  z-index: 2;

  &:hover {
    background-color: rgba(255, 0, 0, 0.9) !important;
  }
}

.no-photos {
  color: rgba(255, 255, 255, 0.7);
  font-style: italic;
  text-align: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 2px dashed rgba(255, 255, 255, 0.2);
}

.custom-input :deep(.v-field) {
  background-color: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15) !important;
    border-color: rgba(255, 255, 255, 0.3) !important;
  }

  &.v-field--focused {
    background-color: rgba(255, 255, 255, 0.15) !important;
    border-color: rgba(255, 255, 255, 0.5) !important;
  }
}

.custom-input :deep(.v-field__input) {
  color: white !important;
}

.custom-input :deep(.v-label) {
  color: rgba(255, 255, 255, 0.8) !important;
}

.custom-input :deep(.v-field__prepend-inner .v-icon) {
  color: rgba(255, 255, 255, 0.7) !important;
}

.custom-switch :deep(.v-selection-control__wrapper) {
  color: white !important;
}

.custom-switch :deep(.v-label) {
  color: white !important;
}

.modal-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.05);
  flex-shrink: 0;

  .gap-2 {
    gap: 8px;
  }
}

.cancel-btn {
  color: rgba(255, 255, 255, 0.8) !important;
  background-color: rgba(255, 255, 255, 0.05) !important;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1) !important;
  }
}

.submit-btn {
  background: rgba(255, 255, 255, 0.15) !important;
  color: white !important;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.25) !important;
  }

  &:disabled {
    background: rgba(255, 255, 255, 0.05) !important;
    color: rgba(255, 255, 255, 0.5) !important;
  }
}

.delete-btn {
  background: rgba(255, 82, 82, 0.15) !important;
  color: #ff5252 !important;
  border: 1px solid rgba(255, 82, 82, 0.3) !important;

  &:hover:not(:disabled) {
    background: rgba(255, 82, 82, 0.25) !important;
    border-color: rgba(255, 82, 82, 0.5) !important;
  }

  &:disabled {
    background: rgba(255, 82, 82, 0.05) !important;
    color: rgba(255, 82, 82, 0.5) !important;
    border-color: rgba(255, 82, 82, 0.1) !important;
  }
}

.custom-input :deep(.v-field--disabled) {
  opacity: 0.8;
}

.custom-switch :deep(.v-switch--disabled) {
  opacity: 0.8;
}

.lightbox-dialog {
  z-index: 9999 !important;

  .v-dialog__content {
    align-items: center;
    justify-content: center;
  }

  .v-overlay__content {
    max-width: none !important;
    max-height: none !important;
    width: 100% !important;
    height: 100% !important;
    margin: 0 !important;
  }
}

.lightbox-container {
  background: rgba(0, 0, 0, 0.95);
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

.lightbox-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent);
}

.image-counter {
  color: white;
  font-size: 16px;
  font-weight: 600;
}

.lightbox-close {
  background: rgba(255, 255, 255, 0.1) !important;

  &:hover {
    background: rgba(255, 255, 255, 0.2) !important;
  }
}

.lightbox-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 80px 20px;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1) !important;
  z-index: 10;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.2) !important;
  }

  &:disabled {
    opacity: 0.3;
  }
}

.prev-btn {
  left: 20px;
}

.next-btn {
  right: 20px;
}

.image-container {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}

.image-loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
}

.lightbox-footer {
  padding: 20px;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
}

.image-dots {
  display: flex;
  gap: 8px;
  align-items: center;
}

.dot-btn {
  min-width: auto !important;
  width: 32px !important;
  height: 32px !important;

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    transition: all 0.2s ease;
  }

  &.active .dot,
  &:hover .dot {
    background: white;
    transform: scale(1.2);
  }
}

/* Responsive Mobile */
@media (max-width: 768px) {
  .daily-checkup-modal {
    height: 100vh;
    max-height: 100vh;
    border-radius: 0;
  }

  .modal-header {
    padding: 16px 20px;
  }

  .modal-content {
    padding: 16px !important;
  }

  .section-title {
    font-size: 13px;
  }

  .image-previews {
    gap: 8px;
  }

  .preview-img {
    width: 60px;
    height: 60px;
  }

  .form-section {
    margin-bottom: 16px;
  }

  .lightbox-header {
    padding: 15px;
  }

  .lightbox-content {
    padding: 60px 10px;
  }

  .nav-btn {
    .prev-btn {
      left: 10px;
    }

    .next-btn {
      right: 10px;
    }
  }
}
</style>
