<template>
  <v-app>
    <TrackAndTrainAppBar />
    <v-container fluid class="container">
      <!-- Ajout d'un wrapper avec padding seulement pour certaines pages -->
      <div class="content-wrapper" :class="{ 'with-padding': needsPadding }">
        <TrainingNavbar v-if="authStore.isAuthenticated" />
        <RouterView />
        <AppSnackbar />
      </div>
    </v-container>
    <TrainingFooter />
  </v-app>
</template>

<script setup>
import { RouterView } from 'vue-router'
import AppSnackbar from './components/AppSnackbar.vue'
import TrainingNavbar from './components/TrainingNavbar.vue'
import TrainingFooter from './components/TrainingFooter.vue'
import { useAuthStore } from './stores/auth'
import { onMounted, computed } from 'vue'
import TrackAndTrainAppBar from './components/TrackAndTrainAppBar.vue'
import { useRoute } from 'vue-router'

const authStore = useAuthStore()
const route = useRoute()

const fullWidthPages = [
  'about-us',
  'become-coach',
  'feedback',
  'cgu',
  'privacy',
  'legal',
  'cookies',
  'features',
]

const needsPadding = computed(() => {
  return !fullWidthPages.includes(route.name)
})

onMounted(async () => {
  await authStore.initialize()
})
</script>

<style lang="scss" scoped>
.container {
  min-height: calc(100vh - 120px);
  background-color: #00231f;
  padding: 0 !important;
  padding-top: 80px !important;
}

.content-wrapper {
  width: 100%;

  &.with-padding {
    padding: 56px;
  }
}

:deep(.v-application) {
  overflow-y: auto !important;
}

:deep(.v-application__wrap) {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

:deep(.v-container) {
  max-width: 100% !important;
  margin: 0 !important;
}

:deep(.v-app-bar) {
  z-index: 2000 !important;
}

:deep(.v-main) {
  padding-top: 80px !important;
}
</style>
