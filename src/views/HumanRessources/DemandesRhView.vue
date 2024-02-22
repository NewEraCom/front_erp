<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { CardOne } from '@/ui';
import { rhService } from '@/services';
import { useRhStore } from '@/store';
import { DemandeRhTable, AddDemandeRhModal } from './components';

const rhStore = useRhStore();

const demandeRh = ref(computed(() => rhStore.demandeRh));
const employees = ref(computed(() => rhStore.employees));

onMounted(async () => {
  await rhService.getDemandeRh();
  await rhService.getEmployees();
});
</script>
<template>
  <div class="flex-grow-1 container-fluid mt-3">
    <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Demande RH</span></h5>
    <div v-if="demandeRh.stats" class="row g-3">
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardOne title="Total Demande" :count="String(demandeRh.stats.total)" color="bg-label-primary"
          icon="ti-file-export" card-color="card-border-shadow-primary" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardOne title="Demande en attente" :count="String(demandeRh.stats.pending)" color="bg-label-warning"
          icon="ti-file-export" card-color="card-border-shadow-warning" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardOne title="Demande traité" :count="String(demandeRh.stats.done)" color="bg-label-success"
          icon="ti-file-export" card-color="card-border-shadow-success" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardOne title="Demande livré" :count="String(demandeRh.stats.delivered)" color="bg-label-info"
          icon="ti-file-export" card-color="card-border-shadow-info" />
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-12">
        <div class="card">
          <div class="card card-border-shadow-primary">
            <div class="card-header d-flex align-items-center">
              <div class="me-auto">
                <h5 class="fw-bold mb-1">Demande RH</h5>
                <small class="fw-bold mb-1 text-muted">Liste des demandes RH</small>
              </div>
              <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addDemandeRh">
                <i class="ti ti-file-plus me-2"></i>
                Ajouter une demande RH
              </button>
            </div>
            <div v-if="demandeRh.data" class="card-body border-top pt-4">
              <DemandeRhTable :demandes="demandeRh.data" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <AddDemandeRhModal v-if="employees" :employees="employees" />
  </div>
</template>

<style scoped></style>
