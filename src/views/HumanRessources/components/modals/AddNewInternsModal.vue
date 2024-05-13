<script setup lang="ts">
import { ref } from 'vue';
import { Modal } from '@/ui';
import { rhService } from '@/services';

const isLoading = ref(false);

const formData = {
    nom: null,
    prenom: null,
    tel: null,
    cin: null,
    copie_cin: null,
    birthdate: null,
    sexe: '-',
    email: null,
    adresse: null,
    city: null,
    diplome: null,
    poste: null,
    date_start: null,
    date_fin: null,
    cv: null,
    copie_diplome: null,
    assurance_copie: null,
    attestaion_stage: null,

};

// const handleFileChange = (e) => {
//     formData.copie_cin = e.target.files[0];
// };
const handleFileChange = (e, value) => {
    if (value == 'cin') {
        formData.copie_cin = e.target.files[0];
    } if (value == 'cv') {
        formData.cv = e.target.files[0];
    } if (value == 'copie_diplome') {
        formData.copie_diplome = e.target.files[0];
    } if (value == 'assurance_copie') {
        formData.assurance_copie = e.target.files[0];
    }
    if (value == 'attestaion_stage') {
        formData.attestaion_stage = e.target.files[0];
    }
};

const submit = async () => {
    console.log('submit');
    isLoading.value = true;
    await rhService.addInterns(formData).then(() => {
        console.log('Employee added');
        $('#addNewInterns').modal('hide');
    }).catch((error) => {
        console.error('Error during action execution', error);
    }).finally(() => {
        isLoading.value = false;
    });
};
</script>
<template>
    <Modal id="addNewInterns" title="Ajouter un stagiaire" size="modal-xl">
        <form @submit.prevent="submit" enctype="multipart/form-data">
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Nom <span class="text-danger">*</span> </label>
                            <input class="form-control" placeholder="Entrez le nom de stagiaire" type="text"
                                tabindex="0" id="nameEx" v-model="formData.nom" autofocus required />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Prénom <span class="text-danger">*</span></label>
                            <input class="form-control" placeholder="Entrez le prénom de stagiaire" type="text"
                                tabindex="0" id="nameEx" v-model="formData.prenom" required />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Numéro de téléphone <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" placeholder="Entre le numéro de téléphone" type="number"
                                v-model="formData.tel" required />
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
                    <div class="col-sm-3">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Ville </label>
                            <input class="form-control" placeholder="Entre la ville de stagiaire" type="text"
                                tabindex="0" id="nameEx" v-model="formData.city"  />
                        </div>
                    </div>
                    <div class="col-sm-9">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Adresse </label>
                            <input class="form-control" placeholder="Entre l'adresse de stagiaire" type="text"
                                tabindex="0" id="nameEx" v-model="formData.adresse"  />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Numéro de CIN <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" placeholder="Entre le numéro de CIN" type="text" tabindex="0"
                                v-model="formData.cin"  />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="copie_cin" class="form-label">Copie Cin</label>
                            <input class="form-control" placeholder="" type="file" tabindex="0" id="copie_cin"
                                name="copie_cin" @change="e => handleFileChange(e, 'cin')" />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Poste </label>
                            <input class="form-control" placeholder="Entre le poste" type="text" tabindex="0"
                                v-model="formData.poste"  />
                        </div>
                    </div>


                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Date de naissance </label>
                            <input class="form-control" placeholder="" type="date" tabindex="0" id="nameEx"
                                v-model="formData.birthdate"  />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Sexe <span class="text-danger">*</span></label>
                            <select name="" id="" class="form-select" required v-model="formData.sexe">
                                <option value="-">Choisir le sexe</option>
                                <option value="m">homme</option>
                                <option value="f">femme</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Date debut de stage <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" placeholder="" type="date" tabindex="0" id="nameEx"
                                v-model="formData.date_start" required />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Date fin de stage </label>
                            <input class="form-control" placeholder="" type="date" tabindex="0" id="nameEx"
                                v-model="formData.date_fin" />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Diplôme </label>
                            <input class="form-control" placeholder="Entre le poste" type="text" tabindex="0"
                                v-model="formData.diplome"  />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="copie_diplome" class="form-label">Copie Diplôme</label>
                            <input class="form-control" placeholder="" type="file" tabindex="0" id="copie_cv"
                                name="copie_diplome" @change="e => handleFileChange(e, 'copie_diplome')" />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="copie_cv" class="form-label">Copie CV <span class="text-danger">*</span></label>
                            <input class="form-control" placeholder="" type="file" tabindex="0" id="copie_cv"
                                name="copie_cv" @change="e => handleFileChange(e, 'cv')" />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="assurance" class="form-label">Fiche d'assurance</label>
                            <input class="form-control" placeholder="" type="file" tabindex="0" id="assurance"
                                name="assurance" @change="e => handleFileChange(e, 'assurance_copie')" />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="assurance" class="form-label">Attestation de Stage </label>
                            <input class="form-control" placeholder="" type="file" tabindex="0" id="assurance"
                                name="assurance" @change="e => handleFileChange(e, 'attestaion_stage')" />
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