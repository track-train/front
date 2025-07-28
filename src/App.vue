<template>
  <VContainer fluid class="pa-14" style="height: 100vh">
    <RouterView />
    <AppSnackbar />
  </VContainer>
</template>

<script setup>
import { RouterView } from 'vue-router'
import AppSnackbar from './components/AppSnackbar.vue'
</script>

<style lang="scss" scoped></style>
