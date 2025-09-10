<template>
  <div class="daily-fab-custom" @click="openModal" :class="{ disabled: hasCheckupToday }">
    <v-icon color="white" size="24">mdi-clipboard-check</v-icon>

    <v-tooltip activator="parent" location="left">
      {{ hasCheckupToday ? "Checkup déjà fait aujourd'hui" : 'Créer un Daily Checkup' }}
    </v-tooltip>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useDailyCheckupStore } from '@/stores/dailyCheckup'

const emit = defineEmits(['open-modal'])

const dailyCheckupStore = useDailyCheckupStore()

const hasCheckupToday = computed(() => {
  return !!dailyCheckupStore.getTodayCheckup
})

const openModal = () => {
  if (!hasCheckupToday.value) {
    emit('open-modal')
  }
}
</script>

<style lang="scss" scoped>
.daily-fab-custom {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;

  width: 56px;
  height: 56px;
  border-radius: 50%;

  background: linear-gradient(135deg, #db7edb 0%, #06b6d4 100%);
  box-shadow: 0 8px 24px rgba(34, 197, 94, 0.3);

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(.disabled) {
    box-shadow: 0 12px 32px rgba(34, 197, 94, 0.4);
    transform: translateY(-2px);
  }

  &.disabled {
    background: #ccc;
    box-shadow: none;
    cursor: not-allowed;
    opacity: 0.6;
  }
}

@media (max-width: 768px) {
  .daily-fab-custom {
    bottom: 16px;
    right: 16px;
    width: 50px;
    height: 50px;
    scale: 0.9;
  }
}
</style>
