<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { CardTwo } from '@/ui';
import { useSharedStore } from '@/store';
import { sharedService } from '@/services';
import { RecruitementTable } from './components';

const sharedStore = useSharedStore();

const recruitment = ref(computed(() => sharedStore.recruitment.data));
const stats = ref(computed(() => sharedStore.recruitment.stats));

onMounted(async () => {
    await sharedService.getRecruitment();
});

onUnmounted(() => {
    sharedStore.clearRecruitment();
});

</script>
<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Demande de recrutement</span></h5>
        <div v-if="stats" class="row">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwo title="Total Demande" :count="stats.total" color="bg-label-primary" icon="ti ti-zoom-filled"
                    card-color=" card-border-shadow-primary" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwo title="Demande en attente" :count="stats.pending" color="bg-label-warning" icon="ti ti-zoom-filled"
                    card-color="card-border-shadow-warning" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwo title="Demande validée" :count="stats.done" color="bg-label-success" icon="ti ti-zoom-filled"
                    card-color="card-border-shadow-success" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
                <CardTwo title="Demande recrutée" :count="stats.completed" color="bg-label-info" icon="ti ti-zoom-filled"
                    card-color="card-border-shadow-info" />
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-12">
                <div class="card">
                    <div class="card card-border-shadow-primary">
                        <div class="card-header d-flex align-items-center">
                            <div class="me-auto">
                                <h5 class="fw-bold mb-1">Liste des demandes de recrutement</h5>
                                <small class="fw-bold mb-1 text-muted">Liste des demandes de recrutement demandées par
                                    vous</small>
                            </div>
                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addNewLeave">
                                <i class="ti ti-square-rounded-plus-filled me-2"></i>
                                Ajouter une demande de recrutement
                            </button>
                        </div>
                        <div v-if="recruitment != null" class="card-body border-top pt-4">
                            <RecruitementTable :recruitment="recruitment" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.f-45 {
    font-size: 45px;
}
</style>
