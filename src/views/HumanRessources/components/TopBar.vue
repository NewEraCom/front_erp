<script setup lang="ts">
import { CardOne } from '@/components';
import { CardStats } from '.';
</script>

<template>
  <div class="row g-3">
    <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
      <CardStats :male=75 :female=25 card-color="card-border-shadow-primary" />
    </div>
    <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
      <CardOne
        title="Mass Salarial"
        :count=120
        color="bg-label-warning"
        icon="ti-coins"
        card-color="card-border-shadow-warning"
      />
    </div>
    <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
      <CardOne
        title="Demande Non Traitées"
        :count=120
        color="bg-label-danger"
        icon="ti-mailbox"
        card-color="card-border-shadow-danger"
      />
    </div>    
    <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
      <CardOne
        title="Total Employés"
        :count=120
        color="bg-label-success"
        icon="ti-users"
        card-color="card-border-shadow-success"
      />
    </div>
    <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
      <CardOne
        title="Employés CDD"
        :count=120
        color="bg-label-primary"
        icon="ti-bolt"
        card-color="card-border-shadow-primary"
      />
    </div>
    <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
      <CardOne
        title="Employés CDI"
        :count=120
        color="bg-label-primary"
        icon="ti-bolt"
        card-color="card-border-shadow-primary"
      />
    </div>
    <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-3">
      <CardOne
        title="Employés Chantier"
        :count=120
        color="bg-label-primary"
        icon="ti-bolt"
        card-color="card-border-shadow-primary"
      />
    </div>
    <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-3">
      <CardOne
        title="Employés Contrat Commercial"
        :count=120
        color="bg-label-primary"
        icon="ti-bolt"
        card-color="card-border-shadow-primary"
      />
    </div>
  </div>
</template>
