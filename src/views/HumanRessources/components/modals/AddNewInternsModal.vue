<script setup lang="ts">
import { ref } from 'vue';
import { Modal } from '@/ui';

const isLoading = ref(false);

const formData = {
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

};

const handleFileChange = (e) => {
    formData.copie_cin = e.target.files[0];
};

const submit = async () => {
    console.log('submit');
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
                            <label for="nameEx" class="form-label">Numéro de CIN <span class="text-danger">*</span></label>
                            <input class="form-control" placeholder="Entre le numéro de CIN" type="text" tabindex="0"
                                v-model="formData.matricule" required />
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="copie_cin" class="form-label">Copie Cin</label>
                            <input class="form-control" placeholder="" type="file" tabindex="0" id="copie_cin"
                                name="copie_cin" @change="handleFileChange" required />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Poste <span class="text-danger">*</span></label>
                            <input class="form-control" placeholder="Entre le poste" type="text" tabindex="0"
                                v-model="formData.cin" required />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Département <span class="text-danger">*</span></label>
                            <input class="form-control" placeholder="Entre le département" type="text" tabindex="0"
                                v-model="formData.cin" required />
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Date de naissance <span class="text-danger">*</span>
                                <span class="text-danger">*</span></label>
                            <input class="form-control" placeholder="" type="date" tabindex="0" id="nameEx"
                                v-model="formData.birthdate" required />
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
                            <label for="nameEx" class="form-label">Adresse mail <span class="text-danger">*</span></label>
                            <input class="form-control" placeholder="Entre l'adresse mail" type="email" tabindex="0"
                                id="nameEx" v-model="formData.email" required />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Date debut de stage <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" placeholder="" type="date" tabindex="0" id="nameEx"
                                v-model="formData.date_embauche" required />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="copie_cv" class="form-label">Copie CV <span class="text-danger">*</span></label>
                            <input class="form-control" placeholder="" type="file" tabindex="0" id="copie_cv"
                                name="copie_cin" @change="handleFileChange" required />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="assurance" class="form-label">Fiche d'assurance <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" placeholder="" type="file" tabindex="0" id="assurance"
                                name="copie_cin" @change="handleFileChange" required />
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