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
        path: '/fn/facture/details/:id',
        name: 'FnFactureDetails',
        component: () => import('../views/Finance/components/PreviewFacture.vue'),
        props : true,
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
            role : [helpers.roles.FINANCE,helpers.roles.BDM]

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
    {
        path: '/fn/effet',
        name: 'FnEffet',
        component: () => import('../views/Finance/EffetView.vue'),
        meta: {
            title: 'effet',
            role : [helpers.roles.FINANCE]

        }
    },
    {
        path: '/fn/facture/client',
        name: 'FnFactureClient',
        component: () => import('../views/Finance/InvoiceClientView.vue'),
        meta: {
            title: 'Finance',
            role : [helpers.roles.FINANCE]
        }
    },
];
