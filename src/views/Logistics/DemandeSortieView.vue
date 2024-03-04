<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { logisticsService } from '@/services';
import { useLogisticsStore } from '@/store';
import {DemandeSortieTable ,PreviewDemandeSortie} from './components';
const logisticsStore = useLogisticsStore();
const demandeSortie = ref(computed(() => logisticsStore.demandeSortie));
onMounted(async () => {
  await logisticsService.getDemandeSortie();
  console.log(demandeSortie.value);
  
});
const previewmodal = 'demandeSortieModal';

</script>

<template>
  <div class="flex-grow-1 container-fluid mt-3">
    <h5 class="py-3 mb-4 fw-medium text-muted">
      Demande Sortie / <span class="text-dark">Chef de projet</span>
    </h5>
   
    <div class="row mt-4">
      <div class="col-12">
        <div class="card">
          <div class="card card-border-shadow-primary">
            <div class="card-header">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h5 class="fw-bold mb-1">Demandes Sortie</h5>
                  <small class="fw-bold mb-1 text-muted">Liste des Demandes Sortie</small>
                </div>

              </div>
            </div>
            <div v-if="demandeSortie != null" class="card-body border-top pt-4">
              <DemandeSortieTable :demandesortie="demandeSortie" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <PreviewDemandeSortie :id="previewmodal"/>
  </div>
</template>
