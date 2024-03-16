<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { Modal } from '@/ui';
import { rhService } from '@/services';
import { useToast } from 'vue-toastification';

const toast = useToast();

const props = defineProps({
    employee: {
        type: Object,
        required: true,
    },
});

const isLoading = ref(false);

const formData = ref({
    first_name: null,
    last_name: null,
    poste: null,
    departement: null,
    adresse: null,
    sexe: null,
    phone_no: null,
    flotte: null,
    email: null,
    cin: null,
    birthdate: null,
    situation_familiale: null,
    children: null,
    ville: null,
});

watchEffect(() => {
    if (props.employee) {
        formData.value = {
            first_name: props.employee.first_name,
            last_name: props.employee.last_name,
            poste: props.employee.poste,
            departement: props.employee.departement,
            sexe: props.employee.sexe,
            ville: props.employee.ville,
            adresse: props.employee.adresse,
            phone_no: props.employee.phone_no,
            flotte: props.employee.flotte,
            email: props.employee.email,
            cin: props.employee.cin,
            birthdate: props.employee.birthdate,
            situation_familiale: props.employee.situation_familiale,
            children: props.employee.num_personne_charge,
        };
    }
});

const submit = async () => {
    isLoading.value = true;
    await rhService.EditEmployee(props.employee.id, formData.value).then(() => {
        console.log('Employee Updated Successfully!');
        $('#editNewEmployee').modal('hide');
        toast.success('Employé modifié avec succès');
    }).catch((error) => {
        console.error('Error during action execution', error);
        toast.error('Erreur lors de la modification de l\'employé');
    }).finally(() => {
        isLoading.value = false;
    });
};
</script>
<template>
    <Modal id="editNewEmployee" title="Modifier un employé" size="modal-xl">
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
                            <label for="departement" class="form-label">Département
                                <span class="text-danger">*</span>
                            </label>
                            <input id="departement" v-model="formData.departement" class="form-control"
                                placeholder="Entre le département" type="text" tabindex="0" required />
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="mb-3">
                            <label for="city" class="form-label">Ville <span class="text-danger">*</span>
                            </label>
                            <input id="city" v-model="formData.ville" class="form-control" placeholder="Entre la ville"
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
                            <label for="flotte" class="form-label">Numéro de flotte
                                <span class="text-danger">*</span>
                            </label>
                            <input id="flotte" v-model="formData.flotte" class="form-control"
                                placeholder="Entre le numéro de téléphone de flotte" type="tel" maxlength="4"
                                minlength="4" tabindex="0" />
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="email" class="form-label">Adresse e-mail
                                <span class="text-danger">*</span>
                            </label>
                            <input id="email" v-model="formData.email" class="form-control"
                                placeholder="Entrez l'adresse e-mail" type="email" tabindex="0" required />
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="cin" class="form-label">Numéro CIN
                                <span class="text-danger">*</span>
                            </label>
                            <input id="cin" v-model="formData.cin" class="form-control"
                                placeholder="Entre le numéro CIN" type="text" tabindex="0" required />
                        </div>
                    </div>

                    <div class="col-sm-12">
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
                            <label for="situation" class="form-label">Situation Familiale
                                <span class="text-danger">*</span>
                            </label>

                            <select id="situation_familiale" v-model="formData.situation_familiale" class="form-select"
                                required>
                                <option value="-">Selectionner la situation qui vous convienne</option>
                                <option value="Celibataire">Celibataire</option>
                                <option value="Marié">Marié</option>
                            </select>
                        </div>
                    </div>

                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="children" class="form-label">Nombre d'enfants
                                <span class="text-danger">*</span>
                            </label>
                            <input id="children" v-model="formData.children" class="form-control"
                                placeholder="Entre le nombre d'enfants" type="number" tabindex="0" required />
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
                    <span v-else> Modifier</span>
                </button>
            </div>
        </form>

    </Modal>
</template>