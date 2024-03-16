export const landingRoutes = [
	{
		path: '/',
		name: 'home',
		component: () => import('@/views/Landing/HomeView.vue'),
		meta: {
			title: 'Accueil',
			requiresAuth: false
		},
	},
	{
		path: '/conge-public',
		name: 'LeaveRequest',
		component: () => import('@/views/Landing/LeaveRequestView.vue'),
		meta: {
			title: 'Demande de congé',
			requiresAuth: false
		},
	},
	{
		path: '/demande-document',
		name: 'DocumentRequest',
		component: () => import('@/views/Landing/DocumentRequestView.vue'),
		meta: {
			title: 'Demande de document administratif',
			requiresAuth: false
		},
	},
	{
		path: '/conge',
		name: 'Leave',
		component: () => import('@/views/Landing/LeaveRequestView.vue'),
		meta: {
			title: 'Congé',
			requiresAuth: false
		},
	},
	{
		path: '/404',
		name: '404',
		component: () => import('@/views/Landing/404View.vue'),
		meta: {
			title: '404',
			requiresAuth: false
		},
	}

];