<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

import { RHStatsCard, EmployeeChart } from './components';

import { rhService } from '@/services';
import { useRhStore } from '@/store';

const stats = ref(computed(() => RhStore.stats));

const RhStore = useRhStore();

onMounted(async () => {
  await rhService.getEmployees();
});

</script>
<template>
  <div class="flex-grow-1 container-fluid mt-3">
    <h5 class="py-3 mb-4 fw-medium">Dashboard</h5>
    <RHStatsCard v-if="stats" :stats="stats" />
    <div v-if="stats" class="row mt-2 g-3">
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-6">
        <EmployeeChart title="Statistique des employés" subtitle="Nombre d'employés par mois en" color="rgb(37, 144, 250)"
          :data="stats.employee_per_month" pin="total_employee" legened="Employees" type="line" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-6">
        <EmployeeChart title="Statistique des salaires" subtitle="Mass salarial par mois en" color="rgb(103, 52, 235)"
          :data="stats.mass_salariale_per_month" pin="masse" legened="Mass Salariale" type="bar" />
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-12">
        <div class="card card-border-shadow-primary">
          <div class="card-header">
            <h5 class="fw-bold mb-1">Employés CDD</h5>
            <small class="fw-bold mb-1 text-muted">0 employées expirés ce mois</small>
          </div>
          <div class="card-body border-top pt-4">
            <div class="table-responsive">
              <table class="table table-hover align-middle">
                <thead class="table-light">
                  <tr>
                    <th class="fw-bold">Employé</th>
                    <th class="fw-bold text-center">Date d'embauche</th>
                    <th class="fw-bold text-center">Date de fin de contrat</th>
                    <th class="fw-bold text-center">Poste</th>
                    <th class="fw-bold text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>John Doe</td>
                    <td class="text-center">John Doe</td>
                    <td class="text-center">John Doe</td>
                    <td class="text-center">John Doe</td>
                    <td class="text-center">
                      <button class="btn btn-sm btn-primary">
                        <i class="ti ti-eye"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
