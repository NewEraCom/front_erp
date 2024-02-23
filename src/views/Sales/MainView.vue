<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { salesService } from '@/services';
import { useSalesStore } from '@/store';
import { CardOne } from '@/ui';
import { formater, helpers } from '@/utils';

const salesStore = useSalesStore();

const purchaseOrders = ref(computed(() => salesStore.purchaseOrders));

onMounted(async () => {
    await salesService.getPurchaseOrders();
});

</script>
<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <h5 class="py-3 mb-4 fw-medium">Dashboard</h5>
        <div v-if="purchaseOrders.stats" class="row g-3">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
                <CardOne title="Demande d'achat" :count="String(purchaseOrders.stats.total)" color="bg-label-primary"
                    icon="ti-shopping-cart" card-color="card-border-shadow-primary" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
                <CardOne title="Demande d'achat en attente" :count="String(purchaseOrders.stats.pending)"
                    color="bg-label-warning" icon="ti-shopping-cart" card-color="card-border-shadow-warning" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
                <CardOne title="Demande d'achat en cours" :count="String(purchaseOrders.stats.ongoing)"
                    color="bg-label-info" icon="ti-shopping-cart" card-color="card-border-shadow-info" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
                <CardOne title="Demande d'achat traitée" :count="String(purchaseOrders.stats.completed)"
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
            <div v-if="purchaseOrders.stats" class="col-5">
                <div class="card card-border-shadow-primary">
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
                                        <th class="fw-bold text-center">Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody v-if="purchaseOrders.data.length != 0">
                                    <tr v-for="order in purchaseOrders.data.slice(0, 10)" :key="order.id">
                                        <td>
                                            <small class="fw-bold">N°{{ order.n_order }}</small>
                                        </td>
                                        <td class="text-center">
                                            <span class="fw-bold badge" :class="helpers.returnBadge(order.status)[0]">{{
                                                helpers.returnBadge(order.status)[1] }}</span>
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
        </div>
    </div>
</template>

<style scoped></style>
