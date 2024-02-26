<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { CardTwo } from '@/ui';
import { useSharedStore } from '@/store';
import { sharedService } from '@/services';
import { ProjectsDisplay } from './components';

const sharedStore = useSharedStore();

const projects = ref(computed(() => sharedStore.projects.data));
const stats = ref(computed(() => sharedStore.projects.stats));

onMounted(async () => {
    await sharedService.getProjects();
});

onUnmounted(() => {
    sharedStore.clearProjects();
});


</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Projets</span></h5>
        <div v-if="stats" class="row">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardTwo title="Projets" :count="stats.total" color="bg-label-primary" icon="ti ti-package"
                    card-color="card-border-shadow-primary" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardTwo title="Projets en cours" :count="stats.ongoing" color="bg-label-warning" icon="ti ti-package"
                    card-color="card-border-shadow-warning" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardTwo title="Projets terminés" :count="stats.completed" color="bg-label-success" icon="ti ti-package"
                    card-color="card-border-shadow-success" />
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-12">
                <div class="card">
                    <div class="card card-border-shadow-primary">
                        <div class="card-header d-flex align-items-center">
                            <div class="me-auto">
                                <h5 class="fw-bold mb-1">Liste des projets</h5>
                                <small class="fw-bold mb-1 text-muted">Liste de tous les projets</small>
                            </div>
                        </div>
                        <div v-if="projects != null" class="card-body border-top pt-4">
                            <ProjectsDisplay :projects="projects" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>