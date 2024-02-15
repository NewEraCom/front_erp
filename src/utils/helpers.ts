import router from '../router';

const isActiveRoute = (to: string, path: string): string | undefined => {
	if (path === to) {
		return 'active';
	}
};

const togglePassword = (value: string[]): string[] => {
	return value[0] === 'ti-eye'
		? ['ti-eye-off', 'text']
		: ['ti-eye', 'password'];
};

const setSavedUser = (user: unknown): void => {
	localStorage.setItem('user', JSON.stringify(user));
};

const setUserOnline = (): void => {
	localStorage.setItem('isOnline', 'true');
};

const setRole = (role: string): void => {
	localStorage.setItem('role', role);
};

const redirectBasedOnRole = (role: string): void => {
	setRole(role);
	switch (role) {
		case roles.RH:
			return router.push({ name: initialDashboard(role)});
			break;
		case roles.CF:
			return router.push({ name: initialDashboard(role)});
			break;
		default:
			return router.push({ name: initialDashboard(role)});
	}
};

const roles = {
	DEV: 'Dev',
	SALES: 'Responsable d\'achats',
	BDM: 'Business development manager',
	CF: 'Chef de projet',
	LOGISTICS: 'Responsable logistique',
	RH: 'Responsable ressources humaines',
	DG: 'Directeur general',
	DS: 'Directrice Support',
	RAP: 'Responsable d\'avant projet',
	MAGASINIER: 'Magasinier'
};


const initialDashboard = (role: string): string => {
	switch (role) {
		case roles.RH:
			console.log('RH');
			return 'DashboardRH';
			break;
		case roles.CF:
			console.log('CF');
			return 'DashboardPM';
			break;
		default:
			return '404';
	}
};

export const helpers = {
	isActiveRoute,
	togglePassword,
	setSavedUser,
	redirectBasedOnRole,
	roles,
	initialDashboard,
	setUserOnline,
	setRole
};