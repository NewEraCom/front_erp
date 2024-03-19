<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { CardTwo } from '@/ui';
import { useLogisticsStore } from '@/store';
import { logisticsService } from '@/services';
import {
    LouerTable,
    DetailsLouerModal,
    NewLouerModal,
} from './components';
import { formater } from '@/utils';

const logisticsStore = useLogisticsStore();

const louers = ref(computed(() => logisticsStore.louer.data));
const stats = ref(computed(() => logisticsStore.louer.stats));

onMounted(async () => {
    await logisticsService.getLouer();
});

onUnmounted(() => {
    logisticsStore.clearLouer();
});

</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Loyer</span></h5>
        <div v-if="stats" class="row g-3">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardTwo title="Appartement" :count="formater.number(stats.appartement)" color="bg-label-warning"
                    icon="ti ti-building" card-color=" card-border-shadow-warning" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardTwo title="Villa" :count="formater.number(stats.villa)" color="bg-label-success"
                    icon="ti ti-building" card-color="card-border-shadow-success" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardTwo title="Magasin" :count="formater.number(stats.magasin)" color="bg-label-danger"
                    icon="ti ti-building" card-color="card-border-shadow-danger" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardTwo title="Dépôt" :count="formater.number(stats.depot)" color="bg-label-info" icon="ti ti-building"
                    card-color="card-border-shadow-info" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardTwo title="Autre" :count="formater.number(stats.autre)" color="bg-label-dark" icon="ti ti-building"
                    card-color="card-border-shadow-dark" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardTwo title="Total à payer" :count="formater.number(stats.total_a_payer)" color="bg-label-danger"
                    icon="ti ti-building" card-color="card-border-shadow-danger" />
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-12">
                <div class="card">
                    <div class="card card-border-shadow-primary">
                        <div class="card-header d-flex align-items-center">
                            <div class="me-auto">
                                <h5 class="fw-bold mb-1">Liste des locations</h5>
                                <small class="fw-bold mb-1 text-muted">Liste des locations</small>
                            </div>
                            <button class="btn btn-primary" data-bs-target="#newLouer" data-bs-toggle="modal">
                                <i class="ti ti-plus me-2"></i>
                                Ajouter nouveau enrgistrement
                            </button>
                        </div>

                        <div v-if="louers != null" class="card-body border-top pt-4">
                            <LouerTable :louers="louers" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <DetailsLouerModal />
        <NewLouerModal />
    </div>
</template>