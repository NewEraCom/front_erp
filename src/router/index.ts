import { createRouter, createWebHistory } from 'vue-router'
import { portalRoutes, errorRoutes } from './export'
import { useAuthStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('@/views/auth/LoginView.vue')
    },
    {
      path: '/forget-password',
      name: 'ForgetPassword',
      component: () => import('@/views/auth/ForgetPasswordView.vue')
    },
    {
      path: '/layouts',
      name: 'layouts',
      component: () => import('@/views/LayoutView.vue'),
      meta: {
        requiresAuth: true
      },
      children: [...portalRoutes]
    },
    {
      path: '/faq',
      name: 'FAQ',
      component: () => import('@/views/LayoutView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    ...errorRoutes
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `NewEraERP - ${to.meta.title}` : 'NewEraERP'
  const user = useAuthStore().getUser
  const userRole = useAuthStore().getRole

  next()
})

export default router
