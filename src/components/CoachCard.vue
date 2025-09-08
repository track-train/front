<template>
  <v-card class="coach-card" hover>
    <div class="coach-header">
      <v-avatar class="coach-avatar" size="60">
        <v-img :src="picture || defaultPicture" :alt="`Photo de ${name}`" cover />
      </v-avatar>
      <v-card-title class="coach-name">
        {{ name }}
      </v-card-title>
    </div>
    <v-card-text>
      <p class="text-body-2" style="color: white">{{ description }}</p>
    </v-card-text>
    <v-card-actions>
      <PrimaryButton @click="selectCoach"> Choisir ce coach </PrimaryButton>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSelectedCoachStore } from '@/stores/selectedCoach'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    default: null,
  },
  picture: {
    type: String,
    default: null,
  },
  sex: {
    type: String,
    default: null,
  },
  age: {
    type: Number,
    default: null,
  },
  contact: {
    type: String,
    default: null,
  },
  pricing: {
    type: Number,
    default: null,
  },
  legacy: {
    type: String,
    default: null,
  },
  backgroundPicture: {
    type: String,
    default: null,
  },
})

const router = useRouter()
const selectedCoachStore = useSelectedCoachStore()

const defaultPicture = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'

const coachData = computed(() => ({
  id: props.id,
  name: props.name,
  description: props.description,
  sex: props.sex,
  age: props.age,
  contact: props.contact,
  pricing: props.pricing,
  legacy: props.legacy,
  profile_picture_url: props.picture,
  background_picture_url: props.backgroundPicture,
}))

const selectCoach = () => {
  selectedCoachStore.setSelectedCoach(coachData.value)
  router.push('/coach')
}
</script>

<style lang="scss" scoped>
.coach-card {
  min-width: 300px;
  max-width: 400px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.coach-card:hover {
  transform: translateY(-4px);
}

.coach-header {
  display: flex;
  align-items: center;
  padding: 16px 16px 8px 16px;
  gap: 12px;
}

.coach-avatar {
  flex-shrink: 0;
}

.coach-name {
  padding: 0;
  flex: 1;
}
</style>
