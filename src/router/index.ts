import { createRouter, createWebHistory } from 'vue-router';
import { landingRoutes } from './landing_routes';
import { authRoutes } from './auth_routes';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		...landingRoutes,
		...authRoutes
	]
});

router.beforeEach((to, from, next) => {	
	document.title = 'NewEraERP - '+to.meta.title || 'NewEraERP';
	next();
});

export default router;
