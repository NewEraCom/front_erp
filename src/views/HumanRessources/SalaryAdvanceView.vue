<script setup lang="ts">
import { SalaryAdvancesCard } from './components';
import { ref, computed, onMounted } from 'vue';
import { rhService } from '@/services';
import { useRhStore } from '@/store';
import { SalaryAdvancesTable, AddSalaryAdvanceModal } from './components';
import { formater } from '@/utils';

const rhStore = useRhStore();

const salaryAdvances = ref(computed(() => rhStore.salaryAdvances));
const employees = ref(computed(() => rhStore.employees));

onMounted(async () => {
  await rhService.getSalarayAdvances();
  await rhService.getEmployees();
});


</script>
<template>
  <div class="flex-grow-1 container-fluid mt-3">
    <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Avance sur salaire</span> </h5>
    <SalaryAdvancesCard v-if="salaryAdvances.stats"
      :item-one="['Total Avance', formater.number(salaryAdvances.stats.total), 'currency', 'ti ti-coins', 'bg-label-primary']"
      :item-two="['Total Récupéré', formater.number(parseFloat(salaryAdvances.stats.total) - parseFloat(salaryAdvances.stats.remaining)), 'currency', 'ti ti-coins', 'bg-label-success']"
      :item-three="['Total Restant', formater.number(salaryAdvances.stats.remaining), 'currency', 'ti ti-coins', 'bg-label-warning']" />

    <div class="row mt-2">
      <div class="col-12">
        <div class="card">
          <div class="card card-border-shadow-primary">
            <div class="card-header d-flex justify-content-between align-items-center">
              <div>
                <h5 class="fw-bold mb-1">Avance sur salaire</h5>
                <small class="fw-bold mb-1 text-muted">Liste des avances sur salaire</small>
              </div>
              <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addSalaryAdvance">
                <i class="ti ti-plus me-2"></i>
                Ajouter une avance sur salaire
              </button>
            </div>
            <div v-if="salaryAdvances.data" class="card-body border-top pt-4">
              <SalaryAdvancesTable :salaryAdvances="salaryAdvances.data" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <AddSalaryAdvanceModal v-if="employees" :employees="employees" />
  </div>
</template>

<style scoped></style>
