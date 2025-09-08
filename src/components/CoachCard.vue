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
import { useRouter } from 'vue-router'

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
})

const router = useRouter()
const defaultPicture =
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'

const selectCoach = () => {
  if (props.id) {
    router.push(`/coach/${props.id}`)
  }
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
