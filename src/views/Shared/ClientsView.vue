<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { CardTwo } from '@/ui';
import { useSharedStore } from '@/store';
import { sharedService } from '@/services';
import { ClientsTable } from './components';

const sharedStore = useSharedStore();

const clients = ref(computed(() => sharedStore.clients.data));
const stats = ref(computed(() => sharedStore.clients.stats));

onMounted(async () => {
    await sharedService.getClients();
});

onUnmounted(() => {
    sharedStore.clearClients();
});


</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Clients</span></h5>
        <div v-if="stats" class="row">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardTwo title="Clients" :count="stats.total" color="bg-label-primary" icon="ti ti-building-store"
                    card-color=" card-border-shadow-primary" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardTwo title="Clients Actif" :count="stats.actif" color="bg-label-success" icon="ti ti-building-store"
                    card-color="card-border-shadow-success" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardTwo title="Clients Inactif" :count="stats.inactif" color="bg-label-warning" icon="ti ti-building-store"
                    card-color="card-border-shadow-warning" />
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-12">
                <div class="card">
                    <div class="card card-border-shadow-primary">
                        <div class="card-header d-flex align-items-center">
                            <div class="me-auto">
                                <h5 class="fw-bold mb-1">Liste des clients</h5>
                                <small class="fw-bold mb-1 text-muted">Liste des clients enregistrés dans le système</small>
                            </div>
                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addNewLeave">
                                <i class="ti ti-square-rounded-plus-filled me-2"></i>
                                Ajouter un fournisseur
                            </button>
                        </div>
                        <div v-if="clients != null" class="card-body border-top pt-4">
                            <ClientsTable :clients="clients" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>