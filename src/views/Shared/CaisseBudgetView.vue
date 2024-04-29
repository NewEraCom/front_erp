<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { CardOne, CardOneSkeleton } from '@/ui';
import {  sharedService } from '@/services';
import { useSharedStore } from '@/store';
import { BudgetTable } from './components';
import {NewBudgetSiegeModal} from './components/modals';
import { Validate } from '../HumanRessources/components/modals';
const sharedStore = useSharedStore();


const budget = ref( sharedStore.budgetSiege);
const isLoading = ref(false);
onMounted(async () => {
  await sharedService.getCaisseSiege();
});


watch(() => sharedStore.budgetSiege, (newValue) => {
  budget.value = newValue;
});
const ValidateCaisse = async () => {
  isLoading.value = true;

  const formData = new FormData();
  formData.append('status', 1);
  await sharedService.ValidateCaisseProject(sharedStore.selectedItem, formData).then(() => {
    isLoading.value = false;
    $('#validate-modal').modal('hide');

  });
  // console.log($('#validateInput').val());
};
const RejectCaisse = async () => {
  isLoading.value = true;

  const formData = new FormData();
  formData.append('status', 0);
  await sharedService.ValidateCaisseProject(sharedStore.selectedItem, formData).then(() => {
    isLoading.value = false;
    $('#reject-modal').modal('hide');

  });
  // console.log($('#validateInput').val());
};
</script>
<template>
  <div class="flex-grow-1 container-fluid mt-3">
    <h5 class="py-3 mb-4 fw-medium text-muted">
      Dashboard / <span class="text-dark">Budget Siege</span>
    </h5>
    <div v-if="budget != null" class="row g-3">
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardOne title="Total des budgets" :count="10" color="bg-label-warning"
          icon="ti-plane-inflight" card-color="card-border-shadow-warning" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardOne title="Demande des budgets SIEGE" :count="10" color="bg-label-danger"
          icon="ti-plane-inflight" card-color="card-border-shadow-danger" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardOne title="Demande Traitées" :count="10" color="bg-label-success"
          icon="ti-plane-inflight" card-color="card-border-shadow-success" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardOne title="Congés Maladie" :count="10" color="bg-label-primary" icon="ti-hospital"
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
                <h5 class="fw-bold mb-1">Liste des Budget</h5>
                <small class="fw-bold mb-1 text-muted">Liste des Budgets </small>
              </div>
              <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newCaisse">
                <i class="ti ti-square-rounded-plus-filled me-2"></i>
                Ajouter un Budget
              </button>
            </div>
            <div v-if="budget != null" class="card-body border-top pt-4">
              <BudgetTable :budget="budget" />
            </div>
            <!-- <div v-else class="card-body border-top pt-4 d-flex align-items-center justify-content-center"
              style="height: 650px;">
              <div class="row mt-5">
                <div class="col-12 text-center">
                  <h5>Chargement des données...</h5>
                  <div class="spinner-border text-primary mt-4" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <NewBudgetSiegeModal/>
    <Validate id="validate-modal" :isLoading="isLoading" :method="ValidateCaisse" 
      title="Valider Caisse" message="Êtes-vous sûr de valider cet caisse" severity="success" />
    <Validate id="reject-modal" :isLoading="isLoading" :method="RejectCaisse" 
      title="Rejeter Caisse" message="Êtes-vous sûr de rejeter cet caisse" severity="danger" />
  </div>
</template>

<style scoped></style>
