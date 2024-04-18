import { helpers } from '@/utils';

export const sharedRoutes = [
    {
        path: '/profile',
        name: 'Profile',
        component: () => import('@/views/Shared/ProfileView.vue'),
        meta: {
            title: 'Profile',
            requiresAuth: true
        },
    },
    {
        path: '/calendar',
        name: 'Calendar',
        component: () => import('@/views/Shared/CalendarView.vue'),
        meta: {
            title: 'Calendrier',
            requiresAuth: true
        },
    },
    {
        path: '/meeting-room',
        name: 'MeetingRoom',
        component: () => import('@/views/Shared/MeetingRoomView.vue'),
        meta: {
            title: 'Salle de réunion',
            requiresAuth: true
        },
    },
    {
        path: '/company-courier',
        name: 'CompanyCourier',
        component: () => import('@/views/Shared/CompanyCourierView.vue'),
        meta: {
            title: 'Coursier',
            requiresAuth: true
        },
    },
    {
        path: '/dashboard-admin',
        name: 'DashboardAdmin',
        component: () => import('@/views/Shared/MainView.vue'),
        meta: {
            title: 'Dashboard',
            requiresAuth: true
        },
    },
    {
        path: '/leave-request',
        name: 'LeaveRequest',
        component: () => import('@/views/Shared/LeaveRequestView.vue'),
        meta: {
            title: 'Demande de congé',
            requiresAuth: true
        },
    },
    {
        path: '/rh-request',
        name: 'RhRequest',
        component: () => import('@/views/Shared/RhRequestView.vue'),
        meta: {
            title: 'Demande RH',
            requiresAuth: true
        },
    },
    {
        path: '/recruitment-request',
        name: 'RecruitmentRequest',
        
        component: () => import('@/views/Shared/RecruitementView.vue'),
        meta: {
            title: 'Demande de recrutement',
            requiresAuth: true
        },
    },
    {
        path: '/fournisseur',
        name: 'Fournisseur',
        component: () => import('@/views/Shared/FournisseursView.vue'),
        meta: {
            title: 'Fournisseur',
            requiresAuth: true
        },
    },
    {
        path: '/soustraitant',
        name: 'Soustraitant',
        component: () => import('@/views/Shared/SoustraitantView.vue'),
        meta: {
            title: 'Sous-traitant',
            requiresAuth: true
        },
    },
    {
        path: '/soustraitant/:id',
        name: 'ProfileSoustraitant',
        component: () => import('@/views/Shared/ProfilSousTraitantView.vue'),
        meta: {
            title: 'Sous-traitant',
            requiresAuth: true
        },
        props:true,
    },
    {
        path: '/projects',
        name: 'Projects',
        component: () => import('@/views/Shared/ProjectsView.vue'),
        meta: {
            title: 'Projets',
            requiresAuth: true
        },
    },
    {
        path: '/clients',
        name: 'Clients',
        component: () => import('@/views/Shared/ClientsView.vue'),
        meta: {
            title: 'Clients',
            requiresAuth: true
        },
    },

    {
        path: '/caisse-request',
        name: 'CaisseRequest',
        component: () => import('@/views/ProjectManagement/CaisseRequestView.vue'),
        meta: {
            title: 'Demande de caisse',
            requiresAuth: true
        },
    },
    {
        path: '/validation/caisse',
        name: 'CaisseValidation',
        component: () => import('@/views/Shared/ValidateCaisseProject.vue'),
        meta: {
            title: 'Validation Caisse',
            requiresAuth: true,
            role: [helpers.roles.DG,helpers.roles.DO,helpers.roles.DS]

        },
    },
];