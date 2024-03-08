<script setup lang="ts">
import { ref, watch } from 'vue';
import { Modal } from '@/ui';
import { useRhStore } from '@/store';
import { helpers , formater} from '@/utils';

const rhStore = useRhStore();


const formData = ref({
    sousTraitant: '-',
    project: null,
    first_name: null,
    last_name: null,
    phone_no: null,
    sexe: null,
    email: null,
    matricule: null,
    copie_contract: null,
    poste: null,
    status: null,
    date_end: null,
    date_start: null,
    type_transaction: null,
    bank_name :null,
    copie_rib :null,
    rib :null,
    cnss :null,
    copie_cnss :null,
    cin :null,
    copie_cin :null,
    adresse :null,
});

watch(() => rhStore.Item, () => {
    if (rhStore.Item) {
        formData.value.sousTraitant = rhStore.Item.soustraitant.raison_social ;
        formData.value.project = rhStore.Item.project.code ;
        formData.value.first_name = rhStore.Item.first_name;
        formData.value.last_name = rhStore.Item.last_name;
        formData.value.phone_no = rhStore.Item.phone_no;
        formData.value.sexe = rhStore.Item.sexe;
        formData.value.email = rhStore.Item.email;
        formData.value.matricule = rhStore.Item.matricule;
        formData.value.copie_contract = rhStore.Item.copie_contract;
        formData.value.poste = rhStore.Item.poste;
        formData.value.status = rhStore.Item.status;
        formData.value.date_end = rhStore.Item.date_end;
        formData.value.date_start = rhStore.Item.date_start;
        formData.value.type_transaction = rhStore.Item.type_transaction;
        formData.value.bank_name = rhStore.Item.bank_name;
        formData.value.copie_rib = rhStore.Item.copie_rib;
        formData.value.rib = rhStore.Item.rib;
        formData.value.cnss = rhStore.Item.cnss;
        formData.value.copie_cnss = rhStore.Item.copie_cnss;
        formData.value.cin = rhStore.Item.cin;
        formData.value.copie_cin = rhStore.Item.copie_cin;
        formData.value.adresse = rhStore.Item.adresse;
    }
});
const getFileUrl = (attachment) => {
  return helpers.baseUrl() + `uploads/${attachment}`;
};

const submit = async () => {
    console.log('submit');
};


</script>
<template>
    <Modal id="showWorker" title="Details demploye sousTraitants" size="modal-xl">
        <form @submit.prevent="submit" enctype="multipart/form-data">
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Nom <span class="text-danger">*</span> </label>
                            <input class="form-control" placeholder="Entrez le nom de stagiaire" type="text" tabindex="0"
                                id="nameEx" v-model="formData.first_name" autofocus required />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Prénom <span class="text-danger">*</span></label>
                            <input class="form-control" placeholder="Entrez le prénom de stagiaire" type="text" tabindex="0"
                                id="nameEx" v-model="formData.last_name" required />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Numéro de téléphone <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" placeholder="Entre le numéro de téléphone" type="number"
                                v-model="formData.phone_no" required  disabled/>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Adresse mail <span class="text-danger">*</span></label>
                            <input class="form-control" placeholder="Entre l'adresse mail" type="email" tabindex="0"
                                id="nameEx" v-model="formData.email" required disabled/>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Numéro de CIN <span class="text-danger">*</span></label>
                            <input class="form-control" placeholder="Entre le numéro de CIN" type="text" tabindex="0"
                                v-model="formData.cin" required disabled/>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="deduction" class="form-label">Copie CIN <span
                                    class="text-danger">*</span></label>
                                <div class="card-body d-flex align-items-center" v-if="formData.copie_cin">
                                    <div class="bg-label-primary p-3 rounded">
                                        <i class="ti ti-file-filled"></i>
                                    </div>
                                    <div class="ms-2">
                                        <a :href="getFileUrl(formData.copie_cin)" >
                                        <h6 class="mb-2">
                                            {{
                                                formater.limitText(
                                                    formData.copie_cin,
                                                    55
                                                )
                                            }}
                                        </h6>
                                        </a>
                                        
                                    </div>
                                    
                                </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">

                            <label for="nameEx" class="form-label">Projet <span class="text-danger">*</span></label>
                            <input class="form-control" placeholder="Entre le poste" type="text" tabindex="0"
                                v-model="formData.project" required disabled/>
                    </div>
                        </div>
                   
                    <div class="col-sm-6">
                        <div class="mb-3">

                            <label for="nameEx" class="form-label">Sous Triatants <span class="text-danger">*</span></label>
                            <input class="form-control" placeholder="Entre le poste" type="text" tabindex="0"
                                v-model="formData.sousTraitant" required disabled/>
                        </div>
                    </div>
                    
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Poste <span class="text-danger">*</span></label>
                            <input class="form-control" placeholder="Entre le poste" type="text" tabindex="0"
                                v-model="formData.poste" required disabled/>
                        </div>
                    </div>
                    

                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="deduction" class="form-label">Copie Contract <span
                                    class="text-danger">*</span></label>
                                <div class="card-body d-flex align-items-center" v-if="formData.copie_contract">
                                    <div class="bg-label-primary p-3 rounded">
                                        <i class="ti ti-file-filled"></i>
                                    </div>
                                    <div class="ms-2">
                                        <a :href="getFileUrl(formData.copie_contract)" >
                                        <h6 class="mb-2">
                                            {{
                                                formater.limitText(
                                                    formData.copie_contract,
                                                    55
                                                )
                                            }}
                                        </h6>
                                        </a>
                                        
                                    </div>
                                    
                                </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="deduction" class="form-label">Copie Cnss <span
                                    class="text-danger">*</span></label>
                                <div class="card-body d-flex align-items-center" v-if="formData.copie_cnss">
                                    <div class="bg-label-primary p-3 rounded">
                                        <i class="ti ti-file-filled"></i>
                                    </div>
                                    <div class="ms-2">
                                        <a :href="getFileUrl(formData.copie_cnss)" >
                                        <h6 class="mb-2">
                                            {{
                                                formater.limitText(
                                                    formData.copie_cnss,
                                                    55
                                                )
                                            }}
                                        </h6>
                                        </a>
                                        
                                    </div>
                                    
                                </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Cnss <span class="text-danger">*</span></label>
                            <input class="form-control" placeholder="Entre le poste" type="text" tabindex="0"
                                v-model="formData.cnss" required disabled/>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="type_transaction" class="form-label">Type de transaction <span
                                    class="text-danger">*</span></label>
                                    <input class="form-control" placeholder="Entre le poste" type="text" tabindex="0"
                                v-model="formData.type_transaction" required disabled/>
                            
                        </div>
                    </div>
                    <div v-if="formData.type_transaction === 'virement'" class="col-sm-6">
                        <div class="mb-3">
                            <label for="salary" class="form-label">RIB <span class="text-danger">*</span></label>
                            <input class="form-control" placeholder="Entre le RIB" type="number" tabindex="0"
                                v-model="formData.rib" required />
                        </div>
                    </div>
                    <div v-if="formData.type_transaction === 'virement'" class="col-sm-6">
                        <div class="mb-3">
                            <label for="bank_name" class="form-label">Nom de la banque <span
                                    class="text-danger">*</span></label>
                                    <input class="form-control" placeholder="Entre le poste" type="text" tabindex="0"
                                v-model="formData.bank_name" required disabled/>
                        </div>
                    </div>
                    <div v-if="formData.type_transaction === 'virement'" class="col-sm-6">
                        <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="deduction" class="form-label">Copie RIB <span
                                    class="text-danger">*</span></label>
                                <div class="card-body d-flex align-items-center" v-if="formData.copie_rib">
                                    <div class="bg-label-primary p-3 rounded">
                                        <i class="ti ti-file-filled"></i>
                                    </div>
                                    <div class="ms-2">
                                        <a :href="getFileUrl(formData.copie_rib)" >
                                        <h6 class="mb-2">
                                            {{
                                                formater.limitText(
                                                    formData.copie_rib,
                                                    55
                                                )
                                            }}
                                        </h6>
                                        </a>
                                        
                                    </div>
                                    
                                </div>
                        </div>
                    </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Sexe <span class="text-danger">*</span></label>
                            <input class="form-control" placeholder="Entre l'adresse mail" type="email" tabindex="0"
                                id="nameEx" v-model="formData.sexe" required disabled/>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Adresse <span class="text-danger">*</span></label>
                            <input class="form-control" placeholder="Entre l'adresse mail" type="email" tabindex="0"
                                id="nameEx" v-model="formData.adresse" required disabled/>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Date debut  <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" placeholder="" type="date" tabindex="0" id="nameEx"
                                v-model="formData.date_start" required disabled/>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Date fin  <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" placeholder="" type="date" tabindex="0" id="nameEx"
                                v-model="formData.date_end" required disabled/>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="date_start" class="form-label">Status</label>
                            <span class="d-flex fw-bold align-items-center badge badge-pill" style=" height: 40px;"
                                :class="helpers.returnBadge(String(formData.status))[0]">
                                {{ helpers.returnBadge(String(formData.status))[1] }}
                            </span>
                        </div>
                    </div>
                    
                    
                </div>
                
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal" @click="rhStore.Item==null">
                    Fermer
                </button>
                <!-- <button v-if="formData.approval_rh == '0'" type="submit" :disabled="isLoading" class="btn btn-success">
                    <span v-if="isLoading" class="d-flex align-items-center">
                        <div class="spinner-border spinner-border-sm text-white me-2" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        Chargement...
                    </span>
                    <span v-else> Valider </span>
                </button> -->
            </div>
        </form>
    </Modal>
</template>