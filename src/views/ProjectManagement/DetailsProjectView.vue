<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted, watch } from 'vue';
import { pmService, sharedService } from '@/services';
import { usePMStore, useSharedStore } from '@/store';
import { helpers, formater } from '@/utils';
import { NewCaisseProjectModal } from './components/modals';
import {
    DeleteModal,
    NewPurchaseOrderModal,
    NewServiceModal
} from '@/ui';

import {
    RequestSalesTable,
    StockProjectTable,
    InvoiceProjectTable,
    UploadDocumentModal,
    OutOfStockModal,
    invoicesComposantModal,
    InvoiceAttachementModal,
    EditArticleModal,
    SuivieTable,
    SuivieModal
} from './components';

const pmStore = usePMStore();
const sharedStore = useSharedStore();

const props = defineProps<{
    id: string;
}>();

const item = ref(computed(() => pmStore.project));
const caisseProject = ref(computed(() => pmStore.caisse_project));
const soustraitants = ref(computed(() => sharedStore.fournisseurs));

const project = ref(null);

const selectedArticle = ref(computed(() => pmStore.selectedArticle));
const role = localStorage.getItem('role');
const caisse = ref(computed(() => pmStore.caisse_project_sum));

onMounted(async () => {
    await pmService.getProjectById(props.id);
    await sharedService.getSoustraitant();
    console.log(caisse.value); 
});

onUnmounted(() => {
    pmStore.clearProject();
});

watch(item, () => {
    project.value = item.value;
}, { deep: true });

</script>
<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <div class="d-flex align-items-center justify-content-between">
            <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / Projets /
                <span class="text-dark" v-if="project">{{ project.code }}</span>
            </h5>
            <div v-if="project && role === 'Chef de projet'">
                <button v-if="project.facture_composante.length == 0" class="btn btn-success ms-auto"
                    data-bs-toggle="modal" data-bs-target="#invoicesComposant">
                    <i class="ti ti-square-rounded-check-filled me-2"></i> Ajouter les
                    Composants de la facture
                </button>
            </div>
        </div>

        <div v-if="project" class="row g-3">
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-4 col-xxl-4">
                <div class="card mb-4">
                    <div class="card-body">
                        <div class="user-avatar-section">
                            <div class="d-flex align-items-center flex-column">
                                <img class="img-fluid rounded mb-3 bg-primary p-2 pt-1 mt-4"
                                    src="/src/assets/img/favicon.png" height="100" width="100" alt="User avatar" />
                                <div class="user-info text-center">
                                    <h4 class="mb-2">
                                        {{ project.pre_project.project_code }}
                                    </h4>
                                    <span class="fw-bold badge mt-1" :class="helpers.returnBadge(project.status)[0]">{{
                    helpers.returnBadge(project.status)[1] }}</span>

                                </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-around flex-wrap mt-3 pt-3 pb-4 border-bottom">
                            <div class="d-flex align-items-start me-4 mt-3 gap-2">
                                <span class="badge bg-label-primary p-2 rounded"><i
                                        class="ti ti-checkbox ti-sm"></i></span>
                                <div>
                                    <p class="mb-0 fw-medium">
                                        {{ formater.date(project.date_start) }}
                                    </p>
                                    <small class="fw-bold">Date de debut</small>
                                </div>
                            </div>
                            <div class="d-flex align-items-start mt-3 gap-2">
                                <span class="badge bg-label-primary p-2 rounded"><i
                                        class="ti ti-briefcase ti-sm"></i></span>
                                <div>
                                    <p class="mb-0 fw-medium">
                                        {{
                    project.pre_project.project_manager.employee
                        .first_name +
                    ' ' +
                    project.pre_project.project_manager.employee
                        .last_name
                }}
                                    </p>
                                    <small class="fw-bold">Chef de projet</small>
                                </div>
                            </div>
                        </div>

                        <p class="mt-4 small text-uppercase text-muted">Object</p>
                        <div class="info-container">
                            <p v-html="formater.paragraph(project.pre_project.objet)"></p>
                        </div>
                    </div>
                </div>
                <div class="card card-border-shadow-primary rounded mt-4">
                    <div class="card-header pb-0">
                        <div class="d-flex justify-content-between">
                            <small class="d-block mb-2 text-muted">Budget de projet</small>
                        </div>
                        <h4 v-if="project.budget != null" class="card-title mb-1">
                            {{ formater.number(project.budget) + ' MAD' }}
                        </h4>
                        <h4 v-else class="card-title mb-1">0 MAD</h4>
                    </div>
                    <div class="card-body">
                        <div class="row mt-4">
                            <div class="col-4">
                                <div class="d-flex gap-2 align-items-center mb-2">
                                    <span class="badge bg-label-success p-1 rounded">
                                        <i class="ti ti-shopping-cart ti-xs"></i>
                                    </span>
                                    <p class="mb-0">Entrée</p>
                                </div>
                                <h5 class="mb-0 pt-1">100%</h5>
                                <small v-if="project.budget" class="text-muted">{{
                    formater.number(project.budget) + ' MAD'
                }}</small>
                                <small v-else class="text-muted">0 MAD</small>
                            </div>
                            <div class="col-4">
                                <div class="divider divider-vertical">
                                    <div class="divider-text">
                                        <span class="badge-divider-bg text-dark"><i
                                                class="ti ti-arrows-right-left"></i></span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4 text-end">
                                <div class="d-flex gap-2 justify-content-end align-items-center mb-2">
                                    <p class="mb-0">Sortie</p>
                                    <span class="badge bg-label-danger p-1 rounded"><i
                                            class="ti ti-link ti-xs"></i></span>
                                </div>
                                <h5 class="mb-0 pt-1">0%</h5>
                                <small class="text-muted">0 MAD</small>
                            </div>
                        </div>
                        <div class="d-flex align-items-center mt-4">
                            <div class="progress w-100" style="height: 8px">
                                <div class="progress-bar bg-success" style="width: 100%" role="progressbar"
                                    aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                <div class="progress-bar bg-danger" role="progressbar" style="width: 0%"
                                    aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card card-border-shadow-primary mt-4">
                    <div class="card-body">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-center mb-2 pb-1">
                                <div class="avatar me-2">
                                    <span class="avatar-initial rounded bg-label-primary"><i
                                            class="ti ti-building-bank ti-md"></i></span>
                                </div>
                                <!-- {{ project.caisse }} -->
                                <h4 class="ms-1 mb-0 fw-bold">
                                    {{ project.caisse }}<small class="fw-bold"> MAD</small>
                                </h4>

                            </div>
                            <button class="btn btn-sm btn-primary" data-bs-target="#caisseProject"
                                data-bs-toggle="modal" >
                                Budget de caisse
                            </button>
                        </div>
                        <p class="mb-1 fw-bold">Caisse de Projet :</p>
                        <!-- {{ caisseProject }} -->
                        <ul>
                            <li v-for="(item, index) in caisseProject" :key="index">
                                 {{ item.designation }} : {{ item.montant }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-8 col-xxl-8">
                <div class="row">
                    <div class="col-12">
                        <ul class="nav nav-pills mb-3 nav-fill gap-2" role="tablist">
                            <li class="nav-item">
                                <button type="button" class="nav-link active" role="tab" data-bs-toggle="tab"
                                    data-bs-target="#project" aria-controls="project" aria-selected="true">
                                    Dossier de projet
                                </button>
                            </li>
                            <li class="nav-item">
                                <button type="button" class="nav-link" role="tab" data-bs-toggle="tab"
                                    data-bs-target="#sales" aria-controls="sales" aria-selected="true">
                                    Achats & Services
                                </button>
                            </li>
                            <li class="nav-item">
                                <button type="button" class="nav-link" role="tab" data-bs-toggle="tab"
                                    data-bs-target="#stock" aria-controls="stock" aria-selected="true">
                                    Stock
                                </button>
                            </li>

                            <li class="nav-item">
                                <button type="button" class="nav-link" role="tab" data-bs-toggle="tab"
                                    data-bs-target="#facturations" aria-controls="facturations" aria-selected="true">
                                    Facturations
                                </button>
                            </li>

                            <li class="nav-item">
                                <button type="button" class="nav-link" role="tab" data-bs-toggle="tab"
                                    data-bs-target="#production" aria-controls="productions" aria-selected="true">
                                    Suivi de production
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="tab-content p-0 pt-1 pb-4">
                    <div id="project" class="tab-pane fade show active text-start" role="tabpanel">
                        <div class="card card-border-shadow-primary">
                            <h5 class="card-header border-bottom fw-bold">
                                Information de projet
                            </h5>
                            <div class="card-body">
                                <div v-if="project.pre_project.description">
                                    <label class="mb-2 text-dark fw-bold">Description : </label>
                                    <p v-html="formater.paragraph(project.pre_project.description)"></p>
                                </div>
                                <div class="mt-4 table-responsive text-nowrap">
                                    <table class="table table-hover table-bordered">
                                        <tbody>
                                            <tr>
                                                <th class="fw-bold text-dark">Client</th>
                                                <td>
                                                    {{ project.pre_project.maitre_ouvrage }}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th class="fw-bold text-dark">Localite</th>
                                                <td>{{ project.pre_project.localite }}</td>
                                            </tr>
                                            <tr v-if="project.pre_project.montant_caution != null
                    ">
                                                <th class="fw-bold text-dark">
                                                    Montant de caution définitive
                                                </th>
                                                <td>
                                                    {{
                    formater.number(
                        project.pre_project
                            .montant_caution_definitive
                    )
                }}
                                                    MAD
                                                </td>
                                            </tr>
                                            <tr>
                                                <th class="fw-bold text-dark">
                                                    Budget de projet
                                                </th>
                                                <td>
                                                    {{
                        formater.number(
                            project.budget
                        )
                    }}
                                                    MAD
                                                </td>
                                            </tr>
                                            <tr>
                                                <th class="fw-bold text-dark">
                                                    Date de debut de projet
                                                </th>
                                                <td>
                                                    {{ formater.date(project.date_start) }}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th class="fw-bold text-dark">
                                                    Durée de projet
                                                </th>
                                                <td>
                                                    {{
                    project.pre_project.duration != null
                        ? project.pre_project.duration +
                        ' Jours'
                        : '-'
                }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="card card-border-shadow-primary mt-4">
                            <div class="d-flex border-bottom justify-content-between align-items-center">
                                <h5 class="card-header fw-bold">Document de projet</h5>
                                <button v-if="role === 'Chef de projet'" class="btn btn-primary me-4"
                                    data-bs-target="#updateDocument" data-bs-toggle="modal">
                                    <i class="ti ti-upload me-2"></i>
                                    Ajouter un document
                                </button>
                            </div>
                            <div class="card-body">
                                <div v-if="project.assets.length > 0 ||
                    project.pre_project.cps_file != null ||
                    project.pre_project.cahier_charge != null
                    " class="row">
                                    <div v-for="item in project.assets" :key="item.id"
                                        class="col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-3">
                                        <div class="border p-2 rounded">
                                            <li class="d-flex align-items-center">
                                                <div class="badge bg-label-primary me-2">
                                                    <i class="ti ti-file f-28 rounded text-primary" />
                                                </div>
                                                <div class="ms-2">
                                                    <a class="d-block" target="_blank">
                                                        <span class="d-inline fw-bold me-2 text-heading mb-2">
                                                            {{
                    formater.limitText(
                        item.file_name,
                        25
                    )
                }}
                                                        </span>
                                                    </a>
                                                    <small class="text-muted">Créé le :
                                                        {{
                        formater.date(item.created_at)
                    }}</small>
                                                </div>
                                            </li>
                                        </div>
                                    </div>
                                    <div v-if="project.pre_project.cps_file != null" class="col-6">
                                        <div class="border p-2 rounded">
                                            <li class="d-flex align-items-center">
                                                <div class="badge bg-label-primary me-2">
                                                    <i class="ti ti-file f-28 rounded text-primary" />
                                                </div>
                                                <div class="ms-2">
                                                    <a class="d-block">
                                                        <span class="d-inline fw-bold me-2 text-heading">
                                                            {{ project.pre_project.cps_file }}
                                                        </span>
                                                    </a>
                                                    <small>CPS</small>
                                                </div>
                                            </li>
                                        </div>
                                    </div>
                                </div>
                                <div v-else class="row rounded">
                                    <div class="col-12 text-center p-4">
                                        <img src="/src/assets/img/Empty.png" style="width: 10% !important" srcset="" />
                                        <h5 class="mt-4 mb-2 fw-bold">Aucun document ici.</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card card-border-shadow-primary mt-4">
                            <h5 class="card-header border-bottom fw-bold">Personnel de projet</h5>
                            <div v-if="project" class="card-body pt-4">
                                <div class="row g-3">
                                    <div class="col-6">
                                        <div class="d-flex mb-3 align-items-center rounded border p-3">
                                            <div class="badge bg-label-primary me-3 rounded p-2">
                                                <i class="ti ti-user ti-sm"></i>
                                            </div>
                                            <div
                                                class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                                <div class="me-2">
                                                    <h6 class="mb-0">
                                                        {{ project.pre_project.activity_director.employee.first_name +
                    ' '
                    + project.pre_project.activity_director.employee.last_name }}
                                                    </h6>
                                                    <small class="text-muted d-block mt-1">Directeur des
                                                        opérations</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="d-flex mb-3 align-items-center rounded border p-3">
                                            <div class="badge bg-label-primary me-3 rounded p-2">
                                                <i class="ti ti-user ti-sm"></i>
                                            </div>
                                            <div
                                                class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                                <div class="me-2">
                                                    <h6 class="mb-0">
                                                        {{ project.pre_project.project_manager.employee.first_name +
                    ' '
                    + project.pre_project.project_manager.employee.last_name }}
                                                    </h6>
                                                    <small class="text-muted d-block mt-1">Chef de projet</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="sales" class="tab-pane fade text-start" role="tabpanel">
                        <div class="card card-border-shadow-primary">
                            <div class="d-flex border-bottom align-items-center">
                                <h5 class="card-header fw-bold">Achats & Services</h5>
                                <div class="dropdown ms-auto me-3">
                                    <button v-if="role === 'Chef de projet'" id="salesByCountry" class="btn p-0"
                                        type="button" data-bs-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">
                                        <i class="ti ti-dots-vertical ti-sm text-dark fw-bold"></i>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-end" aria-labelledby="salesByCountry"
                                        style="">
                                        <button data-bs-target="#newPurchaseOrder" data-bs-toggle="modal"
                                            class="dropdown-item fw-medium">
                                            <i class="ti ti-shopping-bag-plus me-2"></i> Ajouter
                                            une demande d'achat
                                        </button>
                                        <button data-bs-target="#newService" data-bs-toggle="modal"
                                            class="dropdown-item fw-medium">
                                            <i class="ti ti-traffic-cone me-2"></i> Ajouter
                                            une demande d'exécution
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <RequestSalesTable :request-sales="project.purchase" />
                            </div>
                        </div>
                    </div>

                    <div id="stock" class="tab-pane fade text-start" role="tabpanel">
                        <div class="card card-border-shadow-primary">
                            <div class="d-flex border-bottom align-items-center">
                                <h5 class="card-header fw-bold">Stock</h5>
                                <div v-if="role === 'Chef de projet'" class="dropdown ms-auto me-3">
                                    <button id="salesByCountry" class="btn p-0" type="button" data-bs-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false">
                                        <i class="ti ti-dots-vertical ti-sm text-dark fw-bold"></i>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-end" aria-labelledby="salesByCountry"
                                        style="">
                                        <button data-bs-target="#outOfStock" data-bs-toggle="modal"
                                            class="dropdown-item fw-medium">
                                            <i class="ti ti-transfer-out me-2"></i> Demande de sortie de stock
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <StockProjectTable :articles="project.pre_project.articles.filter(
                    (item: any) => item.category === 'Achats'
                )" />
                            </div>
                        </div>
                    </div>

                    <div id="facturations" class="tab-pane fade text-start" role="tabpanel">
                        <div class="card card-border-shadow-primary">
                            <div class="d-flex border-bottom align-items-center">
                                <h5 class="card-header fw-bold">Facturation</h5>
                                <div v-if="role === 'Chef de projet' && project.facture_composante.length != 0"
                                    class="dropdown ms-auto me-3">
                                    <button id="salesByCountry" class="btn p-0" type="button" data-bs-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false">
                                        <i class="ti ti-dots-vertical ti-sm text-dark fw-bold"></i>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-end" aria-labelledby="salesByCountry"
                                        style="">
                                        <button data-bs-target="#invoiceUpload" data-bs-toggle="modal"
                                            class="dropdown-item fw-medium">
                                            <i class="ti ti-file-plus me-2"></i> Créer une facture
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <InvoiceProjectTable :invoices="project.factures" />
                            </div>
                        </div>
                    </div>

                    <div id="production" class="tab-pane fade text-start" role="tabpanel">
                        <div class="card card-border-shadow-primary">
                            <div class="d-flex border-bottom align-items-center">
                                <h5 class="card-header fw-bold">Suivi de production</h5>
                                <div v-if="role === 'Chef de projet' && project.facture_composante.length != 0"
                                    class="dropdown ms-auto me-3">
                                    <button id="salesByCountry" class="btn p-0" type="button" data-bs-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false">
                                        <i class="ti ti-dots-vertical ti-sm text-dark fw-bold"></i>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-end" aria-labelledby="salesByCountry"
                                        style="">
                                        <button data-bs-target="#invoiceUpload" data-bs-toggle="modal"
                                            class="dropdown-item fw-medium">
                                            <i class="ti ti-file-plus me-2"></i> Créer une facture
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <SuivieTable :items="project.suivie" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <NewCaisseProjectModal :projectId="id" />
            <UploadDocumentModal :id="project.id" />
            <NewServiceModal v-if="soustraitants != null" :id="project.id" :services="project.pre_project.articles.filter(
                    (item: any) => item.category === 'Services'
                )" :soustraitants="soustraitants.data" />
            <NewPurchaseOrderModal :id="project.id" :articles="project.pre_project.articles.filter(
                    (item: any) => item.category === 'Achats' && item.status === 1
                )" />
            <OutOfStockModal :id="project.id" :articles="project.pre_project.articles.filter(
                    (item: any) => item.category === 'Achats' && item.qte_restant > 0
                )" />
            <invoicesComposantModal :id="project.id" />
            <InvoiceAttachementModal :id="project.id" :project="project" />
            <EditArticleModal :selected-article="selectedArticle" />
            <DeleteModal title="Supprimer un Demande" text="Voulez-vous vraiment supprimer cette demande ?"
                textButton="Oui, Supprimer" :action="() => pmService.deleteDemande()"
                message="Demande supprimée avec succès" />
            <SuivieModal />
        </div>

    </div>
</template>

<style>
.skeleton-text {
    background-color: #a7a7a7;
    border-radius: 4px;
    opacity: 0.4;
    height: 1rem;
    width: 100%;
    margin-bottom: 0.5rem;
    animation: fadeInOut 1.5s infinite;
}

@keyframes fadeInOut {

    0%,
    100% {
        opacity: 0.8;
    }

    50% {
        opacity: 0.2;
    }
}
</style>