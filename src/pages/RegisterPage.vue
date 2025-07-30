<template>
  <VRow class="w-100 h-100">
    <VCol cols="12" class="d-flex justify-center align-center">
      <VCard width="400" class="card-glass pa-3">
        <VCardTitle>Créer un compte</VCardTitle>
        <VCardText>
          <VRow>
            <VCol cols="12">
              <VTextField
                v-model="email"
                label="Email"
                type="email"
                bg-color="#ffffff1a"
                rounded="0.5rem"
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="password"
                label="Mot de passe"
                type="password"
                rounded="0.5rem"
                bg-color="#ffffff1a"
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="confirmPassword"
                label="Confirmer le mot de passe"
                type="password"
                rounded="0.5rem"
                bg-color="#ffffff1a"
              />
            </VCol>
            <VCol cols="12">
              <span class="register-class mt-3"
                >Déjà inscrit ? <RouterLink to="/">Se connecter</RouterLink></span
              >
            </VCol>
          </VRow>
        </VCardText>
        <VCardActions>
          <VSpacer />
          <PrimaryButton @click="handleLogin" :loading="authStore.loading">
            Se créer un compte
          </PrimaryButton>
        </VCardActions>
      </VCard>
    </VCol>
  </VRow>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useSnackbarStore } from '@/stores/snackbar'
import { useRouter } from 'vue-router'
import api from '@/plugins/axios'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const authStore = useAuthStore()
const snackbarStore = useSnackbarStore()
const router = useRouter()

const handleLogin = async () => {
  await api
    .post('/profiles', {
      email: email.value,
      password: password.value,
      confirm_password: confirmPassword.value,
    })
    .then(() => {
      snackbarStore.success('Compte créé avec succès ! Vous pouvez maintenant vous connecter.')
      router.push('/login')
    })
    .catch((error) => {
      console.log('Error creating account:', error)
      snackbarStore.error(error.response?.data?.message || 'Erreur lors de la création du compte')
    })
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
