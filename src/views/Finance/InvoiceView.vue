<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { CardOne } from '@/ui';
import { useFinanceStore } from '@/store';
import { financeService } from '@/services';
import { FactureTable } from './components';


const Prevmodal = "preview-facture"
const FinanceStore = useFinanceStore();
const stats = ref(true)

const facture = ref(computed(() => FinanceStore.facture));

onMounted(async () => {
  await financeService.get();
});

</script>

<template>
  <div class="flex-grow-1 container-fluid mt-3">
    <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Facture</span> </h5>
    <div v-if="stats" class="row">
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardOne title="Total Factures" :count="String(10)" color="bg-label-warning" icon="ti-bolt"
          card-color="card-border-shadow-warning" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardOne title="Facture En attente" :count="String(10)" color="bg-label-success" icon="ti-bolt"
          card-color="card-border-shadow-success" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-3">
        <CardOne title="Facture en cours" :count="String(10)" color="bg-label-info" icon="ti-bolt"
          card-color="card-border-shadow-info" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-3">
        <CardOne title="Facture Traitee" :count="String(10)" color="bg-label-danger" icon="ti-bolt"
          card-color="card-border-shadow-danger" />
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-12">
        <div class="card">
          <div class="card card-border-shadow-primary">
            <div class="card-header">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h5 class="fw-bold mb-1">Facture</h5>
                  <small class="fw-bold mb-1 text-muted">Liste des Facture de l'entreprise</small>
                </div>

              </div>
            </div>
            <div v-if="facture != null" class="card-body border-top pt-4">
              <FactureTable :factures="facture" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
