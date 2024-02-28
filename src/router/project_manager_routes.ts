import { helpers } from '@/utils';

export const projectManagerRoutes = [
    {
        path: '/dashboard-pm',
        name: 'DashboardPM',
        component: () => import('@/views/ProjectManagement/DirecteurOperation.vue'),
        meta: {
            title: 'Dashboard',
            role: [helpers.roles.CF]
        },
    },
    {
        path: '/facture',
        name: 'FactureCF',
        component: () => import('@/views/ProjectManagement/FactureView.vue'),
        meta: {
            title: 'Facture',
            role: [helpers.roles.CF]
        },
    },
    {
        path: '/project/purchase_order',
        name: 'PurchaseOrderProject',
        component: () => import('@/views/ProjectManagement/PurchaseOrdersView.vue'),
        meta: {
            title: 'Demande d\'achat',
            role: [helpers.roles.CF]
        },
    },
    {
        path: '/project/executation_order',
        name: 'ExecutionOrderProject',
        component: () => import('@/views/ProjectManagement/ExecutionOrderProjectView.vue'),
        meta: {
            title: 'Demande d\'exécution',
            role: [helpers.roles.CF]
        },
    },
    {
        path: '/project/out-of-stock',
        name: 'OutOfStockProject',
        component: () => import('@/views/ProjectManagement/RequestOutOfStockView.vue'),
        meta: {
            title: 'Demande de sortie de stock',
            role: [helpers.roles.CF]
        },
    },
    {
        path: '/project/caisse-request',
        name: 'CaisseRequest',
        component: () => import('@/views/ProjectManagement/CaisseRequestView.vue'),
        meta: {
            title: 'Demande de caisse',
            role: [helpers.roles.CF]
        },
    },
    {
        path: '/pre-project',
        name: 'PreProject',
        component: () => import('@/views/ProjectManagement/PreProjectView.vue'),
        meta: {
            title: 'Avant Projet',
            // role: [helpers.roles.CF]
        },
    },
    {
        path: '/pre-project/detail/:id',
        name: 'PreProjectDetail',
        component: () => import('@/views/ProjectManagement/PreProjectDetailView.vue'),
        props: true,
        meta: {
            title: 'Detail Avant Projet',
            props: true,
            requiresAuth: true
        }
    },
];