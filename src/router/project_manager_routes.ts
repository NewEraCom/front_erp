import { helpers } from '@/utils';

export const projectManagerRoutes = [
    {
        path: '/dashboard-pm',
        name: 'DashboardPM',
        component: () => import('@/views/ProjectManagement/DirecteurOperation.vue'),
        meta: {
            title: 'Dashboard',
            role : [helpers.roles.CF]
        },
    },
];