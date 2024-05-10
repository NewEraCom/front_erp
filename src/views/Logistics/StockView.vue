<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { CardTwo, CardTwoSkeleton } from '@/ui';
import { useLogisticsStore } from '@/store';
import { logisticsService } from '@/services';
import { StockTable } from './components';
import { formater } from '@/utils';
import AddArticleModal from './components/AddArticleModal.vue';

const logisticsStore = useLogisticsStore();

const stock = ref(computed(() => logisticsStore.stock.data));
const stats = ref(computed(() => logisticsStore.stock.stats));

onMounted(async () => {
    await logisticsService.getStock('autre');
});

onUnmounted(() => {
    logisticsStore.clearStock();
});

</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Stock</span></h5>
        <div v-if="stats" class="row g-3">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwo title="En alert stock" :count="stats.alert" color="bg-label-warning" icon="ti ti-building-store"
                    card-color=" card-border-shadow-warning" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwo title="En Stock" :count="stats.total" color="bg-label-success" icon="ti ti-building-store"
                    card-color="card-border-shadow-success" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwo title="En Rupture De Stock" :count="stats.rupture" color="bg-label-danger"
                    icon="ti ti-building-store" card-color="card-border-shadow-danger" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwo title="Valeur Global De Stock" :count="formater.number(stats.totalValue) + ' MAD'"
                    color="bg-label-info" icon="ti ti-building-store" card-color="card-border-shadow-info" />
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
                        <div class="card-header d-flex align-items-center">
                            <div class="me-auto">
                                <h5 class="fw-bold mb-1">Liste des articles</h5>
                                <small class="fw-bold mb-1 text-muted">Liste des articles en stock</small>
                            </div>
                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addArticle">
                                <i class="ti ti-plus me-2"></i>
                                Ajouter un Article
                            </button>
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
        <AddArticleModal type="autre"/>

    </div>
</template>