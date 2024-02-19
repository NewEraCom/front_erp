<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { CardOne } from '@/ui';
import { rhService } from '@/services';

const employees = ref(null);

onMounted(async () => {
  employees.value = await rhService.getEmployees();
});



</script>
<template>
  <div class="flex-grow-1 container-fluid mt-3">
    <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Demandes RH</span> </h5>
    <div class="row g-3">
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
        <CardOne title="Total Stagiaires" :count="120" color="bg-label-primary" icon="ti-users-group"
          card-color="card-border-shadow-primary" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
        <CardOne title="Total Stagiaires Actif" :count="120" color="bg-label-success" icon="ti-users-group"
          card-color="card-border-shadow-success" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
        <CardOne title="Total Stagiaires Inactif" :count="120" color="bg-label-danger" icon="ti-users-group"
          card-color="card-border-shadow-danger" />
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-12">
        <div class="card">
          <div class="card card-border-shadow-primary">
            <div class="card-header">
              <h5 class="fw-bold mb-1">Employés CDD</h5>
              <small class="fw-bold mb-1 text-muted">0 employées expirés ce mois</small>
            </div>
            <div class="card-body border-top pt-4">

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
