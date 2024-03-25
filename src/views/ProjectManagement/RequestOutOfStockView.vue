<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { pmService } from '@/services';
import { usePMStore, useLogisticsStore } from '@/store';
import { CardOne, OutOfStockTable, Modal } from '@/ui';
import { helpers } from '@/utils';

const pmStore = usePMStore();
const logisticsStore = useLogisticsStore();

const stats = ref(computed(() => pmStore.outOfStock.stats));
const requests = ref(computed(() => pmStore.outOfStock.data));

onMounted(async () => {
    await pmService.getOutOfStockRequests();
});

onUnmounted(() => {
    pmStore.clearOutOfStockRequests();
});
</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Demande de sortie de stock</span>
        </h5>
        <div v-if="stats" class="row g-3">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardOne title="Demande en attente" :count="String(stats.pending)" color="bg-label-primary"
                    icon="ti-shopping-cart" card-color="card-border-shadow-primary" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardOne title="Demande en cours" :count="String(stats.ongoing)" color="bg-label-warning"
                    icon="ti-shopping-cart" card-color="card-border-shadow-warning" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardOne title="Demande traitée" :count="String(stats.completed)" color="bg-label-success"
                    icon="ti-shopping-cart" card-color="card-border-shadow-success" />
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-12">
                <div class="card">
                    <div class="card card-border-shadow-primary">
                        <div class="card-header">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 class="fw-bold mb-1">Demande de sortie de stock</h5>
                                    <small class="fw-bold mb-1 text-muted">Liste des demandes de sortie de stock</small>
                                </div>
                            </div>
                        </div>
                        <div v-if="requests != null" class="card-body border-top pt-4">
                            <OutOfStockTable :requests="requests" role="chef" />
                        </div>
                    </div>
                </div>
            </div>
            <Modal id="detailsRequest" title="Détails de la demande" size="modal-xl">
                <div v-if="logisticsStore.selectedItem" class="modal-body">
                    <div class="row">
                        <div class="col-12">
                            <p class="mb-2">Numéro de demande : {{ logisticsStore.selectedItem.code
                                }}</p>
                            <p class="mb-2">Demandeur : {{
            logisticsStore.selectedItem.created_by.employee.first_name
        }} {{ logisticsStore.selectedItem.created_by.employee.last_name }}</p>
                            <p class="mb-2">Projet : {{ logisticsStore.selectedItem.project.code
                                }}</p>
                            <p class="mb-2">Status :
                                <span class="fw-bold"
                                    :class="helpers.returnBadge(logisticsStore.selectedItem.status)[0]">{{
            helpers.returnBadge(logisticsStore.selectedItem.status)[1] }}</span>
                            </p>
                        </div>
                        <div class="col-12 mt-4">

                            <div class="table-responsive text-nowrap">
                                <table class="table">
                                    <thead class="table-dark">
                                        <tr>
                                            <th class="fw-bold">Article</th>
                                            <th class="fw-bold text-center">Quantité demandée</th>
                                            <th class="fw-bold text-center">Quantité Envoyée</th>
                                            <th class="fw-bold text-center">Quantité restante</th>
                                        </tr>
                                    </thead>
                                    <tbody class="table-border-bottom-0"
                                        v-if="logisticsStore.selectedItem.articles.length > 0">
                                        <tr v-for="item in logisticsStore.selectedItem.articles" :key="item.id">
                                            <td>
                                                <small>{{ item.article.article }}</small>
                                            </td>
                                            <td class="text-center">
                                                <small>{{ item.qte_demande }}</small>
                                            </td>
                                            <td class="text-center">
                                                <small>{{ item.qte_envoye }}</small>
                                            </td>
                                            <td class="text-center">
                                                <small>{{ item.qte_restant ? item.qte_restant : 0 }}</small>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody v-else>
                                        <tr>
                                            <td colspan="4" class="text-center text-muted">Aucun article trouvé</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                        Fermer
                    </button>
                </div>
            </Modal>
        </div>
    </div>
</template>