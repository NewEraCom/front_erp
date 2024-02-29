<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { CardTwo, CardTwoSkeleton } from '@/ui';
import { useLogisticsStore } from '@/store';
import { logisticsService } from '@/services';
import { StockTable } from './components';

const logisticsStore = useLogisticsStore();

const stock = ref(computed(() => logisticsStore.stock.data));
const stats = ref(computed(() => logisticsStore.stock.stats));

onMounted(async () => {
    await logisticsService.getStock('fourniture');
});

onUnmounted(() => {
    logisticsStore.clearStock();
});


</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Fournitures</span></h5>
        <div v-if="stats" class="row">
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                <CardTwo title="Total Article" :count="stats.total" color="bg-label-primary" icon="ti ti-desk"
                    card-color="card-border-shadow-primary" />
            </div>
        </div>
        <div v-else class="row">
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                <CardTwoSkeleton />
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-12">
                <div class="card">
                    <div class="card card-border-shadow-primary">
                        <div class="card-header d-flex align-items-center">
                            <div class="me-auto">
                                <h5 class="fw-bold mb-1">Liste des fournitures</h5>
                                <small class="fw-bold mb-1 text-muted">Liste des fournitures en stock</small>
                            </div>
                        </div>
                        <div v-if="stock != null" class="card-body border-top pt-4">
                            <StockTable :stock="stock" />
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