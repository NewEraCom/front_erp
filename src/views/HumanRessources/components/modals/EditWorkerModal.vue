<script setup lang="ts">
import { ref, watchEffect ,computed,onMounted} from 'vue';
import { Modal ,CustomSelect} from '@/ui';
import { pmService, rhService } from '@/services';
import { usePMStore, useRhStore } from '@/store';

const props = defineProps({
    worker: {
        type: Object,
        required: true,
    },
});

const isLoading = ref(false);
const pmStore = usePMStore();
const rhStore = useRhStore();
const formData = ref({
    first_name: null,
    last_name: null,
    phone_no: null,
    matricule: null,
    cin: null,
    copie_cin: null,
    sexe: '-',
    email: null,
    bank_name: null,
    type_transcation: '-',
    cnss :null,
    copie_cnss :null,
    rib  :null,
    copie_rib :null,
    date_start:null,
    date_end:null,
    status:null,
    poste:null,
    project_id:0,
    copie_contract:null,
    tier_id:0,
    salary:null,
    // fiche_assurance:null,

});
const projects = ref(computed(()=> pmStore.projects));
const soustraitants = ref(computed(()=> rhStore.sousTraitants.data));

onMounted(async () => {
  await pmService.getProjects();
  await rhService.getSousTaraitant();
    console.log('soustraitants',soustraitants.value);
    
});
const handleFileChange = (e, value) => {
    if (value == 'cin') {
        formData.value.copie_cin = e.target.files[0];
    } if(value == 'cnss') {
        formData.value.copie_cnss = e.target.files[0];
    }if(value == 'rib'){
        formData.value.copie_rib = e.target.files[0];
    }
    if(value == 'contract'){
        formData.value.copie_contract = e.target.files[0];
    
    }
    // else{
    //     formData.value.copie_contract = e.target.files[0];
    // }
};


watchEffect(() => {
    if (props.worker) {
        formData.value = {
            first_name: props.worker.first_name,
    last_name: props.worker.last_name ,
    phone_no:  props.worker.phone_no,
    matricule: props.worker.matricule ,
    cin:  props.worker.cin,
    copie_cin:  props.worker.copie_cin,
    sexe:  props.worker.sexe,
    email:  props.worker.email,
    bank_name: props.worker.bank_name, 
    type_transcation: props.worker.type_transcation, 
    cnss : props.worker.cnss,
    copie_cnss : props.worker.copie_cnss,
    rib  : props.worker.rib,
    copie_rib : props.worker.copie_rib,
    date_start: props.worker.date_start,
    date_end: props.worker.date_end,
    status: props.worker.status,
    poste: props.worker.poste,
    project_id: props.worker.project_id,
    copie_contract: props.worker.copie_contract,
    tier_id: props.worker.tier_id,
    salary: props.worker.salary,
        };
    }
});

const submit = async () => {
    console.log('submit');
    formData.value.tier_id = formData.value.tier_id.key;
    formData.value.project_id = formData.value.project_id.key;
    console.log(formData.value);
    isLoading.value = true;
    await rhService.updateWorker(formData.value,props.worker.id).then(() => {
        console.log('Worker updated');
        $('#EditWorker').modal('hide');
    }).catch((error) => {
        console.error('Error during action execution', error);
    }).finally(() => {
        isLoading.value = false;
    });
    
};
</script>

<template>
    <Modal id="EditWorker" title="Edit un employé d'un sous-traitant" size="modal-xl">
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
                                v-model="formData.phone_no" required />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Adresse mail <span class="text-danger">*</span></label>
                            <input class="form-control" placeholder="Entre l'adresse mail" type="email" tabindex="0"
                                id="nameEx" v-model="formData.email" required />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Numéro de CIN <span class="text-danger">*</span></label>
                            <input class="form-control" placeholder="Entre le numéro de CIN" type="text" tabindex="0"
                                v-model="formData.cin" required />
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="copie_cin" class="form-label">Copie Cin</label>
                            <input class="form-control" placeholder="" type="file" tabindex="0" id="copie_cin"
                                name="copie_cin" @change="e => handleFileChange(e, 'cin')" required />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">

                                    <div v-if="projects != null" >
                        <CustomSelect v-model="formData.project_id" placeholder="Choisir un projet"
                            label="Projets" :data="projects.filter(item => item.status == 'on going').map((item) => ({
                                key: item.id,
                                value: item.code 
                            }))
                                " />
                    </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">

                                    <div v-if="soustraitants != null" >
                        <CustomSelect v-model="formData.tier_id" placeholder="Choisir un projet"
                            label="Sous Triatants" :data="soustraitants.filter(item => item.is_active == 1).map((item) => ({
                                key: item.id,
                                value: item.raison_social 
                            }))
                                " />
                    </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Poste <span class="text-danger">*</span></label>
                            <input class="form-control" placeholder="Entre le poste" type="text" tabindex="0"
                                v-model="formData.poste" required />
                        </div>
                    </div>
                    

                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="copie_cv" class="form-label">Copie Contrat <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" placeholder="" type="file" tabindex="0" id="copie_cv"
                                name="copie_cin" @change="e => handleFileChange(e, 'contract')" required />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="copie_cv" class="form-label">Copie Cnss <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" placeholder="" type="file" tabindex="0" id="copie_cv"
                                name="copie_cin" @change="e => handleFileChange(e, 'cnss')" required />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Cnss <span class="text-danger">*</span></label>
                            <input class="form-control" placeholder="Entre le poste" type="text" tabindex="0"
                                v-model="formData.cnss" required />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="type_transaction" class="form-label">Type de transaction <span
                                    class="text-danger">*</span></label>
                            <select id="type_transaction" v-model="formData.type_transcation" class="form-select" required>
                                <option value="-">Choisir le type de transaction</option>
                                <option value="virement">Virement</option>
                                <option value="cheque">Chèque</option>
                                <option value="cash">Espèce</option>
                            </select>
                        </div>
                    </div>
                    <div v-if="formData.type_transcation === 'virement'" class="col-sm-6">
                        <div class="mb-3">
                            <label for="salary" class="form-label">RIB <span class="text-danger">*</span></label>
                            <input class="form-control" placeholder="Entre le RIB" type="number" tabindex="0"
                                v-model="formData.rib" required />
                        </div>
                    </div>
                    <div v-if="formData.type_transcation === 'virement'" class="col-sm-6">
                        <div class="mb-3">
                            <label for="bank_name" class="form-label">Nom de la banque <span
                                    class="text-danger">*</span></label>
                            <select id="bank_name" v-model="formData.bank_name" class="form-select" required>
                                <option value="-">Choisir la banque</option>
                                <option value="CIH">CIH Bank</option>
                                <option value="BMCE BANK">BMCE Bank</option>
                                <option value="ATTIJARIWAFA BANK">Attijariwafa Bank</option>
                                <option value="SOCIETE GENERALE">Soceite Generale</option>
                                <option value="BMCI">BMCI Bank</option>
                                <option value="BANQUE POPULAIRE">Banque Populaire</option>
                                <option value="Crédit du Maroc">Credit du Maroc</option>
                                <option value="Crédit Agricole du Maroc">Credit Agricole du Maroc</option>
                                <option value="AL BARID BANK">Al Barid Bank</option>
                                <option value="CFG BANK">CFG Bank</option>
                                <option value="AL AKHDAR BANK">Al Akhdar Bank</option>
                                <option value="Umnia Bank">Umnia Bank</option>
                                <option value="other">Autre</option>
                            </select>
                        </div>
                    </div>
                    <div v-if="formData.type_transcation === 'virement'" class="col-sm-6">
                        <div class="mb-3">
                            <label for="assurance" class="form-label">Copie de RIB <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" placeholder="" type="file" tabindex="0" id="assurance"
                                name="copie_cin" @change="e => handleFileChange(e, 'rib')" required />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Salaire <span class="text-danger">*</span></label>
                            <input class="form-control" placeholder="Entre le salaire" type="number" tabindex="0"
                                id="nameEx" v-model="formData.salary" required />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Sexe <span class="text-danger">*</span></label>
                            <select name="" id="" class="form-select" required v-model="formData.sexe">
                                <option value="-">Choisir le sexe</option>
                                <option value="homme">Homme</option>
                                <option value="femme">Femme</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Date debut  <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" placeholder="" type="date" tabindex="0" id="nameEx"
                                v-model="formData.date_start" required />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Date fin  <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" placeholder="" type="date" tabindex="0" id="nameEx"
                                v-model="formData.date_end" required />
                        </div>
                    </div>
                    
                    
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                    Fermer
                </button>
                <button type="submit" :disabled="isLoading" class="btn btn-primary">
                    <span v-if="isLoading" class="d-flex align-items-center">
                        <div class="spinner-border spinner-border-sm text-white me-2" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        Chargement...
                    </span>
                    <span v-else> Terminer</span>
                </button>
            </div>
        </form>

    </Modal>
</template>