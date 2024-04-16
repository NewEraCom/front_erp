<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { CardOne, CardOneSkeleton } from '@/ui';
import { useLogisticsStore } from '@/store';
import { logisticsService } from '@/services';
import { CachetsTable } from './components';
import { formater } from '@/utils';
import AddCachetModel from './components/AddCachetModel.vue';

const logisticsStore = useLogisticsStore();

const cachets = ref(computed(() => logisticsStore.cachets.data));
const stats = ref(computed(() => logisticsStore.cachets.stats));

onMounted(async () => {
    await logisticsService.getCachets();
});

onUnmounted(() => {
    logisticsStore.clearCachets();
});

</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Cachets</span></h5>
        <div v-if="stats" class="row">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardOne title="Total Cachet" :count="formater.number(stats.total)" color="bg-label-primary"
                    icon="ti ti-rubber-stamp" card-color="card-border-shadow-primary" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardOne title="Total Cachet Actif" :count="formater.number(stats.active)" color="bg-label-success"
                    icon="ti ti-rubber-stamp" card-color="card-border-shadow-success" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardOne title="Total Cachet en stock" :count="formater.number(stats.inactif)" color="bg-label-warning"
                    icon="ti ti-rubber-stamp" card-color="card-border-shadow-warning" />
            </div>
        </div>
        <div v-else class="row">
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
                        <div class="card-header d-flex align-items-center">
                            <div class="me-auto">
                                <h5 class="fw-bold mb-1">Liste des Cachets</h5>
                                <small class="fw-bold mb-1 text-muted">Liste des cachets enregistrés</small>
                            </div>
                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addCachet">
                                <i class="ti ti-square-rounded-plus-filled me-2"></i>
                                Ajouter un Cachet
                            </button>
                        </div>
                        <div v-if="cachets != null" class="card-body border-top pt-4">
                            <CachetsTable :cachets="cachets" />
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
        <AddCachetModel/>
    </div>
</template>