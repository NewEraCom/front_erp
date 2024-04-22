<script setup>
import { ref } from 'vue';
// import { importFromFile } from '@/services/PreProjectService';
import {pmService} from '@/services';

const fileInput = ref();

const isLoading = ref(false);

const submit = async () => {
    const formData = new FormData();
    formData.append('file', fileInput.value.files[0]);
    formData.append('created_by', JSON.parse(localStorage.getItem('user')).id);
    isLoading.value = true;
    await pmService.importFromFile(formData)
        .then((res) => {
            if (res == 200) {
                isLoading.value = false;
                $('#import-avantprojet').modal('hide');
            } else {
                console.log('Error : ' + res);
                isLoading.value = false;
                $('#import-avantprojet').modal('hide');
            }
        })
        .catch(() => {
            isLoading.value = false;
        });
};
</script>
<template>
    <form enctype="multipart/form-data" @submit.prevent="submit">
        <div class="modal-body  pe-2">
            <div class="row">
                <div class="col-12">
                    <small class="text-danger mb-0">
                        1: * Vous devez respecter le modèle ci-dessous.
                    </small>
                    <br />
                    <small class="text-danger mb-0">
                        2: * Utilisez cette option uniquement pour le projet simple.
                    </small>
                </div>
                <div class="col-sm-12">
                    <div class="mb-3">
                        <label for="nameEx" class="form-label mb-2"></label>
                        <input
                            id="formFile"
                            ref="fileInput"
                            class="form-control"
                            type="file"
                            accept=".xlsx"
                            required
                        />
                    </div>
                    <div class="col-sm-12">
                        <a href="/src/assets/Avant_Projet_template.xlsx">
                            <i class="ti ti-file-spreadsheet"></i> Télécharger le modèle
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer ">
            <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                Fermer
            </button>
            <button type="submit" :disabled="isLoading" class="btn btn-primary">
                <span v-if="isLoading" class="d-flex align-items-center">
                    <div class="spinner-border spinner-border-sm text-white me-2" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </span>
                <span v-else> Importer</span>
            </button>
        </div>
    </form>
</template>
<style></style>