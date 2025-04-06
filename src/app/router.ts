import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/widgets/MainLayout.vue'
import HomePage from '@/pages/HomePage.vue'
import { useAuthStore } from '@/entities/auth'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    requiresCefrLevel?: boolean
  }
}

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: '',
          component: HomePage,
          meta: {
            requiresCefrLevel: true,
          },
        },
        {
          path: '/assessment',
          name: 'assessment',
          component: () => import('@/pages/AssessmentPage.vue'),
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
  } else if (to.meta.requiresCefrLevel && !authStore.user?.cefrLevel) {
    next({ path: '/assessment' })
  } else {
    next()
  }
})
