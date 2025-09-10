<template>
  <v-app>
    <TrackAndTrainAppBar />
    <v-container fluid :class="mobile ? 'mobile-container' : 'container'">
      <TrainingNavbar v-if="authStore.isAuthenticated" />
      <RouterView />
      <AppSnackbar />
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
import { onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import TrackAndTrainAppBar from './components/TrackAndTrainAppBar.vue'

const authStore = useAuthStore()
const { mobile } = useDisplay()

onMounted(async () => {
  await authStore.initialize()
})
</script>

<style lang="scss" scoped>
.container,
.mobile-container {
  min-height: calc(100vh - 120px);
  background-color: #00231f;
  padding-top: 106px !important;
}

.container {
  padding-left: 72px !important;
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

:deep(.v-main) {
  padding-top: 80px !important;
}
</style>
