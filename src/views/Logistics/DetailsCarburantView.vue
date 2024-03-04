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

onMounted(async () => {
    await logisticsService.getGasoilById(props.id);
    await rhService.getEmployees();
});

onUnmounted(() => {
    logisticsStore.clearSubscription();
    rhStore.clearEmployees();
});



const card = ref(computed(() => logisticsStore.gasoil));
const isLoading = ref(false);
const employees = ref(computed(() => rhStore.employees));

const typeCart = () => {
    switch (card.value.type) {
        case 'Carte Confort':
            return 'carte_confort';
        case 'Carte Gold':
            return 'carte_gold';
        case 'Carte Premium':
            return 'carte_premium';
        default:
            return '';
    }
};




</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Cartes gasoil</span></h5>

        <div v-if="card" class="row">
            <div class="col-xl-4 col-lg-5 col-md-5 order-1 order-md-0">
                <!-- Customer-detail Card -->
                <div class="card_gasoil" :class="typeCart()">
                    <div class="d-flex justify-content-between align-items-center">
                        <h3 class="card_name">Carte Gasoil</h3>
                        <img src="@/assets/img/favicon.png" width="50px" />
                    </div>
                    <img class="mt-4 rounded" src="@/assets/img/brands/sim.png" style="object-fit: fill" width="85px"
                        height="55px" />

                    <div class="text-start mt-5">
                        <h6 class="card_code">CODE : {{ card.code }}</h6>
                    </div>

                    <div class="d-flex mt-4 justify-content-between me-5">
                        <div class="card_date">
                            <h5>Créé le</h5>
                            <span>{{ formater.date(card.created_at) }}</span>
                        </div>

                        <div class="card_date">
                            <h5>Type</h5>
                            <span>{{ card.type }}</span>
                        </div>
                    </div>
                </div>
                <div class="card card-border-shadow-warning mt-4">
                    <div class="card-body">
                        <div class="card-icon mb-3">
                            <div class="avatar">
                                <div class="avatar-initial rounded bg-label-warning">
                                    <i class="ti ti-coins ti-md"></i>
                                </div>
                            </div>
                        </div>
                        <div class="card-info">
                            <h5 class="card-title mb-3">Plafond</h5>
                            <div class="d-flex align-items-baseline mb-1 gap-1">
                                <h4 class="text-warning mb-0 fw-bold">
                                    {{ formater.number(card.limit) }} <small>MAD</small>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card card-border-shadow-primary mt-4">
                    <div class="card-body">
                        <div class="card-icon mb-3">
                            <div class="avatar">
                                <div class="avatar-initial rounded bg-label-primary">
                                    <i class="ti ti-user ti-md"></i>
                                </div>
                            </div>
                        </div>
                        <div class="card-info">
                            <h5 class="card-title mb-3">Employee</h5>
                            <div class="d-flex align-items-baseline mb-1 gap-1">
                                <h5 class="text-primary mb-0 fw-bold">
                                    {{ card?.currentEmployee }}
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-8 col-lg-7 col-md-7 order-0 order-md-1">
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
                                    <th class="fw-bold">Période</th>
                                    <th class="fw-bold">Consomation</th>
                                    <th class="fw-bold">Commentaire</th>
                                </tr>
                            </thead>
                            <tbody v-if="card?.historiques.length != 0">
                                <tr v-for="(item, idx) in card?.historiques" :key="idx">
                                    <td>
                                        <h6 class="mb-1 fw-bold">
                                            {{ item?.first_name + ' ' + item?.last_name }}
                                        </h6>
                                        <span class="text-small text-muted fw-bold">{{
                                            item.employee?.email
                                        }}</span>
                                    </td>
                                    <td>{{ formater.month(item.pivot.date_debut) }}</td>
                                    <td>{{ formater.number(item.pivot.consommation) }} MAD</td>
                                    <td>{{ item.pivot.comment ?? '-' }}</td>
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
