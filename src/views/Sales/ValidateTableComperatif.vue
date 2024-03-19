<script setup>
import { onMounted, ref, computed ,onUnmounted} from 'vue';
import { useSalesStore ,useSharedStore} from '@/store';
import { salesService ,sharedService} from '@/services';
import { formater, helpers } from '@/utils';
import {CustomSelect} from '@/ui';
import {useRouter} from 'vue-router';
const router = useRouter();

const salesStore = useSalesStore();
const sharedStore = useSharedStore();
const isLoading = ref(false);
const props = defineProps({
  id: Number
});
const purchase = ref(computed(() => salesStore.purchase));
const fournisseurs = ref(computed(()=> sharedStore.fournisseurs.data));
const selectedFournisseurIds = ref({});

onMounted(async () => {
    await sharedService.getFournisseur();

  await salesService.getPurchaseOrderById(Number(props.id));
});


onUnmounted(() => {
  salesStore.clearPurchase();
});
const getFournisseurById=(id)=>{
    return fournisseurs.value.find(fournisseur => fournisseur.id === id);
};

const submit = async () => {
    isLoading.value = true;
    
    await salesService.ValidateTableComperatif(props.id, selectedFournisseurIds.value).then(() => {
        isLoading.value = false;
        router.push({ name: 'PurchaseOrderDetails', params: { id: props.id } });

        
    });
};


</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3">
      <h5 v-if="purchase" class="py-3 mb-4">
        <span class="text-muted fw-light">Dashboard /
          {{ purchase.type == 'Service' ? "Demande d'execution" : "Demande d'achat" }} /
        </span>
        {{ purchase.n_order }}
      </h5>
      <div v-if="purchase" class="row invoice-preview">
        <div class="col-xl-12 col-md-8 col-12 mb-md-0 mb-4">
          <div class="card card-border-shadow-primary invoice-preview-card">
            <div class="card-body">
              <div>
                <div class="d-flex svg-illustration mb-4 gap-2 align-items-center justify-content-between">
                  <div class="app-brand-logo">
                    <img src="@/assets/img/Logo_bg.png" style="height: 80px; object-fit:contain;" alt="">
                  </div>
                  <div>
                    <button class="btn btn-success d-grid w-100 mb-2 waves-effect d-flex"
                    @click="submit">
                    
                        <i class="ti ti-check me-2"></i> Enregistrer
                    </button>
                    <router-link :to="{ name:'PurchaseOrderDetails',params:{id:props.id}}"
                        class="btn btn-primary d-grid w-100 mb-2 waves-effect d-flex">
                        <i class="ti ti-x me-2"></i> Annuler
                    </router-link>
                  </div>
                  
                </div>
              </div>
              <div class="d-flex">
                <div class="me-auto">
                  <p class="mb-2">Demande Par : {{
        purchase.created_by.employee.first_name +
        ' ' +
        purchase.created_by.employee.last_name
      }}</p>
                  <p class="mb-2">Numéro de téléphone : {{ formater.phoneNumber(
        purchase.created_by.employee.phone_no) }}</p>
                  <p class="mb-2">Adresse email : {{ purchase.created_by.employee.email }}</p>
                </div>
                <div class="ms-auto">
                    
                  <h5 class="fw-bold mb-2">Demande d'achat #{{ purchase.n_order }}</h5>
                  <div class="mb-2 pt-1">
                    <span>Date de creation :</span>
                    <span class="fw-bold ms-2">{{ formater.date(purchase.created_at) }}</span>
                  </div>
                  <div class="pt-1">
                    <span>Status :</span>
                    <span class="fw-bold ms-2">
                      <span :class="helpers.returnBadge(purchase.status)[0]" class="fw-bold">{{
        helpers.returnBadge(purchase.status)[1] }}</span>
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
                    <th class="fw-bold text-center">Unité</th>
                    <th class="fw-bold text-center">Quantité</th>
                    <th class="fw-bold text-center">Fournisseur 1</th>
                    <th class="fw-bold text-center">Prix Fournisseur 1</th>
                    <th class="fw-bold text-center">Fournisseur 2</th>
                    <th class="fw-bold text-center">Prix Fournisseur 2</th>
                    <th class="fw-bold text-center">Fournisseur 3</th>
                    <th class="fw-bold text-center">Prix Fournisseur 3</th>
                    <th class="fw-bold text-center">Action</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody v-if="purchase.purchase_article.length != 0">
                  <tr v-for="article in purchase.purchase_article" :key="article.id">
                    <td>
                      {{ article.article.article }}
                      <i v-if="article.type == 'hors bordereau'" class="ti ti-bookmark-filled text-danger"></i>
                    </td>
                    <td class="text-center">{{ article.unity }}</td>
                    <td class="text-center">{{ article.quantity }}</td>
                    <td class="text-center">{{ getFournisseurById(article.fournisseur1_id).raison_social }}</td>
                    <td class="text-center">{{ article.prix_fournisseur_1 }}</td>
                    <td class="text-center">{{ getFournisseurById(article.fournisseur2_id).raison_social }}</td>
                    <td class="text-center">{{ article.prix_fournisseur_2 }}</td>
                    <td class="text-center">{{ getFournisseurById(article.fournisseur3_id).raison_social}}</td>
                    <td class="text-center">{{ article.prix_fournisseur_3 }}</td>

                    <td class="text-center">
                        <select v-model="selectedFournisseurIds[article.id]" class="form-select" style="width: 100%;" required>
                            <option v-for="fournisseur in [getFournisseurById(article.fournisseur1_id), getFournisseurById(article.fournisseur2_id), getFournisseurById(article.fournisseur3_id)]" :key="fournisseur.id" :value="fournisseur.id">
                                {{ fournisseur.raison_social }}
                            </option>
                        </select>
                    <!-- <CustomSelect v-model="selectedFournisseurId" placeholder="Choisir un fournisseur" style="width: 100%;"
                             :data="[getFournisseurById(article.fournisseur1_id), getFournisseurById(article.fournisseur2_id), getFournisseurById(article.fournisseur3_id)]
                                .filter((item) => item.is_active == 1)
                                .map((item) => ({
                                    key: item.id,
                                    value: item.raison_social
                                }))" /> -->
                    </td>
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
              <p> <i class="ti ti-bookmark-filled text-danger"></i> : Tous les articles qui ont été signalés
                signifient qu'il n'y en a pas dans le bordereau</p>
            </div>
            <div v-if="purchase.commentaire" class="card-body mx-3">
              <div class="row">
                <div class="col-12">
                  <span class="fw-bold text-danger">Commentaire : </span>
                  <span>{{ purchase.commentaire }}</span>
                </div>
              </div>
            </div>
            <hr v-if="purchase.commentaire">
            
            <div class="card-body mx-3">
              <h5 class="card-title m-0">Historique de la demande</h5>
              <div v-if="purchase.historique_purchase_order.length > 0" class="card-body m-2">
                <ul class="timeline pt-3">
                  <li v-for="(historique, index) in purchase.historique_purchase_order" :key="historique.id" :class="index === purchase.historique_purchase_order.length - 1
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
        <!-- <div class="col-xl-3 col-md-4 col-12 invoice-actions">
          <div class="card card-border-shadow-primary mb-4">
            <div class="card-body">
              
              <button class="btn btn-success d-grid w-100 mb-2 waves-effect d-flex"
                >
                <i class="ti ti-check me-2"></i> Enregistrer
              </button>
              <router-link :to="{ name:'PurchaseOrder'}"
                 class="btn btn-primary d-grid w-100 mb-2 waves-effect d-flex">
                <i class="ti ti-download me-2"></i> Annuler
              </router-link>
            </div>
          </div>
        </div> -->
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