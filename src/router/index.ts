import { createRouter, createWebHistory } from 'vue-router';

import { helpers } from '@/utils';
import { landingRoutes, authRoutes, hrRoutes, projectManagerRoutes, sharedRoutes, financeRoutes, salesRoutes, logisticsRoutes } from './export';

const router = createRouter({
    history: createWebHistory('/erp'),
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
    // Set document title based on the route's meta title or use a default title.
    document.title = to.meta.title ? `NewEraERP - ${to.meta.title}` : 'NewEraERP';

    // Check if the user is considered "online" (logged in).
    const isOnline = localStorage.getItem('isOnline') === 'true';
    // Retrieve the user's role from localStorage.
    const role = localStorage.getItem('role');

    // Check if the current route does not require authentication and the user is online.
    if (to.matched.some(record => record.meta.requiresAuth === false) && isOnline) {
        // Redirect to the initial dashboard based on the user's role.
        next({ name: helpers.initialDashboard(role) });
    } else if (to.matched.some(record => record.meta.requiresAuth) && !isOnline) {
        // If the route requires authentication and the user is not online, redirect to the login page.
        next({ name: 'Login' });
    } else {
        // For all other cases, proceed as normal. If no matched routes, redirect to the initial dashboard.
        if (to.matched.length === 0) {
            next({ name: helpers.initialDashboard(role) });
        } else {
            next();
        }
    }
});



export default router;
