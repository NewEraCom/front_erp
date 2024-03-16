<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { Modal, CustomSelect } from '@/ui';
import { pmService, rhService } from '@/services';
import { usePMStore, useRhStore } from '@/store';
import { useToast } from 'vue-toastification';

const toast = useToast();

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
    adresse: null,
    bank_name: null,
    type_transcation: '-',
    cnss: null,
    copie_cnss: null,
    rib: null,
    copie_rib: null,
    date_start: null,
    date_end: null,
    status: null,
    poste: null,
    project_id: 0,
    copie_contract: null,
    tier_id: 0,
    // fiche_assurance:null,

});
const projects = ref(computed(() => pmStore.projects));
const soustraitants = ref(computed(() => rhStore.sousTraitants.data));

onMounted(async () => {
    await pmService.getProjects();
    await rhService.getSousTaraitant();

});
const handleFileChange = (e, value) => {
    if (value == 'cin') {
        formData.value.copie_cin = e.target.files[0];
    } if (value == 'cnss') {
        formData.value.copie_cnss = e.target.files[0];
    } if (value == 'rib') {
        formData.value.copie_rib = e.target.files[0];
    }
    if (value == 'contract') {
        formData.value.copie_contract = e.target.files[0];

    }
};

const submit = async () => {
    console.log('submit');
    formData.value.tier_id = formData.value.tier_id.key;
    formData.value.project_id = formData.value.project_id.key;
    isLoading.value = true;
    await rhService.addWorker(formData.value).then(() => {
        console.log('Employee added');
        $('#addNewWorkers').modal('hide');
        toast.success('Employé ajouté avec succès');
    }).catch((error) => {
        console.error('Error during action execution', error);
        toast.error('Erreur lors de l\'ajout de l\'employé');
    }).finally(() => {
        isLoading.value = false;
    });

};
</script>
<template>
    <Modal id="addNewWorkers" title="Ajouter un employé d'un sous-traitant" size="modal-xl">
        <form @submit.prevent="submit" enctype="multipart/form-data">
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Nom <span class="text-danger">*</span> </label>
                            <input class="form-control" placeholder="Entrez le nom d'employé" type="text" tabindex="0"
                                id="nameEx" v-model="formData.first_name" autofocus required />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Prénom <span class="text-danger">*</span></label>
                            <input class="form-control" placeholder="Entrez le prénom d'employé" type="text"
                                tabindex="0" id="nameEx" v-model="formData.last_name" required />
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
                            <label for="nameEx" class="form-label">Adresse mail <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" placeholder="Entre l'adresse mail" type="email" tabindex="0"
                                id="nameEx" v-model="formData.email" required />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Numéro de CIN <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" placeholder="Entre le numéro de CIN" type="text" tabindex="0"
                                v-model="formData.cin" required />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="copie_cin" class="form-label">Copie Cin <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" placeholder="" type="file" tabindex="0" id="copie_cin"
                                name="copie_cin" @change="e => handleFileChange(e, 'cin')" required />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">

                            <div v-if="projects != null">
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

                            <div v-if="soustraitants != null">
                                <CustomSelect v-model="formData.tier_id" placeholder="Choisir un projet"
                                    label="Sous-triatants" :data="soustraitants.filter(item => item.is_active == 1).map((item) => ({
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
                            <label for="copie_cv" class="form-label">Copie Contrat</label>
                            <input class="form-control" placeholder="" type="file" tabindex="0" id="copie_cv"
                                name="copie_cin" @change="e => handleFileChange(e, 'contract')" />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="copie_cv" class="form-label">Copie Cnss </label>
                            <input class="form-control" placeholder="" type="file" tabindex="0" id="copie_cv"
                                name="copie_cin" @change="e => handleFileChange(e, 'cnss')" />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Cnss</label>
                            <input class="form-control" placeholder="Entre le poste" type="text" tabindex="0"
                                v-model="formData.cnss" />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="type_transaction" class="form-label">Type de transaction <span
                                    class="text-danger">*</span></label>
                            <select id="type_transaction" v-model="formData.type_transcation" class="form-select"
                                required>
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
                            <label for="nameEx" class="form-label">Sexe <span class="text-danger">*</span></label>
                            <select name="" id="" class="form-select" required v-model="formData.sexe">
                                <option value="-">Choisir le sexe</option>
                                <option value="Homme">Homme</option>
                                <option value="Femme">Femme</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Date debut <span class="text-danger">*</span></label>
                            <input class="form-control" placeholder="" type="date" tabindex="0" id="nameEx"
                                v-model="formData.date_start" required />
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