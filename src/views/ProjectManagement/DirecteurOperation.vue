
<script setup lang="ts">

import {onMounted, ref,computed} from 'vue';
import { PMService } from '@/services';
import { usePMStore } from '@/store';
import { CardOne } from '@/ui';
import {AchatTable} from './components';
import {ProjectChart ,AchatPieChart} from '@/ui'

const PMStore = usePMStore()

const demande_achat = ref(computed(() => PMStore.purchase));
const data = ref(computed(() => PMStore.stats));

onMounted(async () => {
    await PMService.getDataManager();
    await PMService.getPurchasesOrder();
});
</script>
<template>
    <div class="flex-grow-1 container-fluid mt-3">
    <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Chef de projet</span> </h5>
    <div v-if="data" class="row g-3">
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardOne title="Total Budget des Projets" :count="String(data.projects_budget_total) + ' MAD'" color="bg-label-success"
          icon="ti-shopping-cart-copy" card-color="card-border-shadow-success" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardOne title="Total des Projets" :count="String(data.projects_total)"
          color="bg-label-primary" icon="ti-shopping-cart-copy" card-color="card-border-shadow-primary" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-3">
        <CardOne title="Total demande d'achat" :count="String(data.count_purchase_ordre)" color="bg-label-info"
          icon="ti-shopping-cart-copy" card-color="card-border-shadow-info" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-3">
        <CardOne title="Total Staff" :count="String(data.totalStaff)" color="bg-label-secondary"
          icon="ti-shopping-cart-copy" card-color="card-border-shadow-secondary" />
      </div>
    </div>
    <!-- Last 10 Achats -->
    <div class="row mt-4">
      <div class="col-12">
        <div class="card">
          <div class="card card-border-shadow-primary">
            <div class="card-header">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h5 class="fw-bold mb-1">Demande d'achat</h5>
                  <small class="fw-bold mb-1 text-muted">10 derniers Demande d'achat</small>
                </div>

              </div>
            </div>
            <div v-if="demande_achat != null" class="card-body border-top pt-4">
              <AchatTable :demandeAchat="demande_achat.slice(0,10)" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /Last 10 Achats -->
    <div v-if="data" class="row mt-4">
            <div class="col-6">
                <ProjectChart
                    title="Statistique des projets"
                    subtitle="Budget des Projets"
                    color="rgb(37, 144, 250)"
                    :data="data.chart"
                    pin="total_employee"
                    legened="Budget en MAD"
                    type="bar"
                />
            </div>
            <div class="col-6">
                <AchatPieChart :data="data.achatByProject" />
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>