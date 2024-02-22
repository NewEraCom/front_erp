<script setup lang="ts">
import { CardOne } from '@/ui';
import { CardStats } from '.';
import { formater } from '@/utils';

defineProps({
  stats: {
    type: Object,
    required: true,
  },
});

</script>

<template>
  <div class="row g-3">
    <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
      <CardStats :male=stats.male :female=stats.female card-color="card-border-shadow-primary" />
    </div>
    <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
      <CardOne title="Mass Salarial" :count="formater.number(stats.salaryMass) + ' MAD'" color=" bg-label-warning"
        icon="ti-coins" card-color="card-border-shadow-warning" />
    </div>
    <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
      <CardOne title="Demande Non Traitées" count="21" color="bg-label-danger" icon="ti-mailbox"
        card-color="card-border-shadow-danger" />
    </div>
    <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
      <CardOne title="Total Employés" :count="String(stats.total)" color="bg-label-success" icon="ti-users"
        card-color="card-border-shadow-success" />
    </div>
    <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
      <CardOne title="Employés CDD" :count="String(stats.cdd)" color="bg-label-primary" icon="ti-bolt"
        card-color="card-border-shadow-primary" />
    </div>
    <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
      <CardOne title="Employés CDI" :count="String(stats.cdi)" color="bg-label-primary" icon="ti-bolt"
        card-color="card-border-shadow-primary" />
    </div>
    <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-3">
      <CardOne title="Employés Chantier" :count="String(stats.chantier)" color="bg-label-primary" icon="ti-bolt"
        card-color="card-border-shadow-primary" />
    </div>
    <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-3">
      <CardOne title="Employés Contrat Commercial" :count="String(stats.commercial)" color="bg-label-primary"
        icon="ti-bolt" card-color="card-border-shadow-primary" />
    </div>
  </div>
</template>
