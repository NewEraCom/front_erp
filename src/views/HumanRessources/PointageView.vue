<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { rhService } from '@/services';
import { useRhStore } from '@/store';
import { PointageTable } from './components';

const rhStore = useRhStore();

const pointages = ref(computed(() => rhStore.pointages));

onMounted(async () => {
    await rhService.getPointages();
});
</script>
<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Pointage</span> </h5>
        <div class="row mt-4">
            <div class="col-12">
                <div class="card">
                    <div class="card card-border-shadow-primary">
                        <div class="card-header d-flex align-items-center justify-content-between">
                            <div>
                                <h5 class="fw-bold mb-1">Pointage</h5>
                                <small class="fw-bold mb-1 text-muted">Liste des pointages</small>
                            </div>
                            <button class="btn btn-primary">
                                <i class="ti ti-clock-plus me-2"></i>
                                Ajouter un pointage
                            </button>
                        </div>
                        <div v-if="pointages" class="card-body border-top pt-4">
                            <PointageTable :pointages="pointages" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
