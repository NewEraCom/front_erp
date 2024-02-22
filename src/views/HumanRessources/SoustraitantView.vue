<script setup lang="ts">
import { CardOne, } from '@/ui';
import { ref, computed, onMounted } from 'vue';
import { rhService } from '@/services';
import { useRhStore } from '@/store';
import { WorkersTable, AddNewWorkersModal } from './components';


const rhStore = useRhStore();

const workers = ref(computed(() => rhStore.workers));

onMounted(async () => {
  await rhService.getWorkers();
});

</script>
<template>
  <div class="flex-grow-1 container-fluid mt-3">
    <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Soustraitant</span> </h5>
    <div v-if="workers.stats != null" class="row g-3">
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
        <CardOne title="Total Soustraitant" :count="String(workers.stats.totalSoustraitant)" color="bg-label-primary"
          icon="ti-settings" card-color="card-border-shadow-primary" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
        <CardOne title="Total Employés Soustraitant" :count="String(workers.stats.inactif + workers.stats.actif)"
          color="bg-label-warning" icon="ti-settings" card-color="card-border-shadow-warning" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
        <CardOne title="Total Employés Actif" :count="String(workers.stats.actif)" color="bg-label-success"
          icon="ti-settings" card-color="card-border-shadow-success" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
        <CardOne title="Total Employés Inactif" :count="String(workers.stats.inactif)" color="bg-label-danger"
          icon="ti-settings" card-color="card-border-shadow-danger" />
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-12">
        <div class="card">
          <div class="card card-border-shadow-primary">
            <div class="card-header d-flex align-items-center">
              <div class="me-auto">
                <h5 class="fw-bold mb-1">Soustraitants</h5>
                <small class="fw-bold mb-1 text-muted">Liste des soustraitants</small>
              </div>
              <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addNewWorkers">
                <i class="ti ti-settings-plus me-2"></i>
                Ajouter un soustraitant
              </button>
            </div>
            <div v-if="workers.data != null" class="card-body border-top pt-4">
              <WorkersTable :workers="workers.data" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <AddNewWorkersModal />

  </div>
</template>

<style scoped></style>
