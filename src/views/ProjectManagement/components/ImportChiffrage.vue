<script setup>
import { ref } from 'vue';
import {pmService } from '@/services';

const props = defineProps({
    id: {
        type: Number,
        required: true
    }
});

const file = ref();

const isLoading = ref(false);

const submit = async () => {
    isLoading.value = true;

    const formData = new FormData();
    formData.append('id', props.id);
    formData.append('user_id',JSON.parse(localStorage.getItem('user')).id);
    formData.append('file', file.value.files[0]);

    await pmService.importChiffrage(formData).then(() => {
        isLoading.value = false;
        $('#import-chiffrage').modal('hide');
    })
    .catch((error) => {
            console.log(error);
            isLoading.value = false;
        });
};
</script>

<template>
    <form @submit.prevent="submit">
        <div class="modal-body ">
            <div class="row">
                <div class="col-sm-12">
                    <div class="mb-3">
                        <label for="nameEx" class="form-label mb-2">Fichier à importer</label>
                        <input id="formFile" ref="file" class="form-control" type="file" accept=".xlsx,.xls,.csv" />
                    </div>
                </div>
                <div class="col-sm-12">
                    <a href="/src/assets/Devis_template.xlsx"> <i class="ti ti-file-download me-2"></i>Télécharger le
                        modèle </a>
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
                <span v-else> Términer</span>
            </button>
        </div>
    </form>
</template>

<style></style>
