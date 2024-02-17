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
    }
];