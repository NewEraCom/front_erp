import { helpers } from '@/utils';

export const logisticsRoutes = [
    {
        path: '/dashboard-logistics',
        name: 'DashboardLogistics',
        component: () => import('@/views/Logistics/MainView.vue'),
        meta: {
            title: 'Dashboard',
            role: [helpers.roles.LOGISTICS]
        },
    },

];

