<script setup lang="ts">
import { formater } from '@/utils';

defineProps({
    stats: {
        type: Object,
        required: true,
    },
});

</script>

<template>
    <div class="card h-100 card-border-shadow-primary">
        <div class="card-body">
            <div class="row p-0">
                <div class="col-12 d-flex">
                    <h6 class="fw-bold">Caisse</h6>
                    <span class="ms-auto fw-bold">
                        {{ formater.number(stats.solde) }}
                        <small> MAD</small>
                    </span>
                </div>
                <div class="col-4">
                    <div class="d-flex gap-2 align-items-center mb-2">
                        <span class="badge bg-label-success p-1 rounde"><i class="ti ti-coins"></i></span>
                        <p class="mb-0">Entrée</p>
                    </div>
                    <h5 class="mb-0 pt-1 text-dark fw-bold">
                        {{ formater.number(stats.total_entree) }} <small> MAD</small>
                    </h5>
                </div>
                <div class="col-4">
                    <div class="divider divider-vertical">
                        <div class="divider-text bg-white rounded-circle">
                            <i class="ti ti-arrows-exchange-2 text-dark"></i>
                        </div>
                    </div>
                </div>
                <div class="col-4 text-end">
                    <div class="d-flex gap-2 justify-content-end align-items-center mb-2">
                        <p class="mb-0">Sortie</p>
                        <span class="badge bg-label-warning p-1 rounded"><i class="ti ti-coins"></i></span>
                    </div>
                    <h5 class="mb-0 pt-1 text-dark fw-bold">
                        {{ formater.number(stats.total_sortie) }} <small> MAD</small>
                    </h5>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>