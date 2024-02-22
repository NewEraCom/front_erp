export const financeRoutes = [
    {
        path: '/fn/facture',
        name: 'FnFacture',
        component: () => import('../views/Finance/InvoiceView.vue'),
        meta: {
            title: 'Finance'
        }
    },
    {
        path: '/fn/facture/details',
        name: 'FnFactureDetails',
        component: () => import('../views/Finance/components/PreviewFacture.vue'),
        meta: {
            title: 'Finance Details'
        }
    }
];
