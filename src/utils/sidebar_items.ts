const sharedMenu = [
    {
        id: 12,
        name: 'Calendrier',
        route: '/calendar',
        icon: 'ti ti-calendar',
        path: 'Calendar'
    },
    {
        id: 13,
        name: 'Salle de réunion',
        route: '/meeting-room',
        icon: 'ti ti-calendar-time',
        path: 'MeetingRoom'
    },
    {
        id: 14,
        name: 'Coursier',
        route: '/company-courier',
        icon: 'ti ti-car',
        path: 'CompanyCourier'
    }
];

const sharedMenu2 = [
    {
        id: 9,
        name: 'Demande de congé',
        route: '/leave-request',
        icon: 'ti ti-plane-inflight',
        path: 'LeaveRequest'
    },
    {
        id: 10,
        name: 'Demande RH',
        route: '/dashboard-sales',
        icon: 'ti ti-file-export',
        path: 'DashboardSales'
    },
    {
        id: 11,
        name: 'Demande de recrutement',
        route: '/dashboard-sales',
        icon: 'ti ti-search',
        path: 'DashboardSales'
    },
];


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
    {
        id: 2,
        name: 'Projets',
        route: '/dashboard-pm',
        icon: 'ti ti-smart-home',
        path: 'DashboardPM'
    },
    {
        id: 3,
        name: 'Demande d\'achat',
        route: '/dashboard-pm',
        icon: 'ti ti-smart-home',
        path: 'DashboardPM'
    },
    {
        id: 4,
        name: 'Factures',
        route: '/dashboard-pm',
        icon: 'ti ti-smart-home',
        path: 'DashboardPM'
    },
    {
        id: 5,
        name: 'Sous-traitants',
        route: '/dashboard-pm',
        icon: 'ti ti-smart-home',
        path: 'DashboardPM'
    },
    {
        id: 6,
        name: 'Demande de caisse',
        route: '/dashboard-pm',
        icon: 'ti ti-smart-home',
        path: 'DashboardPM'
    },
    {
        id: 6,
        name: 'Demande de DSS',
        route: '/dashboard-pm',
        icon: 'ti ti-smart-home',
        path: 'DashboardPM'
    },
    ...sharedMenu2,
    ...sharedMenu
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
        route: '/soustraitant-rh',
        icon: 'ti ti-settings',
        path: 'SoustraitantRh'
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
        path: 'Contracts',
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
    ...sharedMenu
];

const SalesMenu = [
    {
        id: 1,
        name: 'Dashboard',
        route: '/dashboard-sales',
        icon: 'ti ti-smart-home',
        path: 'DashboardSales'
    },
    {
        id: 2,
        name: 'Demande d\'achat',
        route: '/purchase-order',
        icon: 'ti ti-shopping-cart',
        path: 'PurchaseOrder'
    },
    {
        id: 3,
        name: 'Demande d\'exécution',
        route: '/dashboard-sales',
        icon: 'ti ti-settings',
        path: 'DashboardSales'
    },
    {
        id: 4,
        name: 'Bons de commande',
        route: '/dashboard-sales',
        icon: 'ti ti-file-3d',
        path: 'DashboardSales'
    },
    {
        id: 5,
        name: 'Factures',
        route: '/dashboard-sales',
        icon: 'ti ti-file-invoice',
        path: 'DashboardSales'
    },
    {
        id: 6,
        name: 'Fournisseur',
        route: '/dashboard-sales',
        icon: 'ti ti-building-store',
        path: 'DashboardSales'
    },
    {
        id: 7,
        name: 'Soustraitant',
        route: '/dashboard-sales',
        icon: 'ti ti-forklift',
        path: 'DashboardSales'
    },
    {
        id: 8,
        name: 'Stock',
        route: '/dashboard-sales',
        icon: 'ti ti-stack',
        path: 'DashboardSales'
    },
    ...sharedMenu2,
    ...sharedMenu
];

const LogisticsMenu = [
    {
        id: 1,
        name: 'Dashboard',
        route: '/dashboard-sales',
        icon: 'ti ti-smart-home',
        path: 'DashboardSales'
    },
    {
        id: 2,
        name: 'Abonnements',
        icon: 'ti ti-shopping-cart',
        children: [
            {
                id: 1,
                name: 'Parc GSM',
                route: '/dashboard-sales',
                icon: 'ti ti-stack',
                path: 'DashboardSales'
            },
            {
                id: 2,
                name: 'Carte carburant',
                route: '/dashboard-sales',
                icon: 'ti ti-stack',
                path: 'DashboardSales'
            },
        ]
    },
    {
        id: 4,
        name: 'Cachets',
        route: '/dashboard-sales',
        icon: 'ti ti-file-3d',
        path: 'DashboardSales'
    },
    {
        id: 5,
        name: 'Caisses',
        route: '/dashboard-sales',
        icon: 'ti ti-file-invoice',
        path: 'DashboardSales'
    },
    {
        id: 6,
        name: 'Véhicules',
        route: '/dashboard-sales',
        icon: 'ti ti-users-group',
        path: 'DashboardSales'
    },
    {
        id: 7,
        name: 'Fournisseurs',
        route: '/dashboard-sales',
        icon: 'ti ti-building-store',
        path: 'DashboardSales'
    },
    {
        id: 8,
        name: 'Sous-traitants',
        route: '/dashboard-sales',
        icon: 'ti ti-forklift',
        path: 'DashboardSales'
    },
    {
        id: 9,
        name: 'Stock',
        icon: 'ti ti-stack',
        children: [
            {
                id: 1,
                name: 'Stock',
                route: '/dashboard-sales',
                icon: 'ti ti-stack',
                path: 'DashboardSales'
            },
            {
                id: 2,
                name: 'Stock Informatique',
                route: '/dashboard-sales',
                icon: 'ti ti-stack',
                path: 'DashboardSales'
            },
            {
                id: 3,
                name: 'Fournitures',
                route: '/dashboard-sales',
                icon: 'ti ti-stack',
                path: 'DashboardSales'
            },
        ]
    },
    {
        id: 8,
        name: 'Transports',
        route: '/dashboard-sales',
        icon: 'ti ti-forklift',
        path: 'DashboardSales'
    },
    {
        id: 8,
        name: 'Louer',
        route: '/dashboard-sales',
        icon: 'ti ti-forklift',
        path: 'DashboardSales'
    },
    ...sharedMenu2,
    ...sharedMenu
];

const SupportMenu = [
    {
        id: 1,
        name: 'Dashboard',
        route: '/dashboard-admin',
        icon: 'ti ti-smart-home',
        path: 'DashboardAdmin'
    },
    {
        id: 2,
        name: 'Employés',
        icon: 'ti ti-users',
        children: [
            {
                id: 1,
                name: 'Liste des employés',
                route: '/employees',
                path: 'Employees'
            },
            {
                id: 2,
                name: 'Employés sous-traitants',
                route: '/soustraitant-rh',
                path: 'SoustraitantRh'
            },
            {
                id: 3,
                name: 'Pointage',
                route: '/pointage',
                path: 'Pointage'
            },
            {
                id: 4,
                name: 'Congés',
                route: '/leaves',
                path: 'Leaves'
            },
            {
                id: 5,
                name: 'Avance sur salaire',
                route: '/salary-advance',
                path: 'SalaryAdvance'
            },
            {
                id: 6,
                name: 'Demande RH',
                route: '/demandes-rh',
                path: 'DemandesRH'
            },
            {
                id: 7,
                name: 'Recrutements',
                route: '/recruitments',
                path: 'Recruitments'
            },

        ]
    },
    {
        id: 3,
        name: 'Paie',
        route: '/paie',
        icon: 'ti ti-file-invoice',
        path: 'Paie'
    },
    {
        id: 4,
        name: 'Caisses',
        route: '/dashboard-sales',
        icon: 'ti ti-businessplan',
        path: 'DashboardSales'
    },
    {
        id: 5,
        name: 'Projet',
        route: '/dashboard-sales',
        icon: 'ti ti-package',
        path: 'DashboardSales'
    },
    {
        id: 6,
        name: 'Clients',
        route: '/dashboard-sales',
        icon: 'ti ti-affiliate',
        path: 'DashboardSales'
    },
    {
        id: 7,
        name: 'Achats',
        icon: 'ti ti-shopping-cart',
        children: [
            {
                id: 1,
                name: 'Demandes d\'achats',
                route: '/dashboard-sales',
                path: 'DashboardSales'
            },
            {
                id: 2,
                name: 'Demandes d\'exécution',
                route: '/dashboard-sales',
                path: 'DashboardSales'
            },
            {
                id: 3,
                name: 'Bons de commande',
                route: '/dashboard-sales',
                path: 'DashboardSales'
            },
            {
                id: 4,
                name: 'Factures',
                route: '/dashboard-sales',
                path: 'DashboardSales'
            },
            {
                id: 5,
                name: 'Suivie des achats',
                route: '/dashboard-sales',
                path: 'DashboardSales'
            },
        ]
    },
    {
        id: 8,
        name: 'Finance',
        icon: 'ti ti-report-money',
        children: [
            {
                id: 1,
                name: 'Facture Client',
                route: '/dashboard-sales',
                path: 'DashboardSales'
            },
            {
                id: 2,
                name: 'Cautions',
                route: '/dashboard-sales',
                path: 'DashboardSales'
            },
        ]
    },
    {
        id: 9,
        name: 'Stagiaires',
        route: '/interns',
        icon: 'ti ti-users-group',
        path: 'Interns'
    },
    {
        id: 10,
        name: 'Fournisseurs',
        route: '/dashboard-sales',
        icon: 'ti ti-building-store',
        path: 'DashboardSales'
    },
    {
        id: 11,
        name: 'Sous-traitants',
        route: '/dashboard-sales',
        icon: 'ti ti-forklift',
        path: 'DashboardSales'
    },
    {
        id: 12,
        name: 'Stock',
        icon: 'ti ti-stack',
        children: [
            {
                id: 1,
                name: 'Stock',
                route: '/dashboard-sales',
                icon: 'ti ti-stack',
                path: 'DashboardSales'
            },
            {
                id: 2,
                name: 'Stock Informatique',
                route: '/dashboard-sales',
                icon: 'ti ti-stack',
                path: 'DashboardSales'
            },
            {
                id: 3,
                name: 'Fournitures',
                route: '/dashboard-sales',
                icon: 'ti ti-stack',
                path: 'DashboardSales'
            },
        ]
    },
    {
        id: 13,
        name: 'Suivie',
        icon: 'ti ti-chart-bar',
        children: [
            {
                id: 1,
                name: 'Louer',
                route: '/dashboard-sales',
                icon: 'ti ti-forklift',
                path: 'DashboardSales'
            },
            {
                id: 2,
                name: 'Cachets',
                route: '/dashboard-sales',
                icon: 'ti ti-file-3d',
                path: 'DashboardSales'
            },
            {
                id: 3,
                name: 'Véhicules',
                route: '/dashboard-sales',
                icon: 'ti ti-users-group',
                path: 'DashboardSales'
            },
        ]
    },
    {
        id: 14,
        name: 'Abonnements',
        icon: 'ti ti-layers-subtract',
        children: [
            {
                id: 1,
                name: 'Parc GSM',
                route: '/dashboard-sales',
                icon: 'ti ti-stack',
                path: 'DashboardSales'
            },
            {
                id: 2,
                name: 'Carte carburant',
                route: '/dashboard-sales',
                icon: 'ti ti-stack',
                path: 'DashboardSales'
            },
        ]
    },
    ...sharedMenu
];

export const sideBar = {
    DGMenu,
    CFMenu,
    RHMenu,
    SalesMenu,
    LogisticsMenu,
    SupportMenu
};