<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { CardTwo, CardTwoSkeleton } from '@/ui';
import { useSharedStore } from '@/store';
import { sharedService } from '@/services';
import { FournisseurTable } from './components';

const sharedStore = useSharedStore();

const fournisseurs = ref(computed(() => sharedStore.fournisseurs.data));
const stats = ref(computed(() => sharedStore.fournisseurs.stats));

onMounted(async () => {
    await sharedService.getSoustraitant();
});

onUnmounted(() => {
    sharedStore.clearFournisseurs();
});


</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Sous-traitant</span></h5>
        <div v-if="stats" class="row g-3">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardTwo title="Sous-traitant" :count="stats.total" color="bg-label-primary" icon="ti ti-building-store"
                    card-color=" card-border-shadow-primary" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardTwo title="Sous-traitant Actif" :count="stats.actif" color="bg-label-warning"
                    icon="ti ti-building-store" card-color="card-border-shadow-warning" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardTwo title="Sous-traitant Inactif" :count="stats.inactif" color="bg-label-success"
                    icon="ti ti-building-store" card-color="card-border-shadow-success" />
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
                                <h5 class="fw-bold mb-1">Liste des sous-traitants</h5>
                                <small class="fw-bold mb-1 text-muted">Liste des Sous-traitants</small>
                            </div>
                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addNewLeave">
                                <i class="ti ti-square-rounded-plus-filled me-2"></i>
                                Ajouter un sous-traitant
                            </button>
                        </div>
                        <div v-if="fournisseurs != null" class="card-body border-top pt-4">
                            <FournisseurTable :fournisseurs="fournisseurs" />
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