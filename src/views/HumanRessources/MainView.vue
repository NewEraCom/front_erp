<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

import { RHStatsCard, MassSalarialChart, EmployeePerMonth } from './components';

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
    <div class="row mt-4">
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-6">
        <MassSalarialChart />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-6">
        <EmployeePerMonth />
      </div>
    </div>
    <div class="row mt-1">
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
