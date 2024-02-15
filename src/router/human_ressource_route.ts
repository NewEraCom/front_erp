export const hrRoutes = [
    {
        path: '/dashboard',
        name: 'DashboardRH',
        component: () => import('@/modules/HumanRessources/MainView.vue'),
        meta: {
            title: 'Dashboard',
            requiresAuth: true,
        },
    },
];