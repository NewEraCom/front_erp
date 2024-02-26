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
        route: '/rh-request',
        icon: 'ti ti-file-export',
        path: 'RhRequest'
    },
    {
        id: 11,
        name: 'Demande de recrutement',
        route: '/recruitment-request',
        icon: 'ti ti-search',
        path: 'RecruitmentRequest'
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
    /* {
        id: 7,
        name: 'Documents',
        route: '/documents',
        icon: 'ti ti-files',
        path: 'DocumentsRH'
    }, */
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
    /*   {
          id: 10,
          name: 'Contrats',
          route: '/contracts',
          icon: 'ti ti-file-stack',
          path: 'Contracts',
      }, */
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
        route: '/execution-request',
        icon: 'ti ti-settings',
        path: 'ExecutionRequest'
    },
    {
        id: 4,
        name: 'Bons de commande',
        route: '/bon-de-commande',
        icon: 'ti ti-file-3d',
        path: 'BonDeCommande'
    },
    {
        id: 5,
        name: 'Factures',
        route: '/invoices-sales',
        icon: 'ti ti-file-invoice',
        path: 'InvoicesSales'
    },
    {
        id: 6,
        name: 'Fournisseur',
        route: '/fournisseur',
        icon: 'ti ti-building-store',
        path: 'Fournisseur'
    },
    {
        id: 7,
        name: 'Sous-traitant',
        route: '/soustraitant',
        icon: 'ti ti-forklift',
        path: 'Soustraitant'
    },
    {
        id: 8,
        name: 'Suive des stocks',
        icon: 'ti ti-stack',
        children: [
            {
                id: 1,
                name: 'Stock',
                route: '/stock',
                path: 'Stock'
            },
            {
                id: 2,
                name: 'Stock Informatique',
                route: '/stock-informatique',
                path: 'StockInformatique'
            },
            {
                id: 3,
                name: 'Fournitures',
                route: '/fournitures',
                path: 'Fournitures'
            },
        ]
    },
    ...sharedMenu2,
    ...sharedMenu
];

const LogisticsMenu = [
    {
        id: 1,
        name: 'Dashboard',
        route: '/dashboard-logistics',
        icon: 'ti ti-smart-home',
        path: 'DashboardLogistics'
    },
    {
        id: 2,
        name: 'Abonnements',
        icon: 'ti ti-shopping-cart',
        children: [
            {
                id: 1,
                name: 'Parc GSM',
                route: '/parc-gsm',
                path: 'ParcGsm'
            },
            {
                id: 2,
                name: 'Carte carburant',
                route: '/carte-carburant',
                path: 'CarteCarburant'
            },
            {
                id: 3,
                name: 'Jawaz',
                route: '/Jawaz',
                path: 'Jawaz'
            },
        ]
    },
    {
        id: 4,
        name: 'Cachets',
        route: '/cachets',
        icon: 'ti ti-rubber-stamp',
        path: 'Cachets'
    },
    {
        id: 5,
        name: 'Caisse',
        route: '/caisse',
        icon: 'ti ti-cash',
        path: 'Caisse'
    },
    {
        id: 6,
        name: 'Véhicules',
        route: '/vehicules',
        icon: 'ti ti-car',
        path: 'Vehicules'
    },
    {
        id: 7,
        name: 'Fournisseur',
        route: '/fournisseur',
        icon: 'ti ti-building-store',
        path: 'Fournisseur'
    },
    {
        id: 8,
        name: 'Sous-traitant',
        route: '/soustraitant',
        icon: 'ti ti-forklift',
        path: 'Soustraitant'
    },
    {
        id: 9,
        name: 'Stock',
        icon: 'ti ti-stack',
        children: [
            {
                id: 1,
                name: 'Stock',
                route: '/stock',
                path: 'Stock'
            },
            {
                id: 2,
                name: 'Stock Informatique',
                route: '/stock-informatique',
                path: 'StockInformatique'
            },
            {
                id: 3,
                name: 'Fournitures',
                route: '/fournitures',
                path: 'Fournitures'
            },
        ]
    },
    {
        id: 8,
        name: 'Transports',
        route: '/transports',
        icon: 'ti ti-truck-delivery',
        path: 'Transports'
    },
    {
        id: 8,
        name: 'Louer',
        route: '/louer',
        icon: 'ti ti-building',
        path: 'Louer'
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
        name: 'Resources Humaines',
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
                name: 'Paie',
                route: '/paie',
                icon: 'ti ti-file-invoice',
                path: 'Paie'
            },
            {
                id: 9,
                name: 'Stagiaires',
                route: '/interns',
                icon: 'ti ti-users-group',
                path: 'Interns'
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
        id: 2,
        name: 'Logistique',
        icon: 'ti ti-users',
        children: [
            {
                id: 4,
                name: 'Caisse',
                route: '/caisse',
                icon: 'ti ti-cash',
                path: 'Caisse'
            },
            {
                id: 1,
                name: 'Stock',
                route: '/stock',
                path: 'Stock'
            },
            {
                id: 2,
                name: 'Stock Informatique',
                route: '/stock-informatique',
                path: 'StockInformatique'
            },
            {
                id: 3,
                name: 'Fournitures',
                route: '/fournitures',
                path: 'Fournitures'
            },
            {
                id: 1,
                name: 'Louer',
                route: '/louer',
                path: 'Louer'
            },
            {
                id: 2,
                name: 'Cachets',
                route: '/cachets',
                path: 'Cachets'
            },
            {
                id: 3,
                name: 'Véhicules',
                route: '/vehicules',
                path: 'Vehicules'
            },
            {
                id: 1,
                name: 'Parc GSM',
                route: '/parc-gsm',
                path: 'ParcGsm'
            },
            {
                id: 2,
                name: 'Carte carburant',
                route: '/carte-carburant',
                path: 'CarteCarburant'
            },
            {
                id: 3,
                name: 'Jawaz',
                route: '/Jawaz',
                path: 'Jawaz'
            },
        ]
    },
    {
        id: 7,
        name: 'Achats',
        icon: 'ti ti-shopping-cart',
        children: [
            {
                id: 1,
                name: 'Demandes d\'achats',
                route: '/purchase-order',
                path: 'PurchaseOrder'
            },
            {
                id: 2,
                name: 'Demande d\'exécution',
                route: '/execution-request',
                path: 'ExecutionRequest',
            },
            {
                id: 3,
                name: 'Bons de commande',
                route: '/bon-de-commande',
                path: 'BonDeCommande'
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
        id: 5,
        name: 'Projets',
        route: '/projects',
        icon: 'ti ti-package',
        path: 'Projects'
    },
    {
        id: 6,
        name: 'Clients',
        route: '/clients',
        icon: 'ti ti-affiliate',
        path: 'Clients'
    },


    {
        id: 10,
        name: 'Fournisseur',
        route: '/fournisseur',
        icon: 'ti ti-building-store',
        path: 'Fournisseur'
    },
    {
        id: 12,
        name: 'Sous-traitant',
        route: '/soustraitant',
        icon: 'ti ti-forklift',
        path: 'Soustraitant'
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