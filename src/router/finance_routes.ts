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
    },
    {
        path: '/fn/caution',
        name: 'FnCaution',
        component: () => import('../views/Finance/CautionView.vue'),
        meta: {
            title: 'Caution'
        }
    },
    {
        path: '/fn/cheque',
        name: 'FnCheque',
        component: () => import('../views/Finance/ChequeView.vue'),
        meta: {
            title: 'Cheque'
        }
    },
];
