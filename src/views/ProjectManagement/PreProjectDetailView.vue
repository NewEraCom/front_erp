<script setup>
import { computed, onMounted, ref } from 'vue';
import { usePMStore } from '@/store';
import { pmService } from '@/services';
import { helpers } from '@/utils';
// import { Modal, DataTableDevis, DataTableBordereau, DetailsPreProjectSkeleton } from '@/ui';
import { Modal } from '@/ui';
import { DataTableBordereau ,DataTableDevis} from './components';
import { DeleteDocModal } from '../HumanRessources/components';

import {
    AddLots,
    ImportAssets,
    EditPreProject,
    SetFileNumber,
    SetFileNumberDone,
    ValidatePreProject,
    RefuserPreProject,
    CloturePreProject,
    NewChiffrage,
    DeleteChiffrage,
    ImportChiffrage,
    CloseChiffrage,
    ImportBordereau,
    ClosePreProject,
    CancelSubmission
} from './components';

const props = defineProps({
  id: {
    type: String,
    default: '0'
  }
});
const isLoading = ref(false);

const PMStore = usePMStore();
const preProject = computed(() => PMStore.preprojectDetail);
let user = ref(null);

const projectManager = ref(computed(() => PMStore.projectManager));

onMounted(async () => {
  await pmService.getPreProjectById(props.id).then(() => {
    user.value = JSON.parse(localStorage.getItem('user'));
  });
});

const fillInputIdDoc = (id) => {
  $('#docID').val(id);
};

const toggleCard = (id) => {
  $('#' + id).toggleClass('hide-card');
};

const sumCautionAndEstimation = (lots) => {
  let caution = 0;
  let estimation = 0;

  lots.forEach((lot) => {
    caution += lot.montant_caution;
    estimation += lot.estimation_marche;
  });

  return [caution, estimation];
};
const getFileUrl = (attachment,path) => {
  return helpers.baseUrl() + `${path}/${attachment}`;
};
const deleteArticles = async () => {
  isLoading.value = true;
  await pmService.deleteArticle(PMStore.ItemId).then(() => {
    $('#deleteArticle').modal('hide');
  }).catch((error) => {
    console.error('Error during action execution', error);
  }).finally(() => {
    isLoading.value = false;
  });
};
</script>


<template>
  <div v-if="preProject != null" class="flex-grow-1 container-fluid mt-3">
    <div class="d-flex align-items-center">
      <h5 class="py-3 mb-3">
        <span class="text-muted fw-normal">Dashboard / Avant Projets / </span>
        {{ preProject.maitre_ouvrage }}
      </h5>
      <div v-if="preProject.status == 'En soumission'" class="ms-auto">
        <button class="btn btn-warning" data-bs-target="#cancel-submission" data-bs-toggle="modal">
          <i class="ti ti-arrow-back-up-double me-2" /> Annuler la soumission
        </button>
        <button class="btn btn-danger ms-2" data-bs-target="#close" data-bs-toggle="modal">
          <i class="ti ti-square-rounded-x-filled me-2" /> Projet perdu
        </button>
        <button class="btn btn-success ms-2" data-bs-target="#cloture" data-bs-toggle="modal">
          <i class="ti ti-square-rounded-check-filled me-2" /> Projet gagné
        </button>
      </div>

      <div v-if="(helpers.dateDiff(preProject.date_depot)[1] != 'Offre expirée' &&
    preProject.status == 'En attente' &&
    user?.roles[0]?.name === 'Business development manager' &&
    preProject.type_project != 'special') ||
    (preProject.status == 'En attente' &&
      user?.roles[0]?.name === 'Business development manager' &&
      preProject.type_project == 'special' &&
      preProject.lots.length > 1)
    " class="ms-auto">
        <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#refuser-project">
          <i class="ti ti-square-rounded-x-filled me-2" /> Non Valider
        </button>
        <button class="btn btn-success ms-2" data-bs-toggle="modal" data-bs-target="#validate-project">
          <i class="ti ti-square-rounded-check-filled me-2" /> Valider
        </button>
      </div>
    </div>
    <div v-if="preProject.cps_file == null" class="alert alert-warning border border-warning d-flex align-items-center"
      role="alert">
      Veuillez télécharger le fichier cps pour ce projet avant. Pour le télécharger, &nbsp;
      <button class="btn btn-link fw-bold" data-bs-target="#import-assets" data-bs-toggle="modal">
        cliquez ici <i class="ms-1 ti ti-link" />
      </button>
    </div>
    <div v-if="preProject.type_project == 'special' && preProject.lots.length == 0"
      class="alert alert-danger border border-danger d-flex align-items-center" role="alert">
      Merci de compléter cet avant projet, vous devez compléter le nombre de lots et les cautions,
      &nbsp;
      <a class="fw-bold" data-bs-target="#add-lots" data-bs-toggle="modal">
        cliquez ici <i class="ms-1 ti ti-link" />
      </a>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card rounded mb-4">
          <div class="user-profile-header d-flex flex-column flex-sm-row text-sm-start text-center mb-4">
            <div class="flex-shrink-0 mt-4 mx-sm-0 mx-auto">
              <img src="/src/assets/img/Logo_white_bg.png" alt="user image" style="object-fit: contain"
                class="d-block client-logo ms-0 ms-sm-4 rounded user-profile-img bg-primary" />
            </div>
            <div class="flex-grow-1 mt-3 mt-sm-5">
              <div
                class="d-flex align-items-md-end align-items-sm-start align-items-center justify-content-md-between justify-content-start mx-4 flex-md-row flex-column gap-4">
                <div class="user-profile-info">
                  <h4 class="fw-bold">
                    N° AO : {{ preProject.n_offre }}
                    <i v-if="preProject.type_project != 'simple'" class="ti ti-bookmarks-filled text-danger" />
                  </h4>
                  <ul
                    class="list-inline mb-0 d-flex align-items-center flex-wrap justify-content-sm-start justify-content-center gap-2">
                    <li class="list-inline-item d-flex gap-1">
                      Créer le :
                      {{ helpers.formattedDate(preProject.created_at) }}
                    </li>
                    <li v-if="preProject.project_manager != null" class="list-inline-item d-flex gap-1">
                      <span class="ms-2 me-4">|</span>
                      Chef de projet :
                      {{
    preProject.project_manager.employee.first_name +
    ' ' +
    preProject.project_manager.employee.last_name
  }}
                    </li>
                    <li v-if="preProject.project == null" class="list-inline-item d-flex gap-1">
                      <span class="badge fw-bold" :class="helpers.returnBadge(preProject.status)[0]">
                        {{ helpers.returnBadge(preProject.status)[1] }}
                      </span>
                    </li>
                  </ul>
                </div>
                <button v-if="preProject.status == 'En attente'" class="ms-auto btn btn-primary"
                  data-bs-target="#edit-preproject" data-bs-toggle="modal">
                  <i class="ti ti-pencil me-2" />Modifier
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xl-12 col-lg-12 col-md-12 order-0 order-md-1">
        <div class="nav-align-top nav-fill mb-4">
          <ul class="nav nav-pills mb-3" role="tablist">
            <li class="nav-item" role="presentation">
              <button type="button" class="nav-link active" role="tab" data-bs-toggle="tab"
                data-bs-target="#fiche-projet" aria-controls="fiche-projet" aria-selected="true">
                Fiche de projet
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button type="button" class="nav-link" role="tab" data-bs-toggle="tab" data-bs-target="#devis"
                aria-controls="devis" aria-selected="false" tabindex="-1">
                Devis
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button type="button" class="nav-link" role="tab" data-bs-toggle="tab" data-bs-target="#bordereau"
                aria-controls="bordereau" aria-selected="false" tabindex="-1">
                Bordereau
              </button>
            </li>
          </ul>
          <div class="tab-content bg-none border-none shadow-none p-0">
            <div id="fiche-projet" class="tab-pane fade active show" role="tabpanel">
              <div class="row">
                <div class="col-xl-4 col-lg-5 col-md-5 order-1 order-md-0">
                  <div class="card card-border-shadow-primary rounded">
                    <div class="card-body">
                      <h5 class="d-block text-dark fw-bold mb-4">Historique</h5>
                      <ul v-if="preProject.timeline.length > 0" class="timeline pt-3">
                        <li v-for="(item, index) in preProject.timeline" :key="item.id"
                          class="timeline-item pb-4 timeline-item-primary border-left-dashed" :class="{
    'border-transparent': index === preProject.timeline.length - 1
  }">
                          <span class="timeline-indicator-advanced timeline-indicator-primary">
                            <i class="ti ti-circle-filled rounded-circle scaleX-n1-rtl" />
                          </span>
                          <div class="timeline-event">
                            <div class="timeline-header border-bottom mb-3">
                              <h6 class="mb-0 fw-bold">
                                {{ item.title }}
                              </h6>
                              <span class="text-dark fw-medium">{{
    helpers.formattedDate(item.created_at)
  }}</span>
                            </div>
                            <div v-if="item.description != null || item.description != '-'"
                              class="d-flex justify-content-between flex-wrap mb-2">
                              <div class="d-flex align-items-center">
                                {{ item.description }}
                              </div>
                            </div>
                            <div v-if="item.file_name_1"
                              class="d-flex align-items-center mt-3 border-top border-top-dashed pt-3">
                              <i class="ti ti-file-type-pdf font-18 me-2" />
                              <span class="mb-0">{{ item.file_name_1 }}</span>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <div v-else class="text-start">
                        <h6 class="mt-3">Aucun historique disponible</h6>
                      </div>
                    </div>
                  </div>
                  <div class="card card-border-shadow-primary rounded mt-4">
                    <div class="card-body">
                      <h5 class="d-block text-dark fw-bold mb-2">L'états des documents</h5>
                      <small v-if="preProject.status == 'En attente'" class="text-danger">
                        <b class="text-underline">NOTE :</b> Si vous mettez à jour les informations
                        préalables au projet, les documents seront réinitialisés à zéro.
                      </small>
                      <div v-if="preProject.file_stats.length != 0" class="mt-3">
                        <div v-for="file in preProject.file_stats" :key="file.id"
                          class="card rounded text-white border bg-danger mb-3">
                          <div class="progress-custom"
                            :style="helpers.calculatePercentage(file.file_done, file.file_total)" />
                          <div class="content d-flex p-2">
                            <p class="m-1 fw-bold">
                              {{ file.file_name }}
                            </p>
                            <b class="ms-auto m-1"> {{ file.file_done }}/{{ file.file_total }} </b>
                            <div v-if="preProject.status != 'Perdu' &&
    preProject.status != 'Gagné' &&
    preProject.status != 'Non Validé'
    " class="ms-2 dropdown zindex-2 m-1">
                              <button type="button" class="btn dropdown-toggle hide-arrow p-0" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <i class="ti ti-dots-vertical text-white" />
                              </button>
                              <ul class="dropdown-menu dropdown-menu-end">
                                <li>
                                  <button class="dropdown-item fw-bold" data-bs-target="#set-number_file"
                                    data-bs-toggle="modal" @:click="fillInputIdDoc(file.id)">
                                    <i class="ti ti-file-diff me-2" />
                                    Définir le number de fichier
                                  </button>
                                </li>
                                <li>
                                  <hr class="dropdown-divider" />
                                </li>
                                <li>
                                  <button class="dropdown-item text-danger fw-bold" data-bs-toggle="modal"
                                    data-bs-target="#set-number_file_done" @:click="fillInputIdDoc(file.id)">
                                    <i class="ti ti-square-rounded-check-filled me-2" />
                                    Marquer comme terminé
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div v-else class="mt-3">
                        <h6>Aucun document disponible pour cela.</h6>
                      </div>
                    </div>
                  </div>
                  <div v-if="preProject.status == 'Perdu'" class="card card-border-shadow-primary rounded mt-4">
                    <div class="card-body">
                      <h5 class="d-block text-dark fw-bold mb-4">Projet perdu</h5>
                      <div class="d-flex">
                        <span class="fw-bold"> Client :</span>
                        <span class="ms-auto">{{ preProject.archive.client }}</span>
                      </div>
                      <div class="d-flex mt-3">
                        <span class="fw-bold"> Estimation du Marché :</span>
                        <span class="ms-auto">{{
    preProject.archive.montant_marche != null
      ? helpers.formatNumber(preProject.archive.montant_marche) + ' MAD'
      : '-'
  }}</span>
                      </div>
                      <div class="d-flex mt-3">
                        <span class="fw-bold">Commentaire :</span>
                        <span class="ms-auto">{{ preProject.archive.comment ?? '-' }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-8">
                  <div class="row">
                    <div class="col-md-6 mb-4">
                      <div class="card h-100 card-border-shadow-primary">
                        <div class="card-body">
                          <div class="card-icon mb-3">
                            <div class="avatar">
                              <div class="avatar-initial rounded bg-label-primary">
                                <i class="ti ti-currency-dollar ti-md"></i>
                              </div>
                            </div>
                          </div>
                          <div class="card-info">
                            <h4 class="card-title mb-3">Estimation du marche</h4>
                            <div class="d-flex align-items-baseline mb-1 gap-1">
                              <h4 v-if="preProject.type == 'simple'" class="text-primary mb-0 fw-bold">
                                {{ helpers.formatNumber(preProject.montant_marche) }}
                              </h4>
                              <h4 v-else class="text-primary mb-0 fw-bold">
                                {{
    helpers.formatNumber(sumCautionAndEstimation(preProject.lots)[1])
  }}
                              </h4>
                              <p class="mb-0 fw-bold text-muted">MAD</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6 mb-4">
                      <div class="card h-100 card-border-shadow-primary">
                        <div class="card-body">
                          <div class="card-icon mb-3">
                            <div class="avatar">
                              <div class="avatar-initial rounded bg-label-primary">
                                <i class="ti ti-currency-dollar ti-md"></i>
                              </div>
                            </div>
                          </div>
                          <div class="card-info">
                            <h4 class="card-title mb-3">Caution provisoire</h4>
                            <div class="d-flex align-items-baseline mb-1 gap-1">
                              <h4 v-if="preProject.type == 'simple'" class="text-primary mb-0 fw-bold">
                                {{ helpers.formatNumber(preProject.montant_caution) }}
                              </h4>
                              <h4 v-else class="text-primary mb-0 fw-bold">
                                {{
    helpers.formatNumber(sumCautionAndEstimation(preProject.lots)[0])
  }}
                              </h4>
                              <p class="mb-0 fw-bold text-muted">MAD</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 mb-4">
                      <div class="card card-border-shadow-primary rounded">
                        <div class="card-body">
                          <h5 class="d-block text-dark fw-bold mb-4">Informations</h5>
                          <div v-if="preProject.objet">
                            <label class="mb-1 text-dark fw-bold"> Objet : </label>
                            <p>{{ preProject.objet }}</p>
                          </div>
                          <div class="table-responsive text-nowrap">
                            <table class="table table-hover table-bordered">
                              <tbody>
                                <tr>
                                  <th class="fw-bold text-dark">Client :</th>
                                  <td>
                                    {{ preProject.maitre_ouvrage }}
                                  </td>
                                </tr>
                                <tr>
                                  <th class="fw-bold text-dark">N° AO :</th>
                                  <td>
                                    {{ preProject.n_offre }}
                                  </td>
                                </tr>
                                <tr v-if="preProject.locaalite != null">
                                  <th class="fw-bold text-dark">Localite :</th>
                                  <td>
                                    {{ preProject.localite }}
                                  </td>
                                </tr>
                                <tr>
                                  <th class="fw-bold text-dark">Date visite des lieux :</th>
                                  <td>
                                    {{ helpers.formattedDateTime(preProject.date_visite) }}
                                  </td>
                                </tr>
                                <tr>
                                  <th class="fw-bold text-dark">Date d'echantillion :</th>
                                  <td>
                                    {{ helpers.formattedDateTime(preProject.date_echantillion) }}
                                  </td>
                                </tr>
                                <tr>
                                  <th class="fw-bold text-dark">Date de depot :</th>
                                  <td>
                                    {{ helpers.formattedDateTime(preProject.date_depot) }}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div v-if="preProject.exigences_majeures" class="mt-4">
                            <label class="mb-1 text-dark fw-bold"> Exigences majeures : </label>
                            <p v-html="helpers.formattedText(preProject.exigences_majeures)"></p>
                          </div>
                          <div v-if="preProject.qualification_demande != 'null' &&
    preProject.qualification_demande != '-'
    " class="mt-4">
                            <label class="mb-1 text-dark fw-bold"> Qualification demandé : </label>
                            <p>
                              {{ preProject.qualification_demande }}
                            </p>
                          </div>
                          <div v-if="preProject.description" class="mt-4">
                            <label class="mb-1 text-dark fw-bold"> Description : </label>
                            <p v-html="helpers.formattedText(preProject.description)"></p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 mb-4">
                      <div v-if="preProject.lots.length != 0" class="card card-border-shadow-primary rounded">
                        <div class="card-body">
                          <h5 class="d-block text-dark fw-bold mb-4">Lots</h5>
                          <div v-for="item in preProject.lots" :key="item.id"
                            class="border alert d-flex align-items-center">
                            <span class="fw-bold">
                              {{ item.lot + ' - ' + item.localite }}
                              <i v-if="item.status == 1" class="ti ti-circle-check text-success ms-2" />
                            </span>
                            <div class="ms-auto">
                              <small class="d-block fw-bold">
                                <i class="ti ti-chevron-right"></i>
                                Caution provisoire :
                                {{ helpers.formatNumber(item.montant_caution) }}
                                MAD
                              </small>
                              <small class="mt-3 d-block fw-bold">
                                <i class="ti ti-chevron-right"></i>
                                Estimation du Marché :
                                {{ helpers.formatNumber(item.estimation_marche) }}
                                MAD
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="card card-border-shadow-primary rounded">
                        <div class="card-header d-flex align-items-center justify-content-between">
                          <h5 class="text-dark fw-bold m-0">Document de projet</h5>
                          <button v-if="preProject.cps_file != null || preProject.rc_file != null"
                            class="btn btn-sm btn-primary fw-bold" data-bs-target="#import-assets"
                            data-bs-toggle="modal">
                            Importe Document
                            <i class="ms-1 ti ti-link" />
                          </button>
                        </div>
                        <div class="card-body">
                          <div v-if="preProject.cps_file != null || preProject.rc_file != null" class="row">
                            <div v-if="preProject.cps_file" class="col-6">
                              <div class="d-flex mb-4 p-2 align-items-center border-none rounded">
                                <div class="avatar flex-shrink-0 me-3">
                                  <span class="avatar-initial rounded bg-label-primary border border-primary fw-bold"><i
                                      class="ti ti-file-filled"></i></span>
                                </div>
                                <div class="row w-100 align-items-center">
                                  <div class="col-sm-8 col-lg-12 col-xxl-8 mb-1 mb-sm-0 mb-lg-1 mb-xxl-0">
                                    <p class="mb-0 fw-medium">
                                      {{ preProject.cps_file }}
                                    </p>
                                  </div>
                                  <div
                                    class="col-sm-4 col-lg-12 col-xxl-4 d-flex justify-content-sm-end justify-content-md-start justify-content-xxl-end pe-4">
                                    <a :href="getFileUrl(preProject.cps_file,'uploads/cps') "
                                      class="badge bg-label-primary fw-bold">
                                      <i class="ti ti-download me-2"></i>
                                      Télécharger
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div v-if="preProject.rc_file" class="col-6">
                              <div class="d-flex mb-4 p-2 align-items-center border-none rounded">
                                <div class="avatar flex-shrink-0 me-3">
                                  <span class="avatar-initial rounded bg-label-primary border border-primary fw-bold"><i
                                      class="ti ti-file-filled"></i></span>
                                </div>
                                <div class="row w-100 align-items-center">
                                  <div class="col-sm-8 col-lg-12 col-xxl-8 mb-1 mb-sm-0 mb-lg-1 mb-xxl-0">
                                    <p class="mb-0 fw-medium">
                                      {{ preProject.rc_file }}
                                    </p>
                                  </div>
                                  <div
                                    class="col-sm-4 col-lg-12 col-xxl-4 d-flex justify-content-sm-end justify-content-md-start justify-content-xxl-end pe-4">
                                    <a :href="getFileUrl(preProject.rc_file,'uploads/rc')"
                                      class="badge bg-label-primary fw-bold">
                                      <i class="ti ti-download me-2"></i>
                                      Télécharger
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div v-else class="row">
                            <div class="col-12 text-center">
                              <img src="/src/assets/img/Empty.png" style="width: 10% !important" srcset="" />
                              <h5 class="mt-4 mb-2 fw-bold">Aucun document ici.</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="devis" class="tab-pane fade" role="tabpanel">
              <div class="card card-border-shadow-primary rounded">
                <div class="card-header d-flex align-items-center border-bottom mb-4">
                  <h5 class="mb-0 fw-bold">Devis</h5>
                  <div v-if="preProject.chiffrage_status == 0 &&
    (preProject.status == 'En soumission' || preProject.status == 'Gagné')
    " class="ms-auto">
                    <button class="btn btn-danger me-2" data-bs-toggle="modal" data-bs-target="#close-chiffrage">
                      <i class="ti ti-x me-2"></i> Términer
                    </button>
                    <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#import-chiffrage">
                      <i class="ti ti-file-export me-2"></i>
                      Importer
                    </button>
                    <button class="btn btn-primary ms-2" data-bs-toggle="modal" data-bs-target="#add-chiffrage">
                      <i class="ti ti-square-rounded-plus-filled me-2"></i>
                      Ajouter
                    </button>
                  </div>
                </div>
                <div class="card-body">
                  <div v-if="preProject.chiffrage_status == true" class="alert alert-warning border-warning"
                    role="alert">
                    <i class="ti ti-alert-square-rounded-filled me-2"></i>
                    Cet devis a été marqué comme terminé
                  </div>
                  <div>
                    <!-- <DataTableDevis
                                            v-if="preProject != null"
                                            extra-class="table-light"
                                            :headers="[
                                                ['Article', 'article'],
                                                ['unite', 'unite'],
                                                ['Quantite', 'quantite'],
                                                ['Prix d\'achat', 'purchase_price'],
                                                ['Prix de vente', 'selling_price'],
                                                ['Frais supplémentaires', 'extra_fees'],
                                                ['Fournisseur', 'fournisseur'],
                                                ['Action', 'action']
                                            ]"
                                            :data="preProject.chiffrages"
                                            :is-status="preProject.chiffrage_status"
                                        /> -->
                    <div v-if="preProject.chiffrages != null" class="card-body border-top pt-4">
                      <DataTableDevis :data="preProject.chiffrages" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="bordereau" class="tab-pane fade" role="tabpanel">
              <div class="card card-border-shadow-primary rounded">
                <div class="card-header d-flex align-items-center border-bottom mb-4">
                  <h5 class="mb-0 fw-bold">Bordereau</h5>
                  <div v-if="preProject.chiffrage_status == 0 &&
    (preProject.status == 'En soumission' || preProject.status == 'Gagné')
    " class="ms-auto">
                    <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#import-chiffrage">
                      <i class="ti ti-file-export me-2"></i>
                      Importer
                    </button>
                  </div>
                </div>
                <div class="card-body">
                  <div>
                    <!-- <DataTableBordereau
                                            v-if="preProject != null"
                                            extra-class="table-light"
                                            :headers="[
                                                ['Article', 'article'],
                                                ['unite', 'unite'],
                                                ['Quantite', 'quantite'],
                                                ['Prix HT', 'prix_ht'],
                                                ['Prix TTC', 'prix_ttc'],
                                                ['Prix TTC Total', 'prix_tttc'],
                                                ['Lot', 'lot'],
                                                ['Action', 'action']
                                            ]"
                                            :data="preProject.articles_lot"
                                            :is-status="preProject.status"
                                        /> -->
                    <div v-if="preProject.articles_lot != null" class="card-body border-top pt-4">
                      <DataTableBordereau :data="preProject.articles_lot" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal id="add-lots" title="Importer Avant Projet" extra-class="modal-lg">
      <AddLots :id="preProject.id" />
    </Modal>
    <Modal id="import-assets" title="Télécharger des documents" extra-class="modal-md">
      <ImportAssets :id="preProject.id" />
    </Modal>
    <Modal id="edit-preproject" title="Modifier avant projet" extra-class="modal-xl">
      <EditPreProject :pre-project="preProject" />
    </Modal>
    <Modal id="set-number_file" title="Définir le nombre de documents" extra-class="modal-md">
      <SetFileNumber :id="preProject.id" />
    </Modal>
    <Modal id="set-number_file_done" title="Marque comme terminé" extra-class="modal-md">
      <SetFileNumberDone :id="preProject.id" />
    </Modal>
    <Modal id="validate-project" title="Validation d'avant Projet" extra-class="modal-md">
      <ValidatePreProject :id="preProject.id" />
    </Modal>
    <Modal id="cancel-submission" title="Annuler la soumission" extra-class="modal-md">
      <CancelSubmission :id="preProject.id" />
    </Modal>
    <Modal id="refuser-project" title="Validation d'avant Projet" extra-class="modal-md">
      <RefuserPreProject :id="preProject.id" />
    </Modal>
    <Modal id="cloture" title="Projet Gagné" extra-class="modal-md">
      <CloturePreProject :id="preProject.id" :type-project="preProject.type_project" :number-lots="preProject.lots" />
    </Modal>
    <Modal id="close" title="Projet Perdu" extra-class="modal-md">
      <ClosePreProject :id="preProject.id" />
    </Modal>

    <Modal id="add-chiffrage" title="Ajouter un article" extra-class="modal-md">
      <NewChiffrage :id="preProject.id" />
    </Modal>
    <Modal id="delete-chiffrage" title="Supprimer un article" extra-class="modal-md">
      <DeleteChiffrage />
    </Modal>
    <Modal id="import-chiffrage" title="Importer des articles" extra-class="modal-md">
      <ImportChiffrage :id="preProject.id" />
    </Modal>

    <Modal id="close-chiffrage" title="Marque comme Terminé" extra-class="modal-md">
      <CloseChiffrage :id="preProject.id" />
    </Modal>

    <Modal id="import-bordereau" title="Importer bordereau" extra-class="modal-md">
      <ImportBordereau :id="preProject.id" :lots="preProject.lots" />
    </Modal>
    <DeleteDocModal id="deleteArticle" :isLoading="isLoading"
                :method="deleteArticles"
                :itemid="PMStore.ItemId"
                title="Supprimer l'Article"
                message="Êtes-vous sûr de supprimer cet article ?"
                />
  </div>
  <DetailsPreProjectSkeleton v-else />

</template>

<style scoped>
.bg-grey-500 {
  background-color: #f1f5f7 !important;
}

.empty_stats_img {
  width: 100%;
  max-width: 210px;
  margin: 0 auto;
}

.empty_stats_img_md {
  width: 100%;
  max-width: 160px;
  margin: 0 auto;
}

.show_in_back {
  z-index: -1;
}

.client-logo {
  width: 100px;
  height: 100px;
  padding: 10px;
}

.hide-card {
  display: none;
}

.timeline-indicator-primary {
  background: #5f7bb828 !important;
}

.f-44 {
  font-size: 44px;
}

.f-28 {
  font-size: 28px;
}

.bg-none {
  background-color: transparent !important;
}

.btn-open {
  background-color: red;
}

.btn-link {
  border: none;
  background: none;
  box-shadow: none !important;
  padding: 0;
}

.progress-custom {
  bottom: 0;
  left: 0;
  position: absolute;
  top: 0;
  animation: slideIn 2s ease-out;
  -webkit-transition: 600ms cubic-bezier(0.6, 0, 0.38, 1);
  -moz-transition: 600ms cubic-bezier(0.6, 0, 0.38, 1);
  -o-transition: 600ms cubic-bezier(0.6, 0, 0.38, 1);
  -ms-transition: 600ms cubic-bezier(0.6, 0, 0.38, 1);
  transition: 600ms cubic-bezier(0.6, 0, 0.38, 1);
}

.progress-custom:before {
  animation: slideIn 2s ease-out;
  background-color: #28c76f;
  border-radius: 5px;
  bottom: 0;
  left: 0;
  content: '';
  position: absolute;
  top: 0;
  width: 100%;
  -webkit-transition: 600ms cubic-bezier(0.6, 0, 0.38, 1);
  -moz-transition: 600ms cubic-bezier(0.6, 0, 0.38, 1);
  -o-transition: 600ms cubic-bezier(0.6, 0, 0.38, 1);
  -ms-transition: 600ms cubic-bezier(0.6, 0, 0.38, 1);
  transition: 600ms cubic-bezier(0.6, 0, 0.38, 1);
}

.content {
  position: relative;
}

.ti {
  transition: 0.6ms;
}
</style>
