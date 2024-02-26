import { createRouter, createWebHistory } from 'vue-router';

import { helpers } from '@/utils';
import { landingRoutes, authRoutes, hrRoutes, projectManagerRoutes, sharedRoutes, financeRoutes, salesRoutes, logisticsRoutes } from './export';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...landingRoutes,
        ...authRoutes,
        {
            path: '/layouts',
            name: 'layouts',
            component: () => import('@/views/LayoutView.vue'),
            meta: {
                requiresAuth: true
            },
            children: [
                ...sharedRoutes,
                ...hrRoutes,
                ...projectManagerRoutes,
                ...financeRoutes,
                ...salesRoutes,
                ...logisticsRoutes,
            ]
        },
    ]
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title ? `NewEraERP - ${to.meta.title}` : 'NewEraERP';

    const isOnline = localStorage.getItem('isOnline') === 'true';
    const role = localStorage.getItem('role');

    if (to.matched.some(record => record.meta.requiresAuth === false) && isOnline) {
        next({ name: helpers.initialDashboard(role) });
    } else if (to.matched.some(record => record.meta.requiresAuth) && !isOnline) {
        next({ name: 'Login' });
    } else {
        if (to.matched.length === 0) {
            next({ name: helpers.initialDashboard(role) });
        }
        next();
    }
});


export default router;
