<template>
  <VRow class="w-100 h-100">
    <VCol cols="12" class="d-flex justify-center align-center">
      <VCard width="400" class="card-glass pa-3">
        <VCardTitle>Se connecter</VCardTitle>
        <VCardText>
          <VRow>
            <VCol cols="12">
              <VTextField
                v-model="email"
                label="Email"
                type="email"
                class="mb-3"
                bg-color="#ffffff1a"
                rounded="0.5rem"
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="password"
                label="Mot de passe"
                type="password"
                bg-color="#ffffff1a"
                rounded="0.5rem"
              />
              <p v-if="authStore.error" class="text-red-600 mt-2">{{ authStore.error }}</p>
            </VCol>
            <VCol cols="12">
              <span class="register-class mt-3"
                >Pas encore inscrit ? <RouterLink to="/register">Créer un compte</RouterLink></span
              >
            </VCol>
          </VRow>
        </VCardText>
        <VCardActions>
          <VSpacer />
          <PrimaryButton @click="handleLogin" :loading="authStore.loading">
            Se connecter
          </PrimaryButton>
        </VCardActions>
      </VCard>
    </VCol>
  </VRow>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const authStore = useAuthStore()
const router = useRouter()

const handleLogin = async () => {
  await authStore.login(email.value, password.value)
  if (authStore.token) router.push('/')
}
</script>

<style lang="scss" scoped>
.card-glass {
  background-color: #0d3b35;
  border-radius: 1.5rem;
  padding: 1.5rem;
  .v-card-title {
    color: #ffffff;
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 100%;
    letter-spacing: 0;
  }
}

.register-class {
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
  letter-spacing: 0.01em;

  a {
    color: #ffffff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
