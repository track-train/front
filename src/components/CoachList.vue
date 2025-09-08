<template>
  <v-card class="mb-4 section-card fill-height">
    <v-card-title class="d-flex align-center section-header">
      <v-icon class="mr-2" color="color-mix(in srgb, #00231F,white 60%)">mdi-account-tie</v-icon>
      <span class="text-h6">Mes Coaches</span>
      <v-spacer />
      <v-chip color="#22c55e" small text-color="white">{{ coaches.length }} coach(es)</v-chip>
      <slot name="action"></slot>
    </v-card-title>
    <v-card-text class="pa-0">
      <div v-if="coaches.length === 0" class="empty-state text-center py-8">
        <v-icon size="64" color="grey lighten-2">mdi-account-tie</v-icon>
        <p class="text-h6 mt-4 text-grey">Aucun coach assigné</p>
        <p class="text-body-2 text-grey mt-2">Contactez un coach pour commencer votre parcours</p>
      </div>
      <v-slide-group v-else show-arrows class="pa-4">
        <v-slide-item v-for="coach in coaches" :key="coach.id" class="mr-4">
          <CoachCard
            :id="coach.id"
            :name="coach.name"
            :description="coach.description"
            :picture="coach.profile_picture_url"
            :sex="coach.sex"
            :age="coach.age"
            :contact="coach.contact"
            :pricing="coach.pricing"
            :legacy="coach.legacy"
            :background-picture="coach.background_picture_url"
            @click="onCoachClick(coach)"
          />
        </v-slide-item>
      </v-slide-group>
    </v-card-text>
  </v-card>
</template>

<script setup>
import CoachCard from './CoachCard.vue'

defineProps({
  coaches: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['coachClick'])

function onCoachClick(coach) {
  emit('coachClick', coach)
}
</script>
