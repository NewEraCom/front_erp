<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { CardOne, CardStats } from '@/ui';
import { formater } from '@/utils';

import { rhService } from '@/services';
import { useRhStore } from '@/store';

const stats = ref(computed(() => RhStore.stats));

const RhStore = useRhStore();

onMounted(async () => {
    await rhService.getEmployees();
});

</script>

<template>
    <div v-if="stats" class="row g-3">
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
            <CardStats :male=stats.male :female=stats.female card-color="card-border-shadow-primary" />
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
            <CardOne title="Mass salarial" :count="formater.number(stats.salaryMass) + ' MAD'" color=" bg-label-primary"
                icon="ti-coins" card-color="card-border-shadow-primary" />
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
            <CardOne title="Total employés" :count="String(stats.total)" color="bg-label-primary" icon="ti-users"
                card-color="card-border-shadow-primary" />
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
            <CardOne title="Demande d'achat non traitée" :count="String(stats.total)" color="bg-label-primary"
                icon="ti-shopping-cart" card-color="card-border-shadow-primary" />
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
            <CardOne title="Solde de caisse" :count="String(stats.total)" color="bg-label-primary" icon="ti-coins"
                card-color="card-border-shadow-primary" />
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
            <CardOne title="Projets" :count="String(stats.total)" color="bg-label-primary" icon="ti-package"
                card-color="card-border-shadow-primary" />
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
            <CardOne title="Clients" :count="String(stats.total)" color="bg-label-primary" icon="ti-affiliate"
                card-color="card-border-shadow-primary" />
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
            <CardOne title="Facture non traitée" :count="String(stats.total)" color="bg-label-primary" icon="ti-file-dollar"
                card-color="card-border-shadow-primary" />
        </div>
    </div>
</template>
