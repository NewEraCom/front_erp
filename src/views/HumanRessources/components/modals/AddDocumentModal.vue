<script setup lang="ts">
import { ref } from 'vue';
import { Modal } from '@/ui';
import { rhService } from '@/services';

const props = defineProps({
    id: {
        type: String,
        required: true,
    }
});
const isLoading = ref(false);

const formData = ref({
    employee_id: 0,
    attachement: null,
    title: '-',
    otherTitle: '',

});
const handleFileChange = (e, type) => {
    formData.value[type] = e.target.files[0];
};

const submit = async () => {
    if (formData.value.title === 'Autre') {
        formData.value.title = formData.value.otherTitle;
    }
    console.log(formData.value);
    isLoading.value = true;
    await rhService.UploadDocEmployee(props.id,formData.value).then(() => {
        $('#upload-documents').modal('hide');
    }).catch((error) => {
        console.error('Error during action execution', error);
    }).finally(() => {
        isLoading.value = false;
    });
};
</script>
<template>
    <Modal id="upload-documents" title="Ajouter un document" size="modal-md">
        <form @submit.prevent="submit" enctype="multipart/form-data">
            <div class="modal-body">
                <div class="row">
                    

                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Type de document <span
                                    class="text-danger">*</span></label>
                            <select name="" id="" class="form-select" required v-model="formData.title">
                                <option value="-">Choisir un type</option>
                                <option value="Attestation de travail">Attestation de travail</option>
                                <option value="Attestation de stage">Attestation de stage</option>
                                <option value="Attestation de salaire">Attestation de salaire</option>
                                <option value="Attestation de congé">Attestation de congé</option>
                                <option value="Solde de tout compte">Solde de tout compte</option>
                                <option value="Autre">Autre</option>
                            </select>
                        </div>
                    </div>
                    <div v-if="formData.title === 'Autre'" class="col-sm-12">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Titre de document <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" placeholder="Entrez le titre de l'attestation" tabindex="0"
                                id="nameEx" v-model="formData.otherTitle" required>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="copie_rib" class="form-label">Copie CNSS
                                <span class="text-danger">*</span>
                            </label>
                            <input id="copie_rib" ref="copie_cnss" class="form-control" placeholder="Choisir le fichier"
                                type="file" tabindex="0" name="copie_cnss" required
                                @change="e => handleFileChange(e, 'attachement')" />
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