<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { rhService } from '@/services';
import { useRhStore } from '@/store';
import { helpers, formater } from '@/utils';
import { AddDocsInternModal, DeleteDocModal, EditStgModal } from './components/modals';

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});

const rhStore = useRhStore();

const isLoading = ref(false);
const intern = ref(computed(() => rhStore.intern));


onMounted(async () => {
    await rhService.getInternById(props.id);
});

onUnmounted(() => {
    rhStore.intern = null;
});


watch(rhStore.intern, (newValue) => {
    intern.value = newValue;
}, { deep: true });

const getFileUrl = (attachment) => {
    return helpers.baseUrl() + `uploads/stagiaire/${attachment}`;
};

const DeleteDoc = async () => {
    console.log('delete', rhStore.ItemId);
    isLoading.value = true;

    await rhService.DeleteDocIntern(rhStore.ItemId).then(() => {
        isLoading.value = false;
        $('#delete-doc').modal('hide');

    });
};

</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3" v-if="intern">
        <div class="d-flex align-items-center justify-content-between mb-4">
            <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / Profile / <span class="text-dark"> {{ intern.prenom +
        ' ' + intern.nom }}</span> </h5>
            <div>
                <button class="btn btn-warning" data-bs-target="#edit-stg" data-bs-toggle="modal"
                    @click="rhStore.setItem(intern)">
                    <i class="ti ti-pencil me-2"></i>
                    Modifier
                </button>

            </div>
        </div>
        <div class="row ">
            <div class="col-xl-4 col-lg-5 col-md-5 order-1 order-md-0">
                <div class="card card-border-shadow-primary mb-4">
                    <div class="card-body">
                        <div class="user-avatar-section border-bottom pb-4">
                            <div class=" d-flex align-items-center flex-column">
                                <img class="img-fluid rounded mb-3 pt-1 mt-4"
                                    src="../../assets/img/avatars/user_avatar.png" height="100" width="100"
                                    alt="User avatar">
                                <div class="user-info text-center">
                                    <h4 class="mb-2">{{ intern.prenom + ' ' + intern.nom }}</h4>
                                    <div class="d-flex align-items-center justify-content-around">
                                        <span class="badge mt-1"
                                            :class="helpers.returnBadge(String(intern.status))[0]">{{
        helpers.returnBadge(String(intern.status))[1]
    }}</span>
                                        <div v-if="intern.potentiel === '1'" class="favorite-flag">
                                            <i class="ti ti-star"></i> Potontiel
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <p class="mt-4 small text-uppercase text-muted">À PROPOS</p>
                        <div class="info-container">
                            <ul class="list-unstyled">
                                <li class="mb-2">
                                    <span class="fw-medium me-1">Nom complet:</span>
                                    <span>{{ intern.prenom + ' ' + intern.nom }}</span>
                                </li>

                                <li class="mb-2 pt-1">
                                    <span class="fw-medium me-1">Poste:</span>
                                    <span>{{ intern.poste }}</span>
                                </li>
                                <li class="mb-2 pt-1">
                                    <span class="fw-medium me-1">CIN:</span>
                                    <span>{{ intern.cin }}</span>
                                </li>
                            </ul>
                        </div>
                        <p class="mt-4 small text-uppercase text-muted">DUREE DE TRAVAIL</p>
                        <div class="info-container">
                            <ul class="list-unstyled">
                                <li class="mb-2">
                                    <span class="fw-medium me-1">Date debut:</span>
                                    <span>{{ formater.date(intern.date_debut_stage) }}</span>
                                </li>
                            </ul>
                            <ul class="list-unstyled">
                                <li class="mb-2">
                                    <span class="fw-medium me-1">Date fin:</span>
                                    <span>{{ formater.date(intern.date_fin_stage) }}</span>
                                </li>
                            </ul>
                        </div>
                        <p class="mt-4 small text-uppercase text-muted">CONTACT</p>
                        <div class="info-container">
                            <ul class="list-unstyled">
                                <li class="mb-2">
                                    <span class="fw-medium me-1">Adresse email:</span>
                                    <span>{{ intern.email }}</span>
                                </li>

                                <li class="mb-2 pt-1">
                                    <span class="fw-medium me-1">Numéro de téléphone:</span>
                                    <span>{{ formater.phoneNumber(intern.tel) }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-8 col-lg-7 col-md-7">
                <ul class="nav nav-pills mb-3 nav-fill" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button type="button" class="nav-link active" role="tab" data-bs-toggle="tab"
                            data-bs-target="#employee_dossier" aria-controls="employee" aria-selected="true">
                            Dossier de l'employé
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button type="button" class="nav-link" role="tab" data-bs-toggle="tab"
                            data-bs-target="#documents" aria-controls="documents" aria-selected="false" tabindex="-1">
                            Documents
                        </button>
                    </li>
                </ul>
                <div class="tab-content p-0" style="background-color: transparent; !important">
                    <div id="employee_dossier" class="tab-pane fade show active bg-none"
                        style="background-color: transparent; !important" role="tabpanel">
                        <div class="row mb-3 ">

                            <div class="col-xxl-6">
                                <div class="card card-border-shadow-info">
                                    <div class="card-body">
                                        <div class="d-flex align-items-center mb-2 pb-1">
                                            <div class="me-2">
                                                <img src="@/assets/img/contract.jpg" height="89px" width="100px"
                                                    style="object-fit: contain" />
                                            </div>

                                        </div>
                                        <h6 class="mb-1 fw-bold text-dark">
                                            Copie Attestation de stage
                                        </h6>

                                        <div v-if="intern.attestation_stage != null"
                                            class="card mt-4 border shadow-none">
                                            <div class="card-body p-2">
                                                <a :href="getFileUrl(intern.attestation_stage)" target="_blank"
                                                    class="d-flex align-items-center">
                                                    <div class="p-1 rounded bg-label-info">
                                                        <i class="ti ti-file-download text-info ps-3 pe-3"></i>
                                                    </div>
                                                    <small class="ms-3">
                                                        Télécharger l'attachement
                                                    </small>
                                                </a>
                                            </div>
                                        </div>
                                        <div v-else class="card mt-4 border shadow-none">
                                            <div class="card-body p-2 d-flex align-items-center">
                                                <p class="text-center m-1 text-muted">
                                                    <i class="ti ti-file me-2"></i>
                                                    Aucun copie d'attestation trouvé
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xxl-6">
                                <div class="card card-border-shadow-info">
                                    <div class="card-body">
                                        <div class="d-flex align-items-center mb-2 pb-1">
                                            <div class="me-2">
                                                <img src="@/assets/img/contract.jpg" height="89px" width="100px"
                                                    style="object-fit: contain" />
                                            </div>

                                        </div>
                                        <h6 class="mb-1 fw-bold text-dark">
                                            Copie CIN
                                        </h6>

                                        <div v-if="intern.copie_cin != null" class="card mt-4 border shadow-none">
                                            <div class="card-body p-2">
                                                <a :href="getFileUrl(intern.copie_cin)" target="_blank"
                                                    class="d-flex align-items-center">
                                                    <div class="p-1 rounded bg-label-info">
                                                        <i class="ti ti-file-download text-info ps-3 pe-3"></i>
                                                    </div>
                                                    <small class="ms-3">
                                                        Télécharger l'attachement
                                                    </small>
                                                </a>
                                            </div>
                                        </div>
                                        <div v-else class="card mt-4 border shadow-none">
                                            <div class="card-body p-2 d-flex align-items-center">
                                                <p class="text-center m-1 text-muted">
                                                    <i class="ti ti-file me-2"></i>
                                                    Aucun copie cin trouvé
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xxl-6 mt-3">
                                <div class="card card-border-shadow-info">
                                    <div class="card-body">
                                        <div class="d-flex align-items-center mb-2 pb-1">
                                            <div class="me-2">
                                                <img src="@/assets/img/contract.jpg" height="89px" width="100px"
                                                    style="object-fit: contain" />
                                            </div>

                                        </div>
                                        <h6 class="mb-1 fw-bold text-dark">
                                            Copie Diplome
                                        </h6>

                                        <div v-if="intern.copie_diplome != null" class="card mt-4 border shadow-none">
                                            <div class="card-body p-2">
                                                <a :href="getFileUrl(intern.copie_diplome)" target="_blank"
                                                    class="d-flex align-items-center">
                                                    <div class="p-1 rounded bg-label-info">
                                                        <i class="ti ti-file-download text-info ps-3 pe-3"></i>
                                                    </div>
                                                    <small class="ms-3">
                                                        Télécharger l'attachement
                                                    </small>
                                                </a>
                                            </div>
                                        </div>
                                        <div v-else class="card mt-4 border shadow-none">
                                            <div class="card-body p-2 d-flex align-items-center">
                                                <p class="text-center m-1 text-muted">
                                                    <i class="ti ti-file me-2"></i>
                                                    Aucun copie diplome trouvé
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-xxl-6 mt-3">
                                <div class="card card-border-shadow-info">
                                    <div class="card-body">
                                        <div class="d-flex align-items-center mb-2 pb-1">
                                            <div class="me-2">
                                                <img src="@/assets/img/contract.jpg" height="89px" width="100px"
                                                    style="object-fit: contain;" />
                                            </div>

                                        </div>
                                        <h6 class="mb-1 fw-bold text-dark">
                                            Copie Contrat
                                        </h6>

                                        <div v-if="intern.assurance_copie != null" class="card mt-4 border shadow-none">
                                            <div class="card-body p-2">
                                                <a :href="getFileUrl(intern.assurance_copie)" target="_blank"
                                                    class="d-flex align-items-center">
                                                    <div class="p-1 rounded bg-label-info">
                                                        <i class="ti ti-file-download text-info ps-3 pe-3"></i>
                                                    </div>
                                                    <small class="ms-3">
                                                        Télécharger la copie
                                                    </small>
                                                </a>
                                            </div>
                                        </div>
                                        <div v-else class="card mt-4 border shadow-none">
                                            <div class="card-body p-2 d-flex align-items-center">
                                                <p class="text-center m-1 text-muted">
                                                    <i class="ti ti-file me-2"></i>
                                                    Aucun Copie de Contrat trouvé
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div id="documents" class="tab-pane fade" role="tabpanel">
                        <div class="row">
                            <div class="col-lg-12 col-xl-12">
                                <div class="card card-border-shadow-primary card-action mb-4">
                                    <div class="card-header d-flex align-items-center">
                                        <h5 class="card-action-title mb-0">Documents</h5>
                                        <button class="btn btn-primary" data-bs-toggle="modal"
                                            data-bs-target="#upload-documents">
                                            <i class="ti ti-upload me-2"></i> Ajouter un document
                                        </button>
                                    </div>

                                    <div class="card-body">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AddDocsInternModal :id="intern.id" />
            <EditStgModal :stg="rhStore.Item" />

            <DeleteDocModal id="delete-doc" :isLoading="isLoading" :method="DeleteDoc" :itemid="rhStore.ItemId"
                title="Supprimer le document" message="Êtes-vous sûr de supprimer ce document ?" />
        </div>
    </div>
</template>