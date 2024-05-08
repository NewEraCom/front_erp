<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { CardTwo } from '@/ui';
import sales_service from '@/services/sales_service';
import { FactureClientTable } from './components';
import { useSalesStore } from '@/store';


const SalesStore = useSalesStore();
const stats = ref(computed(() => SalesStore.invoices.stats));

const facture = ref(computed(() => SalesStore.invoices.data));

onMounted(async () => {
  await sales_service.getFacturesClient();
});

</script>

<template>
  <div class="flex-grow-1 container-fluid mt-3">
    <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Facture Client</span> </h5>
    <div v-if="stats" class="row">
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardTwo title="Total Factures" :count="String(stats.total)" color="bg-label-warning" icon="ti-bolt"
          card-color="card-border-shadow-warning" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardTwo title="Facture En attente" :count="String(stats.pending)" color="bg-label-success" icon="ti-bolt"
          card-color="card-border-shadow-success" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-3">
        <CardTwo title="Facture en cours" :count="String(stats.ongoing)" color="bg-label-info" icon="ti-bolt"
          card-color="card-border-shadow-info" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-3">
        <CardTwo title="Facture Traitee" :count="String(stats.completed)" color="bg-label-danger" icon="ti-bolt"
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
                  <h5 class="fw-bold mb-1">Facture Client</h5>
                  <small class="fw-bold mb-1 text-muted">Liste des Facture CLient de l'entreprise</small>
                </div>

              </div>
            </div>
            <div v-if="facture != null" class="card-body border-top pt-4">
              <FactureClientTable :factures="facture" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
