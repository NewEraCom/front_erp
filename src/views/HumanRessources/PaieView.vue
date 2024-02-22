<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { PaieCard, PaieTable, AddPaieModal } from './components';
import { rhService } from '@/services';
import { useRhStore } from '@/store';


const rhStore = useRhStore();

const paies = ref(computed(() => rhStore.paies));

onMounted(async () => {
  await rhService.getPaies();
});

</script>
<template>
  <div class="flex-grow-1 container-fluid mt-3">
    <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Paie</span> </h5>
    <PaieCard v-if="paies.stats"
      :item-one="[paies.stats.mounth, paies.stats.total_employee, paies.stats.masse, paies.stats.total_prime]" />

    <div class="row mt-2">
      <div class="col-12">
        <div class="card">
          <div class="card card-border-shadow-primary">
            <div class="card-header d-flex justify-content-between align-items-center">
              <div>
                <h5 class="fw-bold mb-1">Paie</h5>
                <small class="fw-bold mb-1 text-muted">Liste des paies</small>
              </div>
              <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addPaie">
                <i class="ti ti-plus me-2"></i>
                Ajouter la paie de ce mois
              </button>
            </div>
            <div v-if="paies.data != null" class="card-body border-top pt-4">
              <PaieTable :paies="paies.data" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <AddPaieModal />
  </div>
</template>

<style scoped></style>
