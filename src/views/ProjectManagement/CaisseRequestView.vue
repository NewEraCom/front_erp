<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { logisticsService, sharedService } from '@/services';
import { useLogisticsStore, useSharedStore } from '@/store';
import { CardOne, CardOneSkeleton } from '@/ui';
import { DemandeCaisseModal, DemandeCaisseOutOfStockTable } from './components';

const logisticsStore = useLogisticsStore();
const sharedStore = useSharedStore();

const caisse = ref(computed(() => logisticsStore.opertationCaisse.data));
const stats = ref(computed(() => logisticsStore.opertationCaisse.stats));
const projects = ref(computed(() => sharedStore.projects.data));


onMounted(async () => {
    await logisticsService.getOperationCaisse('chef');
    await sharedService.getProjects();
});

onUnmounted(() => {
    sharedStore.clearProjects();

});
</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Demande de caisse</span>
        </h5>
        <div v-if="stats" class="row g-3">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardOne title="Demande en attente" :count="String(stats.total)" color="bg-label-primary"
                    icon="ti-shopping-cart" card-color="card-border-shadow-primary" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardOne title="Demande en cours" :count="String(stats.ongoing)" color="bg-label-warning"
                    icon="ti-shopping-cart" card-color="card-border-shadow-warning" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardOne title="Demande traitée" :count="String(stats.delivered)" color="bg-label-success"
                    icon="ti-shopping-cart" card-color="card-border-shadow-success" />
            </div>
        </div>
        <div v-else class="row g-3 mb-5">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardOneSkeleton />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardOneSkeleton />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardOneSkeleton />
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-12">
                <div class="card">
                    <div class="card card-border-shadow-primary">
                        <div class="card-header">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 class="fw-bold mb-1">Demande de caisse</h5>
                                    <small class="fw-bold mb-1 text-muted">Liste des demandes de caisse</small>
                                </div>
                                <button class="btn btn-primary" data-bs-target="#newDemandeCaisse"
                                    data-bs-toggle="modal">
                                    <i class="ti ti-plus me-2"></i>
                                    Nouveau demande de caisse
                                </button>
                            </div>

                        </div>
                        <div v-if="caisse != null" class="card-body border-top pt-4">
                            <DemandeCaisseOutOfStockTable :caisse="caisse" />
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
        <DemandeCaisseModal :projects="projects" />
    </div>
</template>