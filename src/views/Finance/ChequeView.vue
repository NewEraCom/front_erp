<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { CardOne } from '@/ui'

import { ChequeTable } from './components'
import { financeService } from '@/services';
import {useFinanceStore} from '@/store';

const FinanceStore = useFinanceStore();



const stats = ref(true)

const cheque = ref(computed(() => FinanceStore.cheque))

onMounted(async () => {
  await financeService.getCheque()
})
</script>

<template>
  <div class="flex-grow-1 container-fluid mt-3">
    <h5 class="py-3 mb-4 fw-medium text-muted">
      Dashboard / <span class="text-dark">Cheque</span>
    </h5>
    <div v-if="stats" class="row">
      <div class="col-xl-12">
        <div class="card card-border-shadow-primary mb-4">
          <div class="card-widget-separator-wrapper">
            <div class="card-body card-widget-separator">
              <div class="row gy-4 gy-sm-1">
                <div class="col-sm-6 col-lg-4">
                  <div
                    class="d-flex justify-content-between align-items-start card-widget-1 border-end pb-3 pb-sm-0"
                  >
                    <div>
                      <h3 class="mb-1 fw-bold">
                        {{ 10 }}
                      </h3>
                      <p class="mb-0">Total des cheques</p>
                    </div>
                    <span class="avatar me-4">
                      <span class="avatar-initial bg-label-primary rounded"
                        ><i class="ti ti-calendar"></i
                      ></span>
                    </span>
                  </div>
                  <hr class="d-none d-sm-block d-lg-none me-4" />
                </div>
                <div class="col-sm-6 col-lg-4">
                  <div
                    class="d-flex justify-content-between align-items-start card-widget-2 border-end pb-3 pb-sm-0"
                  >
                    <div>
                      <h3 class="mb-1 fw-bold">{{ 10 }} DH</h3>
                      <p class="mb-0">Cheque Encaissé</p>
                    </div>
                    <span class="avatar me-4">
                      <span class="avatar-initial bg-label-success rounded"
                        ><i class="ti ti-coins"></i
                      ></span>
                    </span>
                  </div>
                  <hr class="d-none d-sm-block d-lg-none" />
                </div>
                <div class="col-sm-6 col-lg-4">
                  <div class="d-flex justify-content-between align-items-start">
                    <div>
                      <h3 class="mb-1 fw-bold">{{ 10 }} DH</h3>
                      <p class="mb-0">Cheque Non Encaissé</p>
                    </div>
                    <span class="avatar me-4">
                      <span class="avatar-initial bg-label-info rounded"
                        ><i class="ti ti-coins"></i
                      ></span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
          <CardOne title="Cheque Definitif Recuperer" :count="String(10)" color="bg-label-warning" icon="ti-bolt"
            card-color="card-border-shadow-warning" />
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
          <CardOne title="Caution Definitif Non Recuperer" :count="String(10)" color="bg-label-success" icon="ti-bolt"
            card-color="card-border-shadow-success" />
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-3">
          <CardOne title="Caution Definitif provisoire" :count="String(10)" color="bg-label-info" icon="ti-bolt"
            card-color="card-border-shadow-info" />
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-3">
          <CardOne title="Caution Definitif Non provisoir" :count="String(10)" color="bg-label-danger"
            icon="ti-bolt" card-color="card-border-shadow-danger" />
        </div> -->
    </div>
    <div class="row mt-4">
      <div class="col-12">
        <div class="card">
          <div class="card card-border-shadow-primary">
            <div class="card-header">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h5 class="fw-bold mb-1">Cheque</h5>
                  <small class="fw-bold mb-1 text-muted">Liste des Cheque de l'entreprise</small>
                </div>
              </div>
            </div>
            <div v-if="cheque != null" class="card-body border-top pt-4">
              <ChequeTable :cheques="cheque" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
