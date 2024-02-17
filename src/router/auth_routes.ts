export const authRoutes = [
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/Authentication/LoginView.vue'),
		meta: {
			title: 'Se connecter',
			requiresAuth: false
		},
	},
	{
		path: '/forgot-password',
		name: 'ForgotPassword',
		component: () => import('@/views/Authentication/ForgotPasswordView.vue'),
		meta: {
			title: 'Mot de passe oublié',
			requiresAuth: false
		},
	},
	{
		path: '/recover-account',
		name: 'RecoverAccount',
		component: () => import('@/views/Authentication/RecoverAccountView.vue'),
		meta: {
			title: 'Récupérer le compte',
			requiresAuth: false
		},
	},

];