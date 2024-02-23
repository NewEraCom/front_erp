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
];