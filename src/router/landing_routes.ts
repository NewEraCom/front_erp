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
		path: '/demande-conge',
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
	}

];