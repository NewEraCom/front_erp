<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useLogisticsStore, useRhStore } from '@/store';
import { logisticsService, rhService } from '@/services';
import { formater, helpers } from '@/utils';
import { Modal, CustomSelect } from '@/ui';

const logisticsStore = useLogisticsStore();
const rhStore = useRhStore();

const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
});

const passJawaz = computed(() => logisticsStore.selectedJawaz);

onMounted(async () => {
    await logisticsService.getJawazById(props.id);
    await rhService.getEmployees();
});

onUnmounted(() => {
    logisticsStore.clearSelectedJawaz();
    rhStore.clearEmployees();
});



const card = ref(computed(() => logisticsStore.gasoil));
const isLoading = ref(false);
const employees = ref(computed(() => rhStore.employees));

</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Pass Jawaz</span></h5>
        <div class="row">
            <div class="col-xl-3 col-lg-5 col-md-5 order-1 order-md-0">
                <div class="card card-border-shadow-primary">
                    <div class="p-4">
                        <img src="@/assets/img/brands/jawaz.png" width="160px" alt="" />
                    </div>
                </div>
                <div class="card mb-4 card-border-shadow-warning mt-4">
                    <div class="card-body">
                        <div class="card-icon mb-3">
                            <div class="avatar">
                                <div class="avatar-initial rounded bg-label-warning">
                                    <i class="ti ti-bookmark-filled ti-md"></i>
                                </div>
                            </div>
                        </div>
                        <div class="card-info">
                            <h5 class="card-title mb-3">Code Jawaz</h5>
                            <div class="d-flex align-items-baseline mb-1 gap-1">
                                <h4 class="text-warning fw-bold mb-0">
                                    {{ passJawaz?.code }}
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card mb-4 card-border-shadow-primary mt-4">
                    <div class="card-body">
                        <div class="card-icon mb-3">
                            <div class="avatar">
                                <div class="avatar-initial rounded bg-label-primary">
                                    <i class="ti ti-coins ti-md"></i>
                                </div>
                            </div>
                        </div>
                        <div class="card-info">
                            <h5 class="card-title mb-3">Solde</h5>
                            <div class="d-flex align-items-baseline mb-1 gap-1">
                                <h4 class="text-primary fw-bold mb-0">
                                    {{ formater.number(passJawaz?.solde) }} <small>MAD</small>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card card-border-shadow-primary mt-4">
                    <div class="card-body">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="content-left">
                                <small>Date debut </small>
                                <h6 class="mb-0 fw-bold">
                                    {{ passJawaz?.date_debut ?? '-' }}
                                </h6>
                            </div>
                            <span class="badge bg-label-primary rounded-circle p-2">
                                <i class="ti ti-calendar-event" style="font-size: 20px" />
                            </span>
                        </div>
                        <div class="d-flex align-items-center justify-content-between mt-4">
                            <div class="content-left">
                                <small>Date fin </small>
                                <h6 class="mb-0 fw-bold">
                                    {{ passJawaz?.date_fin ?? '-' }}
                                </h6>
                            </div>
                            <span class="badge bg-label-primary rounded-circle p-2">
                                <i class="ti ti-calendar-event" style="font-size: 20px" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-9 col-lg-7 col-md-7 order-0 order-md-1">
                <div class="card card-border-shadow-primary">
                    <div class="card-header d-flex align-items-center">
                        <h5 class="fw-bold mb-0">Historique</h5>
                        <button class="btn btn-primary ms-auto" data-bs-toggle="modal" data-bs-target="#new-affectation">
                            <i class="ti ti-bookmark-filled me-2"></i> Nouvel enregistrement
                        </button>
                    </div>
                    <div class="card-body">
                        <table class="table">
                            <thead class="table-light">
                                <tr>
                                    <th class="fw-bold">Employee</th>
                                    <th class="fw-bold text-center">Date d'affection</th>
                                    <th class="fw-bold text-center">Date Restitution</th>
                                </tr>
                            </thead>
                            <tbody v-if="passJawaz?.historiques.length != 0">
                                <tr v-for="(item, idx) in passJawaz?.historiques" :key="idx">
                                    <td>
                                        <h6 class="mb-1 fw-bold">
                                            {{ item?.first_name + ' ' + item?.last_name }}
                                        </h6>
                                        <span class="text-small text-muted fw-bold">Matricule : {{ item.matricule }}</span>
                                    </td>
                                    <td class="text-center">{{ formater.date(item.pivot.date_debut) }}</td>
                                    <td class="text-center">{{ formater.date(item.pivot.date_fin) }}</td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="4" class="text-center">
                                        <span class="fw-bold">Aucun historique</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.card_gasoil {
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    height: 310px;
    margin-bottom: 20px;
}

.carte_confort {
    background: linear-gradient(to right, #08142e, #163474);
    /* Setting the gradient */
}

.carte_gold {
    background: linear-gradient(to right, #f7b924, #282318);
    /* Setting the gradient */
}

.carte_premium {
    background: linear-gradient(to right, #932828, #422525);
    /* Setting the gradient */
}

.card_gasoil .card_name {
    color: #ffffff;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 0;
    text-transform: uppercase;
}

.card_gasoil .card_code {
    color: #ffffff;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 0;
    text-transform: uppercase;
}

.card_gasoil .card_date h5 {
    color: #ffffff;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 0;
}

.card_gasoil .card_date span {
    color: #ffffff;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 0;
}
</style>
