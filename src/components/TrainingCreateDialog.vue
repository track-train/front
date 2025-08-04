<!-- components/TrainingCreateDialog.vue -->
<template>
    <v-dialog v-model="show" max-width="500">
      <v-card>
        <v-card-title>
          <span class="text-h6">Créer un nouveau training</span>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="name" label="Nom du training" required />
          <v-textarea v-model="description" label="Description" rows="3" required />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="close">Annuler</v-btn>
          <v-btn color="primary" :loading="loading" @click="submit">Créer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  const props = defineProps({
    modelValue: Boolean,
  })
  const emit = defineEmits(['update:modelValue', 'created'])
  
  const show = ref(props.modelValue)
  watch(() => props.modelValue, (v) => show.value = v)
  watch(show, v => emit('update:modelValue', v))
  
  const name = ref('')
  const description = ref('')
  const loading = ref(false)
  
  function close() {
    show.value = false
    name.value = ''
    description.value = ''
  }
  async function submit() {
    if (!name.value) return
    loading.value = true
    await emit('created', { name: name.value, description: description.value })
    loading.value = false
    close()
  }
  </script>