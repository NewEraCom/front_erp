<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { rhService } from '@/services';
import { useRhStore } from '@/store';
import { Modal } from '@/ui';
import { helpers, formater } from '@/utils';
import { PointageTable, EmployeeSkeleton } from './components';
import {
    EditSalaryModal, AugementationSalaryModal, EditLeavePerMonthModal,
    AddCongeModal, EditBanInfoModal, EditCnssModal,
    AddDocumentModal, DeleteDocModal, AddPointageModal,
    EditEmployeeModal, RuptureContractModal
} from './components/modals';

import { useToast } from 'vue-toastification';

const toast = useToast();

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});

const rhStore = useRhStore();
const isLoading = ref(false);

// const data = ref(computed(() => rhStore.employee));

const employee = ref(computed(() => rhStore.employee));

const showSalary = ref(false);

onMounted(async () => {
    await rhService.getEmployeeById(Number(props.id));
    // employee.value = data.value;
});

onUnmounted(() => {
    rhStore.clearEmployee();
});


watch(rhStore.employee, (newValue) => {
    employee.value = newValue;
}, { deep: true });

const getFileUrl = (attachment) => {
    return helpers.baseUrl() + `uploads/employe/${attachment}`;
};
const DeleteDoc = async () => {
    console.log('delete', rhStore.ItemId);
    isLoading.value = true;

    await rhService.DeleteDocEmployee(rhStore.ItemId).then(() => {
        isLoading.value = false;
        $('#delete-doc').modal('hide');
        toast.success('Document supprimé avec succès');
    }).catch((error) => {
        isLoading.value = false;
        console.error('Error during action execution', error);
        toast.error('Erreur lors de la suppression du document');
    });
};

</script>
<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <div class="d-flex align-items-center justify-content-between mb-4">
            <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Employés</span> </h5>
            <div v-if="employee">
                <button class="btn btn-warning" data-bs-target="#editNewEmployee" data-bs-toggle="modal">
                    <i class="ti ti-pencil me-2"></i>
                    Modifier
                </button>
                <button v-if="employee.status === '1'" class="btn btn-danger ms-2" data-bs-toggle="modal"
                    data-bs-target="#ruptureContrat">
                    <i class="ti ti-circle-x-filled me-2"></i>
                    Rupture de contrat
                </button>
            </div>
        </div>
        <div v-if="employee" class="row ">
            <div class="col-xl-4 col-lg-5 col-md-5 order-1 order-md-0">
                <div class="card card-border-shadow-primary mb-4">
                    <div class="card-body">
                        <div class="user-avatar-section border-bottom pb-4">
                            <div class=" d-flex align-items-center flex-column">
                                <img class="img-fluid rounded mb-3 pt-1 mt-4"
                                    src="../../assets/img/avatars/user_avatar.png" height="100" width="100"
                                    alt="User avatar">
                                <div class="user-info text-center">
                                    <h4 class="mb-2">{{ employee.first_name + ' ' + employee.last_name }}</h4>
                                    <span class="badge mt-1" :class="helpers.returnBadge(employee.status)[0]">{{
                helpers.returnBadge(employee.status)[1]
            }}</span>
                                </div>
                            </div>
                        </div>
                        <p class="mt-4 small text-uppercase text-muted">À PROPOS</p>
                        <div class="info-container">
                            <ul class="list-unstyled">
                                <li class="mb-2">
                                    <span class="fw-medium me-1">Nom complet:</span>
                                    <span>{{ employee.first_name + ' ' + employee.last_name }}</span>
                                </li>
                                <li class="mb-2 pt-1">
                                    <span class="fw-medium me-1">Date de naissance:</span>
                                    <span>{{ formater.date(employee.birthdate) }}</span>
                                </li>
                                <li class="mb-2 pt-1">
                                    <span class="fw-medium me-1">Poste:</span>
                                    <span>{{ employee.poste }}</span>
                                </li>
                                <li class="mb-2 pt-1">
                                    <span class="fw-medium me-1">Département:</span>
                                    <span>{{ employee.departement }}</span>
                                </li>
                                <li class="mb-2 pt-1">
                                    <span class="fw-medium me-1">Sexe:</span>
                                    <span>{{ employee.sexe }}</span>
                                </li>
                                <li class="mb-2 pt-1">
                                    <span class="fw-medium me-1">Matricule:</span>
                                    <span>Nec-{{ employee.matricule }}</span>
                                </li>
                                <li class="mb-2 pt-1">
                                    <span class="fw-medium me-1">Type de contrat:</span>
                                    <span>
                                        <span class="badge mt-1"
                                            :class="helpers.returnBadge(employee.type_contrat)[0]">{{
                helpers.returnBadge(employee.type_contrat)[1]
            }}</span>
                                    </span>
                                </li>
                                <li class="mb-2 pt-1">
                                    <span class="fw-medium me-1">Date d'embauche:</span>
                                    <span>{{ formater.date(employee.date_embauche) }}</span>
                                </li>
                                <li class="mb-2 pt-1">
                                    <span class="fw-medium me-1">Ancienneté:</span>
                                    <span>{{ formater.monthDifferent(employee.date_embauche) }} Mois</span>
                                </li>
                                <li class="mb-2 pt-1">
                                    <span class="fw-medium me-1">Ville:</span>
                                    <span>{{ employee.ville }}</span>
                                </li>
                                <li class="mb-2 pt-1">
                                    <span class="fw-medium me-1">Adresse:</span>
                                    <span>{{ employee.adresse }}</span>
                                </li>
                            </ul>
                        </div>
                        <p class="mt-4 small text-uppercase text-muted">SITUATIONS FAMILIALE</p>
                        <div class="info-container">
                            <ul class="list-unstyled">
                                <li class="mb-2">
                                    <span class="fw-medium me-1">Situation familiale:</span>
                                    <span>{{ employee.situation_familiale ?? '-' }}</span>
                                </li>
                                <li class="mb-2 pt-1">
                                    <span class="fw-medium me-1">Nombre d'enfants:</span>
                                    <span>{{ employee.num_personne_charge ?? '-' }}</span>

                                </li>
                            </ul>
                        </div>
                        <p class="mt-4 small text-uppercase text-muted">CONTACTS</p>
                        <div class="info-container">
                            <ul class="list-unstyled">
                                <li class="mb-2">
                                    <span class="fw-medium me-1">Adresse email:</span>
                                    <span>{{ employee.email }}</span>
                                </li>
                                <li class="mb-2 pt-1">
                                    <span class="fw-medium me-1">Numéro de flotte:</span>
                                    <span>{{ formater.phoneNumber(employee.flotte) }}</span>

                                </li>
                                <li class="mb-2 pt-1">
                                    <span class="fw-medium me-1">Numéro de téléphone:</span>
                                    <span>{{ formater.phoneNumber(employee.phone_no) }}</span>
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
                    <li class="nav-item" role="presentation">
                        <button type="button" class="nav-link" role="tab" data-bs-toggle="tab"
                            data-bs-target="#pointage" aria-controls="pointage" aria-selected="false" tabindex="-1">
                            Pointage
                        </button>
                    </li>
                </ul>

                <div class="tab-content p-0" style="background-color: transparent !important">
                    <div id="employee_dossier" class="tab-pane fade show active bg-none"
                        style="background-color: transparent !important" role="tabpanel">
                        <div class="row mb-3 g-3">
                            <div class="col-xxl-6">
                                <div class="card card-border-shadow-primary">
                                    <div class="card-body" @mouseover="showSalary = true"
                                        @mouseleave="showSalary = false">
                                        <div class="d-flex align-items-center mb-2 pb-1">
                                            <div class="avatar me-2">
                                                <span class="avatar-initial rounded bg-label-primary"><i
                                                        class="ti ti-coins ti-md"></i></span>
                                            </div>
                                            <h4 class="ms-1 mb-0">Salaire</h4>
                                            <button class="ms-auto btn btn-sm btn-outline-primary"
                                                data-bs-target="#historiqueSalary" data-bs-toggle="modal">
                                                Historique
                                            </button>
                                            <button class="btn btn-primary btn-sm ms-2" data-bs-target="#editSalary"
                                                data-bs-toggle="modal">
                                                <i class="ti ti-pencil"></i>
                                            </button>
                                            <button class="btn btn-primary btn-sm ms-2" data-bs-target="#augemntSalary"
                                                data-bs-toggle="modal">
                                                <i class="ti ti-square-rounded-plus-filled"></i>
                                            </button>
                                        </div>
                                        <h4 v-if="showSalary" class="mb-1 fw-bold text-primary">
                                            {{ formater.number(employee.salary) }}
                                            <small>MAD</small>
                                        </h4>
                                        <h4 v-else class="mb-1 fw-bold text-primary">
                                            ****.**
                                            <small>MAD</small>
                                        </h4>

                                        <h6 v-if="showSalary" class="mb-1 fw-bold">
                                            <small>Salaire par jour :
                                                {{ formater.number(employee.salaire_jrs) }}
                                                MAD</small>
                                        </h6>
                                        <h6 v-else class="mb-1 fw-bold">
                                            <small>Salaire par jour : ****.** MAD</small>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xxl-6">
                                <div class="card card-border-shadow-warning">
                                    <div class="card-body">
                                        <div class="d-flex align-items-center mb-2 pb-1">
                                            <div class="avatar me-2">
                                                <span class="avatar-initial rounded bg-label-warning"><i
                                                        class="ti ti-calendar-week ti-md"></i></span>
                                            </div>
                                            <h4 class="ms-1 mb-0">Conge</h4>
                                            <button class="ms-auto btn btn-sm btn-outline-warning"
                                                data-bs-target="#historicConge" data-bs-toggle="modal">
                                                Historique
                                            </button>
                                            <button class="btn btn-warning btn-sm ms-2"
                                                data-bs-target="#editLeavePerMonth" data-bs-toggle="modal">
                                                <i class="ti ti-pencil"></i>
                                            </button>

                                            <button class="btn btn-warning btn-sm ms-2"
                                                data-bs-target="#addNewLeaveEmployee" data-bs-toggle="modal">
                                                <i class="ti ti-square-rounded-plus-filled"></i>
                                            </button>
                                        </div>
                                        <h4 class="mb-1 fw-bold text-warning">
                                            <small>Somme de conge : </small>
                                            {{ employee.solde_conge ?? '0' }}
                                            <small>Jrs</small>
                                        </h4>
                                        <h6 class="mb-1 fw-bold">
                                            <small>Conge : {{ employee.conge_mois }} Jrs/Mois</small>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row mb-3 g-3">
                            <div class="col-xxl-6">
                                <div class="card card-border-shadow-info">
                                    <div class="card-body">
                                        <div class="d-flex align-items-center mb-2 pb-1">
                                            <div class="me-2">
                                                <img :src="helpers.bankName(employee.bank_name)[0]" height="92px"
                                                    width="100px" style="object-fit: contain" />
                                            </div>
                                            <button class="ms-auto btn btn-sm btn-primary" data-bs-toggle="modal"
                                                data-bs-target="#editInfoBank">
                                                <i class="ti ti-pencil"></i>
                                            </button>
                                        </div>
                                        <div class="d-flex align-items-center">
                                            <div class="me-auto">
                                                <h6 class="mt-3 mb-3 fw-bold text-dark">
                                                    RIB : {{ formater.formatRIB(String(employee.rib)) }}
                                                </h6>
                                                <h6 class="mb-3 fw-bold text-dark">
                                                    Agence :
                                                    {{
                helpers.bankName(employee.bank_name)[1] ??
                'N/A'
            }}
                                                </h6>
                                            </div>
                                            <div v-if="employee.copie_rib">
                                                <a :href="'/uploads/employee/' +
                employee.dossier +
                '/' +
                employee.copie_rib
                " target="_blank">
                                                    <i class="ti ti-file-download bg-label-info p-3 rounded"></i>
                                                </a>
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
                                                <img src="@/assets/img/brands/logo_cnss.jpeg" height="89px"
                                                    width="100px" style="object-fit: contain" />
                                            </div>
                                            <button class="ms-auto btn btn-sm btn-primary"
                                                data-bs-target="#editInfoCnss" data-bs-toggle="modal">
                                                <i class="ti ti-pencil"></i>
                                            </button>
                                        </div>
                                        <h6 class="mb-1 fw-bold text-dark">
                                            Matricule CNSS : {{ employee.cnss ?? 'N/A' }}
                                        </h6>

                                        <div v-if="employee.copie_cnss != null" class="card mt-4 border shadow-none">
                                            <div class="card-body p-2">
                                                <a href="" target="_blank" class="d-flex align-items-center">
                                                    <div class="p-1 rounded bg-label-info">
                                                        <i class="ti ti-file-download text-info ps-3 pe-3"></i>
                                                    </div>
                                                    <small class="ms-3">
                                                        Télécharger la carte CNSS
                                                    </small>
                                                </a>
                                            </div>
                                        </div>
                                        <div v-else class="card mt-4 border shadow-none">
                                            <div class="card-body p-2 d-flex align-items-center">
                                                <p class="text-center m-1 text-muted">
                                                    <i class="ti ti-file me-2"></i>
                                                    Aucun carte CNSS trouvé
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card card-action card-border-shadow-primary">
                            <div class="card-header align-items-center">
                                <h5 class="card-action-title mb-0">Historique</h5>
                                <button class="btn btn-primary btn-sm">
                                    <i class="ti ti-paperclip me-2"></i>
                                    Affecter a nouveau projet
                                </button>

                            </div>
                            <div v-if="employee.projects != null && employee.projects.length != 0"
                                class="card-body pb-0">
                                <ul class="timeline pt-3">
                                    <li v-for="(item, index) in employee.projects" :key="item.id" :class="index !== employee.projects.length - 1
                ? 'border-left-dashed timeline-item-warning pb-4'
                : 'border-transparent timeline-item-primary pb-0'
                " class="timeline-item">
                                        <span :class="index !== employee.projects.length - 1
                ? 'timeline-indicator-warning'
                : 'timeline-indicator-primary'
                " class="timeline-indicator-advanced">
                                            <i class="rounded-circle scaleX-n1-rtl" :class="index !== employee.projects.length - 1
                ? 'ti ti-circle-filled'
                : 'ti ti-circle-dashed'
                "></i>
                                        </span>
                                        <div class="timeline-event">
                                            <div class="timeline-header border-bottom pb-3 mb-3">
                                                <h6 class="mb-0 fw-bold">{{ item.pivot.poste }}</h6>
                                                <span class="text-muted">
                                                    {{ item.pivot.date_debut }}
                                                    {{
                item.pivot.date_fin !== null
                    ? '- ' + item.pivot.date_fin
                    : '- Présent'
            }}
                                                </span>
                                            </div>
                                            <div class="d-flex justify-content-between flex-wrap mb-2">
                                                <span>Projet :
                                                    {{ item.pre_project.project_code }}</span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div v-else class="card-body pb-0 text-center">
                                <div class="row mb-4">
                                    <div class="col-12">
                                        <img src="/src/assets/img/no_pre_project.png" class="empty_stats_img_md" alt=""
                                            height="180px" width="180px" style="object-fit: contain" />
                                        <h6 class="text-center mt-3 fw-bold">
                                            Aucun historique trouvé
                                        </h6>
                                        <p class="text-center">
                                            Il n'y a pas encore d'historique pour cet employé
                                        </p>
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
                                        <div class="row">
                                            <div v-if="employee.copie_cin != null" class="col-6 mb-3">
                                                <div class="card shadow-none border">
                                                    <div class="card-body d-flex">
                                                        <div class="bg-label-primary p-3 rounded">
                                                            <i class="ti ti-file-filled"></i>
                                                        </div>
                                                        <div class="ms-2">
                                                            <a :href="getFileUrl(employee.copie_cin)" target="_blank">
                                                                <h6 class="mb-2">
                                                                    {{
                formater.limitText(
                    employee.copie_cin,
                    45
                )
            }}
                                                                </h6>
                                                            </a>

                                                            <small class="mt-auto">Créé le
                                                                {{
                    formater.date(
                        employee.created_at
                    )
                }}</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-if="employee.documents.length != 0" class="row">
                                            <div v-for="item in employee.documents" :key="item" class="col-6 mb-3">
                                                <div class="card shadow-none border">
                                                    <div class="card-body d-flex align-items-center">
                                                        <div class="bg-label-primary p-3 rounded">
                                                            <i class="ti ti-file-filled"></i>
                                                        </div>
                                                        <div class="ms-2">
                                                            <a :href="getFileUrl(item.attachement)" target="_blank">

                                                                <h6 class="mb-2">
                                                                    {{
                formater.limitText(
                    item.title,
                    55
                )
            }}
                                                                </h6>
                                                            </a>
                                                            <small class="mt-auto">Créé le
                                                                {{
                    formater.date(
                        item.created_at
                    )
                }}</small>
                                                        </div>
                                                        <button class="ms-auto btn btn-danger btn-sm m-0"
                                                            @click="rhStore.setItemId(item.id)" data-bs-toggle="modal"
                                                            data-bs-target="#delete-doc">
                                                            <i class="ti ti-trash-filled"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else class="row mb-4">
                                            <div class="col-12 text-center">
                                                <img src="/src/assets/img/No_Results.png" class="empty_stats_img_md"
                                                    alt="" height="180px" width="180px" style="object-fit: contain" />
                                                <h6 class="text-center mt-3 fw-bold">
                                                    Aucun document trouvé
                                                </h6>
                                                <p class="text-center">
                                                    Il n'y a pas encore de documents pour cet
                                                    employé
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="pointage" class="tab-pane fade" role="tabpanel">
                        <div class="row">
                            <div class="col-lg-12 col-xl-12">
                                <div class="card card-border-shadow-primary card-action mb-4">
                                    <div class="card-header align-items-center">
                                        <h5 class="card-action-title mb-0">Pointage</h5>
                                        <button class="btn btn-primary" data-bs-toggle="modal"
                                            data-bs-target="#addPointage">
                                            <i class="ti ti-square-rounded-plus-filled me-2"></i>
                                            Nouveau enregistrement
                                        </button>
                                    </div>
                                    <div class="card-body">
                                        <PointageTable :pointages="employee.pointages" :custom="false" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal id="historiqueSalary" title="Historique de salaire" size="modal-lg">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12">
                            <table class="table">
                                <thead class="table-light">
                                    <tr>
                                        <th class="fw-bold">Salaire</th>
                                        <th class="fw-bold text-center">Salaire/Jrs</th>
                                        <th class="fw-bold text-center">Date de debut</th>
                                        <th class="fw-bold text-center">Date d'augmentation</th>
                                    </tr>
                                </thead>
                                <tbody v-if="employee.historique_paye != 0">
                                    <tr v-for="item in employee.historique_paye" :key="item.id">
                                        <td>
                                            {{ formater.number(item.salaire) }} MAD
                                        </td>
                                        <td class="text-center">
                                            {{ formater.number(item.salaire / 26) }} MAD
                                        </td>
                                        <td class="text-center">
                                            {{ formater.date(item.start_date) }}
                                        </td>

                                        <td class="text-center">
                                            {{ formater.date(item.upgrade_date) }}
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr>
                                        <td colspan="4" class="text-center">
                                            Aucun historique trouvé
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal id="historicConge" title="Historique de conge" size="modal-lg">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12">
                            <table class="table">
                                <thead class="table-light">
                                    <tr>
                                        <th class="fw-bold">Date de debut</th>
                                        <th class="fw-bold text-center">Date de fin</th>
                                        <th class="fw-bold text-center">Nombre de jours</th>
                                        <th class="fw-bold text-center">Type</th>
                                        <th class="fw-bold text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody v-if="employee.conges != 0">
                                    <tr v-for="item in employee.conges" :key="item.id">
                                        <td>
                                            {{ formater.date(item.date_start) }}
                                        </td>
                                        <td class="text-center">
                                            {{ formater.date(item.date_end) }}
                                        </td>
                                        <td class="text-center">
                                            {{ item.duree ?
                                            item.duree > 1 ? item.duree + ' Jours' :
                                            item.duree + ' Jour' : 'N/A' }}
                                        </td>
                                        <td class="text-center">
                                            <small class="fw-bold" :class="helpers.returnBadge(String(item.type))[0]">{{
                                                helpers.returnBadge(String(item.type))[1] }}
                                            </small>
                                        </td>
                                        <td class="text-center">
                                            <small class="fw-bold"
                                                :class="helpers.returnBadge(String(item.status))[0]">{{
                                                helpers.returnBadge(String(item.status))[1] }}
                                            </small>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr>
                                        <td colspan="5" class="text-center">
                                            Aucun historique trouvé
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Modal>

            <EditSalaryModal :id="employee.id" :old-salary="employee.salary" />
            <AugementationSalaryModal :id="employee.id" />
            <EditLeavePerMonthModal :id="employee.id" :old-day-per-month="employee.conge_mois" />
            <AddCongeModal :id="employee.id" />
            <EditBanInfoModal :id="employee.id" :old-rib="employee.rib" :date-virement="employee.date_virement"
                :old-bank="employee.bank_name" />
            <EditCnssModal :id="employee.id" :old-cnss="employee.cnss" />
            <AddDocumentModal :id="employee.id" />
            <DeleteDocModal id="delete-doc" :isLoading="isLoading" :method="DeleteDoc" :itemid="rhStore.ItemId"
                title="Supprimer le document" message="Êtes-vous sûr de supprimer ce document ?" />
            <EditEmployeeModal :employee="employee" />
            <RuptureContractModal :id="employee.id" />
            <AddPointageModal source="simple" :id="Number(id)" />

        </div>
        <div v-else>
            <EmployeeSkeleton />
        </div>
    </div>
</template>

<style scoped></style>
