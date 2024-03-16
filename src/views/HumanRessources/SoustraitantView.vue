<script setup lang="ts">
import { CardOne, CardOneSkeleton } from '@/ui';
import { ref, computed, onMounted } from 'vue';
import { rhService } from '@/services';
import { useRhStore } from '@/store';
import { WorkersTable, AddNewWorkersModal } from './components';
import { DeleteDocModal, WorkerDetailsModal } from './components/modals';

const rhStore = useRhStore();
const isLoading = ref(false);
const workers = ref(computed(() => rhStore.workers));

onMounted(async () => {
  await rhService.getWorkers();
});
const DeleteWorker = async () => {
  console.log('delete', rhStore.ItemId);
  isLoading.value = true;

  await rhService.deleteWorker(rhStore.ItemId).then(() => {
    isLoading.value = false;
    $('#delete-doc').modal('hide');

  });
};
</script>
<template>
  <div class="flex-grow-1 container-fluid mt-3">
    <h5 class="py-3 mb-4 fw-medium text-muted">
      Dashboard / <span class="text-dark">Soustraitant</span>
    </h5>
    <div v-if="workers.stats != null" class="row g-3">
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
        <CardOne title="Total Soustraitant" :count="String(workers.stats.totalSoustraitant)" color="bg-label-primary"
          icon="ti-settings" card-color="card-border-shadow-primary" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
        <CardOne title="Total Employés Soustraitant" :count="String(workers.stats.inactif + workers.stats.actif)"
          color="bg-label-warning" icon="ti-settings" card-color="card-border-shadow-warning" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
        <CardOne title="Total Employés Actif" :count="String(workers.stats.actif)" color="bg-label-success"
          icon="ti-settings" card-color="card-border-shadow-success" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
        <CardOne title="Total Employés Inactif" :count="String(workers.stats.inactif)" color="bg-label-danger"
          icon="ti-settings" card-color="card-border-shadow-danger" />
      </div>

    </div>
    <div v-else class="row g-3">
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardOneSkeleton />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardOneSkeleton />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardOneSkeleton />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardOneSkeleton />
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-12">
        <div class="card">
          <div class="card card-border-shadow-primary">
            <div class="card-header d-flex align-items-center">
              <div class="me-auto">
                <h5 class="fw-bold mb-1">Soustraitants Employés</h5>
                <small class="fw-bold mb-1 text-muted">Liste des Employés</small>
              </div>
              <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addNewWorkers">
                <i class="ti ti-settings-plus me-2"></i>
                Ajouter un employé
              </button>
            </div>
            <div v-if="workers.data != null" class="card-body border-top pt-4">
              <WorkersTable :workers="workers.data" />
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
    <AddNewWorkersModal />
    <DeleteDocModal id="delete-doc" :isLoading="isLoading" :method="DeleteWorker" :itemid="rhStore.ItemId"
      title="Supprimer cet employé ?" message="Êtes-vous sûr de supprimer cet employé ?" />
    <WorkerDetailsModal />
  </div>
</template>

<style scoped></style>
