<template>
  <v-card class="mx-auto my-8" elevation="16" max-width="344">
    <v-card-item>
      <v-card-title>
        {{ name }}
      </v-card-title>

      <v-card-subtitle>
        {{ description }}
      </v-card-subtitle>
    </v-card-item>
  </v-card>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})
</script>

<style scoped>
.coach-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  background: #fff;
  max-width: 350px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.coach-name {
  margin: 0 0 8px 0;
  font-size: 1.5em;
  font-weight: bold;
}
.coach-description {
  margin: 0;
  color: #555;
}
</style>
