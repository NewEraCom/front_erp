import router from '../router';
import { sideBar } from './sidebar_items';
import { env } from './env';

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
		case 'done':
			return ['badge bg-label-success', 'Traitée'];
		case 'delivered':
			return ['badge bg-label-info', 'Livré'];
		case 'approved':
			return ['badge bg-label-success', 'Approuvé'];
		case 'dissaproved':
			return ['badge bg-label-danger', 'Désapprouvé'];
		case 'closed':
			return ['badge bg-label-success', 'Fermé'];
		case 'open':
			return ['badge bg-label-warning', 'Ouvert'];
		case 'paye':
			return ['badge bg-label-success', 'Paye'];
		case 'annule':
			return ['badge bg-label-danger', 'annule'];
		case 'en attente':
			return ['badge bg-label-warning', 'En Attente'];
		default:
			return ['badge bg-secondary', 'Autre'];
	}
};


function calculateDifference(item: any, workingHours: number) {

	// Parse the times for clock in/out and break start/end
	const [startHour, startMinute] = item.clock_in.split(':').map(Number);
	const [endHour, endMinute] = item.clock_out.split(':').map(Number);
	const [breakStartHour, breakStartMinute] = item.break_start.split(':').map(Number);
	const [breakEndHour, breakEndMinute] = item.break_end.split(':').map(Number);

	// Calculate total shift and break durations in milliseconds
	const totalShiftDuration = (endHour - startHour) * 60 * 60 * 1000 + (endMinute - startMinute) * 60 * 1000;
	const totalBreakDuration = (breakEndHour - breakStartHour) * 60 * 60 * 1000 + (breakEndMinute - breakStartMinute) * 60 * 1000;

	// Calculate working hours by subtracting break duration from shift duration
	const workingDuration = totalShiftDuration - totalBreakDuration;

	const hours = Math.floor(workingDuration / (60 * 60 * 1000));
	const minutes = Math.floor((workingDuration % (60 * 60 * 1000)) / (60 * 1000));

	if (hours === workingHours && minutes === 0) {
		return [`${hours}h ${minutes}m`, workingHours, 'badge bg-label-success'];
	} else if (hours < workingHours) {
		return [`${hours}h ${minutes}m`, workingHours, 'badge bg-label-danger'];
	} else if (hours >= workingHours) {
		if (minutes > 0) {
			return [`${hours}h ${minutes}m`, workingHours, 'badge bg-label-info'];
		} else {
			return [`${hours}h ${minutes}m`, workingHours, 'badge bg-label-success'];
		}
	}
}


function setDeleteId(id: string) {
	$('#deleteId').val(id);
}
 function baseUrl() {
    return env.VITE_UPLOADS_URL;
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
	calculateDifference,
	setDeleteId,
	baseUrl
};