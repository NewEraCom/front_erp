<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { salesService } from '@/services';
import { useSalesStore } from '@/store';
import { CardTwo, CardTwoSkeleton } from '@/ui';
import { BonCommandeTable } from './components';

const salesStore = useSalesStore();

const stats = ref(computed(() => salesStore.bonDeCommande.stats));
const bonDeCommande = ref(computed(() => salesStore.bonDeCommande.data));

onMounted(async () => {
    await salesService.getBonDeCommande();
});

onUnmounted(() => {
    salesStore.clearBonDeCommande();
});

</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Bon de commande</span></h5>
        <div v-if="stats" class="row g-3">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
                <CardTwo title="Bon de commande" :count="String(stats.total)" color="bg-label-primary" icon="ti-file-3d"
                    card-color="card-border-shadow-primary" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
                <CardTwo title="Bon de commande en attente" :count="String(stats.pending)" color="bg-label-warning"
                    icon="ti-file-3d" card-color="card-border-shadow-warning" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
                <CardTwo title="Bon de commande en cours" :count="String(stats.ongoing)" color="bg-label-info"
                    icon="ti-file-3d" card-color="card-border-shadow-info" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
                <CardTwo title="Bon de commande traitée" :count="String(stats.completed)" color="bg-label-success"
                    icon="ti-file-3d" card-color="card-border-shadow-success" />
            </div>
        </div>

        <div v-else class="row g-3">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
                <CardTwoSkeleton />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
                <CardTwoSkeleton />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
                <CardTwoSkeleton />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
                <CardTwoSkeleton />
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-12">
                <div class="card">
                    <div class="card card-border-shadow-primary">
                        <div class="card-header">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 class="fw-bold mb-1">Bon de commande</h5>
                                    <small class="fw-bold mb-1 text-muted">Liste des bon de commande</small>
                                </div>
                            </div>
                        </div>
                        <div v-if="bonDeCommande != null" class="card-body border-top pt-4">
                            <BonCommandeTable :bon-commande="bonDeCommande" />
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
        </div>
    </div>
</template>