import { helpers } from '@/utils';

export const financeRoutes = [
    {
        path: '/fn/facture',
        name: 'FnFacture',
        component: () => import('../views/Finance/InvoiceView.vue'),
        meta: {
            title: 'Finance',
            role : [helpers.roles.FINANCE]
        }
    },
    {
        path: '/fn/facture/details',
        name: 'FnFactureDetails',
        component: () => import('../views/Finance/components/PreviewFacture.vue'),
        meta: {
            title: 'Finance Details',
            role : [helpers.roles.FINANCE]

        }
    },
    {
        path: '/fn/caution',
        name: 'FnCaution',
        component: () => import('../views/Finance/CautionView.vue'),
        meta: {
            title: 'Caution',
            // role : [helpers.roles.FINANCE]

        }
    },
    {
        path: '/fn/cheque',
        name: 'FnCheque',
        component: () => import('../views/Finance/ChequeView.vue'),
        meta: {
            title: 'Cheque',
            role : [helpers.roles.FINANCE]

        }
    },
];
