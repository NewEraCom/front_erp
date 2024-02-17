export const errorRoutes = [
	{
		path: '/404',
		name: '404',
		component: () => import('@/views/error/404View.vue'),
		meta: {
			title: '404',
			requiresAuth: false
		},
	},
];