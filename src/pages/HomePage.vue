<template>
  <div class="home-page">
    <h1>Coach Profiles</h1>
    <div class="coach-list">
      <CoachCard
        v-for="coach in coaches"
        :key="coach.id"
        :name="coach.name"
        :description="coach.description"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'
import CoachCard from '@/components/CoachCard.vue'

const coaches = ref([])

onMounted(async () => {
  try {
    const response = await api.get('/profiles/coachs')
    console.log('Fetched coach profiles:', response.data)
    coaches.value = response.data
  } catch (error) {
    console.error('Failed to fetch coach profiles:', error)
  }
})
</script>

<style scoped>
.home-page {
  padding: 2rem;
}
.coach-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
