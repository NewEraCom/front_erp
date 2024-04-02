<script setup>
import { ref } from 'vue';
import { pmService } from '@/services';
import { useToast } from 'vue-toastification';

const toast = useToast();

let preProjectCode = ref('');
let typePreProject = ref('simple');
let offreNum = ref('');
let maitreOuvrage = ref('');
let mtCaution = ref('');
let mtMarche = ref('');
let objet = ref('');
let localite = ref('');
let qualificationDemande = ref('');
let exigencesMajeures = ref('');
let dateVisit = ref('');
let dateDepot = ref('');
let dateEchantillion = ref('');
let description = ref('');
let dossiers = ref(['NaN', 'NaN', 'NaN', 'NaN', 'NaN', 'NaN']);

let message = ref(null);

const isLoading = ref(false);

const submit = async () => {
    if (regexDate()[0] == false) {
        message.value = regexDate()[1].join(', ') + ' doit être supérieure à la date d\'aujourd\'hui';
        return;
    }

    isLoading.value = true;

    const formData = new FormData();
    formData.append('project_code', preProjectCode.value);
    formData.append('type_project', typePreProject.value);
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

    await pmService.createPreProject(formData).then((response) => {
        resetFormFields();
        $('#new-avantprojet').modal('hide');
        toast.success('Avant projet ajouté avec succès');

    }).catch((error) => {
        isLoading.value = false;
        message.value = error.response.data.message;
        toast.error('Erreur lors de l\'ajout');
    }).finally(() => {
        isLoading.value = false;
    });
};

const resetFormFields = () => {
    isLoading.value = false;
    $('#new-avantprojet').modal('hide');
};

const regexDate = () => {
    let result;

    let dates = [];

    return [result, dates];
};
</script>

<template>
    <form @submit.prevent="submit">
        <div class="modal-body">
            <div class="row">
                <div class="col-sm-12">
                    <div class="mb-3">
                        <label class="form-label mb-2">Type d'avant-projet</label>
                        <select id="exampleFormControlSelect1" v-model="typePreProject" class="form-select"
                            aria-label="Default select example">
                            <option value="simple" selected="true">Projet simple</option>
                            <option value="special">Projet avec lots</option>
                        </select>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="mb-3">
                        <label class="form-label">
                            Code de projet
                            <small class="text-danger">(Ce code doit être unique)</small>
                            <span class="text-danger font-18">*</span>
                        </label>
                        <input id="nameEx" v-model="preProjectCode" class="form-control"
                            placeholder="Entrez le code de projet" type="text" tabindex="0" autofocus required />
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="mb-3">
                        <label class="form-label">
                            Numéro de l'offre
                            <span class="text-danger font-18">*</span>
                        </label>
                        <input id="nameEx" v-model="offreNum" class="form-control"
                            placeholder="Entrez le numéro de l'offre" type="text" tabindex="0" autofocus required />
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="mb-3">
                        <label class="form-label">
                            Nom de client <span class="text-danger font-18">*</span>
                        </label>
                        <input id="nameEx" v-model="maitreOuvrage" class="form-control"
                            placeholder="Entrez le nom de client" type="text" tabindex="0" required />
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
                        <label class="form-label" for="exigencesMajeures">
                            Exigences majeures
                        </label>
                        <textarea id="exigencesMajeures" v-model="exigencesMajeures" class="form-control"
                            placeholder="Entre les exigences majeures" rows="3">
                        </textarea>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="mb-3">
                        <label class="form-label"> Qualification demandé </label>
                        <textarea id="qualificationDemande" v-model="qualificationDemande" class="form-control"
                            placeholder="Entre les qualification demandé" rows="3">
                        </textarea>
                    </div>
                </div>

                <div v-if="typePreProject == 'simple'" class="col-sm-12">
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
                            placeholder="Entre le montant de marché" type="number" tabindex="0" required />
                    </div>
                </div>

                <div v-if="typePreProject == 'simple'" class="col-sm-6">
                    <div class="mb-3">
                        <label class="form-label">
                            Caution provisoire <span class="text-danger font-18">*</span>
                        </label>
                        <input id="nameEx" v-model="mtCaution" class="form-control"
                            placeholder="Entre le montant de cauation" type="number" tabindex="0" required />
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
                        <textarea id="exampleFormControlTextarea1" v-model="description" class="form-control" rows="3"
                            required />
                    </div>
                </div>

                <label class="form-label mb-2">
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
        <div class="modal-footer">
            <div v-if="message != null" class="alert alert-danger" role="alert">
                <span class="message-error"> {{ message }}</span>
            </div>
            <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                Fermer
            </button>

            <button type="submit" :disabled="isLoading" class="btn btn-primary me-0">
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
