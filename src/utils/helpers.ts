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

const setSavedUser = (res: unknown): void => {
	localStorage.setItem('user', JSON.stringify(res.user));
	localStorage.setItem('isOnline', 'true');
	localStorage.setItem('role', res.user.roles[0].name);
	localStorage.setItem('token', res.token);

};


const redirectBasedOnRole = (role: string): void => {
	switch (role) {
		case roles.RH:
			router.push({ name: initialDashboard(role) });
			break;
		case roles.CF:
			router.push({ name: initialDashboard(role) });
			break;
		default:
			router.push({ name: initialDashboard(role) });
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
		case roles.CF:
			console.log('CF');
			return 'DashboardPM';
		case roles.DG:
			return 'DashboardPM';
		default:
			return '404';
	}
};

const returnSideBarItems = (): any => {
	const role = localStorage.getItem('role');
	switch (role) {
		case roles.DG:
			return sideBar.DGMenu;
		case roles.RH:
			return sideBar.RHMenu;
		case roles.CF:
			return sideBar.CFMenu;
		default:
			return [];
	}
};


const returnBadge = (item: string): string[] => {
	switch (item) {
		case 'CDD':
			return ['badge bg-warning', 'CDD'];
		case 'CDI':
			return ['badge bg-success', 'CDI'];
		case 'Chantier':
			return ['badge bg-info', 'Chantier'];
		case 'COMMERCIALE':
			return ['badge bg-danger', 'Commerciale'];
		case '1':
			return ['badge bg-label-success', 'Actif'];
		case '0':
			return ['badge bg-label-warning', 'Inactif'];
		case 'Conge Maladie':
			return ['badge bg-label-warning', 'Congé Maladie'];
		case 'Congé':
			return ['badge bg-label-success', 'Congé'];
		case 'pending':
			return ['badge bg-label-warning', 'En attente'];
		case 'approved':
			return ['badge bg-label-success', 'Approuvé'];
		case 'dissaproved':
			return ['badge bg-label--danger', 'Désapprouvé'];
		default:
			return ['badge bg-secondary', 'Autre'];
	}
};

function formatNumber(value: number | undefined | null): string {
	if (!value) return '-';

	const roundedValue = Math.round(value * 100) / 100;

	const formattedValue = roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
	return formattedValue;
}

function formattedDate(props: string | null): string {
	if (props === null) return 'Aucune date.';
	const date = new Date(props);
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();
	return `${day}-${month}-${year}`;
}

function formattedMonth(props: string | null): string {
	if (props === null) return 'Aucune date.';
	const date = new Date(props);
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();
	return `${month}-${year}`;
}

function formattedDateTime(props: string | null): string {
	if (props === null) return 'Aucune date.';

	// Create a Date object from the input string
	const inputDate = new Date(props);

	// Extract year, month, day, hours, and minutes from the Date object
	const year = inputDate.getFullYear();
	const month = String(inputDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
	const day = String(inputDate.getDate()).padStart(2, '0');
	const hours = String(inputDate.getHours()).padStart(2, '0');
	const minutes = String(inputDate.getMinutes()).padStart(2, '0');

	// Construct the formatted date string
	return `${day}-${month}-${year} ${hours}:${minutes}`;
}



export const helpers = {
	isActiveRoute,
	togglePassword,
	setSavedUser,
	redirectBasedOnRole,
	roles,
	initialDashboard,
	returnSideBarItems,
	returnBadge,
	formatNumber,
	formattedDate,
	formattedMonth,
	formattedDateTime
};