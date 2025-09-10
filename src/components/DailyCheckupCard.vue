<template>
  <v-card class="daily-checkup-card" @click="$emit('click')" hover elevation="4">
    <div class="card-header">
      <v-chip size="small" color="primary" variant="elevated">
        <v-icon start>mdi-calendar</v-icon>
        {{ formatDate(checkup.created_at) }}
      </v-chip>

      <v-chip size="small" :color="checkup.dayon ? 'success' : 'grey'" variant="elevated">
        <v-icon start>{{ checkup.dayon ? 'mdi-dumbbell' : 'mdi-sofa' }}</v-icon>
        {{ checkup.dayon ? 'Entraînement' : 'Repos' }}
      </v-chip>
    </div>

    <v-card-text class="pa-4">
      <div class="stats-grid">
        <div class="stat-item">
          <v-icon color="blue">mdi-sleep</v-icon>
          <div>
            <span class="stat-label">Sommeil</span>
            <div class="stat-value">{{ checkup.sleepquality }}/10</div>
          </div>
        </div>

        <div class="stat-item">
          <v-icon color="green">mdi-heart</v-icon>
          <div>
            <span class="stat-label">Forme</span>
            <div class="stat-value">{{ checkup.shape }}/10</div>
          </div>
        </div>

        <div class="stat-item">
          <v-icon color="orange">mdi-alert-circle</v-icon>
          <div>
            <span class="stat-label">Douleurs</span>
            <div class="stat-value">{{ checkup.soreness }}/10</div>
          </div>
        </div>

        <div class="stat-item">
          <v-icon color="purple">mdi-walk</v-icon>
          <div>
            <span class="stat-label">Pas</span>
            <div class="stat-value">{{ formatSteps(checkup.steps) }}</div>
          </div>
        </div>
      </div>

      <v-divider class="my-3" />

      <div class="card-footer d-flex align-center">
        <v-avatar size="24">
          <v-icon>mdi-clipboard-check</v-icon>
        </v-avatar>
        <span class="ml-2 text-body-2">{{ formatTime(checkup.created_at) }}</span>

        <v-spacer />

        <SecondaryButton size="small">
          Voir détails
          <v-icon end>mdi-arrow-right</v-icon>
        </SecondaryButton>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
defineProps({
  checkup: {
    type: Object,
    required: true,
  },
})

defineEmits(['click'])

const formatDate = (timestamp) => {
  if (!timestamp) return ''

  const date = new Date(timestamp)
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

const formatTime = (timestamp) => {
  if (!timestamp) return ''

  const date = new Date(timestamp)
  const now = new Date()
  const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))

  if (diffInDays === 0) return "Aujourd'hui"
  if (diffInDays === 1) return 'Hier'
  if (diffInDays < 7) return `Il y a ${diffInDays} jours`

  return date.toLocaleDateString('fr-FR')
}

const formatSteps = (steps) => {
  if (!steps) return '0'
  return steps.toLocaleString('fr-FR')
}
</script>

<style lang="scss" scoped>
.daily-checkup-card {
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 12px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15) !important;
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 16px 0 16px;
  gap: 8px;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat-label {
  font-size: 12px;
  color: #666;
  font-weight: 500;
}

.stat-value {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
}

.card-footer {
  margin-top: 8px;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .card-header {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
}
</style>
