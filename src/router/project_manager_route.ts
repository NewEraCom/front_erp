export const projectManagerRoutes = [
    {
        path: '/dashboard',
        name: 'DashboardPM',
        component: () => import('@/modules/ProjectManagement/MainView.vue'),
        meta: {
            title: 'Dashboard',
            requiresAuth: true
        },
    },
];