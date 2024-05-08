<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

import { ChequeTable } from './components'
import { financeService } from '@/services';
import { useFinanceStore } from '@/store';
import AddEffetModal from './components/AddEffetModal.vue';

const FinanceStore = useFinanceStore();

const stats = ref(computed(() => FinanceStore.stats));

const cheque = ref(computed(() => FinanceStore.cheque))

console.log("Cheque", cheque)

onMounted(async () => {
  await financeService.getCheque()
})

</script>

<template>
  <div class="flex-grow-1 container-fluid mt-3">
    <h5 class="py-3 mb-4 fw-medium text-muted">
      Dashboard / <span class="text-dark">Effet</span>
    </h5>
    
    <div class="row mt-4">
      <div class="col-12">
        <div class="card">
          <div class="card card-border-shadow-primary">
            <div class="card-header">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h5 class="fw-bold mb-1">Cheque</h5>
                  <small class="fw-bold mb-1 text-muted">Liste des Effet de l'entreprise</small>
                </div>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addeffet">
                                <i class="ti ti-square-rounded-plus-filled me-2"></i>
                                Ajouter un Effet
                            </button>
              </div>
            </div>
            <div v-if="cheque != null" class="card-body border-top pt-4">
              <ChequeTable :cheques="cheque.filter(
                    (item: any) => item.type === 'effet'
                )" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <AddEffetModal />
  </div>
</template>
