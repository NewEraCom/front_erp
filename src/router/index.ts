import { createRouter, createWebHistory } from 'vue-router';

import { helpers } from '@/utils';
import { landingRoutes } from './landing_routes';
import { authRoutes } from './auth_routes';
import { hrRoutes } from './human_ressource_route';
import { projectManagerRoutes } from './project_manager_route';
import { errorRoutes } from './error_routes';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		...landingRoutes,
		...authRoutes,
		...hrRoutes,
		...projectManagerRoutes,
		...errorRoutes
	]
});

router.beforeEach((to, from, next) => {
	document.title = to.meta.title ? `NewEraERP - ${to.meta.title}` : 'NewEraERP';
	const isOnline = localStorage.getItem('isOnline') === 'true';
	const role = localStorage.getItem('role');

	if (to.matched.some(record => record.meta.requiresAuth === false) && isOnline) {
		next({ name: helpers.initialDashboard(role) });
	} else {
		next();
	}
});

export default router;
