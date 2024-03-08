<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { rhService } from '@/services';
import { useRhStore } from '@/store';
import { Modal } from '@/ui';
import { helpers ,formater} from '@/utils';

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});

const rhStore = useRhStore();


const worker = ref(computed(() => rhStore.worker));


onMounted(async () => {
    await rhService.getWorkerById(props.id);
});

onUnmounted(() => {
    rhStore.clearEmployee();
});


watch(rhStore.worker, (newValue) => {
    worker.value = newValue;
}, { deep: true });

const getFileUrl = (attachment) => {
  return helpers.baseUrl() + `uploads/${attachment}`;
};


</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3" v-if="worker">
        <div class="d-flex align-items-center justify-content-between mb-4" >
            <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Employe de {{ worker.soustraitant.raison_social }}</span> </h5>
            <div >
                <button class="btn btn-warning" data-bs-target="#" data-bs-toggle="modal">
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
                                    <h4 class="mb-2">{{ worker.first_name + ' ' + worker.last_name }}</h4>
                                    <span class="badge mt-1" :class="helpers.returnBadge(String(worker.status))[0]">{{
                                        helpers.returnBadge(String(worker.status))[1]
                                    }}</span>
                                </div>
                            </div>
                        </div>
                        <p class="mt-4 small text-uppercase text-muted">À PROPOS</p>
                        <div class="info-container">
                            <ul class="list-unstyled">
                                <li class="mb-2">
                                    <span class="fw-medium me-1">Nom complet:</span>
                                    <span>{{ worker.first_name + ' ' + worker.last_name }}</span>
                                </li>
                                
                                <li class="mb-2 pt-1">
                                    <span class="fw-medium me-1">Poste:</span>
                                    <span>{{ worker.poste }}</span>
                                </li>
                                <li class="mb-2 pt-1">
                                    <span class="fw-medium me-1">CIN:</span>
                                    <span>{{ worker.cin }}</span>
                                </li>
                                <li class="mb-2 pt-1">
                                    <span class="fw-medium me-1">CNSS:</span>
                                    <span>{{ worker.cnss }}</span>
                                </li>
                                <li class="mb-2 pt-1">
                                    <span class="fw-medium me-1">Matricule:</span>
                                    <span>Nec-{{ worker.matricule }}</span>
                                </li>
                                
                                
                                
                            </ul>
                        </div>
                        <p class="mt-4 small text-uppercase text-muted">DUREE DE TRAVAIL</p>
                        <div class="info-container">
                            <ul class="list-unstyled">
                                <li class="mb-2">
                                    <span class="fw-medium me-1">Date debut:</span>
                                    <span>{{ formater.date(worker.date_start) }}</span>
                                </li>
                            </ul>
                            <ul class="list-unstyled">
                                <li class="mb-2">
                                    <span class="fw-medium me-1">Date fin:</span>
                                    <span>{{ formater.date(worker.date_end) }}</span>
                                </li>
                            </ul>
                        </div>
                       
                        <p class="mt-4 small text-uppercase text-muted">CONTACT</p>
                        <div class="info-container">
                            <ul class="list-unstyled">
                                <li class="mb-2">
                                    <span class="fw-medium me-1">Adresse email:</span>
                                    <span>{{ worker.email }}</span>
                                </li>
                                
                                <li class="mb-2 pt-1">
                                    <span class="fw-medium me-1">Numéro de téléphone:</span>
                                    <span>{{ formater.phoneNumber(worker.phone_no) }}</span>
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
                                                <img :src="helpers.bankName(worker.bank_name)[0]" height="92px"
                                                    width="100px" style="object-fit: contain" />
                                            </div>
                                            
                                        </div>
                                        <div class="d-flex align-items-center"> 
                                            <div class="me-auto">
                                                <h6 class="mt-3 mb-3 fw-bold text-dark">
                                                    RIB : {{ formater.formatRIB(String(worker.rib)) }}
                                                </h6>
                                                <h6 class="mb-3 fw-bold text-dark">
                                                    Agence :
                                                    {{
                                                        helpers.bankName(worker.bank_name)[1] ??
                                                        'N/A'
                                                    }}
                                                </h6>
                                            </div>
                                            <div v-if="worker.copie_rib">
                                                <a :href="getFileUrl(worker.copie_rib)" 
                                                    
                                                     target="_blank">
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
                                                <img src="@/assets/img/brands/logo_cnss.jpeg" height="89px" width="100px"
                                                    style="object-fit: contain" />
                                            </div>
                                            
                                        </div>
                                        <h6 class="mb-1 fw-bold text-dark">
                                            Matricule CNSS : {{ worker.cnss ?? 'N/A' }}
                                        </h6>

                                        <div v-if="worker.copie_cnss != null" class="card mt-4 border shadow-none">
                                            <div class="card-body p-2">
                                                <a :href="getFileUrl(worker.copie_cnss)" target="_blank" class="d-flex align-items-center">
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
                            <div class="col-xxl-6 mt-3">
                                <div class="card card-border-shadow-info">
                                    <div class="card-body">
                                        <div class="d-flex align-items-center mb-2 pb-1">
                                            <div class="me-2" >
                                                <img src="@/assets/img/contract.jpg" height="89px" width="100px"
                                                    style="object-fit: contain;" />
                                                    
                                            </div>
                                            
                                        </div>
                                        <h6 class="mb-1 fw-bold text-dark">
                                            Copie Contrat  
                                        </h6>

                                        <div v-if="worker.copie_contract != null" class="card mt-4 border shadow-none">
                                            <div class="card-body p-2">
                                                <a :href="getFileUrl(worker.copie_contract)" target="_blank" class="d-flex align-items-center">
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
        </div>
        </div>
        </div>
        
       
    </div>
</template>