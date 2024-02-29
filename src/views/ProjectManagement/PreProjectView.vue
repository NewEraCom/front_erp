<script setup lang="ts">

import { onMounted, ref, computed } from 'vue';
import { PMService } from '@/services';
import { usePMStore } from '@/store';
import { CardOne, CardTwo } from '@/ui';
import { PreProjectTable } from './components';

const PMStore = usePMStore();

const preProject = ref(computed(() => PMStore.preproject.data));
const stats = ref(computed(() => PMStore.preproject.stats));

onMounted(async () => {
  await PMService.getPreProject(); 
});



</script>


<template>
    <div class="flex-grow-1 container-fluid mt-3">
      <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Avant Projet</span> </h5>
      <div v-if="stats" class="row g-3">
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
          <CardTwo title="Avant Projet En attente de validation" :count="String(stats.total_waiting)"
            color="bg-label-warning" icon="ti ti-bolt" card-color="card-border-shadow-warning" />
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
          <CardTwo title="Avant Projet En soumission" :count="String(stats.total_in_progress)" color="bg-label-info"
            icon="ti ti-bolt" card-color="card-border-shadow-info" />
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-3">
          <CardTwo title="Avant Projet Gagné" :count="String(stats.total_win)" color="bg-label-successs"
            icon="ti ti-bolt" card-color="card-border-shadow-successs" />
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-3">
          <CardTwo title="Avant Projet Perdu" :count="String(stats.total_lost)" color="bg-label-danger"
            icon="ti ti-bolt" card-color="card-border-shadow-danger" />
        </div>
      </div>
      <div class="row mt-4">
      <div class="col-12">
        <div class="card">
          <div class="card card-border-shadow-primary">
            <div class="card-header">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h5 class="fw-bold mb-1">Avant Projet</h5>
                  <small class="fw-bold mb-1 text-muted">Liste des Avant Projet</small>
                </div>

              </div>
            </div>
            <div v-if="preProject != null" class="card-body border-top pt-4">
              <PreProjectTable :preproject="preProject" />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </template>