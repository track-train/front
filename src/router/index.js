import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Login from '@/pages/LoginPage.vue'
import Dashboard from '@/pages/DashboardPage.vue'
import Register from '@/pages/RegisterPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Login },
    { path: '/register', component: Register },
    { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.token) {
    next('/')
  } else {
    next()
  }
})

export default router
