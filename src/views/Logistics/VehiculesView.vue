<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { CardTwo, CardTwoSkeleton } from '@/ui';
import { useLogisticsStore } from '@/store';
import { logisticsService } from '@/services';
import { VehiculesTable } from './components';
import { formater } from '@/utils';
import AddVehiculeModel from './components/AddVehiculeModel.vue';

const logisticsStore = useLogisticsStore();

const vehicules = ref(computed(() => logisticsStore.vehicules.data));
const stats = ref(computed(() => logisticsStore.vehicules.stats));

onMounted(async () => {
    await logisticsService.getVehicules();
});

onUnmounted(() => {
    logisticsStore.clearVehicules();
});

</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Véhicules</span></h5>
        <div v-if="stats" class="row g-3">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardTwo title="Total des véhicules" :count="formater.number(stats.total)" color="bg-label-warning"
                    icon="ti ti-building" card-color=" card-border-shadow-warning" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardTwo title="Total véhicules NewEraCom" :count="formater.number(stats.neweracom)" color="bg-label-success"
                    icon="ti ti-building" card-color="card-border-shadow-success" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardTwo title="Total véhicules loués" :count="formater.number(stats.rented)" color="bg-label-danger"
                    icon="ti ti-building" card-color="card-border-shadow-danger" />
            </div>
        </div>
        <div v-else class="row g-3">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardTwoSkeleton />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardTwoSkeleton />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardTwoSkeleton />
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-12">
                <div class="card">
                    <div class="card card-border-shadow-primary">
                        <div class="card-header d-flex align-items-center">
                            <div class="me-auto">
                                <h5 class="fw-bold mb-1">Liste des véhicules</h5>
                                <small class="fw-bold mb-1 text-muted">Liste des véhicules en stock</small>
                            </div>
                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addVehicule">
                                <i class="ti ti-plus me-2"></i>
                                Ajouter un véhicule
                            </button>
                        </div>

                        <div v-if="vehicules != null" class="card-body border-top pt-4">
                            <VehiculesTable :vehicules="vehicules" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <AddVehiculeModel/>
    </div>
</template>