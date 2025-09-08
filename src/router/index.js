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
    path: '/feedback',
    name: 'feedback',
    component: () => import('@/pages/footer/FeedBackPage.vue'),
  },
  {
    path: '/about-us',
    name: 'about-us',
    component: () => import('@/pages/footer/AboutPage.vue'),
  },
  {
    path: '/become-coach',
    name: 'become-coach',
    component: () => import('@/pages/footer/BecomeCoachPage.vue'),
  },
  {
    path: '/cgu',
    name: 'cgu',
    component: () => import('@/pages/footer/CGUPage.vue'),
  },
  {
    path: '/features',
    name: 'features',
    component: () => import('@/pages/footer/FeaturesPage.vue'),
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('@/pages/footer/PrivacyPage.vue'),
  },
  {
    path: '/legal',
    name: 'legal',
    component: () => import('@/pages/footer/LegalPage.vue'),
  },
  {
    path: '/cookies',
    name: 'cookies',
    component: () => import('@/pages/footer/CookiesPage.vue'),
  },
  {
    path: '/admin',
    name: 'adminPanel',
    component: () => import('@/pages/training/AdminPanelPage.vue'),
    meta: { requiresAuth: true, requiresRole: 'admin' },
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/pages/ProfilePage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/coach',
    name: 'coachDetails',
    component: () => import('@/pages/CoachProfilePage.vue'),
    props: true,
  },
  {
    path: '/training/:id',
    name: 'trainingsDetails',
    component: () => import('@/pages/training/TrainingDetailsPage.vue'),
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: '/diet/:id',
    name: 'dietDetails',
    component: () => import('@/pages/diet/DietDetailsPage.vue'),
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: '/groups/owner/:ownerId',
    name: 'GroupsCoach',
    component: () => import('@/pages/groups/GroupsCoachPage.vue'),
    meta: { requiresAuth: true, requiresRole: ['coach', 'admin'] },
  },
  {
    path: '/groups/:groupId/membres',
    name: 'GroupsMember',
    component: () => import('@/pages/groups/GroupMemberPage.vue'),
    meta: { requiresAuth: true, requiresRole: ['coach', 'admin'] },
    props: true,
  },
  {
    path: '/profiles/:uuid',
    name: 'UserProfilePage',
    component: () => import('@/pages/profiles/UserProfilePage.vue'),
    meta: { requiresAuth: true, requiresRole: ['coach', 'admin'] },
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

let fetchUserPromise = null

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()
  const navigation = useNavigationStore()

  if (auth.token && !auth.user) {
    if (!fetchUserPromise) {
      fetchUserPromise = auth.fetchUser().finally(() => {
        fetchUserPromise = null
      })
    }
    await fetchUserPromise
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
