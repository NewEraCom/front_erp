<script setup lang="ts">

import { onMounted, ref, computed, onUnmounted } from 'vue';
import { pmService, salesService } from '@/services';
import { usePMStore, useSalesStore } from '@/store';
import { CardOne, CardOneSkeleton } from '@/ui';
import { helpers, formater } from '@/utils';

const PMStore = usePMStore();
const salesStore = useSalesStore();

const demande_achat = ref(computed(() => salesStore.purchaseOrders.data));

const data = ref(computed(() => PMStore.stats));

onMounted(async () => {
  await pmService.getDataManager();
  await salesService.getPurchaseOrdersByProjectManager('Achats');
});

onUnmounted(() => {
  salesStore.clearPurchaseOrders();
  PMStore.clearStats();
});

</script>
<template>
  <div class="flex-grow-1 container-fluid mt-3">
    <h5 class="py-3 mb-4 fw-medium">Dashboard </h5>
    <div v-if="data" class="row g-3">
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardOne title="Total Budget des Projets" :count="String(formater.number(data.projects_budget_total)) + ' MAD'"
          color="bg-label-success" icon="ti-shopping-cart-copy" card-color="card-border-shadow-success" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardOne title="Total des Projets" :count="String(data.projects_total)" color="bg-label-primary"
          icon="ti-shopping-cart-copy" card-color="card-border-shadow-primary" />
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
    <div v-else class="row g-3">
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardOneSkeleton />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardOneSkeleton />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardOneSkeleton />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardOneSkeleton />
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-6">
        <div class="card card-border-shadow-primary">
          <div class="card-header">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h5 class="fw-bold mb-1">Demande d'achat</h5>
                <small class="fw-bold mb-1 text-muted">Liste des demandes d'achat</small>
              </div>
            </div>
          </div>
          <div v-if="demande_achat" class="card-body">
            <table class="table">
              <thead class="table-light">
                <tr>
                  <th scope="col" class="fw-bold">N° Ordre</th>
                  <th scope="col" class="fw-bold text-center">Projet</th>
                  <th scope="col" class="fw-bold text-center">Status</th>
                </tr>
              </thead>
              <tbody v-if="demande_achat.length != 0">
                <tr v-for="item in demande_achat" :key="item.id">
                  <td class="fw-bold">
                    <small>{{ item.n_order }}</small>
                  </td>
                  <td class="fw-bold text-center">
                    <small>{{ item.project.code }}</small>
                  </td>
                  <td class="text-center">
                    <span :class="helpers.returnBadge(item.status)[0]" class="fw-bold">
                      {{ helpers.returnBadge(item.status)[1] }}
                    </span>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="4" class="text-center">Aucune demande d'achat</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="card-body border-top pt-4 d-flex align-items-center justify-content-center"
            style="height: 650px;">
            <div class="row mt-5">
              <div class="col-12 text-center">
                <h5>Chargement des données...</h5>
                <div class="spinner-border text-primary mt-4" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="card card-border-shadow-primary">
          <div class="card-header">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h5 class="fw-bold mb-1">Derniers Factures</h5>
                <small class="fw-bold mb-1 text-muted">Liste des derniers factures</small>
              </div>
            </div>
          </div>
          <div v-if="demande_achat" class="card-body">
            <table class="table">
              <thead class="table-light">
                <tr>
                  <th scope="col" class="fw-bold">N° Facture</th>
                  <th scope="col" class="fw-bold text-center">Client</th>
                  <th scope="col" class="fw-bold text-center">Projet</th>
                  <th scope="col" class="fw-bold text-center">Status</th>
                </tr>
              </thead>
              <tbody v-if="demande_achat.length != 0">
                <tr v-for="item in demande_achat" :key="item.id">
                  <td class="fw-bold">
                    <small>{{ item.n_order }}</small>
                  </td>
                  <td class="fw-bold text-center">
                    <small>{{ item.project.code }}</small>
                  </td>
                  <td class="text-center">
                    <span :class="helpers.returnBadge(item.status)[0]" class="fw-bold">
                      {{ helpers.returnBadge(item.status)[1] }}
                    </span>
                  </td>
                  <td></td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="4" class="text-center">Aucune demande d'achat</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="card-body border-top pt-4 d-flex align-items-center justify-content-center"
            style="height: 650px;">
            <div class="row mt-5">
              <div class="col-12 text-center">
                <h5>Chargement des données...</h5>
                <div class="spinner-border text-primary mt-4" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /Last 10 Achats -->
    <div v-if="data" class="row mt-4">
      <div class="col-6 h-50">
        <ProjectChart title="Statistique des projets" subtitle="Budget des Projets" color="rgb(37, 144, 250)"
          :data="data.chart" pin="total_employee" legened="Budget en MAD" type="bar" />
      </div>
      <div class="col-6 h-50 ">
        <AchatPieChart :data="data.achatByProject" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>