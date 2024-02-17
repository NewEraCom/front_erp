import router from '../router';
import { sideBar } from './sidebar_items';

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
	localStorage.setItem('user', JSON.stringify(user.user));
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
			router.push({ name: initialDashboard(role)});
			break;
		case roles.CF:
			router.push({ name: initialDashboard(role)});
			break;
		default:
			router.push({ name: initialDashboard(role)});
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
			return 'DashboardRH';
			break;
		case roles.CF:
			console.log('CF');
			return 'DashboardPM';
			break;
		case roles.DG:
			return 'DashboardPM';
			break;
		default:
			return '404';
	}
};

const returnSideBarItems = (): string[] => {
	const role = localStorage.getItem('role');
	switch(role){
		case roles.DG:			
			return sideBar.DGMenu;
			break;
		case roles.RH:			
			return sideBar.RHMenu;
			break;
		case roles.CF:
			return sideBar.CFMenu;
			break;
		default:
			return [];
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
	setRole,
	returnSideBarItems
};