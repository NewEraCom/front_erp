<script setup>
import { onMounted, ref } from 'vue';
import {pmService} from '@/services';

const props = defineProps({
    preProject: {
        type: Object,
        required: true
    }
});


onMounted(() => {
    if (props && props.preProject) {
        preProjectCode.value = props.preProject.project_code;
        maitreOuvrage.value = props.preProject.maitre_ouvrage;
        offreNum.value = props.preProject.n_offre;
        mtCaution.value = props.preProject.montant_caution;
        mtMarche.value = props.preProject.montant_marche;
        objet.value = props.preProject.objet;
        localite.value = props.preProject.localite;
        typePreProject.value = props.preProject.type_project;
        qualificationDemande.value = props.preProject.qualification_demande;
        exigencesMajeures.value = props.preProject.exigences_majeures;
        dateVisit.value = props.preProject.date_visite ?? null;
        dateDepot.value = props.preProject.date_depot;
        dateEchantillion.value = props.preProject.date_echantillion ?? null;
        description.value = props.preProject.description;
        if (props.preProject.dossier_adminstratif == 1) dossiers.value[0] = 'true';
        if (props.preProject.offre_financier == 1) dossiers.value[1] = 'true';
        if (props.preProject.dossier_technique == 1) dossiers.value[2] = 'true';
        if (props.preProject.dossier_additif == 1) dossiers.value[3] = 'true';
        if (props.preProject.offre_technique == 1) dossiers.value[4] = 'true';
        if (props.preProject.other_docs == 1) dossiers.value[5] = 'true';
    }
});

let typePreProject = ref('');
let preProjectCode = ref('');
let offreNum = ref('');
let maitreOuvrage = ref('');
let mtCaution = ref('');
let mtMarche = ref('');
let objet = ref('');
let localite = ref('');
let qualificationDemande = ref('');
let exigencesMajeures = ref('');
let dateVisit = ref(null);
let dateDepot = ref(null);
let dateEchantillion = ref(null);
let description = ref('');
let dossiers = ref(['NaN', 'NaN', 'NaN', 'NaN', 'NaN', 'NaN']);

let message = ref(null);

const isLoading = ref(false);

const submit = async () => {
    isLoading.value = true;

    const formData = new FormData();
    formData.append('project_code', preProjectCode.value);
    formData.append('id', props.preProject.id);
    formData.append('n_offre', offreNum.value);
    formData.append('maitre_ouvrage', maitreOuvrage.value);
    formData.append('montant_caution', mtCaution.value);
    formData.append('montant_marche', mtMarche.value);
    formData.append('objet', objet.value);
    formData.append('localite', localite.value);
    formData.append('exigences_majeures', exigencesMajeures.value);
    formData.append('qualification_demande', qualificationDemande.value);
    formData.append('date_visite', dateVisit.value);
    formData.append('date_depot', dateDepot.value);
    formData.append('date_echantillion', dateEchantillion.value);
    formData.append('description', description.value);
    formData.append('dossier_adminstratif', dossiers.value[0]);
    formData.append('offre_financier', dossiers.value[1]);
    formData.append('dossier_technique', dossiers.value[2]);
    formData.append('dossier_additif', dossiers.value[3]);
    formData.append('offre_technique', dossiers.value[4]);
    formData.append('other_file', dossiers.value[5]);
    formData.append('created_by', JSON.parse(localStorage.getItem('user')).id);


    await pmService.update(formData)
        .then((response) => {
            if (response.status == 200) {
                resetFormFields();
            }
        })
        .catch((error) => {
            console.log(error);
        });
};

const resetFormFields = () => {
    isLoading.value = false;
    $('#edit-preproject').modal('hide');
};

</script>

<template>
    <form @submit.prevent="submit">
        <div class="modal-body ">
            <div class="row">
                <div class="col-sm-12">
                    <div class="mb-3">
                        <label class="form-label">
                            Numéro de l'offre
                            <span class="text-danger font-18">*</span>
                        </label>
                        <input id="nameEx" v-model="offreNum" class="form-control"
                            placeholder="Entrez le numéro de l'offre" type="text" tabindex="0" autofocus required />
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="mb-3">
                        <label class="form-label">
                            Objet <span class="text-danger font-18">*</span>
                        </label>
                        <input id="nameEx" v-model="objet" class="form-control"
                            placeholder="Entrez l'objet d'avant projet" type="text" tabindex="0" required />
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="mb-3">
                        <label class="form-label">
                            Exigences majeures
                        </label>
                        <textarea id="exigencesMajeures" v-model="exigencesMajeures" class="form-control"
                            placeholder="Entre les exigences majeures" rows="3">
                        </textarea>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="mb-3">
                        <label class="form-label">
                            Qualification demandé
                        </label>
                        <textarea id="qualificationDemande" v-model="qualificationDemande" class="form-control"
                            placeholder="Entre les qualification demandé" rows="3">
                        </textarea>
                    </div>
                </div>

                <div v-if="typePreProject == 'simple'" class="col-sm-6">
                    <div class="mb-3">
                        <label class="form-label">
                            Localite <span class="text-danger font-18">*</span>
                        </label>
                        <input id="nameEx" v-model="localite" class="form-control" placeholder="Ex : Rabat" type="text"
                            tabindex="0" required />
                    </div>
                </div>

                <div v-if="typePreProject == 'simple'" class="col-sm-6">
                    <div class="mb-3">
                        <label class="form-label">
                            Estimation du marché <span class="text-danger font-18">*</span>
                        </label>
                        <input id="nameEx" v-model="mtMarche" class="form-control"
                            placeholder="Entre l'estimation du marché" type="number" tabindex="0" required />
                    </div>
                </div>

                <div class="col-sm-6">
                    <div class="mb-3">
                        <label class="form-label">
                            Date de dépôt <span class="text-danger font-18">*</span>
                        </label>
                        <input id="nameEx" v-model="dateDepot" class="form-control" type="datetime-local" tabindex="0"
                            required />
                    </div>
                </div>

                <div class="col-sm-6">
                    <div class="mb-3">
                        <label class="form-label">Date de visite</label>
                        <input id="nameEx" v-model="dateVisit" class="form-control" type="datetime-local"
                            tabindex="0" />
                    </div>
                </div>

                <div class="col-sm-12">
                    <div class="mb-3">
                        <label class="form-label">Date d'echantillion</label>
                        <input id="nameEx" v-model="dateEchantillion" class="form-control"
                            placeholder="Entre le montant de marché" type="datetime-local" tabindex="0" />
                    </div>
                </div>

                <div class="col-sm-12">
                    <div class="mb-3">
                        <label class="form-label">
                            Description <span class="text-danger font-18">*</span>
                        </label>
                        <textarea id="exampleFormControlTextarea1" v-model="description" class="form-control"
                            rows="3" />
                    </div>
                </div>

                <label class="form-label">
                    Document requis pour ce projet
                    <span class="text-danger font-18">*</span>
                </label>
                <div class="row d-flex justify-content-between">
                    <div class="col-2">
                        <div class="form-check custom-option custom-option-basic checked">
                            <label class="form-check-label custom-option-content" for="customCheckTemp1">
                                <input id="customCheckTemp1" v-model="dossiers[0]" class="form-check-input"
                                    type="checkbox" value="true" />
                                <span class="custom-option-header">
                                    <span class="h6 mb-0">Dossier Administratif</span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="form-check custom-option custom-option-basic checked">
                            <label class="form-check-label custom-option-content" for="customCheckTemp2">
                                <input id="customCheckTemp2" v-model="dossiers[1]" class="form-check-input"
                                    type="checkbox" />
                                <span class="custom-option-header">
                                    <span class="h6 mb-0">Dossier Financier</span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="form-check custom-option custom-option-basic checked">
                            <label class="form-check-label custom-option-content" for="customCheckTemp3">
                                <input id="customCheckTemp3" v-model="dossiers[2]" class="form-check-input"
                                    type="checkbox" value="true" />
                                <span class="custom-option-header">
                                    <span class="h6 mb-0">Dossier Technique</span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="form-check custom-option custom-option-basic checked">
                            <label class="form-check-label custom-option-content" for="customCheckTemp4">
                                <input id="customCheckTemp4" v-model="dossiers[3]" class="form-check-input"
                                    type="checkbox" value="true" />
                                <span class="custom-option-header">
                                    <span class="h6 mb-0">Dossier Additif</span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="form-check custom-option custom-option-basic checked">
                            <label class="form-check-label custom-option-content" for="customCheckTemp5">
                                <input id="customCheckTemp5" v-model="dossiers[4]" class="form-check-input"
                                    type="checkbox" value="true" />
                                <span class="custom-option-header">
                                    <span class="h6 mb-0">Offre Technique</span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="form-check custom-option custom-option-basic checked">
                            <label class="form-check-label custom-option-content" for="customCheckTemp6">
                                <input id="customCheckTemp6" v-model="dossiers[5]" class="form-check-input"
                                    type="checkbox" value="true" />
                                <span class="custom-option-header">
                                    <span class="h6 mb-0">Autres documents</span>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer mt-2">
            <div v-if="message != null" class="alert alert-danger" role="alert">
                <span class="message-error"> {{ message }}</span>
            </div>
            <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                Fermer
            </button>

            <button type="submit" :disabled="isLoading" class="btn btn-primary">
                <span v-if="isLoading" class="d-flex align-items-center">
                    <div class="spinner-border spinner-border-sm text-white" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </span>
                <span v-else> Terminer</span>
            </button>
        </div>
    </form>
</template>

<style scoped>
.custom-option-icon.checked i {
    color: #324877;
}

.font-18 {
    font-size: 14px !important;
}

.message-error::first-letter {
    text-transform: uppercase;
}

.message-error {
    font-weight: 800;
    text-transform: lowercase;
}
</style>