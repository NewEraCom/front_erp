<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { CardTwo, CardTwoSkeleton } from '@/ui';
import { useSharedStore } from '@/store';
import { sharedService } from '@/services';
import { RhRequestTable } from './components';

const sharedStore = useSharedStore();

const rhRequest = ref(computed(() => sharedStore.rhRequest.data));
const stats = ref(computed(() => sharedStore.rhRequest.stats));

onMounted(async () => {
    await sharedService.getRhRequest();
});

onUnmounted(() => {
    sharedStore.clearRhRequest();
});

</script>
<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Demande RH</span></h5>
        <div v-if="stats" class="row g-3">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwo title="Total Demande" :count="stats.total" color="bg-label-primary" icon="ti ti-plane-inflight"
                    card-color=" card-border-shadow-primary" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwo title="Demande en attente" :count="stats.pending" color="bg-label-warning"
                    icon="ti ti-plane-inflight" card-color="card-border-shadow-warning" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwo title="Demande traitée" :count="stats.done" color="bg-label-success" icon="ti ti-plane-inflight"
                    card-color="card-border-shadow-success" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwo title="Demande livrée" :count="stats.delivered" color="bg-label-info" icon="ti ti-plane-inflight"
                    card-color="card-border-shadow-info" />
            </div>
        </div>
        <div v-else class="row g-3">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwoSkeleton />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwoSkeleton />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwoSkeleton />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwoSkeleton />
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-12">
                <div class="card">
                    <div class="card card-border-shadow-primary">
                        <div class="card-header d-flex align-items-center">
                            <div class="me-auto">
                                <h5 class="fw-bold mb-1">Liste des demandes RH</h5>
                                <small class="fw-bold mb-1 text-muted">Liste des demandes RH demandées par vous</small>
                            </div>
                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addNewLeave">
                                <i class="ti ti-square-rounded-plus-filled me-2"></i>
                                Ajouter un congé
                            </button>
                        </div>
                        <div v-if="rhRequest != null" class="card-body border-top pt-4">
                            <RhRequestTable :rh-request="rhRequest" />
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

<style scoped>
.f-45 {
    font-size: 45px;
}
</style>
