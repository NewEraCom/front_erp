<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { CardOne } from '@/ui';
import { rhService } from '@/services';
import { useRhStore } from '@/store';
import { LeavesTable } from './components';

const RhStore = useRhStore();

const leaves = ref(computed(() => RhStore.leaves));

onMounted(async () => {
  await rhService.getLeaves();
});

</script>
<template>
  <div class="flex-grow-1 container-fluid mt-3">
    <h5 class="py-3 mb-4 fw-medium text-muted">
      Dashboard / <span class="text-dark">Congés</span>
    </h5>

    <div v-if="leaves.stats != null" class="row g-3">
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardOne title="Total Demande de Congés" :count="String(leaves.stats.total)" color="bg-label-warning"
          icon="ti-plane-inflight" card-color="card-border-shadow-warning" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardOne title="Demande Non Traitées" :count="String(leaves.stats.pending)" color="bg-label-danger"
          icon="ti-plane-inflight" card-color="card-border-shadow-danger" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardOne title="Demande Traitées" :count="String(leaves.stats.accepted)" color="bg-label-success"
          icon="ti-plane-inflight" card-color="card-border-shadow-success" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardOne title="Congés Maladie" :count="String(leaves.stats.sick)" color="bg-label-primary" icon="ti-hospital"
          card-color="card-border-shadow-primary" />
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-12">
        <div class="card">
          <div class="card card-border-shadow-primary">
            <div class="card-header">
              <h5 class="fw-bold mb-1">Liste des congés</h5>
              <small class="fw-bold mb-1 text-muted">Liste des congés demandés par les employés</small>
            </div>
            <div v-if="leaves.data != null" class="card-body border-top pt-4">
              <LeavesTable :leaves="leaves.data" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
