<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { CardOne, CardOneSkeleton } from '@/ui';
import { useLogisticsStore } from '@/store';
import { logisticsService } from '@/services';
import { ParcGsmTable, NewSubscriptionModal } from './components';
import { formater } from '@/utils';

const logisticsStore = useLogisticsStore();

const parcGsm = ref(computed(() => logisticsStore.parcGsm.data));
const stats = ref(computed(() => logisticsStore.parcGsm.stats));

onMounted(async () => {
    await logisticsService.getParcGsm();
});

onUnmounted(() => {
    logisticsStore.clearParcGsm();
});

</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Parc GSM</span></h5>
        <div v-if="stats" class="row">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardOne title="Abonnements IAM" :count="stats.iam" color="bg-label-warning" icon="ti ti-device-sim"
                    card-color="card-border-shadow-warning" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardOne title="Abonnements Orange" :count="stats.orange" color="bg-label-success" icon="ti ti-device-sim"
                    card-color="card-border-shadow-success" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardOne title="Abonnements Inwi" :count="stats.inwi" color="bg-label-danger" icon="ti ti-device-sim"
                    card-color="card-border-shadow-danger" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardOne title="Abonnements totaux à payer" :count="formater.number(stats.total_to_payer) + ' MAD'"
                    color="bg-label-info" icon="ti ti-device-sim" card-color="card-border-shadow-info" />
            </div>
        </div>
        <div v-else class="row">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardOneSkeleton />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardOneSkeleton />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardOneSkeleton />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardOneSkeleton />
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-12">
                <div class="card">
                    <div class="card card-border-shadow-primary">
                        <div class="card-header d-flex align-items-center">
                            <div class="me-auto">
                                <h5 class="fw-bold mb-1">Liste des Abonnements</h5>
                                <small class="fw-bold mb-1 text-muted">Liste des abonnements en stock</small>
                            </div>
                            <button class="btn btn-primary" data-bs-target="#newSubscription" data-bs-toggle="modal">
                                <i class="ti ti-plus me-2"></i> Ajouter un abonnement
                            </button>
                        </div>
                        <div v-if="parcGsm != null" class="card-body border-top pt-4">
                            <ParcGsmTable :parc-gsm="parcGsm" />
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
        <NewSubscriptionModal />
    </div>
</template>