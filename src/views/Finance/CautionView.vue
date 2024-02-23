<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { CardOne } from '@/ui';
import {useCautionStore} from '@/store';
import { cautionService } from '@/services';
import  {CautionTable}  from './components';



const CautionStore = useCautionStore();

const stats = ref(computed(()=>CautionStore.stats))

const caution = ref(computed(() => CautionStore.caution));

onMounted(async () => {
    await cautionService.get();        
});
const statsObject = computed(() => {
    const statsArray = CautionStore.stats;
    let tempStatsObject = {};
    for(let stat of statsArray) {
        tempStatsObject[stat.type] = stat.total;
    }
    return tempStatsObject;
});
</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3">
      <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Caution</span> </h5>
      <div v-if="stats" class="row">
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
          <CardOne title="Caution Definitif Recuperer" :count="String(statsObject.def_in) +' MAD'" color="bg-label-warning" icon="ti-bolt"
            card-color="card-border-shadow-warning" />
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
          <CardOne title="Caution Definitif Non Recuperer" :count="String(statsObject.def_out) +' MAD'" color="bg-label-success" icon="ti-bolt"
            card-color="card-border-shadow-success" />
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-3">
          <CardOne title="Caution Definitif provisoire" :count="String(statsObject.in) +' MAD'" color="bg-label-info" icon="ti-bolt"
            card-color="card-border-shadow-info" />
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-3">
          <CardOne title="Caution Definitif Non provisoir" :count="String(statsObject.out) +' MAD'" color="bg-label-danger"
            icon="ti-bolt" card-color="card-border-shadow-danger" />
        </div>
      </div>
      <div class="row mt-4">
      <div class="col-12">
        <div class="card">
          <div class="card card-border-shadow-primary">
            <div class="card-header">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h5 class="fw-bold mb-1">Caution</h5>
                  <small class="fw-bold mb-1 text-muted">Liste des Cautions de l'entreprise</small>
                </div>
               
              </div>
            </div>
            <div v-if="caution != null" class="card-body border-top pt-4">
              <CautionTable :cautions="caution" />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </template>
