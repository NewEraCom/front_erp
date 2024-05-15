<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

import { RHStatsCard, EmployeeChart } from './components';

import { rhService } from '@/services';
import { useRhStore } from '@/store';
import { formater } from '@/utils';
import { CardOneSkeleton } from '@/ui';

const RhStore = useRhStore();


const stats = ref(computed(() => RhStore.stats));
const demandeRh = ref(computed(() => RhStore.demandeRh.stats));

const employeeExpire = ref(computed(() => RhStore.employeeExpire));

onMounted(async () => {
  await rhService.getEmployees();
  await rhService.getDemandeRh();
});

onUnmounted(() => {
  RhStore.clearStats();
  RhStore.clearDemandeRh();
});

</script>
<template>
  <div class="flex-grow-1 container-fluid mt-3">
    <!-- <div style="height: 800px;">
    <whereby-embed style="height: 800px;" room="https://neweracom.whereby.com/a23cc19c-e9a0-45c3-9360-81ffe8a51986" />
  </div> -->
    <h5 class="py-3 mb-4 fw-medium">Dashboard</h5>
    <RHStatsCard v-if="stats != null && demandeRh != null" :stats="stats" :pending="demandeRh.pending" />
    <div v-else class="row g-3">
      <div v-for="item in 8" :key="item" class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
        <CardOneSkeleton />
      </div>
    </div>
    <div v-if="stats" class="row mt-2 g-3">
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-6">
        <EmployeeChart title="Statistique des employés" subtitle="Nombre d'employés par mois en"
          color="rgb(37, 144, 250)" :data="stats.employee_per_month" pin="total_employee" legened="Employees"
          type="line" />
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
            <small class="fw-bold mb-1 text-muted" v-if="employeeExpire">{{ employeeExpire.length }} employées expirés
              ce mois</small>
          </div>
          <div class="card-body border-top pt-4" v-if="employeeExpire">
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
                <tbody v-if="employeeExpire.length > 0">
                  <tr v-for="item in employeeExpire" :key="item.id">
                    <td>
                      <router-link :to="{ name: 'ProfileEmployee', params: { id: item.id } }">
                        <h6 class="mb-1 fw-bold text-primary">{{ item.first_name + ' ' + item.last_name }}</h6>
                      </router-link>
                      <small class="fw-bold text-muted">Matricule : {{ item.matricule }}</small>
                    </td>
                    <td class="text-center">
                      <small>{{ formater.date(item.date_embauche) }}</small>
                    </td>
                    <td class="text-center">
                      <small>{{ formater.date(item.fin_contrat) }}</small>
                    </td>
                    <td class="text-center">
                      <small>{{ item.poste }}</small>
                    </td>
                    <td class="text-center">
                      <router-link target="_blank" :to="{ name: 'ProfileEmployee', params: { id: item.id } }"
                        class="btn btn-sm btn-primary">
                        <i class="ti ti-eye"></i>
                      </router-link>
                    </td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr>
                    <td colspan="5" class="text-center">Aucun employé expiré ce mois</td>
                  </tr>
                </tbody>
              </table>
            </div>
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
</template>

<style scoped></style>
