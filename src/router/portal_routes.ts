const role = 'Employee'

export const portalRoutes = [
  {
    path: '/portal/dashboard',
    name: 'DashboardPortal',
    component: () => import('@/views/portal/DashboardView.vue'),
    meta: {
      title: 'Dashboard',
      role: role
    }
  },
  {
    path: '/portal/personal-info',
    name: 'PersonalInfoPortal',
    component: () => import('@/views/portal/PersonalInfoView.vue'),
    meta: {
      title: 'Informations personnelles',
      role: role
    }
  },
  {
    path: '/portal/curriculum-vitae',
    name: 'CurriculumVitae',
    component: () => import('@/views/portal/CurriculumVitaeView.vue'),
    meta: {
      title: 'CV (Curriculum Vitae)',
      role: role
    }
  },
  {
    path: '/portal/contracts',
    name: 'ContractsPortal',
    component: () => import('@/views/portal/ContractsView.vue'),
    meta: {
      title: 'Contrats',
      role: role
    }
  },
  {
    path: '/portal/salary-benefits',
    name: 'SalaryBenefitsPortal',
    component: () => import('@/views/portal/SalaryBenefitsView.vue'),
    meta: {
      title: 'Salaire et avantages sociaux',
      role: role
    }
  },
  {
    path: '/portal/administration',
    name: 'AdministrationPortal',
    component: () => import('@/views/portal/AdministrationView.vue'),
    meta: {
      title: 'Votre dossier administratif',
      role: role
    }
  },
  {
    path: 'protal/documents',
    name: 'AdministrationDocuments',
    component: () => import('@/views/portal/AdministrationDocumentsView.vue'),
    meta: {
      title: 'Documents administratifs',
      role: role
    }
  },
  {
    path: '/portal/who-is-who',
    name: 'WhoIsWho',
    component: () => import('@/views/portal/WhoIsWhoView.vue'),
    meta: {
      title: 'Qui est qui',
      role: role
    }
  },
  {
    path: '/portal/articles',
    name: 'ArticlesPortal',
    component: () => import('@/views/portal/CompanyItemsView.vue'),
    meta: {
      title: "Articles de l'entreprise",
      role: role
    }
  },
  {
    path: '/portal/calendar',
    name: 'CalendarPortal',
    component: () => import('@/views/portal/CalendarView.vue'),
    meta: {
      title: 'Calendrier',
      role: role
    }
  },
  {
    path: '/portal/who-is-who/:id',
    name: 'EmployeeDetails',
    component: () => import('@/views/portal/EmployeeProfileView.vue'),
    props: true,
    meta: {
      title: "Profil de l'employé",
      role: role
    }
  }
]
