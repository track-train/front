<template>
  <VContainer fluid class="pa-14" style="height: 100vh">
    <RouterView />
    <AppSnackbar />
  </VContainer>
</template>

<script setup>
import { RouterView } from 'vue-router'
import AppSnackbar from './components/AppSnackbar.vue'
import { useAuthStore } from './stores/auth'
import { onMounted } from 'vue'

const authStore = useAuthStore()

onMounted(async () => {
  await authStore.initialize()
})
</script>

<style lang="scss" scoped></style>
