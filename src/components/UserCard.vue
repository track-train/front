<template>
  <v-card class="user-card" hover @click="$emit('click')">
    <v-card-text>
      <div class="user-header">
        <div class="user-info">
          <h3>{{ user.name }}</h3>
          <p class="user-email">{{ user.email }}</p>
        </div>

        <!-- Badges des rôles -->
        <div class="user-roles">
          <v-chip
            v-for="role in user.roles"
            :key="role"
            :color="getRoleColor(role)"
            size="small"
            variant="flat"
          >
            {{ role }}
          </v-chip>
        </div>
      </div>

      <div class="user-meta">
        <div class="meta-item">
          <v-icon size="small">mdi-calendar</v-icon>
          <span>{{ formatDate(user.created_at) }}</span>
        </div>

        <div class="meta-item" v-if="user.sex">
          <v-icon size="small">mdi-human</v-icon>
          <span>{{ user.sex }}</span>
        </div>

        <div class="meta-item" v-if="user.age">
          <v-icon size="small">mdi-cake</v-icon>
          <span>{{ user.age }} ans</span>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
defineProps({
  user: {
    type: Object,
    required: true,
  },
})

defineEmits(['click'])

const getRoleColor = (role) => {
  const colors = {
    admin: 'red',
    coach: 'blue',
    user: 'green',
  }
  return colors[role] || 'grey'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR')
}
</script>

<style scoped>
.user-card {
  cursor: pointer;
  transition: transform 0.2s;
}

.user-card:hover {
  transform: translateY(-2px);
}

.user-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.user-info h3 {
  margin: 0;
  font-size: 1.1rem;
}

.user-email {
  color: #666;
  font-size: 0.9rem;
  margin: 0.25rem 0 0 0;
}

.user-roles {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.user-meta {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #666;
}
</style>
