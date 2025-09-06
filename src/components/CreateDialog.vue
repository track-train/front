<template>
  <v-dialog
    v-model="show"
    max-width="560px"
  >
    <v-card class="create-card">
      <v-card-title class="d-flex align-center">
        <template v-if="icon">
          <v-icon
            v-if="icon"
            :class="iconClass"
            :color="iconColor"
            :size="iconSize"
            class="mr-2"
          >
            {{ icon }}
          </v-icon>
        </template>
        <span :class="titleClass">{{ title }}</span>
      </v-card-title>
      <v-card-text>
        <slot />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <TertiaryButton @click="handleCancel">{{ cancelText }}</TertiaryButton>
        <PrimaryButton
          :loading="loading"
          @click="handleConfirm"
          :disabled="confirmDisabled"
        >
          {{ confirmText }}
        </PrimaryButton>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  loading: Boolean,
  title: { type: String, default: 'Créer' },
  titleClass: { type: String, default: 'text-h6' },
  icon: { type: String, default: '' },
  iconColor: { type: String, default: '' },
  iconClass: { type: String, default: '' },
  iconSize: { type: [String, Number], default: undefined },
  maxWidth: { type: [String, Number], default: 500 },
  persistent: { type: Boolean, default: false },
  cancelText: { type: String, default: 'Annuler' },
  confirmText: { type: String, default: 'Créer' },
  confirmDisabled: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

const show = ref(props.modelValue)
watch(() => props.modelValue, v => (show.value = v))
watch(show, v => emit('update:modelValue', v))

function handleCancel() {
  emit('cancel')
  show.value = false
}
function handleConfirm() {
  emit('confirm')
}
</script>

<style lang="scss" scoped>
.create-card {
  background-color: #00231f !important;
}
</style>

