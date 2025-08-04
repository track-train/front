<template>
    <v-dialog v-model="show" max-width="400px" persistent>
      <v-card>
        <v-card-title>
          <v-icon class="mr-2" color="primary">mdi-account-group</v-icon>
          Créer un groupe
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="name"
            label="Nom du groupe"
            required
            autofocus
          />
          <v-textarea
            v-model="description"
            label="Description"
            rows="3"
          />
          <!-- PAS D'ALERT ERREUR ICI -->
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="close">Annuler</v-btn>
          <v-spacer />
          <v-btn color="primary" :loading="loading" @click="submit" :disabled="!name">
            Créer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  
  const props = defineProps({
    modelValue: Boolean,
    loading: Boolean,
  })
  const emit = defineEmits(['update:modelValue', 'submit'])
  
  const show = ref(props.modelValue)
  watch(() => props.modelValue, v => show.value = v)
  watch(show, v => emit('update:modelValue', v))
  
  const name = ref('')
  const description = ref('')
  
  function reset() {
    name.value = ''
    description.value = ''
  }
  
  function close() {
    reset()
    show.value = false
  }
  
  function submit() {
    emit('submit', { name: name.value, description: description.value })
    reset()
  }
  </script>