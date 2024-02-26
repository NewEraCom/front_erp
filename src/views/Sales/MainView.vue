<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { salesService, logisticsService } from '@/services';
import { useSalesStore, useLogisticsStore } from '@/store';
import { CardTwo } from '@/ui';
import { formater, helpers } from '@/utils';

const salesStore = useSalesStore();
const logisticsStore = useLogisticsStore();

const purchaseOrders = ref(computed(() => salesStore.purchaseOrders));
const invoices = ref(computed(() => salesStore.invoices));
const stock = ref(computed(() => logisticsStore.stock.stats));


onMounted(async () => {
    await salesService.getPurchaseOrders('Achats');
    await salesService.getFacturesClient();
    await logisticsService.getStock('autre');

});

onUnmounted(() => {
    salesStore.clearPurchaseOrders();
    salesStore.clearInvoices();
    logisticsStore.clearStock();
});

</script>
<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <h5 class="py-3 mb-4 fw-medium">Dashboard</h5>
        <div v-if="purchaseOrders.stats" class="row g-3">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwo title="En alert stock" :count="stock.alert" color="bg-label-warning" icon="ti ti-building-store"
                    card-color=" card-border-shadow-warning" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwo title="En Stock" :count="stock.total" color="bg-label-success" icon="ti ti-building-store"
                    card-color="card-border-shadow-success" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwo title="En Rupture De Stock" :count="stock.rupture" color="bg-label-danger"
                    icon="ti ti-building-store" card-color="card-border-shadow-danger" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwo title="Valeur Global De Stock" :count="formater.number(stock.totalValue) + ' MAD'"
                    color="bg-label-info" icon="ti ti-building-store" card-color="card-border-shadow-info" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
                <CardTwo title="Demande d'achat" :count="String(purchaseOrders.stats.total)" color="bg-label-primary"
                    icon="ti-shopping-cart" card-color="card-border-shadow-primary" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
                <CardTwo title="Demande d'achat en attente" :count="String(purchaseOrders.stats.pending)"
                    color="bg-label-warning" icon="ti-shopping-cart" card-color="card-border-shadow-warning" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
                <CardTwo title="Demande d'achat en cours" :count="String(purchaseOrders.stats.ongoing)"
                    color="bg-label-info" icon="ti-shopping-cart" card-color="card-border-shadow-info" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
                <CardTwo title="Demande d'achat traitée" :count="String(purchaseOrders.stats.completed)"
                    color="bg-label-success" icon="ti-shopping-cart" card-color="card-border-shadow-success" />
            </div>
        </div>
        <div class="row mt-4">
            <div v-if="purchaseOrders.stats" class="col-7">
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
                                <tbody v-if="purchaseOrders.data.length != 0">
                                    <tr v-for="order in purchaseOrders.data.slice(0, 10)" :key="order.id">
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
            <div v-if="invoices.data" class="col-5">
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
                                <tbody v-if="invoices.data.length != 0">
                                    <tr v-for="invoice in invoices.data.slice(0, 10)" :key="invoice.id">
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
