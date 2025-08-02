<template>
    <v-card class="group-card" elevation="3">
      <v-card-title class="group-card-title d-flex align-center justify-space-between">
        <div class="text-h6 font-weight-bold">{{ group.name }}</div>
        <v-btn icon color="error" size="small" @click.stop="confirmDelete">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider/>
      <v-card-text class="pb-2">
        <span class="text-body-2">{{ group.description }}</span>
      </v-card-text>
      <v-card-actions class="justify-space-between pt-0">
        <span class="text-caption text-grey">{{ formatDate(group.created_at) }}</span>
        <v-btn color="primary" variant="tonal" size="small" @click="seeMembers">
          Voir group
          <v-icon right size="small">mdi-chevron-right</v-icon>
        </v-btn>
      </v-card-actions>
      <DeleteConfirmationDialog
        v-model="deleteDialog"
        :loading="loading"
        @confirm="deleteGroup"
        @cancel="deleteDialog = false"
      />
    </v-card>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog.vue'
  import { useGroupsStore } from '@/stores/groups'
  import { useSnackbarStore } from '@/stores/snackbar'
  
  const props = defineProps({
    group: Object,
    loading: Boolean,
  })
  const emit = defineEmits(['deleted'])
  
  const router = useRouter()
  const groupsStore = useGroupsStore()
  const snackbarStore = useSnackbarStore()
  const deleteDialog = ref(false)
  
  function formatDate(dateStr) {
    const d = new Date(dateStr)
    return d.toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' })
  }
  
  function seeMembers() {
    router.push(`/groups/${props.group.id}/membres`)
  }
  
  function confirmDelete() {
    deleteDialog.value = true
  }
  
  async function deleteGroup() {
    try {
      await groupsStore.deleteGroup(props.group.id)
      snackbarStore.success("Groupe supprimé avec succès")
      emit('deleted', props.group.id)
    } catch (e) {
      snackbarStore.error("Erreur lors de la suppression du groupe")
    } finally {
      deleteDialog.value = false
    }
  }
  </script>
  
  <style scoped>
  .group-card {
    border-radius: 14px;
    min-height: 160px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .group-card-title {
    text-align: center;
    background: #f5f5f5;
    border-radius: 14px 14px 0 0;
  }
  </style>