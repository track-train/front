<template>
  <v-card class="macro-plan-card" elevation="3">
    <v-card-title class="plan-header">
      <div class="d-flex align-center justify-center w-100">
        <v-icon class="mr-2" color="primary">mdi-nutrition</v-icon>
        <span class="text-h6 font-weight-bold">{{ macroPlan.name }}</span>
      </div>
    </v-card-title>

    <v-divider />

    <v-card-text class="pa-4">
      <div class="macros-grid">
        <div class="macro-item">
          <v-chip color="error" variant="outlined" size="small" class="macro-label">
            Protéines (g)
          </v-chip>
          <div class="macro-value">{{ Math.round(macroPlan.protein || 0) }}</div>
        </div>

        <div class="macro-item">
          <v-chip color="warning" variant="outlined" size="small" class="macro-label">
            Glucides (g)
          </v-chip>
          <div class="macro-value">{{ Math.round(macroPlan.carbohydrates || 0) }}</div>
        </div>

        <div class="macro-item">
          <v-chip color="info" variant="outlined" size="small" class="macro-label">
            Lipides (g)
          </v-chip>
          <div class="macro-value">{{ Math.round(macroPlan.lipids || 0) }}</div>
        </div>

        <div class="macro-item">
          <v-chip color="success" variant="outlined" size="small" class="macro-label">
            Fibre (g)
          </v-chip>
          <div class="macro-value">{{ Math.round(macroPlan.fiber || 0) }}</div>
        </div>

        <div class="macro-item">
          <v-chip color="blue" variant="outlined" size="small" class="macro-label"> Eau L </v-chip>
          <div class="macro-value">{{ macroPlan.water || 0 }}</div>
        </div>

        <div class="macro-item total-calories">
          <v-chip color="primary" variant="elevated" size="small" class="macro-label">
            Total Kcal
          </v-chip>
          <div class="macro-value total-value">{{ Math.round(macroPlan.kilocalorie || 0) }}</div>
        </div>
      </div>
    </v-card-text>

    <v-card-text class="pt-0" v-if="maxCalories">
      <div class="calories-progress">
        <div class="d-flex justify-space-between align-center mb-1">
          <span class="text-caption text-grey">Calories</span>
          <span class="text-caption text-grey"
            >{{ Math.round((macroPlan.kilocalorie / maxCalories) * 100) }}%</span
          >
        </div>
        <v-progress-linear
          :model-value="(macroPlan.kilocalorie / maxCalories) * 100"
          color="primary"
          height="6"
          rounded
        />
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
defineProps({
  macroPlan: {
    type: Object,
    required: true,
  },
  maxCalories: {
    type: Number,
    default: null,
  },
})
</script>

<style scoped>
.macro-plan-card {
  border-radius: 12px;
  transition: all 0.3s ease;
  height: 100%;
}

.macro-plan-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.plan-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 16px;
}

.macros-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.macro-item {
  text-align: center;
  padding: 8px;
  border-radius: 8px;
  background-color: #f8f9fa;
  transition: background-color 0.3s ease;
}

.macro-item:hover {
  background-color: #e9ecef;
}

.macro-label {
  margin-bottom: 8px;
  font-weight: 500;
}

.macro-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin-top: 4px;
}

.total-calories {
  background: linear-gradient(135deg, #667eea20 0%, #764ba240 100%);
  border: 2px solid #667eea;
}

.total-value {
  color: #667eea;
  font-size: 1.75rem;
}

.calories-progress {
  margin-top: 8px;
}

@media (max-width: 600px) {
  .macros-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .macro-value {
    font-size: 1.25rem;
  }

  .total-value {
    font-size: 1.5rem;
  }
}
</style>
