import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useSnackbarStore } from '@/stores/snackbar'

export function useAuthGuard() {
  const auth = useAuthStore()
  const router = useRouter()
  const snackbar = useSnackbarStore()

  const requireAuth = () => {
    if (!auth.isAuthenticated) {
      snackbar.error('Vous devez être connecté pour accéder à cette page.')
      router.push('/login')
      return false
    }
    return true
  }

  const requireRole = (role) => {
    if (!requireAuth()) return false

    if (!auth.hasRole(role)) {
      snackbar.error(`Accès refusé. Vous devez avoir le rôle ${role}.`)
      router.push('/') // Redirection vers l'accueil
      return false
    }
    return true
  }

  const requireAdmin = () => {
    return requireRole('admin')
  }

  return {
    requireAuth,
    requireRole,
    requireAdmin,
  }
}
