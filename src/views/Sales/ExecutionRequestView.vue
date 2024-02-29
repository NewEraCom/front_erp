<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { salesService } from '@/services';
import { useSalesStore } from '@/store';
import { CardTwo, CardTwoSkeleton } from '@/ui';
import { PurchaseOrderTable } from './components';

const salesStore = useSalesStore();

const stats = ref(computed(() => salesStore.purchaseOrders.stats));
const purchaseOrders = ref(computed(() => salesStore.purchaseOrders.data));

onMounted(async () => {
    await salesService.getPurchaseOrders('Service');
});

onUnmounted(() => {
    salesStore.clearPurchaseOrders();
});

</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Demande d'exécution</span></h5>
        <div v-if="stats" class="row g-3">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-3">
                <CardTwo title="Demande d'exécution" :count="String(stats.total)" color="bg-label-primary"
                    icon="ti-settings" card-color="card-border-shadow-primary" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-3">
                <CardTwo title="Demande d'exécution en attente" :count="String(stats.pending)" color="bg-label-warning"
                    icon="ti-settings" card-color="card-border-shadow-warning" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-3">
                <CardTwo title="Demande d'exécution en cours" :count="String(stats.ongoing)" color="bg-label-info"
                    icon="ti-settings" card-color="card-border-shadow-info" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-3">
                <CardTwo title="Demande d'exécution traitée" :count="String(stats.completed)" color="bg-label-success"
                    icon="ti-settings" card-color="card-border-shadow-success" />
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
                                    <h5 class="fw-bold mb-1">Demande d'exécution</h5>
                                    <small class="fw-bold mb-1 text-muted">Liste des demandes d'exécution</small>
                                </div>
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
    </div>
</template>