import router from '@/router';
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

const setSavedUser = (res: any): void => {
	localStorage.setItem('user', JSON.stringify(res.user));
	localStorage.setItem('isOnline', 'true');
	localStorage.setItem('role', res.user.roles[0].name);
	localStorage.setItem('token', res.token);

};


const redirectBasedOnRole = (role: string): void => {
	router.push({ name: initialDashboard(role) });
};

const roles = {
	DEV: 'Dev',
	SALES: 'Responsable d\'achats',
	BDM: 'Business development manager',
	CF: 'Chef de projet',
	LOGISTICS: 'Responsable logistique',
	RH: 'Responsable ressources humaines',
	DG: 'Directeur general',
	DS: 'Directeur support',
	DO: 'Directeur des opérations',
	RAP: 'Responsable d\'avant projet',
	MAGASINIER: 'Magasinier',
	FINANCE: 'Responsable financier',
};


const initialDashboard = (role: string): string => {
	switch (role) {
		case roles.RH:
			return 'DashboardRH';
		case roles.SALES:
			return 'DashboardSales';
		case roles.LOGISTICS:
			return 'DashboardLogistics';
		case roles.CF:
			console.log('CF');
			return 'DashboardPM';
		case roles.DS:
		case roles.DG:
			return 'DashboardAdmin';
		case roles.FINANCE:
			return 'FnFacture';
		case roles.DO:
			return 'DashboardPM';
		case roles.BDM:
		case roles.RAP:
			return 'DashboardBDM';
		default:
			return '404';
	}
};

const returnSideBarItems = (): any => {
	const role = localStorage.getItem('role');
	switch (role) {
		case roles.DG:
			return sideBar.SupportMenu;
		case roles.SALES:
			return sideBar.SalesMenu;
		case roles.LOGISTICS:
			return sideBar.LogisticsMenu;
		case roles.RH:
			return sideBar.RHMenu;
		case roles.CF:
			return sideBar.CFMenu;
		case roles.FINANCE:
			return sideBar.FinanceMenu;
		case roles.DS:
			return sideBar.SupportMenu;
		case roles.DO:
			return sideBar.DOMenu;
		case roles.BDM:
		case roles.RAP:
			return sideBar.BDMenu;
		default:
			return [];
	}
};


const returnBadge = (item: any): any[] => {
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
		case 'Maladie':
			return ['badge bg-warning', 'Congé Maladie'];
		case 'Congé':
			return ['badge bg-success', 'Congé'];
		case 'pending':
			return ['badge bg-label-warning', 'En attente'];
		case 'on going':
			return ['badge bg-label-info', 'En cours'];
		case 'on road':
			return ['badge bg-label-primary', 'En route'];
		case 'done':
			return ['badge bg-label-success', 'Traitée'];
		case 'need validation':
			return ['badge bg-label-danger', 'Besoin de validation'];
		case 'delivered':
			return ['badge bg-label-success', 'Livré'];
		case 'active':
			return ['badge bg-label-success', 'Active'];
		case 'in stock':
			return ['badge bg-label-warning', 'En Stock'];
		case 'approved':
			return ['badge bg-label-success', 'Approuvé'];
		case 'disapproved':
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
		case 'non encaissé':
			return ['badge bg-label-warning', 'Non Encaissé'];
		case 'encaissé':
			return ['badge bg-label-success', 'Encaissé'];
		case 'entree':
			return ['badge bg-success', 'Entree'];
		case 'sortie':
			return ['badge bg-warning', 'Sortie'];
		case 'simple':
			return ['badge bg-info', 'Simple'];
		case 'special':
			return ['badge bg-info', 'Special'];
		case 'En attente':
			return [' badge bg-label-warning', 'En attente', 'ti-clock'];
		case 'En soumission':
			return ['badge bg-label-info', 'En soumission', 'ti-clock'];
		case 'Perdu':
			return ['badge bg-label-danger', 'Perdu', 'ti-thumb-down'];
		case 'Gagné':
			return ['badge bg-label-success', 'Gagné', 'ti-circle-check'];
		case 'Non Validé':
			return ['badge bg-label-dark', 'Non Validé', 'ti-circle-x'];
		case 'valide':
			return ['badge bg-label-success', 'Validé', 'ti-circle-x'];
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

import SGM from '@/assets/img/brands/sgm.png';
import CIH from '@/assets/img/brands/cih.jpeg';
import Other from '@/assets/img/brands/other.png';
import Attijariwafa from '@/assets/img/brands/Attijariwafa.png';
import BMCI from '@/assets/img/brands/BMCI.png';
import BMCE from '@/assets/img/brands/BMCE.png';
import BANQUE_POPULAIRE from '@/assets/img/brands/Banque-populaire.png';
import AL_BARID_BANK from '@/assets/img/brands/AL-BARID-BANK.jpeg';
import CREDIT_AGRICOLE from '@/assets/img/brands/Credit Agricole.jpeg';
import CREDIT_DU_MAROC from '@/assets/img/brands/Credit du Maroc.png';
import CFG_BANK from '@/assets/img/brands/CFG BANK.svg';
import AL_AKHDAR_BANK from '@/assets/img/brands/AL-AKHDAR-BANK.png';
import UMNIA_BANK from '@/assets/img/brands/UMNIA_BANK.png';
import NoLogo from '@/assets/img/brands/NoLogo.png';

function bankName(bank: string) {
	switch (bank) {
		case 'BMCE BANK':
			return [BMCE, 'BMCE'];
		case 'CIH':
			return [CIH, 'CIH Bank'];
		case 'SOCIETE GENERALE':
			return [SGM, 'Soceite Generale'];
		case 'BMCI':
			return [BMCI, 'BMCI Bank'];
		case 'ATTIJARIWAFA BANK':
			return [Attijariwafa, 'Attijariwafa Bank'];
		case 'BANQUE POPULAIRE':
			return [BANQUE_POPULAIRE, 'Banque Populaire'];
		case 'Crédit du Maroc':
			return [CREDIT_DU_MAROC, 'Crédit du Maroc'];
		case 'Crédit Agricole du Maroc':
			return [CREDIT_AGRICOLE, 'Crédit Agricole du Maroc'];
		case 'AL BARID BANK':
			return [AL_BARID_BANK, 'Al Barid Bank'];
		case 'CFG BANK':
			return [CFG_BANK, 'CFG Bank'];
		case 'AL AKHDAR BANK':
			return [AL_AKHDAR_BANK, 'Al Akhdar Bank'];
		case 'Umnia Bank':
			return [UMNIA_BANK, 'Umnia Bank'];
		case 'Autre':
			return [Other, bank];
		default:
			return [NoLogo, bank];
	}
}


function returnStockAlert(stock: number, alert: number) {
	if (stock === 0) {
		return ['fw-bold badge bg-danger', 'Rupture de stock'];
	} else if (stock <= alert) {
		return ['fw-bold badge bg-warning', 'Alerte de stock'];
	}
	return ['fw-bold badge bg-success', 'En stock'];
}

function setDeleteId(id: string) {
	$('#deleteId').val(id);
}
function baseUrl() {
	return env.VITE_UPLOADS_URL;
}

function init() {
	// console.log('init');
	return '';

}
function limitedClientName(props) {
	if (props === null) return '-';
	if (props.length > 35) {
		return props.substring(0, 35) + '...';
	}
	return props;
}
function dateDiff(date) {
	const today = new Date();

	const otherDate = new Date(date);
	const diffTime = Math.abs(Number(today) - Number(otherDate));
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	let result;

	if (otherDate < today) {
		result = ['bg-label-danger', 'Offre expirée', '1', 'border-danger'];
	} else {
		switch (true) {
			case diffDays === 0:
				result = ['bg-label-warning', 'Aujourd\'hui', '1', diffDays, 'border-warning'];
				break;
			case diffDays >= 1 && diffDays <= 7:
				result = ['bg-label-success', 'Cette semaine', '1', diffDays, 'border-success'];
				break;
			default:
				result = ['bg-label-danger', 'Plus de 30 jours', '0', diffDays, 'border-danger'];
		}
	}
	return result;
}
function formattedDate(props) {
	if (props === null) return 'Aucune date.';
	const date = new Date(props);
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();
	return `${day}-${month}-${year}`;
}
function calculatePercentage(current, total) {
	if (typeof current !== 'number' || typeof total !== 'number' || total === 0) {
		return 0; // Handle invalid input
	}

	const widthPercentage = (current / total) * 100;
	return {
		width: `${widthPercentage}%`
	};
}
function formatNumber(value) {
	if (!value) return '-';

	// Round the value to two decimal places
	const roundedValue = Math.round(value * 100) / 100;

	// Convert to string and format
	const formattedValue = roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
	return formattedValue;
}
function formattedDateTime(props) {
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
function formattedText(paragraph) {
	return paragraph.replace(/\n/g, '<br>');
}
export function dateRegex(date) {
	const selectedDateTime = new Date(date);
	const currentDateTime = new Date();
	let result;

	if (selectedDateTime <= currentDateTime) {
		result = false;
	} else {
		result = true;
	}
	return result;
}

export function numberToTextMAD(number) {
	const units = ['', 'mille', 'million', 'milliard', 'billion'];
	const baseNumbers = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
	const tens = ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-', 'quatre-vingt', 'quatre-vingt-'];

	const toFrenchWords = (num, unitIndex = 0) => {
		if (num === 0) {
			return '';
		}

		let result = '';
		const thousands = Math.floor(num / 1000);
		const remainder = num % 1000;

		if (thousands > 0) {
			result += toFrenchWords(thousands, unitIndex + 1) + ' ';
		}

		if (remainder > 0) {
			const hundreds = Math.floor(remainder / 100);
			const tensAndOnes = remainder % 100;

			if (hundreds > 0) {
				result += baseNumbers[hundreds] + ' cent ';
			}

			if (tensAndOnes > 0) {
				if (tensAndOnes < 20) {
					result += baseNumbers[tensAndOnes];
				} else {
					const tensDigit = Math.floor(tensAndOnes / 10);
					const onesDigit = tensAndOnes % 10;

					if (tensDigit === 2 && onesDigit === 0) {
						result += 'vingt';
					} else {
						result += tens[tensDigit];
						if (tensDigit > 1 && onesDigit > 0) {
							result += `-${baseNumbers[onesDigit]}`;
						} else {
							result += baseNumbers[onesDigit];
						}
					}
				}
			}
		}

		result += ' ' + units[unitIndex];

		return result.trim();
	};

	const [integerPart, decimalPart] = number.toFixed(2).split('.').map(part => parseInt(part, 10) || 0);

	if (isNaN(integerPart) || isNaN(decimalPart)) {
		return 'Invalid input';
	}

	let result = toFrenchWords(integerPart) + ' DIRHAMS';

	if (integerPart > 1) {
		result += ' TTC';
	} else {
		result += ' HT';
	}

	if (decimalPart > 0) {
		result += ` et ${toFrenchWords(decimalPart)} centimes`;
	}

	return capitalizeFirst(result);
}

const capitalizeFirst = (value: string) => {
	if (!value) return '';
	value = value.toString();
	return value.charAt(0).toUpperCase() + value.slice(1);
};

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
	baseUrl,
	bankName,
	init,
	returnStockAlert,
	limitedClientName,
	dateDiff,
	formattedDate,
	calculatePercentage,
	formatNumber,
	formattedDateTime,
	formattedText,
	dateRegex,
	numberToTextMAD
};