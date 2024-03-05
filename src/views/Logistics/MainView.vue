<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useLogisticsStore } from '@/store';
import { logisticsService } from '@/services';
import { CardCaisse, CardThree } from '@/ui';
import { CaisseOperationItem } from './components';
import { helpers } from '@/utils';

const logisticsStore = useLogisticsStore();

const caisse = ref(computed(() => logisticsStore.caisse.stats));
const vehicules = ref(computed(() => logisticsStore.vehicules.stats));
const cardsCarburant = ref(computed(() => logisticsStore.cardsCarburant.stats));
const outOfStockRequests = ref(computed(() => logisticsStore.outOfStockRequests.stats));
const opertationCaisse = ref(computed(() => logisticsStore.opertationCaisse.data));
const delivery = ref(computed(() => logisticsStore.delivery.data));

onMounted(async () => {
    await logisticsService.getCaisse();
    await logisticsService.getVehicules();
    await logisticsService.getCarteCarburant();
    await logisticsService.getOutOfStockRequests();
    await logisticsService.getOperationCaisse();
    await logisticsService.getTransport();
});

onUnmounted(() => {
    logisticsStore.clearCaisse();
});


</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <h5 class="py-3 mb-4 fw-medium">Dashboard</h5>
        <div v-if="caisse && vehicules && cardsCarburant && outOfStockRequests" class="row">
            <div class="col-xxl-4 col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-4">
                <CardCaisse :stats="caisse" />
            </div>
            <div class="col-xxl-2 col-xl-3 col-lg-6 col-md-12 col-sm-12 mb-4">
                <CardThree title="Vehicules" :count="vehicules.total" :actif="vehicules.used" color=" bg-label-primary"
                    icon="ti-car" card-color="card-border-shadow-primary" />
            </div>
            <div class="col-xxl-2 col-xl-3 col-lg-6 col-md-12 col-sm-12 mb-4">
                <CardThree title="Carte gasoil" :count="cardsCarburant.total" :actif="cardsCarburant.active"
                    color=" bg-label-primary" icon="ti-gas-station" card-color="card-border-shadow-primary" />
            </div>

            <div class="col-xxl-2 col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-4">
                <CardThree title="Demande DSS" :count="outOfStockRequests.total" :actif="outOfStockRequests.done"
                    color=" bg-label-primary" icon="ti-brand-citymapper" card-color="card-border-shadow-primary" />
            </div>
            <div class="col-xxl-2 col-xl-6 col-lg-12 col-md-12 col-sm-12 mb-4">
                <CardThree title="Cachets" count="12" actif="5" color=" bg-label-primary" icon="ti-rubber-stamp"
                    card-color="card-border-shadow-primary" />
            </div>
        </div>
        <div class="row">
            <div class="col-xxl-8 order-xxl-0 mt-2">
                <div class="card h-100 card-border-shadow-primary">
                    <div class="card-header">
                        <div class="card-title mb-0">
                            <h5 class="m-0 fw-bold">Aperçu de la livraison</h5>
                            <small class="text-muted">Aperçu de la livraison </small>
                        </div>
                    </div>
                    <div v-if="delivery && delivery.length > 0" class="card-body">
                        <div class="table-responsive">
                            <table class="table card-table">
                                <thead class="table-light">
                                    <tr>
                                        <th class="fw-bold">Demande D'achat</th>
                                        <th class="fw-bold text-center">Demandeur</th>
                                        <th class="fw-bold text-center">Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody class="table-border-bottom-0">
                                    <tr v-for="item in delivery" :key="item">
                                        <td>
                                            <h6 class="mb-0 fw-medium">{{ item.n_order }}</h6>
                                        </td>
                                        <td class="text-center">
                                            <h6 class="mb-0 fw-bold">{{ item.created_by.employee.first_name + ' ' +
            item.created_by.employee.last_name }}</h6>
                                        </td>

                                        <td class="text-center pe-0">
                                            <span class="fw-bold me-3 badge"
                                                :class="helpers.returnBadge(item.status)[0]">
                                                {{ helpers.returnBadge(item.status)[1] }}
                                            </span>
                                        </td>
                                        <td class="text-center">
                                            <button class="btn btn-primary btn-sm">
                                                <i class="ti ti-eye"></i> </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div v-else class="card-body">
                        <div class="table-responsive">
                            <table class="table card-table">
                                <thead class="table-light">
                                    <tr>
                                        <th class="fw-bold">Demande D'achat</th>
                                        <th class="fw-bold text-center">Demandeur</th>
                                        <th class="fw-bold text-center">Temps de traitement</th>
                                        <th class="fw-bold text-end">Status</th>
                                    </tr>
                                </thead>
                                <tbody class="table-border-bottom-0">
                                    <tr>
                                        <td colspan="4" class="text-center">
                                            <img src="@/assets/img/No_Sales.png" width="200px" alt="" srcset=""
                                                class="mt-1" />
                                            <p>Aucun demande trouve</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xxl-4 order-xxl-0 mt-2">
                <div class="card h-100 card-border-shadow-primary">
                    <div class="card-header">
                        <div class="card-title mb-0">
                            <h5 class="m-0 fw-bold">Dernier Transactions</h5>
                            <small class="text-muted">7 dernières transactions</small>
                        </div>
                    </div>
                    <div v-if="opertationCaisse" class="card-body">
                        <CaisseOperationItem :transactions="opertationCaisse" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
