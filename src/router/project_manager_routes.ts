import { helpers } from '@/utils';

export const projectManagerRoutes = [
    {
        path: '/dashboard-pm',
        name: 'DashboardPM',
        component: () => import('@/views/ProjectManagement/MainView.vue'),
        meta: {
            title: 'Dashboard',
            role : [helpers.roles.PM]
        },
    },
];