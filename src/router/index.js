import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useNavigationStore } from '@/stores/navigation'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/LoginPage.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/pages/RegisterPage.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/pages/training/DashboardPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin',
    name: 'adminPanel',
    component: () => import('@/pages/training/AdminPanelPage.vue'),
    meta: { requiresAuth: true, requiresRole: 'admin' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()
  const navigation = useNavigationStore()

  if (auth.token && !auth.user && !auth.loading) {
    await auth.fetchUser()
  }

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    navigation.setError('auth_required')
    return next('/login')
  }

  if (to.meta.requiresRole && !auth.hasRole(to.meta.requiresRole)) {
    navigation.setError('insufficient_role', { role: to.meta.requiresRole })
    return next('/')
  }

  next()
})

router.afterEach(() => {
  const navigation = useNavigationStore()
  navigation.showPendingError()
})

export default router
