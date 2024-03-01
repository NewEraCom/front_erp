console.log(helpers.init());
import { helpers } from '@/utils';

export const salesRoutes = [
    {
        path: '/dashboard-sales',
        name: 'DashboardSales',
        component: () => import('@/views/Sales/MainView.vue'),
        meta: {
            title: 'Dashboard',
            role: [helpers.roles.SALES]
        },
    },
    {
        path: '/purchase-order',
        name: 'PurchaseOrder',
        component: () => import('@/views/Sales/PurchaseOrderView.vue'),
        meta: {
            title: 'Demande d\'achat',
            role: [helpers.roles.SALES, helpers.roles.CF, helpers.roles.DS]
        },
    },
    {
        path: '/purchase-order/details/:id',
        name: 'PurchaseOrderDetails',
        component: () => import('@/views/Sales/DetailsPurchaseOrderView.vue'),
        props: true,
        meta: {
            title: 'Details de la demande d\'achat',
            role: [helpers.roles.SALES, helpers.roles.CF]
        },
    },
    {
        path: '/edit/purchase-order/details/:id',
        name: 'EditPurchaseOrder',
        component: () => import('@/views/Sales/EditPurchaseOrder.vue'),
        props: true,
        meta: {
            title: 'Modifier la demande d\'achat',
            role: [helpers.roles.SALES, helpers.roles.CF]
        },
    },
    {
        path: '/execution-request',
        name: 'ExecutionRequest',
        component: () => import('@/views/Sales/ExecutionRequestView.vue'),
        meta: {
            title: 'Demande d\'exécution',
            role: [helpers.roles.SALES]
        },
    },
    {
        path: '/bon-de-commande',
        name: 'BonDeCommande',
        component: () => import('@/views/Sales/BonDeCommandeView.vue'),
        meta: {
            title: 'Bon de commande',
            role: [helpers.roles.SALES]
        },
    },
    {
        path: '/invoices-sales',
        name: 'InvoicesSales',
        component: () => import('@/views/Sales/FacturesView.vue'),
        meta: {
            title: 'Factures',
            role: [helpers.roles.SALES]
        },
    },

];

