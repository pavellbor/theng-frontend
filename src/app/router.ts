import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/widgets/MainLayout.vue'
import DashboardPage from '@/pages/DashboardPage.vue'
import { useAuthStore } from '@/entities/auth'
import HomePage from '@/pages/HomePage.vue'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    requiresStudyLevel?: boolean
  }
}

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          component: HomePage,
        },
        {
          path: '/dashboard',
          component: DashboardPage,
          meta: {
            requiresStudyLevel: true,
            requiresAuth: true,
          },
        },
        {
          path: '/assessment',
          name: 'assessment',
          meta: {
            requiresAuth: true,
          },
          component: () => import('@/pages/AssessmentPage.vue'),
        },
        {
          path: '/exercises',
          name: 'exercises',
          meta: {
            requiresAuth: true,
          },
          component: () => import('@/pages/ExercisesPage.vue'),
        },
      ],
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
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next({ path: '/login' })
  } else if (to.meta.requiresStudyLevel && !authStore.user?.studyLevel) {
    next({ path: '/assessment' })
  } else {
    next()
  }
})
