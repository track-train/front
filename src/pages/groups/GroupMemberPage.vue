<template>
  <v-container>
    <div class="d-flex align-center mb-4">
      <v-btn icon @click="router.back()"><v-icon>mdi-arrow-left</v-icon></v-btn>
      <h1 class="text-h5 ml-2">Membres du groupe</h1>
    </div>
    <v-tabs v-model="activeTab" color="primary" class="mb-4">
      <v-tab value="members">
        <v-icon left>mdi-account-multiple</v-icon>
        Suivis ({{ groupMembers.length }})
      </v-tab>
      <v-tab value="users">
        <v-icon left>mdi-account-plus</v-icon>
        Utilisateurs ({{ filteredAllUsers.length }})
      </v-tab>
    </v-tabs>
    <v-window v-model="activeTab">
      <!-- Tab 1 : Membres suivis -->
      <v-window-item value="members">
        <v-text-field
          v-model="filter"
          label="Filtrer les membres"
          prepend-icon="mdi-magnify"
          class="mb-4"
          clearable
        />
        <v-alert v-if="errorMembers" type="error" class="mb-4">{{ errorMembers }}</v-alert>
        <v-list v-infinite-scroll="loadMoreMembers" :infinite-scroll-disabled="allLoadedMembers" class="member-list">
          <v-list-item
            v-for="user in filteredGroupMembers"
            :key="user.id"
            class="member-list-item"
          >
            <v-list-item-content>
              <v-list-item-title>{{ user.name }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn color="primary" size="small" @click="viewProfile(user.id)">
                Voir profil
                <v-icon right size="small">mdi-account-arrow-right</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-list-item v-if="loadingMembers">
            <v-progress-circular indeterminate color="primary" size="24" />
          </v-list-item>
          <v-list-item v-if="!loadingMembers && filteredGroupMembers.length === 0">
            <span class="text-grey">Aucun membre trouvé.</span>
          </v-list-item>
        </v-list>
      </v-window-item>

      <!-- Tab 2 : Tous les utilisateurs -->
      <v-window-item value="users">
        <v-text-field
          v-model="filterUsers"
          label="Filtrer les utilisateurs"
          prepend-icon="mdi-magnify"
          class="mb-4"
          clearable
        />
        <v-alert v-if="errorUsers" type="error" class="mb-4">{{ errorUsers }}</v-alert>
        <v-list v-infinite-scroll="loadMoreUsers" :infinite-scroll-disabled="allLoadedUsers" class="member-list">
          <v-list-item
            v-for="user in filteredAllUsers"
            :key="user.id"
            class="member-list-item"
          >
            <v-list-item-content>
              <v-list-item-title>{{ user.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                color="success"
                size="small"
                :disabled="isUserInGroup(user.id) || loadingAddUser[user.id]"
                @click="addUserToGroup(user.id)"
              >
                <v-icon left size="small">mdi-plus</v-icon>
                Ajouter
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-list-item v-if="loadingUsers">
            <v-progress-circular indeterminate color="primary" size="24" />
          </v-list-item>
          <v-list-item v-if="!loadingUsers && filteredAllUsers.length === 0">
            <span class="text-grey">Aucun utilisateur trouvé.</span>
          </v-list-item>
        </v-list>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/plugins/axios'
import { useSnackbarStore } from '@/stores/snackbar'

const route = useRoute()
const router = useRouter()
const snackbarStore = useSnackbarStore()
const groupId = route.params.groupId

// MEMBERS TAB ---------------------------------
const groupMembers = ref([])
const filter = ref("")
const errorMembers = ref(null)
const loadingMembers = ref(false)
const pageMembers = ref(1)
const perPage = 20
const allLoadedMembers = ref(false)

// USERS TAB -----------------------------------
const allUsers = ref([])
const filterUsers = ref("")
const errorUsers = ref(null)
const loadingUsers = ref(false)
const pageUsers = ref(1)
const allLoadedUsers = ref(false)
const loadingAddUser = ref({})

// Tabs
const activeTab = ref("members")

// Chargement membres du groupe (infinite)
async function fetchMembers(pageNum) {
  loadingMembers.value = true
  errorMembers.value = null
  try {
    const resp = await api.get(`/groups/${groupId}/members`, {
      params: { page: pageNum, perPage }
    })
    if (Array.isArray(resp.data) && resp.data.length) {
      groupMembers.value.push(...resp.data)
      if (resp.data.length < perPage) allLoadedMembers.value = true
    } else {
      allLoadedMembers.value = true
    }
  } catch (e) {
    errorMembers.value = "Erreur lors du chargement des membres."
  } finally {
    loadingMembers.value = false
  }
}
function loadMoreMembers() {
  if (!allLoadedMembers.value && !loadingMembers.value) {
    pageMembers.value++
    fetchMembers(pageMembers.value)
  }
}
const filteredGroupMembers = computed(() => {
  const f = filter.value.trim().toLowerCase()
  if (!f) return groupMembers.value
  return groupMembers.value.filter(u => u.name?.toLowerCase().includes(f))
})

// Chargement utilisateurs globaux (infinite)
async function fetchAllUsers(pageNum) {
  loadingUsers.value = true
  errorUsers.value = null
  try {
    const resp = await api.get(`/profiles/users`, {
      params: { page: pageNum, perPage }
    })
    if (Array.isArray(resp.data) && resp.data.length) {
      allUsers.value.push(...resp.data)
      if (resp.data.length < perPage) allLoadedUsers.value = true
    } else {
      allLoadedUsers.value = true
    }
  } catch (e) {
    errorUsers.value = "Erreur lors du chargement des utilisateurs."
  } finally {
    loadingUsers.value = false
  }
}
function loadMoreUsers() {
  if (!allLoadedUsers.value && !loadingUsers.value) {
    pageUsers.value++
    fetchAllUsers(pageUsers.value)
  }
}
const filteredAllUsers = computed(() => {
  const f = filterUsers.value.trim().toLowerCase()
  if (!f) return allUsers.value
  return allUsers.value.filter(u =>
    u.name?.toLowerCase().includes(f) ||
    u.email?.toLowerCase().includes(f)
  )
})

// Ajouter un utilisateur au groupe
function isUserInGroup(id) {
  return groupMembers.value.some(u => u.id === id)
}
async function addUserToGroup(userId) {
  loadingAddUser.value[userId] = true
  try {
    await api.post(`/groups/${groupId}/members/${userId}`)
    // Ajoute l'utilisateur à la liste des membres suivis (UI immédiate)
    const user = allUsers.value.find(u => u.id === userId)
    if (user && !isUserInGroup(userId)) groupMembers.value.push(user)
    snackbarStore.success("Utilisateur ajouté au groupe !")
  } catch (e) {
    snackbarStore.error("Erreur lors de l'ajout de l'utilisateur.")
  } finally {
    loadingAddUser.value[userId] = false
  }
}
function viewProfile(userId) {
  router.push(`/profiles/${userId}`)
}

onMounted(() => {
  groupMembers.value = []
  allUsers.value = []
  pageMembers.value = 1
  pageUsers.value = 1
  allLoadedMembers.value = false
  allLoadedUsers.value = false
  fetchMembers(1)
  fetchAllUsers(1)
})
</script>

<style scoped>
.member-list-item {
  border-bottom: 1px solid #eee;
}
.member-list {
  max-height: 600px;
  overflow-y: auto;
}
</style>