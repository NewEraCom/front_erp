<script setup lang="ts">
import { ref } from 'vue';
import { Modal } from '@/ui';
import { rhService } from '@/services';
import { useToast } from 'vue-toastification';

const toast = useToast();

const isLoading = ref(false);

const formData = ref({
    first_name: null,
    last_name: null,
    phone_no: null,
    matricule: null,
    cin: null,
    copie_cin: null,
    birthdate: null,
    sexe: '-',
    email: null,
    adresse: null,
    date_embauche: null,
    salary: null,
    conge_mois: null,
    poste: null,
    departement: null,
    type_contrat: '-',
    duree: null,
    bank_name: '-',
    mode_paiement: '-',
    rib: null,
    copie_rib: null,
    city: null,
});

const handleFileChange = (e, value) => {
    if (value == 'cin') {
        formData.value.copie_cin = e.target.files[0];
    } else {
        formData.value.copie_rib = e.target.files[0];
    }
};

const submit = async () => {
    isLoading.value = true;
    await rhService.addEmployee(formData.value).then(() => {
        console.log('Employee added');
        $('#addNewEmployee').modal('hide');
        toast.success('Employé ajouté avec succès');
    }).catch((error) => {
        console.error('Error during action execution', error);
    }).finally(() => {
        isLoading.value = false;
    });
};
</script>

<template>
    <Modal id="addNewEmployee" title="Ajouter un employé" size="modal-xl">
        <form @submit.prevent="submit" enctype="multipart/form-data">
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nom" class="form-label">Nom de famille
                                <span class="text-danger">*</span>
                            </label>
                            <input id="nom" v-model="formData.last_name" class="form-control"
                                placeholder="Entrez le nom" type="text" tabindex="0" autofocus required />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="prenom" class="form-label">Prénom
                                <span class="text-danger">*</span>
                            </label>
                            <input id="prenom" v-model="formData.first_name" class="form-control"
                                placeholder="Entrez le prenom" type="text" tabindex="0" required />
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="phone_no" class="form-label">Numéro de téléphone
                                <span class="text-danger">*</span>
                            </label>
                            <input id="phone_no" v-model="formData.phone_no" class="form-control"
                                placeholder="Entre le numéro de téléphone" type="tel" maxlength="10" minlength="10"
                                tabindex="0" required />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="departement" class="form-label">Département
                                <span class="text-danger">*</span>
                            </label>
                            <input id="departement" v-model="formData.departement" class="form-control"
                                placeholder="Entre le département" type="text" tabindex="0" required />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="poste" class="form-label">Poste
                                <span class="text-danger">*</span>
                            </label>
                            <input id="poste" v-model="formData.poste" class="form-control" placeholder="Entre le poste"
                                type="text" tabindex="0" required />
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="cin" class="form-label">Numéro de CIN
                                <span class="text-danger">*</span>
                            </label>
                            <input id="cin" v-model="formData.cin" class="form-control"
                                placeholder="Entrer le numero de cin" type="text" tabindex="0" required />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="copie_cin" class="form-label">Copie CIN
                                <span class="text-danger">*</span>
                            </label>
                            <input id="copie_cin" ref="cin_copie" class="form-control" placeholder="Choisir le fichier"
                                type="file" tabindex="0" name="copie_cin" required
                                @change="e => handleFileChange(e, 'cin')" />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="rib" class="form-label">Numéro de RIB
                                <span class="text-danger">*</span>
                            </label>
                            <input id="rib" v-model="formData.rib" class="form-control"
                                placeholder="Entrer le numero de rib" type="number" tabindex="0" required />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="copie_rib" class="form-label">Copie RIB
                                <span class="text-danger">*</span>
                            </label>
                            <input id="copie_rib" ref="rib_copie" class="form-control" placeholder="Choisir le fichier"
                                type="file" tabindex="0" name="copie_rib" required
                                @change="e => handleFileChange(e, 'rib')" />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="mode_paiement" class="form-label">Mode de paiement
                                <span class="text-danger">*</span>
                            </label>
                            <select id="mode_paiement" v-model="formData.mode_paiement" class="form-select" required>
                                <option value="-">Selectionner le mode de paiement</option>
                                <option value="Cash">Cash</option>
                                <option value="Virement">Virement</option>
                                <option value="Chèque">Chèque</option>
                                <option value="Autre">Autre</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="bank_name" class="form-label">Nom de la banque
                                <span class="text-danger">*</span>
                            </label>

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

                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="birthdate" class="form-label">Date de naissance
                                <span class="text-danger">*</span>
                            </label>
                            <input id="birthdate" v-model="formData.birthdate" class="form-control"
                                placeholder="date de naissance" type="date" tabindex="0" required />
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="contract" class="form-label">Type contrat
                                <span class="text-danger">*</span>
                            </label>
                            <select id="contract" v-model="formData.type_contrat" name="" class="form-select">
                                <option value="-">Selectionner le type de contrat</option>
                                <option value="CDD">Contrat à durée déterminée (CDD)</option>
                                <option value="CDI">Contrat à durée indéterminée (CDI)</option>
                                <option value="Chantier">Contrat de chantier</option>
                                <option value="COMMERCIALE">Contrat commerciale</option>
                            </select>
                        </div>
                    </div>

                    <div v-if="formData.type_contrat == 'CDD'" ß class="col-sm-12">
                        <div class="mb-3">
                            <label for="duree" class="form-label">Durée du contrat <span class="text-danger">*</span>
                            </label>
                            <input id="duree" v-model="formData.duree" class="form-control"
                                placeholder="Entre la durée du contrat en mois" type="number" tabindex="0" required />
                        </div>
                    </div>

                    <div class="col-sm-4">
                        <div class="mb-3">
                            <label for="city" class="form-label">Ville <span class="text-danger">*</span>
                            </label>
                            <input id="city" v-model="formData.city" class="form-control" placeholder="Entre la ville"
                                type="text" tabindex="0" required />
                        </div>
                    </div>

                    <div class="col-sm-8">
                        <div class="mb-3">
                            <label for="adresse" class="form-label">Adresse <span class="text-danger">*</span>
                            </label>
                            <input id="adresse" v-model="formData.adresse" class="form-control"
                                placeholder="Entre l'adresse" type="text" tabindex="0" required />
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="sexe" class="form-label">Sexe
                                <span class="text-danger">*</span>
                            </label>
                            <select id="sexe" v-model="formData.sexe" class="form-select" required>
                                <option value="-">Selectionner le sexe</option>
                                <option value="Homme">Homme</option>
                                <option value="Femme">Femme</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="date_start" class="form-label">Date d'embauche
                                <span class="text-danger">*</span>
                            </label>
                            <input id="date_start" v-model="formData.date_embauche" class="form-control"
                                placeholder="date d'embauche" type="date" tabindex="0" required />
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="salary" class="form-label">Salaire de base <span class="text-danger">*</span>
                            </label>
                            <input id="salary" v-model="formData.salary" class="form-control"
                                placeholder="Entre le salaire de base" type="number" tabindex="0" required />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="conge" class="form-label">Conge Jours par Mois <span
                                    class="text-danger">*</span>
                            </label>
                            <input id="conge" v-model="formData.conge_mois" class="form-control"
                                placeholder="Entre le nombre de jours de congé" type="string" tabindex="0" required />
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