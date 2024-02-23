import { helpers } from '@/utils';

export const salesRoutes = [
    {
        path: '/dashboard-sales',
        name: 'DashboardSales',
        component: () => import('@/views/Sales/MainView.vue'),
        meta: {
            title: 'Dashboard',
            role: [helpers.roles.SALES]
        },
    },

];

