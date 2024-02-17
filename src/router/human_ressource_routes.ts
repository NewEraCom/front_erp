import { helpers } from '@/utils';

export const hrRoutes = [
    {
        path: '/dashboard-rh',
        name: 'DashboardRH',
        component: () => import('@/views/HumanRessources/MainView.vue'),
        meta: {
            title: 'Dashboard',
            role : [helpers.roles.HR]
        },
    },
    {
        path: '/employees',
        name: 'Employees',
        component: () => import('@/views/HumanRessources/EmployeesView.vue'),
        meta: {
            title: 'Employés',
            role : [helpers.roles.HR]
        },
    },
    {
        path: '/interns',
        name: 'Interns',
        component: () => import('@/views/HumanRessources/InternsView.vue'),
        meta: {
            title: 'Stagiaires',
            role : [helpers.roles.HR]
        },
    },
    {
        path: '/leaves',
        name: 'Leaves',
        component: () => import('@/views/HumanRessources/LeaveView.vue'),
        meta: {
            title: 'Congés',
            role : [helpers.roles.HR]
        },
    },
    {
        path: '/documents',
        name: 'DocumentsRH',
        component: () => import('@/views/HumanRessources/DocumentsView.vue'),
        meta: {
            title: 'Documents',
            role : [helpers.roles.HR]
        },
    },
    {
        path: '/recruitments',
        name: 'Recruitments',
        component: () => import('@/views/HumanRessources/RecruitmentView.vue'),
        meta: {
            title: 'Recrutements',
            role : [helpers.roles.HR]
        },
    },
    {
        path: '/demandes-rh',
        name: 'DemandesRH',
        component: () => import('@/views/HumanRessources/DemandesRhView.vue'),
        meta: {
            title: 'Demandes RH',
            role : [helpers.roles.HR]
        },
    },
    {
        path: '/contracts',
        name: 'Contracts',
        component: () => import('@/views/HumanRessources/ContratsView.vue'),
        meta: {
            title: 'Contrats',
            role : [helpers.roles.HR]
        },
    },
    {
        path: '/paie',
        name: 'Paie',
        component: () => import('@/views/HumanRessources/PaieView.vue'),
        meta: {
            title: 'Paie',
            role : [helpers.roles.HR]
        },
    },
    {
        path: '/salary-advance',
        name: 'SalaryAdvance',
        component: () => import('@/views/HumanRessources/SalaryAdvanceView.vue'),
        meta: {
            title: 'Avance sur salaire',
            role : [helpers.roles.HR]
        },        
    },    
];