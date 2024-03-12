<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { sharedService } from '@/services';
import { useSharedStore } from '@/store';
import { helpers ,formater} from '@/utils';
import {EditSousTraitantModal} from './components';

const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
});

const sharedStore = useSharedStore();


const soustraitant = ref(computed(() => sharedStore.Soustraitant));


onMounted(async () => {
    await sharedService.getSoustraitantById(props.id);
    // console.log(soustraitant.value);
    
});

onUnmounted(() => {
    sharedStore.Soustraitant = null;
});


watch(sharedStore.Soustraitant, (newValue) => {
    soustraitant.value = newValue;
}, { deep: true });

const getFileUrl = (attachment) => {
  return helpers.baseUrl() + `uploads/${attachment}`;
};


</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3" v-if="soustraitant">
        <div class="d-flex align-items-center justify-content-between mb-4" >
            <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / Profile / <span class="text-dark"> {{ soustraitant.raison_social }}</span> </h5>
            <div >
                <button class="btn btn-warning" data-bs-target="#edit-st" data-bs-toggle="modal">
                    <i class="ti ti-pencil me-2"></i>
                    Modifier
                </button>
                
            </div>
        </div>
        <div  class="row ">
            <div class="col-xl-4 col-lg-5 col-md-5 order-1 order-md-0">
                <div class="card card-border-shadow-primary mb-4">
                    <div class="card-body">
                        <div class="user-avatar-section border-bottom pb-4">
                            <div class=" d-flex align-items-center flex-column">
                                <img class="img-fluid rounded mb-3 pt-1 mt-4" src="../../assets/img/avatars/user_avatar.png"
                                    height="100" width="100" alt="User avatar">
                                <div class="user-info text-center">
                                    <h4 class="mb-2">{{ soustraitant.raison_social }}</h4>
                                    <span class="badge mt-1" :class="helpers.returnBadge(soustraitant.is_active)[0]">{{
                                        helpers.returnBadge(soustraitant.is_active)[1]
                                    }}</span>
                                </div>
                            </div>
                        </div>
                        <p class="mt-4 small text-uppercase text-muted">À PROPOS</p>
                        <div class="info-container">
                            <ul class="list-unstyled">
                                <li class="mb-2">
                                    <span class="fw-medium me-1">Nom complet:</span>
                                    <span>{{ soustraitant.raison_social  }}</span>
                                </li>
                                <li class="mb-2 pt-1">
                                    <span class="fw-medium me-1">ADRESSE:</span>
                                    <span>{{ soustraitant.adresse }}</span>
                                </li>
                                <li class="mb-2 pt-1">
                                    <span class="fw-medium me-1">CNSS:</span>
                                    <span>{{ soustraitant.num_cnss }}</span>
                                </li>
                                <li class="mb-2 pt-1">
                                    <span class="fw-medium me-1">VILLE:</span>
                                    <span>{{ soustraitant.ville }}</span>
                                </li>
                                
                                
                                
                            </ul>
                        </div>
                        
                       
                        <p class="mt-4 small text-uppercase text-muted">CONTACT</p>
                        <div class="info-container">
                            <ul class="list-unstyled">
                                <li class="mb-2">
                                    <span class="fw-medium me-1">Adresse email:</span>
                                    <span>{{ soustraitant.email }}</span>
                                </li>
                                
                                <li class="mb-2 pt-1">
                                    <span class="fw-medium me-1">1er Numéro de téléphone:</span>
                                    <span>{{ formater.phoneNumber(soustraitant.phone_no_1) }}</span>
                                </li>
                                <li class="mb-2 pt-1">
                                    <span class="fw-medium me-1">2eme Numéro de téléphone:</span>
                                    <span>{{ formater.phoneNumber(soustraitant.phone_no_2) }}</span>
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
                            Dossier du  Sous-traitant
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
                                            Matricule CNSS : {{ soustraitant.num_cnss ?? 'N/A' }}
                                        </h6>

                                        <div v-if="soustraitant.copy_cnss != null" class="card mt-4 border shadow-none">
                                            <div class="card-body p-2">
                                                <a :href="getFileUrl(soustraitant.copy_cnss)" target="_blank" class="d-flex align-items-center">
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
                                            Matricule RC : {{ soustraitant.num_rc ?? 'N/A' }}
                                        </h6>

                                        <div v-if="soustraitant.copy_rc != null" class="card mt-4 border shadow-none">
                                            <div class="card-body p-2">
                                                <a :href="getFileUrl(soustraitant.copy_rc)" target="_blank" class="d-flex align-items-center">
                                                    <div class="p-1 rounded bg-label-info">
                                                        <i class="ti ti-file-download text-info ps-3 pe-3"></i>
                                                    </div>
                                                    <small class="ms-3">
                                                        Télécharger la copie rc
                                                    </small>
                                                </a>
                                            </div>
                                        </div>
                                        <div v-else class="card mt-4 border shadow-none">
                                            <div class="card-body p-2 d-flex align-items-center">
                                                <p class="text-center m-1 text-muted">
                                                    <i class="ti ti-file me-2"></i>
                                                    Aucun copie rc trouvé
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
                                            Matricule CNSS : {{ soustraitant.num_ice ?? 'N/A' }}
                                        </h6>

                                        <div v-if="soustraitant.copy_ice != null" class="card mt-4 border shadow-none">
                                            <div class="card-body p-2">
                                                <a :href="getFileUrl(soustraitant.copy_ice)" target="_blank" class="d-flex align-items-center">
                                                    <div class="p-1 rounded bg-label-info">
                                                        <i class="ti ti-file-download text-info ps-3 pe-3"></i>
                                                    </div>
                                                    <small class="ms-3">
                                                        Télécharger la copie ICE 
                                                    </small>
                                                </a>
                                            </div>
                                        </div>
                                        <div v-else class="card mt-4 border shadow-none">
                                            <div class="card-body p-2 d-flex align-items-center">
                                                <p class="text-center m-1 text-muted">
                                                    <i class="ti ti-file me-2"></i>
                                                    Aucun copie ICE trouvé
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            
                            
                        </div>
                    </div>
        </div>
        </div>
        <EditSousTraitantModal :soustraitant="soustraitant" />
        </div>
        
    </div>
    <div class="flex-grow-1 container-fluid mt-5 " v-else>
        <div class="col-12 card ">
                                                <img src="/src/assets/img/No_Results.png" class="empty_stats_img_md "
                                                    alt=""  style="object-fit: contain" />
                                                <h6 class="text-center mt-3 fw-bold">
                                                    Aucun Sous Traitant trouvé
                                                </h6>
                                                
                                            </div>
    </div>
</template>

<style>
    .empty_stats_img_md {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}
</style>