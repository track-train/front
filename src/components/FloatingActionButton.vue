<template>
    <v-btn
      class="fab"
      color="primary"
      fab
      size="large"
      @click="onClick"
      :style="{ position: 'fixed', bottom: '32px', right: '32px', zIndex: 100 }"
    >
      <v-icon large>{{ icon }}</v-icon>
    </v-btn>
  </template>
  
  <script setup>
  const props = defineProps({
    icon: { type: String, default: 'mdi-plus' }
  })
  const emit = defineEmits(['click'])
  function onClick() { emit('click') }
  </script>