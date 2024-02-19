<script setup lang="ts">
import { CardOne, } from '@/ui';
import { ref, computed, onMounted } from 'vue';
import { rhService } from '@/services';
import { useRhStore } from '@/store';
import { InternsTable } from './components';


const rhStore = useRhStore();

const interns = ref(computed(() => rhStore.interns));

onMounted(async () => {
  await rhService.getInterns();
});

</script>
<template>
  <div class="flex-grow-1 container-fluid mt-3">
    <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Stagiaires</span> </h5>
    <div v-if="interns.stats != null" class="row g-3">
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
        <CardOne title="Total Stagiaires" :count="String(interns.stats.total)" color="bg-label-primary"
          icon="ti-users-group" card-color="card-border-shadow-primary" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
        <CardOne title="Total Stagiaires Actif" :count="String(interns.stats.actif)" color="bg-label-success"
          icon="ti-users-group" card-color="card-border-shadow-success" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
        <CardOne title="Total Stagiaires Inactif" :count="String(interns.stats.total)" color="bg-label-danger"
          icon="ti-users-group" card-color="card-border-shadow-danger" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
        <CardOne title="Total Stagiaires Potentiels" :count="String(interns.stats.potentialHiring)" color="bg-label-info"
          icon="ti-users-group" card-color="card-border-shadow-info" />
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-12">
        <div class="card">
          <div class="card card-border-shadow-primary">
            <div class="card-header">
              <h5 class="fw-bold mb-1">Stagiaires</h5>
              <small class="fw-bold mb-1 text-muted">Liste des stagiaires</small>
            </div>
            <div v-if="interns.data != null" class="card-body border-top pt-4">
              <InternsTable :interns="interns.data" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
