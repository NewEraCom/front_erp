<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useLogisticsStore, useRhStore } from '@/store';
import { logisticsService, rhService } from '@/services';
import { formater, helpers } from '@/utils';
import { Modal, CustomSelect } from '@/ui';
import { useToast } from 'vue-toastification';

const toast = useToast();

const logisticsStore = useLogisticsStore();
const rhStore = useRhStore();

const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
});

import IAM from '@/assets/img/iam.jpg';
import INWI from '@/assets/img/inwi.png';
import ORANGE from '@/assets/img/orange.png';

let data = ref(computed(() => logisticsStore.subscription));
let subscription = ref(null);


onMounted(async () => {
    await logisticsService.getSubscriptionById(props.id);
    await rhService.getEmployees();
    subscription.value = data.value;
});

onUnmounted(() => {
    logisticsStore.clearSubscription();
    rhStore.clearEmployees();
});

const isLoading = ref(false);
const employees = ref(computed(() => rhStore.employees));

const getImage = () => {
    switch (subscription.value?.operator) {
        case 'IAM':
            return IAM;
        case 'INWI':
            return INWI;
        case 'ORANGE':
            return ORANGE;
        default:
            return '';
    }
};

const formData = ref({
    pacgsm_id: props.id,
    employee_id: '-',
    date_debut: '',
    description: '',
});

const recoverSim = async () => {
    isLoading.value = true;
    await logisticsService.recoverSubscription({ id: props.id }).then(() => {
        $('#recover-sim').modal('hide');
        toast.success('La carte SIM a été récupérée avec succès');
    }).finally(() => {
        isLoading.value = false;
    });
};

const affectSubscription = async () => {
    isLoading.value = true;

    formData.value.employee_id = formData.value.employee_id.key;
    await logisticsService.affectSubscription(formData.value).then(() => {
        $('#new-affectation').modal('hide');
        toast.success('L\'abonnement a été affecté avec succès');
    }).finally(() => {
        isLoading.value = false;
    });
};

watch(data, () => {
    subscription.value = data.value;
}, { deep: true });

</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Parc GSM</span></h5>

        <div v-if="subscription" class="row">
            <div class="col-xl-4 col-lg-5 col-md-5 order-1 order-md-0">
                <!-- Customer-detail Card -->
                <div class="card mb-4 card-border-shadow-primary">
                    <div class="card-body">
                        <div class="customer-avatar-section">
                            <div class="d-flex align-items-center flex-column">
                                <img class="img-fluid border-none" :src="getImage()" height="140" width="140"
                                    alt="User avatar" style="object-fit: contain" />
                                <div class="customer-info text-center mt-3">
                                    <h5 class="mb-1 fw-bold">{{ subscription?.operator }}</h5>
                                    <small>
                                        Date de création :
                                        {{
            formater.date(subscription?.date_activation)
        }}</small>
                                </div>
                            </div>
                        </div>

                        <div class="info-container">
                            <small class="d-block pt-4 border-top fw-bold text-uppercase text-muted my-3">Affecté
                                à</small>
                            <ul class="list-unstyled">
                                <li class="mb-3 d-flex">
                                    <span class="fw-medium me-2">Employee</span>
                                    <span class="ms-auto">{{ subscription?.currentEmployee == '-' ? 'Non affecté' :
            subscription?.currentEmployee }}</span>
                                </li>
                                <li class="mb-3 d-flex">
                                    <span class="fw-medium me-2">Project</span>
                                    <span class="ms-auto">-</span>
                                </li>

                                <li class="mb-3 d-flex">
                                    <span class="fw-medium me-2">Status</span>
                                    <span class="ms-auto badge" :class="helpers.returnBadge(subscription?.status)[0]">{{
            helpers.returnBadge(subscription?.status)[1] }}</span>
                                </li>
                                <li class="mb-3 d-flex">
                                    <span class="fw-medium me-2">Dernière mise à jour</span>
                                    <span class="ms-auto">{{
            formater.dateTime(subscription?.updated_at)
        }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div v-if="subscription != null" class="card mb-4 card-border-shadow-warning">
                    <div class="card-body">
                        <div class="card-icon mb-3">
                            <div class="avatar">
                                <div class="avatar-initial rounded bg-label-warning">
                                    <i class="ti ti-phone ti-md"></i>
                                </div>
                            </div>
                        </div>
                        <div class="card-info">
                            <h5 class="card-title mb-3">Montant de l'abonnement</h5>
                            <div class="d-flex align-items-baseline mb-1 gap-1">
                                <h2 class="text-warning fw-bold mb-0">
                                    {{ formater.number(subscription?.price) }}
                                    <small>MAD</small>
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="subscription != null" class="card mb-4 card-border-shadow-primary">
                    <div class="card-body">
                        <div class="card-icon mb-3">
                            <div class="avatar">
                                <div class="avatar-initial rounded bg-label-primary">
                                    <i class="ti ti-phone ti-md"></i>
                                </div>
                            </div>
                        </div>
                        <div class="card-info">
                            <h5 v-if="subscription.type === 'sim'" class="card-title mb-3">
                                Numéro de téléphone
                            </h5>
                            <h5 v-else class="card-title mb-3">Désignation</h5>
                            <div class="d-flex align-items-baseline mb-1 gap-1">
                                <h6 class="text-primary mb-0">
                                    {{ formater.number(subscription?.num) }}
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="subscription != null" class="card card-border-shadow-secondary">
                    <div class="card-body">
                        <div class="card-icon mb-3">
                            <div class="avatar">
                                <div class="avatar-initial rounded bg-label-secondary">
                                    <i class="ti ti-message ti-md"></i>
                                </div>
                            </div>
                        </div>
                        <div class="card-info">
                            <h5 class="card-title mb-3">
                                Commentaire
                            </h5>
                            <div class="d-flex align-items-baseline mb-1 gap-1">
                                <h6 class="text-primary mb-0">
                                    {{ subscription?.description }}
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-8 col-lg-7 col-md-7 order-0 order-md-1">
                <div class="card card-border-shadow-primary">
                    <div class="card-header d-flex align-items-center">
                        <h5 class="fw-bold mb-0">Historique</h5>


                        <button class="btn btn-primary ms-auto" data-bs-toggle="modal"
                            data-bs-target="#new-affectation">
                            <i class="ti ti-bookmark-filled me-2"></i> Nouvelle affectation
                        </button>
                        <button v-if="subscription.status != 'in stock'" class="btn btn-warning ms-2"
                            data-bs-toggle="modal" data-bs-target="#recover-sim">
                            <i class="ti ti-arrow-back-up me-2"></i> Récupérer
                        </button>
                    </div>
                    <div class="card-body">
                        <table class="table">
                            <thead class="table-light">
                                <tr>
                                    <th class="fw-bold">Employee</th>
                                    <th class="fw-bold">Date d'affectation</th>
                                    <th class="fw-bold">Date de retour</th>
                                    <th class="fw-bold">Commentaire</th>
                                </tr>
                            </thead>
                            <tbody v-if="subscription?.historiques.length != 0">
                                <tr v-for="(item, idx) in subscription?.historiques" :key="idx">
                                    <td>
                                        <h6 class="mb-1 fw-bold">
                                            {{ item?.first_name + ' ' + item?.last_name }}
                                        </h6>
                                        <span class="text-small text-muted fw-bold">{{
            item.employee?.email
        }}</span>
                                    </td>
                                    <td>{{ formater.date(item.pivot.date_debut) }}</td>
                                    <td>{{ formater.date(item.pivot.date_fin) }}</td>
                                    <td>{{ item.comment ?? '-' }}</td>
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

        <Modal title="Nouvelle affectation" id="new-affectation" size="modal-md">
            <form @submit.prevent="affectSubscription">
                <div class="modal-body">
                    <div class="row">
                        <div v-if="employees != null" class="col-12 mb-3">
                            <CustomSelect v-model="formData.employee_id" placeholder="Choisir un employee"
                                label="Employee" :data="employees.filter(item => item.status == 1).map((item) => ({
            key: item.id,
            value: item.first_name + ' ' + item.last_name
        }))
            " />
                        </div>

                        <div class="col-12 mb-3">
                            <label class="mb-2">Date d'affectation <span class="text-danger">*</span></label>
                            <input type="date" class="form-control" v-model="formData.date_debut" required />
                        </div>

                        <div class="col-12 mb-3">
                            <label class="mb-2">Description <span class="text-danger">*</span></label>
                            <textarea class="form-control" v-model="formData.description"
                                placeholder="Entrez une description de l'abonnement" required></textarea>
                        </div>

                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                        Fermer
                    </button>

                    <button type="submit" :disabled="isLoading" class="btn btn-primary me-0">
                        <span v-if="isLoading" class="d-flex align-items-center">
                            <div class="spinner-border spinner-border-sm text-white" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </span>
                        <span v-else> Terminer</span>
                    </button>
                </div>
            </form>
        </Modal>

        <Modal title="Récupération de l'abonnement" id="recover-sim" size="modal-md">
            <form @submit.prevent="recoverSim">
                <div class="modal-body">
                    <p>Etes-vous sûr de vouloir récupérer la carte SIM ?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                        Fermer
                    </button>

                    <button type="submit" :disabled="isLoading" class="btn btn-primary me-0">
                        <span v-if="isLoading" class="d-flex align-items-center">
                            <div class="spinner-border spinner-border-sm text-white" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </span>
                        <span v-else> Oui, Récupérer</span>
                    </button>
                </div>
            </form>
        </Modal>
    </div>
</template>
