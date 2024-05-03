<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { CardTwo, CardTwoSkeleton, DeleteModal } from '@/ui';
import { useSharedStore } from '@/store';
import { sharedService } from '@/services';
import {
    FournisseurTable,
    AddSoustraitantModal
} from './components';
import { Validate } from '../HumanRessources/components/modals';


const sharedStore = useSharedStore();
const isLoading = ref(false);
let fournisseurs = ref(computed(() => sharedStore.fournisseurs.data));
let stats = ref(computed(() => sharedStore.fournisseurs.stats));

let data = ref({
    fournisseurs: null,
    stats: null,
});

onMounted(async () => {
    await sharedService.getSoustraitant();
    data.value.fournisseurs = fournisseurs.value;
    data.value.stats = stats.value;
});

onUnmounted(() => {
    sharedStore.clearFournisseurs();
});

watch(fournisseurs, () => {
    data.value.fournisseurs = fournisseurs.value;
    data.value.stats = stats.value;
}, { deep: true });

const validateTier = async () => {
    await sharedService.validateTier(sharedStore.selectedItem).then(() => {
      isLoading.value = false;
      $('#validate-modal').modal('hide');

    });
};
</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Sous-traitant</span></h5>
        <div v-if="data.stats" class="row g-3">
            <div class="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                <CardTwo title="Sous-traitant" :count="String(data.stats.total)" color="bg-label-primary"
                    icon="ti ti-building-store" card-color=" card-border-shadow-primary" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                <CardTwo title="Sous-traitant Actif" :count="String(data.stats.actif)" color="bg-label-success"
                    icon="ti ti-building-store" card-color="card-border-shadow-success" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                <CardTwo title="Sous-traitant Inactif" :count="String(data.stats.inactif)" color="bg-label-warning"
                    icon="ti ti-building-store" card-color="card-border-shadow-warning" />
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
                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addSoustraitant">
                                <i class="ti ti-square-rounded-plus-filled me-2"></i>
                                Ajouter un sous-traitant
                            </button>
                        </div>
                        <div v-if="data.fournisseurs != null" class="card-body border-top pt-4">
                            <FournisseurTable :fournisseurs="data.fournisseurs" />
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
        <AddSoustraitantModal type="sous-traitant" />
        <DeleteModal title="Supprimer un sous-traitant" text="Voulez-vous vraiment supprimer ce sous-traitant?"
            textButton="Oui, Supprimer" :action="() => sharedService.deleteSoustraitant()"
            message="Sous-traitant supprimé avec succès" />
            <Validate id="validate-modal" :isLoading="isLoading" :method="validateTier" 
            title="Valider Ce Fournisseur" message="Êtes-vous sûr de valider ce fournisseur ?" severity="success" />
    </div>
</template>