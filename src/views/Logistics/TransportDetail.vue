
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useLogisticsStore } from '@/store';
import { logisticsService } from '@/services';
import { formater, helpers } from '@/utils';

const logisticStore = useLogisticsStore();
const transport = ref(computed(() => logisticStore.transport.data));

const props = defineProps({
  id: {
    type: String,
    required: true,
  }
});
const isLoading = ref(false);
onMounted(async () => {
  await logisticsService.getAchatsForTransport(Number(props.id));
});





</script>
<template>
    <div class="flex-grow-1 container-fluid mt-3">
      <h5 v-if="transport" class="py-3 mb-4">
        <span class="text-muted fw-light">Dashboard /
          {{ transport.demande_achat.type == 'Service' ? "Demande d'execution" : "Demande d'achat" }} /
        </span>
        {{ transport.demande_achat.n_order }}
      </h5>
      <div v-if="transport" class="row invoice-preview">
        <div class="col-xl-9 col-md-8 col-12 mb-md-0 mb-4">
          <div class="card card-border-shadow-primary invoice-preview-card">
            <div class="card-body">
              <div>
                <div class="d-flex svg-illustration mb-4 gap-2 a">
                  <div class="app-brand-logo">
                    <img src="@/assets/img/Logo_bg.png" style="height: 80px; object-fit:contain;" alt="">
                  </div>
                  
                  
                </div>
              </div>
              <div class="d-flex">
                <div class="me-auto">
                  <p class="mb-2">Demande Par : {{
        transport.demande_achat.created_by.employee.first_name +
        ' ' +
        transport.demande_achat.created_by.employee.last_name
      }}</p>
                  <p class="mb-2">Numéro de téléphone : {{ formater.phoneNumber(
        transport.demande_achat.created_by.employee.phone_no) }}</p>
                  <p class="mb-2">Adresse email : {{ transport.demande_achat.created_by.employee.email }}</p>
                </div>
                <div class="ms-auto">
                    
                  <h5 class="fw-bold mb-2">Demande d'achat #{{ transport.demande_achat.n_order }}</h5>
                  <div class="mb-2 pt-1">
                    <span>Date de creation :</span>
                    <span class="fw-bold ms-2">{{ formater.date(transport.demande_achat.created_at) }}</span>
                  </div>
                  <div class="pt-1">
                    <span>Status :</span>
                    <span class="fw-bold ms-2">
                      <span :class="helpers.returnBadge(transport.demande_achat.status)[0]" class="fw-bold">{{
        helpers.returnBadge(transport.demande_achat.status)[1] }}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="table-responsive border-top">
              <table class="table m-0">
                <thead class="table-dark">
                  <tr>
                    <th class="fw-bold">Désignation</th>
                    <!-- <th class="fw-bold">Article</th> -->
                    <th class="fw-bold text-center">Unité</th>
                    <th class="fw-bold text-center">Quantité Demandé</th>
                    <th class="fw-bold text-center">Quantité Livré</th>
                    <th class="fw-bold text-center">Fournisseur</th>
                    <th class="fw-bold text-center">Prix</th>
                    
                  </tr>
                </thead>
                <tbody v-if="transport.achats.length != 0">
                  <tr v-for="article in transport.achats" :key="article.id">
                    <td>
                      {{ article.designation }}
                      <i v-if="article.livraison_false != false" class="ti ti-bookmark-filled text-danger"></i>
                    </td>
                    <td class="text-center">{{ article.unity }}</td>
                    <td class="text-center">{{ article.quantity }}</td>
                    <td class="text-center">{{ article.qte_livre }}</td>
                    <td class="text-center">
                        <div v-if="article.livraison_false != false">
                            NEWERACOM
                        </div>
                        <div v-else>
                            {{ article.fournisseur_choisi.raison_social }}
                        </div>
                    </td>
                    <td class="text-center">{{ article.prix_fournisseur_choisi }}</td>
                    
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr>
                    <td colspan="10" class="text-center">
                      <small>Aucun article</small>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="card-body">
              <p> <i class="ti ti-bookmark-filled text-danger"></i> : Tous les articles signalés seront pris en charge pour la livraison par notre équipe. </p>
            </div>
            <div v-if="transport.demande_achat.commentaire" class="card-body mx-3">
              <div class="row">
                <div class="col-12">
                  <span class="fw-bold text-danger">Commentaire : </span>
                  <span>{{ transport.demande_achat.commentaire }}</span>
                </div>
              </div>
            </div>
            <hr v-if="transport.demande_achat.commentaire">
            
            <div class="card-body mx-3">
              <h5 class="card-title m-0">Historique de la demande</h5>
              <div v-if="transport.demande_achat.historique_purchase_order.length > 0" class="card-body m-2">
                <ul class="timeline pt-3">
                  <li v-for="(historique, index) in transport.demande_achat.historique_purchase_order" :key="historique.id" :class="index === transport.demande_achat.historique_purchase_order.length - 1
        ? 'border-transparent'
        : 'border-left-dashed'
        " class="timeline-item pb-4 timeline-item-primary">
                    <span class="timeline-indicator-advanced timeline-indicator-primary">
                      <i class="ti ti-circle-filled"></i>
                    </span>
                    <div class="timeline-event">
                      <div class="timeline-header border-bottom mb-3">
                        <h6 class="mb-0">{{ historique.title }}</h6>
                        <span class="text-muted">
                          {{ formater.date(historique.created_at) }}
                        </span>
                      </div>
                      <div class="mb-2">
                        <div class="d-flex align-items-center">
                          {{ historique.description }}
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div v-else class="card-body text-center m-2">
                <img src="/src/assets/img/no_pre_project.png" class="empty_stats_img_md" alt="" />
                <p class="mt-5 fw-bold">Aucun historique disponible</p>
                <small class="text-muted">
                  Aucun historique n'est disponible pour cette demande
                </small>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-md-4 col-12 invoice-actions">
          <div class="card card-border-shadow-primary mb-4">
            <div class="card-body">
              
              <button class="btn btn-success d-grid w-100 mb-2 waves-effect d-flex"
                >
                <i class="ti ti-check me-2"></i> Enregistrer
              </button>
              <router-link :to="{ name:'Transports'}"
                 class="btn btn-primary d-grid w-100 mb-2 waves-effect d-flex">
                <i class="ti ti-download me-2"></i> Annuler
              </router-link>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </template>
  
  <style>
  .bottom-image {
    position: fixed;
    bottom: 35px;
    width: 80%;
    /* Adjust the width as needed */
  }
  
  .f-18 {
    font-size: 18px;
  }
  
  .f-36 {
    font-size: 36px;
  }
  
  .empty_stats_img_md {
    width: 100%;
    max-width: 180px;
    margin: 0 auto;
  }
  
  .only-in-mobile {
    display: block;
  }
  
  .hide-in-mobile {
    display: none;
  }
  
  @media (min-width: 980px) {
    .only-in-mobile {
      display: none;
    }
  
    .hide-in-mobile {
      display: block;
    }
  }
  </style>