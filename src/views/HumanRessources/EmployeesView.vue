<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { CardOne } from '@/ui';
import { AddNewEmployeeModal } from './components/modals';
import { DeleteModal } from '@/ui';
import { EmployeesTable } from './components';
import { rhService } from '@/services';
import { useRhStore } from '@/store';

const RhStore = useRhStore();

let employees = ref(computed(() => RhStore.employees));
let stats = ref(computed(() => RhStore.stats));

let data = ref({
  employees: null,
  stats: null,
});


onMounted(async () => {
  await rhService.getEmployees();
  data.value.employees = employees.value;
  data.value.stats = stats.value;
});

onUnmounted(() => {
  RhStore.clearEmployees();
});

watch(employees, () => {
  data.value.employees = employees.value;
  data.value.stats = stats.value;
}, { deep: true });


</script>
<template>
  <div class="flex-grow-1 container-fluid mt-3">
    <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Employés</span> </h5>
    <div v-if="data.stats" class="row">
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardOne title="Employés CDI" :count="String(data.stats.cdi)" color="bg-label-warning" icon="ti-bolt"
          card-color="card-border-shadow-warning" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardOne title="Employés CDD" :count="String(data.stats.cdd)" color="bg-label-success" icon="ti-bolt"
          card-color="card-border-shadow-success" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-3">
        <CardOne title="Employés Chantier" :count="String(data.stats.chantier)" color="bg-label-info" icon="ti-bolt"
          card-color="card-border-shadow-info" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-3">
        <CardOne title="Employés Contrat Commercial" :count="String(data.stats.commercial)" color="bg-label-danger"
          icon="ti-bolt" card-color="card-border-shadow-danger" />
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-12">
        <div class="card">
          <div class="card card-border-shadow-primary">
            <div class="card-header">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h5 class="fw-bold mb-1">Employés</h5>
                  <small class="fw-bold mb-1 text-muted">Liste des employés de l'entreprise</small>
                </div>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addNewEmployee">
                  <i class="ti ti-users-plus me-2"></i>
                  Ajouter un employé
                </button>
              </div>
            </div>
            <div v-if="data.employees != null" class="card-body border-top pt-4">
              <EmployeesTable :employees="data.employees" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <AddNewEmployeeModal />
    <DeleteModal title="Supprimer un employé" text="Voulez-vous vraiment supprimer cet employé ?" textButton="Supprimer"
      :action="() => rhService.deleteEmployee()" />
  </div>
</template>

<style scoped></style>
