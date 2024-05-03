<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { CardTwo, CardTwoSkeleton, DeleteModal } from '@/ui';
import { useSharedStore } from '@/store';
import { sharedService } from '@/services';
import { ValidateCaisseTable, DetailsCaisseProjectModal } from './components';
import { Validate } from '../HumanRessources/components/modals';

const sharedStore = useSharedStore();
const isLoading = ref(false);
const data = ref(computed(() => sharedStore.caisse.data));
const stats = ref(computed(() => sharedStore.caisse.stats));

const caisse = ref(null);

onMounted(async () => {
    await sharedService.getCaisse();
});

onUnmounted(() => {
    sharedStore.clearCaisse();
});



watch(data, () => {
    caisse.value = data.value;
}, { deep: true });

const ValidateCaisse = async () => {
    let ids = [];
    if (Array.isArray(sharedStore.selectedCaisse)) {
        ids = sharedStore.selectedCaisse.map(caisse => caisse.id);
    }
    const data = {
        caisse_ids: ids,
        status:1
    };
    await sharedService.validateCaisse(data).then(() => {
      isLoading.value = false;
      $('#validate-modal').modal('hide');

    });
};
</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Validation des caisses des Projets</span>
        </h5>
        <div v-if="stats" class="row">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwo title="Total Demande" :count="String(stats.total)" color="bg-label-primary"
                    icon="ti ti-zoom-filled" card-color=" card-border-shadow-primary" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwo title="Demande en attente" :count="String(stats.pending)" color="bg-label-warning"
                    icon="ti ti-zoom-filled" card-color="card-border-shadow-warning" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwo title="Demande validée" :count="String(stats.valide)" color="bg-label-success"
                    icon="ti ti-zoom-filled" card-color="card-border-shadow-success" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwo title="Demande refusé" :count="String(stats.rejected)" color="bg-label-danger"
                    icon="ti ti-zoom-filled" card-color="card-border-shadow-danger" />
            </div>
        </div>
        <div v-else class="row">
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
                                <h5 class="fw-bold mb-1">Liste des demandes de caisse</h5>
                                <small class="fw-bold mb-1 text-muted">Liste des demandes de caisse demandées par
                                    vous</small>
                            </div>
                            
                        </div>
                        <div v-if="caisse != null" class="card-body border-top pt-4">
                            <ValidateCaisseTable :data="caisse" />
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
        <DetailsCaisseProjectModal />
        <DeleteModal title="Supprimer un Demande" text="Voulez-vous vraiment supprimer cette demande ?"
            textButton="Oui, Supprimer" :action="() => sharedService.deleteRecruitment('shared')"
            message="La demande a été supprimée avec succès" />
            <Validate id="validate-modal" :isLoading="isLoading" :method="ValidateCaisse" 
            title="Valider Cet demande de caisse" message="Êtes-vous sûr de valider cet demande ?" severity="success" />
    </div>
</template>

<style scoped>
.f-45 {
    font-size: 45px;
}
</style>
