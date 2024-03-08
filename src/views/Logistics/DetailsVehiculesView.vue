<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useLogisticsStore } from '@/store';
import { logisticsService } from '@/services';
import { formater } from '@/utils';

const logisticsStore = useLogisticsStore();

const props = defineProps({
    id: {
        type: Array,
        required: true,
    },
});

import Renault from '@/assets/img/brands/Renault.jpg';
import Dacia from '@/assets/img/brands/Dacia.jpg';
import Hyundai from '@/assets/img/brands/Hyundai.jpg';
import Peugeot from '@/assets/img/brands/Peugeot.jpg';
import Volkswagen from '@/assets/img/brands/Volkswagen.jpg';

const vehicule = ref(computed(() => logisticsStore.selectedVehicule));


const getImage = () => {
    switch (vehicule.value?.brand) {
        case 'Renault':
            return Renault;
        case 'Dacia':
            return Dacia;
        case 'Hyundai':
            return Hyundai;
        case 'Peugeot':
            return Peugeot;
        case 'Volkswagen':
            return Volkswagen;
        default:
            return '';
    }
};

onMounted(async () => {
    await logisticsService.getVehiculeById(props.id);
});

onUnmounted(() => {
    logisticsStore.clearVehicule();
});

</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <h5 class="py-3 mb-4">
            <span class="text-muted fw-light">Dashboard / Vehicules</span> / {{ vehicule?.brand }}
        </h5>

        <div class="row">
            <div class="col-xl-4 col-lg-5 col-md-5 order-1 order-md-0">
                <!-- Customer-detail Card -->
                <div class="card mb-4 card-border-shadow-primary">
                    <div class="card-body">
                        <div class="customer-avatar-section">
                            <div class="d-flex align-items-center flex-column">
                                <img class="img-fluid border-none rounded p-0" :src="getImage()" height="140"
                                    width="140" alt="User avatar" style="object-fit: cover" />
                                <div class="customer-info text-center mt-3">
                                    <h4 class="mb-1 fw-bold">
                                        {{ vehicule?.brand + ' ' + vehicule?.model }}
                                    </h4>
                                    <small>
                                        Date de création :
                                        {{ formater.date(vehicule?.created_at) }}</small>
                                </div>
                            </div>
                        </div>

                        <div class="info-container">
                            <small class="d-block pt-4 border-top fw-bold text-uppercase text-muted my-3">Information du
                                vehicule</small>
                            <ul class="list-unstyled">
                                <li class="mb-3 d-flex">
                                    <span class="fw-medium me-2">Matricule W</span>
                                    <span class="ms-auto">
                                        {{ vehicule?.matricule_w }}
                                    </span>
                                </li>
                                <li class="mb-3 d-flex">
                                    <span class="fw-medium me-2">Numéro d'identification du véhicule</span>
                                    <span class="ms-auto">
                                        {{ vehicule?.num_chassis }}
                                    </span>
                                </li>
                                <li class="mb-3 d-flex">
                                    <span class="fw-medium me-2">Dernière mise à jour</span>
                                    <span class="ms-auto">{{
                formater.dateTime(vehicule?.updated_at)
            }}</span>
                                </li>
                                <li class="mb-3 d-flex">
                                    <span class="fw-medium me-2">Utilisé</span>
                                    <span class="ms-auto badge"
                                        :class="vehicule?.used ? 'bg-label-success' : 'bg-label-danger'">{{
                vehicule?.used ? 'Oui'
                    : 'Non' }}</span>
                                </li>
                                <li class="mb-3 d-flex">
                                    <span class="fw-medium me-2">Date de début d'utilisation</span>
                                    <span v-if="vehicule?.date_entre != null" class="ms-auto">{{
                formater.date(vehicule?.date_entre)
            }}</span>
                                </li>
                                <li class="mb-3 d-flex">
                                    <span class="fw-medium me-2">Voiture louee</span>
                                    <span class="ms-auto badge"
                                        :class="vehicule?.rented ? 'bg-success' : 'bg-danger'">{{
                vehicule?.rented ? 'Oui' : 'Non' }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="card mb-4 card-border-shadow-warning">
                    <div class="card-body">
                        <div class="card-info d-flex">
                            <div class="card-icon mb-3">
                                <div class="avatar">
                                    <div class="avatar-initial rounded bg-label-warning">
                                        <i class="ti ti-car ti-md"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="ms-4">
                                <h5 class="card-title mb-3">Matricule</h5>
                                <div class="d-flex align-items-baseline mb-1 gap-1">
                                    <h4 class="text-warning fw-bold mb-0">
                                        {{ vehicule?.matricule }}
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card mb-4 card-border-shadow-success">
                    <div class="card-body">
                        <div class="card-info d-flex">
                            <div class="card-icon mb-3">
                                <div class="avatar">
                                    <div class="avatar-initial rounded bg-label-success">
                                        <i class="ti ti-car ti-md"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="ms-4">
                                <h5 class="card-title mb-3">Kilometrage</h5>
                                <div class="d-flex align-items-baseline mb-1 gap-1">
                                    <h4 class="text-success fw-bold mb-0">
                                        {{ formater.number(vehicule?.km) }} <small>KM</small>
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-xl-8 col-lg-7 col-md-7 order-0 order-md-1">
                <div class="nav-align-top mb-4">
                    <ul class="nav nav-pills mb-3 nav-fill" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button type="button" class="nav-link active" role="tab" data-bs-toggle="tab"
                                data-bs-target="#historique" aria-controls="historique" aria-selected="true">
                                Historique
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button type="button" class="nav-link" role="tab" data-bs-toggle="tab"
                                data-bs-target="#mecanique" aria-controls="mecanique" aria-selected="false"
                                tabindex="-1">
                                Mécanique
                            </button>
                        </li>
                    </ul>
                    <div class="tab-content p-0 m-0">
                        <div id="historique" class="card tab-pane active show fade" role="tabpanel">
                            <div class="card-header d-flex align-items-center">
                                <h5 class="mb-0 fw-bold">Historique</h5>
                                <button class="btn btn-warning ms-auto" data-bs-toggle="modal"
                                    data-bs-target="#recover-car">
                                    <i class="ti ti-arrow-back-up me-2" /> Récupérer
                                </button>
                                <button class="btn btn-primary ms-2" data-bs-toggle="modal"
                                    :data-bs-target="'#' + createModalId">
                                    <i class="ti ti-square-rounded-plus-filled me-2" /> Nouvelle
                                    Sortie Voiture
                                </button>
                            </div>
                            <div class="card-body border-top">
                                <div class="d-flex align-items-center mb-3 mt-3">
                                    <input type="search" class="form-control w-240 me-auto"
                                        placeholder="Rechercher..." />
                                    <button class="btn btn-warning me-2" @click="throwEror">
                                        <i class="ti ti-file-type-csv me-2" /> Exporter
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div id="mecanique" class="card tab-pane fade" role="tabpanel">
                            <div class="card-header d-flex align-items-center">
                                <h5 class="mb-0 fw-bold">Mécanique</h5>
                                <button class="btn btn-primary ms-auto" data-bs-toggle="modal"
                                    data-bs-target="#add-mecanique">
                                    <i class="ti ti-square-rounded-plus-filled me-2" /> Nouvelle
                                    enrégistrement
                                </button>
                            </div>
                            <div class="card-body border-top">
                                <div class="d-flex align-items-center mb-3 mt-3">
                                    <input type="search" class="form-control w-240 me-auto"
                                        placeholder="Rechercher..." />
                                    <button class="btn btn-warning me-2" @click="throwEror">
                                        <i class="ti ti-file-type-csv me-2" /> Exporter
                                    </button>
                                    <CarHistoryTable />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>