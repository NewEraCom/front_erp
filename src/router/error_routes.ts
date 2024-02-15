export const errorRoutes = [
	{
		path: '/404',
		name: '404',
		component: () => import('@/modules/error/404View.vue'),
		meta: {
			title: '404',
			requiresAuth: false
		},
	},
];