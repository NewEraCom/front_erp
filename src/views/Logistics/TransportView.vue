<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { logisticsService } from '@/services';
import { useSalesStore } from '@/store';
import { CardTwo } from '@/ui';
import { TransportTable } from './components';

const salesStore = useSalesStore();

const stats = ref(computed(() => salesStore.purchaseOrders.stats));
const purchaseOrders = ref(computed(() => salesStore.purchaseOrders.data));

onMounted(async () => {
    await logisticsService.getTransport();
});

onUnmounted(() => {
    salesStore.clearPurchaseOrders();
});
</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Transport</span></h5>
        <div v-if="stats" class="row g-3">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
                <CardTwo title="Total Demande de transport" :count="String(stats.total)" color="bg-label-primary"
                    icon="ti-shopping-cart" card-color="card-border-shadow-primary" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
                <CardTwo title="Demande en attente" :count="String(stats.waiting)" color="bg-label-warning"
                    icon="ti-shopping-cart" card-color="card-border-shadow-warning" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
                <CardTwo title="Demande sur la route" :count="String(stats.onroad)" color="bg-label-info"
                    icon="ti-shopping-cart" card-color="card-border-shadow-info" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
                <CardTwo title="Demande livrée" :count="String(stats.completed)" color="bg-label-success"
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
                                    <h5 class="fw-bold mb-1">Demande de transport</h5>
                                    <small class="fw-bold mb-1 text-muted">Liste des demandes de transport</small>
                                </div>
                            </div>
                        </div>
                        <div v-if="purchaseOrders != null" class="card-body border-top pt-4">
                            <TransportTable :purchase-orders="purchaseOrders" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>