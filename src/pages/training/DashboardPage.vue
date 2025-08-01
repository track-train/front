<template>
  <v-container>
    <h1>Bienvenue {{ authStore.user?.name || 'Utilisateur' }}</h1>
    <v-btn color="error" @click="authStore.logout()">Déconnexion</v-btn>
  </v-container>
</template>

<script setup>
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
</script>
