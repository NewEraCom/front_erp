<script setup lang="ts">
import { sharedService } from '@/services';
import { useSharedStore } from '@/store';
import { TopBarSupport } from './components';
import { formater, helpers } from '@/utils';

import { ref, onMounted, onUnmounted, computed } from 'vue';

const sharedStore = useSharedStore();

const stats = ref(computed(() => sharedStore.dashboard.stats));
const data = ref(computed(() => sharedStore.dashboard.data));


onMounted(async () => {
    await sharedService.getDashboard();
});

onUnmounted(() => {
    sharedStore.clearDashboardStats();
});

</script>
<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <h5 class="py-3 mb-4 fw-medium">Dashboard</h5>
        <TopBarSupport :stats="stats" />
        <div v-if="data" class="row mt-4">
            <div v-if="data.purchasesOrder" class="col-7">
                <div class="card card-border-shadow-primary">
                    <div class="card-header">
                        <h5 class="fw-bold mb-1">Demande d'achat</h5>
                        <small class="fw-bold mb-1 text-muted">Les derniers demandes d'achats
                        </small>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover align-middle">
                                <thead class="table-light">
                                    <tr>
                                        <th class="fw-bold">N° de commande</th>
                                        <th class="fw-bold text-center">Projet</th>
                                        <th class="fw-bold text-center">Status</th>
                                        <th class="fw-bold text-center">Date de création</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody v-if="data.purchasesOrder.length != 0">
                                    <tr v-for="order in data.purchasesOrder.slice(0, 10)" :key="order.id">
                                        <td>
                                            <small class="fw-bold">N°{{ order.n_order }}</small>
                                        </td>
                                        <td class="text-center">
                                            <small>{{ order.project.code }}</small>
                                        </td>
                                        <td class="text-center">
                                            <span class="fw-bold badge" :class="helpers.returnBadge(order.status)[0]">{{
                                                helpers.returnBadge(order.status)[1] }}</span>
                                        </td>
                                        <td class="text-center">
                                            <small>{{ formater.date(order.created_at) }}</small>
                                        </td>
                                        <td class="text-center">
                                            <button class="btn btn-sm btn-primary">
                                                <i class="ti ti-eye"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr>
                                        <td colspan="5" class="text-center">
                                            <small>Aucune demande d'achat</small>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="data.invoices" class="col-5">
                <div class="card card-border-shadow-primary h-100">
                    <div class="card-header">
                        <h5 class="fw-bold mb-1">Factures</h5>
                        <small class="fw-bold mb-1 text-muted">Les derniers factures</small>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover align-middle">
                                <thead class="table-light">
                                    <tr>
                                        <th class="fw-bold">N° de facture</th>
                                        <th class="fw-bold text-center">Total</th>
                                        <th class="fw-bold text-center">Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody v-if="data.invoices.length != 0">
                                    <tr v-for="invoice in data.invoices.slice(0, 10)" :key="invoice.id">
                                        <td>
                                            <small class="fw-bold">N°{{ invoice.bon_commande.soustraitant.raison_social
                                            }}</small>
                                        </td>
                                        <td class="text-center">
                                            <small>{{ formater.number(invoice.total) }} MAD</small>
                                        </td>
                                        <td class="text-center">
                                            <span class="fw-bold badge" :class="helpers.returnBadge(invoice.status)[0]">{{
                                                helpers.returnBadge(invoice.status)[1] }}</span>
                                        </td>
                                        <td class="text-center">
                                            <button class="btn btn-primary btn-sm">
                                                <i class="ti ti-eye ti-sm"></i>
                                            </button>
                                        </td>

                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr>
                                        <td colspan="4" class="text-center">
                                            <small>Aucune demande d'achat</small>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
