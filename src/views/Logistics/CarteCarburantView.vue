<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { CardOne, CardOneSkeleton, DeleteModal } from '@/ui';
import { useLogisticsStore } from '@/store';
import { logisticsService } from '@/services';
import { AddCarburantModel, CarburantTable } from './components';
import { formater } from '@/utils';


const logisticsStore = useLogisticsStore();

const carburant = ref(computed(() => logisticsStore.cardsCarburant.data));
const stats = ref(computed(() => logisticsStore.cardsCarburant.stats));

onMounted(async () => {
    await logisticsService.getCarteCarburant();
});

onUnmounted(() => {
    logisticsStore.clearCarteCarburant();
});

</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Carte Carburant</span></h5>
        <div v-if="stats" class="row">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardOne title="Total Carte Carburant" :count="formater.number(stats.total)" color="bg-label-primary"
                    icon="ti ti-gas-station" card-color="card-border-shadow-primary" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardOne title="Carte Carburant Actif" :count="formater.number(stats.active)" color="bg-label-success"
                    icon="ti ti-gas-station" card-color="card-border-shadow-success" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardOne title="Carte Carburant Inactif" :count="formater.number(stats.inactif)" color="bg-label-danger"
                    icon="ti ti-gas-station" card-color="card-border-shadow-danger" />
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
                                <h5 class="fw-bold mb-1">Liste des Cartes Carburant</h5>
                                <small class="fw-bold mb-1 text-muted">Liste des cartes carburant en stock</small>
                            </div>
                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addCarburant">
                                <i class="ti ti-square-rounded-plus-filled me-2"></i>
                                Ajouter une Carte Carburant
                            </button>
                        </div>
                        <div v-if="carburant != null" class="card-body border-top pt-4">
                            <CarburantTable :carburant="carburant" />
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
        <AddCarburantModel type="card" />
        <DeleteModal title="Supprimer Carte Carburant" text="Voulez-vous vraiment supprimer cette carte carburant ?"
            textButton="Oui, Supprimer" :action="() => logisticsService.removecardsCarburant()"
            message="La carte carburant a été supprimée avec succès" />
    </div>
</template>