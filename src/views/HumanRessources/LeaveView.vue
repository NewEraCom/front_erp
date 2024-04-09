<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { CardOne, CardOneSkeleton } from '@/ui';
import { rhService } from '@/services';
import { useRhStore } from '@/store';
import { LeavesTable, AddNewLeaveModal } from './components';
import { DeleteDocModal, Validate, LeaveDetailsModal } from './components/modals';
import { helpers } from '@/utils';
const rhStore = useRhStore();
const isLoading = ref(false);
const leaves = ref(rhStore.leaves);

const role = localStorage.getItem('role');
const employees = ref(computed(() => rhStore.employees));

onMounted(async () => {
  await rhService.getLeaves();
  await rhService.getEmployees();
  console.log(role);
  

});
// watch(rhStore.leaves, (newValue) => {
//   leaves.value = newValue;
// }, { deep: true });

watch(() => rhStore.leaves, (newValue) => {
  leaves.value = newValue;
});



const ValidateConge = async () => {
  isLoading.value = true;

  const formData = new FormData();
  formData.append('status', 'approved');
  await rhService.Confirmation(rhStore.ItemId, formData).then(() => {
    isLoading.value = false;
    $('#validate-modal').modal('hide');

  });
  // console.log($('#validateInput').val());
};
const RejectConge = async () => {
  isLoading.value = true;

  const formData = new FormData();
  formData.append('status', 'disapproved');
  await rhService.Confirmation(rhStore.ItemId, formData).then(() => {
    isLoading.value = false;
    $('#validate-modal').modal('hide');

  });
  // console.log($('#validateInput').val());
};
const DeleteLeave = async () => {
  isLoading.value = true;

  const formData = new FormData();
  formData.append('status', 'disapproved');
  await rhService.deleteLeave(rhStore.ItemId).then(() => {
    isLoading.value = false;
    $('#delete-leave').modal('hide');

  });
};

</script>
<template>
  <div class="flex-grow-1 container-fluid mt-3">
    <h5 class="py-3 mb-4 fw-medium text-muted">
      Dashboard / <span class="text-dark">Congés</span>
    </h5>
    <div v-if="leaves.stats != null" class="row g-3">
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardOne title="Total Demande de Congés" :count="String(leaves.stats.total)" color="bg-label-warning"
          icon="ti-plane-inflight" card-color="card-border-shadow-warning" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardOne title="Demande Non Traitées" :count="String(leaves.stats.pending)" color="bg-label-danger"
          icon="ti-plane-inflight" card-color="card-border-shadow-danger" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardOne title="Demande Traitées" :count="String(leaves.stats.accepted)" color="bg-label-success"
          icon="ti-plane-inflight" card-color="card-border-shadow-success" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardOne title="Congés Maladie" :count="String(leaves.stats.sick)" color="bg-label-primary" icon="ti-hospital"
          card-color="card-border-shadow-primary" />
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
                <h5 class="fw-bold mb-1">Liste des congés</h5>
                <small class="fw-bold mb-1 text-muted">Liste des congés demandés par les employés</small>
              </div>
              <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addNewLeave" v-if="role == helpers.roles.RH">
                <i class="ti ti-square-rounded-plus-filled me-2"></i>
                Ajouter un congé
              </button>
            </div>
            <div v-if="leaves.data != null" class="card-body border-top pt-4">
              <LeavesTable :leaves="leaves.data" />
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
    <AddNewLeaveModal v-if="employees" :employees="employees" />
    <Validate id="validate-modal" :isLoading="isLoading" :method="ValidateConge" :itemid="rhStore.ItemId"
      title="Valider congé" message="Êtes-vous sûr de valider ce congé" severity="success" />
    <Validate id="reject-modal" :isLoading="isLoading" :method="RejectConge" :itemid="rhStore.ItemId"
      title="Rejeter congé" message="Êtes-vous sûr de rejeter ce congé" severity="danger" />
    <DeleteDocModal id="delete-leave" :isLoading="isLoading" :method="DeleteLeave" :itemid="rhStore.ItemId"
      title="Supprimer Ce conge" message="Êtes-vous sûr de supprimer ce conge ?" />
    <LeaveDetailsModal />
  </div>
</template>

<style scoped></style>
