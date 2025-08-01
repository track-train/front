<template>
  <v-container class="training-detail-page">
    <div v-if="trainingStore.currentTraining" class="training-header mb-6">
      <v-card elevation="2">
        <v-card-title class="d-flex align-center">
          <v-btn icon @click="goBack" class="mr-3">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <div>
            <h1 class="text-h4">{{ trainingStore.currentTraining.name }}</h1>
            <p class="text-body-1 text-grey mb-0">
              {{ trainingStore.currentTraining.description }}
            </p>
          </div>
          <v-spacer />
          <v-chip color="primary"> {{ trainingStore.tasks.length }} exercice(s) </v-chip>
        </v-card-title>
      </v-card>
    </div>

    <div
      v-if="trainingStore.loading.training || trainingStore.loading.tasks"
      class="text-center py-8"
    >
      <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
      <p class="mt-4">Chargement du training...</p>
    </div>

    <v-alert
      v-if="trainingStore.error"
      type="error"
      class="mb-4"
      dismissible
      @click:close="trainingStore.error = null"
    >
      {{ trainingStore.error }}
    </v-alert>

    <v-card v-if="!trainingStore.loading.training && !trainingStore.loading.tasks" elevation="2">
      <v-card-title class="d-flex align-center">
        <v-icon class="mr-2" color="primary">mdi-format-list-checks</v-icon>
        <span class="text-h6">Exercices du training</span>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="enhancedTasks"
        :items-per-page="-1"
        item-value="id"
        hide-default-footer
        class="tasks-table"
        :expanded="expandedTasks"
        show-expand
        @update:expanded="handleExpandedChange"
      >
        <template #item.exercise_name="{ item }">
          <div class="d-flex align-center">
            <v-icon class="mr-2" color="primary">mdi-dumbbell</v-icon>
            <strong>{{ item.exercise_name }}</strong>
          </div>
        </template>

        <template v-slot:item.sets_reps="{ item }">
          <v-chip color="info" small> {{ item.set_number }} x {{ item.repetitions }} </v-chip>
        </template>

        <template v-slot:item.rest_time="{ item }"> {{ item.rest_time }}min </template>

        <template v-slot:item.method="{ item }">
          <v-chip color="success" small outlined>
            {{ item.method }}
          </v-chip>
        </template>

        <template v-slot:item.rir="{ item }">
          <v-chip color="warning" small> RIR {{ item.rir }} </v-chip>
        </template>

        <template v-slot:item.validations_count="{ item }">
          <v-chip :color="item.validations_count > 0 ? 'success' : 'grey'" small>
            {{ item.validations_count }} validation(s)
          </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-btn
            color="primary"
            size="small"
            @click="openValidationDialog(item)"
            :loading="trainingStore.loading.creating"
          >
            <v-icon small class="mr-1">mdi-plus</v-icon>
            Valider
          </v-btn>
        </template>

        <template #expanded-row="{ columns, item }">
          <tr>
            <td :colspan="columns.length" class="pa-4">
              <ValidationsList
                :validations="trainingStore.getValidationsForTask(item.id)"
                :loading="trainingStore.loading.validations"
                :task-name="item.exercise_name"
                :training-id="trainingId"
                :task-id="item.id"
                @refresh="loadAllValidations"
                @validation-deleted="loadAllValidations"
              />
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>

    <ValidationDialog
      v-model="validationDialog"
      :task="selectedTask"
      :training-id="trainingId"
      @validation-created="onValidationCreated"
    />
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTrainingStore } from '@/stores/training'
import ValidationDialog from '@/components/ValidationDialog.vue'
import ValidationsList from '@/components/ValidationsList.vue'

const route = useRoute()
const router = useRouter()
const trainingStore = useTrainingStore()

const validationDialog = ref(false)
const selectedTask = ref(null)
const expandedTasks = ref([])

const trainingId = computed(() => route.params.id)

const headers = [
  { title: 'Exercice', key: 'exercise_name', sortable: true },
  { title: 'Séries/Reps', key: 'sets_reps', sortable: false },
  { title: 'Repos', key: 'rest_time', sortable: true },
  { title: 'Méthode', key: 'method', sortable: true },
  { title: 'RIR', key: 'rir', sortable: true },
  { title: 'Validations', key: 'validations_count', sortable: true },
  { title: 'Actions', key: 'actions', sortable: false },
]

const enhancedTasks = computed(() => {
  return trainingStore.tasks.map((task) => ({
    ...task,
    validations_count: trainingStore.getValidationCountForTask(task.id),
  }))
})

const goBack = () => {
  router.push('/')
}

const openValidationDialog = (task) => {
  selectedTask.value = task
  validationDialog.value = true
}

const handleExpandedChange = (expandedItems) => {
  expandedTasks.value = expandedItems
}

const loadAllValidations = async () => {
  try {
    await trainingStore.fetchAllValidations(trainingId.value)
  } catch (error) {
    console.error('Erreur lors du chargement des validations:', error)
  }
}

const onValidationCreated = () => {
  validationDialog.value = false
  selectedTask.value = null
}

onMounted(async () => {
  try {
    await Promise.all([
      trainingStore.fetchTraining(trainingId.value),
      trainingStore.fetchTasks(trainingId.value),
      trainingStore.fetchAllValidations(trainingId.value),
    ])
  } catch (error) {
    console.error('Erreur lors du chargement:', error)
  }
})

onUnmounted(() => {
  trainingStore.resetStore()
})
</script>

<style scoped>
.training-detail-page {
  max-width: 1200px;
}

.training-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
}

.tasks-table {
  border-radius: 8px;
}

:deep(.v-data-table-row:hover) {
  background-color: #f5f5f5;
}
</style>
