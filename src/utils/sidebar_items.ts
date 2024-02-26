
const DGMenu = [
    {
        id: 1,
        name: 'Dashboard',
        route: '/dashboard',
        icon: 'ti ti-smart-home',
        path: 'DashboardDG'
    },
];

const CFMenu = [
    {
        id: 1,
        name: 'Dashboard',
        route: '/dashboard-pm',
        icon: 'ti ti-smart-home',
        path: 'DashboardPM'
    },
];

const RHMenu = [
    {
        id: 1,
        name: 'Dashboard',
        route: '/dashboard-rh',
        icon: 'ti ti-smart-home',
        path: 'DashboardRH'
    },
    {
        id: 2,
        name: 'Employés',
        route: '/employees',
        icon: 'ti ti-users',
        path: 'Employees'
    },
    {
        id: 3,
        name: 'Pointage',
        route: '/pointage',
        icon: 'ti ti-clock-up',
        path: 'Pointage'
    },
    {
        id: 4,
        name: 'Stagiaires',
        route: '/interns',
        icon: 'ti ti-users-group',
        path: 'Interns'
    },
    {
        id: 5,
        name: 'Soustraitant',
        route: '/soustraitant',
        icon: 'ti ti-settings',
        path: 'Soustraitant'
    },
    {
        id: 6,
        name: 'Congés',
        route: '/leaves',
        icon: 'ti ti-plane-inflight',
        path: 'Leaves'
    },
    {
        id: 7,
        name: 'Documents',
        route: '/documents',
        icon: 'ti ti-files',
        path: 'DocumentsRH'
    },
    {
        id: 8,
        name: 'Recrutements',
        route: '/recruitments',
        icon: 'ti ti-search',
        path: 'Recruitments'
    },
    {
        id: 9,
        name: 'Demandes RH',
        route: '/demandes-rh',
        icon: 'ti ti-file-export',
        path: 'DemandesRH'
    },
    {
        id: 10,
        name: 'Contrats',
        route: '/contracts',
        icon: 'ti ti-file-stack',
        path: 'Contracts'
    },
    {
        id: 11,
        name: 'Paie',
        route: '/paie',
        icon: 'ti ti-businessplan',
        path: 'Paie'
    },
    {
        id: 12,
        name: 'Avance sur salaire',
        route: '/salary-advance',
        icon: 'ti ti-building-bank',
        path: 'SalaryAdvance'
    },
    {
        id: 13,
        name: 'Calendrier',
        route: '/calendar',
        icon: 'ti ti-calendar',
        path: 'Calendar'
    },
    {
        id: 14,
        name: 'Salle de réunion',
        route: '/meeting-room',
        icon: 'ti ti-calendar-time',
        path: 'MeetingRoom'
    },
    {
        id: 15,
        name: 'Coursier',
        route: '/company-courier',
        icon: 'ti ti-car',
        path: 'CompanyCourier'
    }
];
const FinanceMenu = [
    {
        id: 1,
        name: 'Facture',
        route: '/fn/facture',
        icon: 'ti ti-files',
        path: 'FnFacture'
    },
    {
        id: 2,
        name: 'Cheque',
        route: '/fn/cheque',
        icon: 'ti ti-file-dollar',
        path: 'FnCheque'
    },
    {
        id: 3,
        name: 'Caution',
        route: '/fn/Caution',
        icon: 'ti ti-coins',
        path: 'FnCaution'
    }
];

export const sideBar = { DGMenu, CFMenu, RHMenu ,FinanceMenu};