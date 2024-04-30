<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { pmService, salesService, sharedService } from '@/services';
import { usePMStore, useSalesStore, useSharedStore } from '@/store';
import { CardTwo, CardTwoSkeleton,NewPurchaseOrderModal } from '@/ui';
import { PurchaseOrderTable } from './components';

const salesStore = useSalesStore();
const sharedStore = useSharedStore();
const pmStore = usePMStore();
const SiegeId = 50;
const stats = ref(computed(() => salesStore.purchaseOrders.stats));
const purchaseOrders = ref(computed(() => salesStore.purchaseOrders.data));
const articles = ref(computed(() => pmStore.borderaux));

onMounted(async () => {
    await sharedService.getProjects();
    await salesService.getPurchaseOrders('Achats');
    await pmService.getBorderaux(SiegeId);
});


onUnmounted(() => {
    salesStore.clearPurchaseOrders();
    sharedStore.clearProjects();
});
</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Demande d'achat</span></h5>
        <div v-if="stats" class="row g-3">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
                <CardTwo title="Demande d'achat" :count="String(stats.total)" color="bg-label-primary"
                    icon="ti-shopping-cart" card-color="card-border-shadow-primary" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
                <CardTwo title="Demande d'achat en attente" :count="String(stats.pending)" color="bg-label-warning"
                    icon="ti-shopping-cart" card-color="card-border-shadow-warning" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
                <CardTwo title="Demande d'achat en cours" :count="String(stats.ongoing)" color="bg-label-info"
                    icon="ti-shopping-cart" card-color="card-border-shadow-info" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
                <CardTwo title="Demande d'achat traitée" :count="String(stats.completed)" color="bg-label-success"
                    icon="ti-shopping-cart" card-color="card-border-shadow-success" />
            </div>
        </div>
        <div v-else class="row g-3">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
                <CardTwoSkeleton />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
                <CardTwoSkeleton />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
                <CardTwoSkeleton />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
                <CardTwoSkeleton />
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-12">
                <div class="card">
                    <div class="card card-border-shadow-primary">
                        <div class="card-header">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 class="fw-bold mb-1">Demande d'achat</h5>
                                    <small class="fw-bold mb-1 text-muted">Liste des demandes d'achat</small>
                                </div>
                                <button class="btn btn-primary" data-bs-target="#newPurchaseOrder"
                                    data-bs-toggle="modal">
                                    <i class="ti ti-shopping-bag-plus me-2"></i> Ajouter une demande d'achat
                                </button>
                            </div>
                        </div>
                        <div v-if="purchaseOrders != null" class="card-body border-top pt-4">
                            <PurchaseOrderTable :purchase-orders="purchaseOrders" />
                        </div>
                        <div v-else class="card-body border-top pt-4 d-flex align-items-center justify-content-center"
                            style="height: 650px;">
                            <div class="row mt-5">
                                <div class="col-12 text-center">
                                    <h5>Chargement des données...</h5>
                                    <div class="spinner-border text-primary mt-4" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <NewPurchaseOrderModal v-if="articles" :id="50" :articles="articles.filter(
                    (item: any) => item.category === 'Achats' && item.status === 1
                )"  />
    </div>
</template>