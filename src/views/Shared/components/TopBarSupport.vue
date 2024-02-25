<script setup lang="ts">
import { CardOne, CardStats, CardCaisse, CardOneSkeleton } from '@/ui';
defineProps({
    stats: {
        type: Object,
        required: true
    },
});

</script>

<template>
    <div v-if="stats" class="row g-3">
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
            <CardStats :male=stats.male :female=stats.female card-color="card-border-shadow-primary" />
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
            <CardOne title="Total employés" :count="String(stats.total_employees)" color="bg-label-primary" icon="ti-users"
                card-color="card-border-shadow-primary" />
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
            <CardOne title="Total des projets en cours" :count="String(stats.total_projects)" color="bg-label-primary"
                icon="ti-package" card-color="card-border-shadow-primary" />
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
            <CardOne title="Total des clients" :count="String(stats.total_clients)" color="bg-label-primary"
                icon="ti-affiliate" card-color="card-border-shadow-primary" />
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
            <CardOne title="Total demande achats en attente" :count="String(stats.total_purchase)" color="bg-label-primary"
                icon="ti-shopping-cart" card-color="card-border-shadow-primary" />
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-6">
            <CardCaisse :stats="stats.caisse" />
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
            <CardOne title="Total Factures clients" :count="String(stats.total_invoices)" color="bg-label-primary"
                icon="ti-file-dollar" card-color="card-border-shadow-primary" />
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
</template>
