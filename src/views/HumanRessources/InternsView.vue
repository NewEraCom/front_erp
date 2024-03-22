<script setup lang="ts">
import { CardOne, CardOneSkeleton } from '@/ui';
import { ref, computed, onMounted, watch } from 'vue';
import { rhService } from '@/services';
import { useRhStore } from '@/store';
import { InternsTable, AddNewInternsModal } from './components';
import { EditStgModal, DeleteDocModal, ValidatePot } from './components/modals';

const rhStore = useRhStore();
const isLoading = ref(false);
const interns = ref(computed(() => rhStore.interns));

onMounted(async () => {
  await rhService.getInterns();
});



watch(interns, (newValue) => {
  interns.value = newValue;
}, { deep: true });

const deleteStg = async () => {
  isLoading.value = true;
  await rhService.deleteIntern(rhStore.ItemId).then(() => {
    $('#delete-doc').modal('hide');
  }).catch((error) => {
    console.error('Error during action execution', error);
  }).finally(() => {
    isLoading.value = false;
  });
};
const ValidatePotfunc = async () => {
  isLoading.value = true;
  const formData = new FormData();
  formData.append('potentiel', String(1));
  await rhService.potentielIntern(rhStore.ItemId, formData).then(() => {
    isLoading.value = false;

    $('#add-potentiel').modal('hide');
  });
};
const RemovePotfunc = async () => {
  isLoading.value = true;
  const formData = new FormData();
  formData.append('potentiel', 0);
  await rhService.potentielIntern(rhStore.ItemId, formData).then(() => {
    isLoading.value = false;
    $('#remove-potentiel').modal('hide');
  });
};

</script>
<template>
  <div class="flex-grow-1 container-fluid mt-3">
    <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Stagiaires</span> </h5>
    <div v-if="interns.stats != null" class="row g-3">
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
        <CardOne title="Total Stagiaires" :count="String(interns.stats.total)" color="bg-label-primary"
          icon="ti-users-group" card-color="card-border-shadow-primary" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
        <CardOne title="Total Stagiaires Actif" :count="String(interns.stats.actif)" color="bg-label-success"
          icon="ti-users-group" card-color="card-border-shadow-success" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
        <CardOne title="Total Stagiaires Inactif" :count="String(interns.stats.total)" color="bg-label-danger"
          icon="ti-users-group" card-color="card-border-shadow-danger" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
        <CardOne title="Total Stagiaires Potentiels" :count="String(interns.stats.potentialHiring)"
          color="bg-label-info" icon="ti-users-group" card-color="card-border-shadow-info" />
      </div>
    </div>
    <div v-else class="row g-3 mb-4">
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
                <h5 class="fw-bold mb-1">Stagiaires</h5>
                <small class="fw-bold mb-1 text-muted">Liste des stagiaires</small>
              </div>
              <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addNewInterns">
                <i class="ti ti-users-plus me-2"></i>
                Ajouter un stagiaire
              </button>
            </div>
            <div v-if="interns.data != null" class="card-body border-top pt-4">
              <InternsTable :interns="interns.data" />
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
    <AddNewInternsModal />
    <EditStgModal :stg="rhStore.Item" />
    <DeleteDocModal id="delete-doc" :isLoading="isLoading" :method="deleteStg" :itemid="rhStore.ItemId"
      title="Supprimer le document" message="Êtes-vous sûr de supprimer ce document ?" />
    <ValidatePot id="add-potentiel" :isLoading="isLoading" :method="ValidatePotfunc" :itemid="rhStore.ItemId"
      title="Ajout à liste de potentiels" message="Êtes-vous sûr d'ajouter ce stagiaire à la liste de potentiels" />
    <ValidatePot id="remove-potentiel" :isLoading="isLoading" :method="RemovePotfunc" :itemid="rhStore.ItemId"
      title="Retirer de la liste de potentiels"
      message="Êtes-vous sûr de retirer ce stagiaire de la liste de potentiels" />

  </div>
</template>

<style scoped></style>
