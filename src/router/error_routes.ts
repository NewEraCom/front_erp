export const errorRoutes = [
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: () => import('@/views/errors/UnauthorizedView.vue'),
    meta: {
      title: 'Unauthorized'
    }
  }
]
