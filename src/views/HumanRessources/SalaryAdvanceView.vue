<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { SalaryAdvancesCard, SalaryAdvancesDetailsModal, SalaryAdvancesTable, AddSalaryAdvanceModal } from './components';
import { DeleteModal } from '@/ui';
import { rhService } from '@/services';
import { useRhStore } from '@/store';
import { formater } from '@/utils';

const rhStore = useRhStore();

const salaryAdvances = ref(computed(() => rhStore.salaryAdvances));
const employees = ref(computed(() => rhStore.employees));

const data = ref({
  salaryAdvances: null,
  stats: null,
});

onMounted(async () => {
  await rhService.getSalarayAdvances();
  await rhService.getEmployees();
  data.value.salaryAdvances = salaryAdvances.value.data;
  data.value.stats = salaryAdvances.value.stats;
});

watch(() => salaryAdvances, () => {
  data.value.salaryAdvances = salaryAdvances.value.data;
  data.value.stats = salaryAdvances.value.stats;
});

</script>
<template>
  <div class="flex-grow-1 container-fluid mt-3">
    <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Avance sur salaire</span> </h5>
    <SalaryAdvancesCard v-if="data.stats"
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
            <div v-if="data.salaryAdvances" class="card-body border-top pt-4">
              <SalaryAdvancesTable :salaryAdvances="data.salaryAdvances" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <AddSalaryAdvanceModal v-if="employees" :employees="employees" />
    <SalaryAdvancesDetailsModal />
    <DeleteModal title="Supprimer un avance sur salaire" text="Voulez-vous vraiment supprimer cette avance sur salaire ?"
      textButton="Oui, Supprimer" :action="() => rhService.deleteSalaryAdvance()" />
  </div>
</template>

<style scoped></style>
