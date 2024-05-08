<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { CardOne, CardOneSkeleton } from '@/ui';
import { rhService } from '@/services';
import { useRhStore } from '@/store';
import { DemandeRhTable, AddDemandeRhModal } from './components';
import { Validate, DeleteDocModal, DemandeRhDetailsModal, AddattachmentModal } from './components/modals';
import { useToast } from 'vue-toastification';

const toast = useToast();
const rhStore = useRhStore();
const isLoading = ref(false);
const demandeRh = ref(rhStore.demandeRh.data);
const stats = ref(computed(() => rhStore.demandeRh.stats));
const employees = ref(computed(() => rhStore.employees));

const data = ref(null);

onMounted(async () => {
  await rhService.getDemandeRh();
  await rhService.getEmployees();
  data.value = demandeRh.value;
});

watch(
  () => rhStore.demandeRh.data,
  (newValue) => {
    demandeRh.value = newValue;
    data.value = newValue;
  }
);


const ReceivedDmnd = async () => {
  isLoading.value = true;
  await rhService.ReceivedDemandeRh(rhStore.ItemId).then(() => {
    isLoading.value = false;
    $('#receive-modal').modal('hide');
    toast.success('Demande Recuperée avec succès');
  }).catch((error) => {
    console.error('Error during action execution', error);
    toast.error('Une erreur est survenue');
  });
};


const DeleteDmnd = async () => {
  isLoading.value = true;
  await rhService.DeleteDemandeRh(rhStore.ItemId).then(() => {
    isLoading.value = false;
    $('#delete-modal').modal('hide');
    toast.success('Demande supprimée avec succès');
  }).catch((error) => {
    console.error('Error during action execution', error);
    toast.error('Une erreur est survenue');
  });
};

</script>
<template>
  <div class="flex-grow-1 container-fluid mt-3">
    <h5 class="py-3 mb-4 fw-medium text-muted">
      Dashboard / <span class="text-dark">Demande RH</span>
    </h5>
    <div v-if="stats" class="row g-3">
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardOne title="Total Demande" :count="String(stats.total)" color="bg-label-primary" icon="ti-file-export"
          card-color="card-border-shadow-primary" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardOne title="Demande en attente" :count="String(stats.pending)" color="bg-label-warning"
          icon="ti-file-export" card-color="card-border-shadow-warning" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardOne title="Demande traité" :count="String(stats.done)" color="bg-label-success" icon="ti-file-export"
          card-color="card-border-shadow-success" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardOne title="Demande livré" :count="String(stats.delivered)" color="bg-label-info" icon="ti-file-export"
          card-color="card-border-shadow-info" />
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
                <h5 class="fw-bold mb-1">Demande RH</h5>
                <small class="fw-bold mb-1 text-muted">Liste des demandes RH</small>
              </div>
              <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addDemandeRh">
                <i class="ti ti-file-plus me-2"></i>
                Ajouter une demande RH
              </button>
            </div>
            <div v-if="data" class="card-body border-top pt-4">
              <DemandeRhTable :demandes="data" />
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
    <AddDemandeRhModal v-if="employees" :employees="employees" />
    <Validate id="receive-modal" :isLoading="isLoading" :method="ReceivedDmnd" :itemid="rhStore.ItemId"
      title="Demande Recuperée" message="Êtes-vous sûr de valider cette demande ?" severity="success" />
    <DeleteDocModal id="delete-modal" :isLoading="isLoading" :method="DeleteDmnd" :itemid="rhStore.ItemId"
      title="Supprimer Cette demande" message="Êtes-vous sûr de supprimer cet demande ?" />
    <DemandeRhDetailsModal />
    <AddattachmentModal :id="rhStore.ItemId"/>
  </div>
</template>

<style scoped></style>
