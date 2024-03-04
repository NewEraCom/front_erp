<script setup>
import { ref } from 'vue';
import {PMService} from '@/services';
const props = defineProps({
    id: {
        type: Number,
        required: true
    },
    lots: {
        type: Array,
        required: true
    }
});

const fileInput = ref();
const lot = ref('-');

const isLoading = ref(false);

const submit = async () => {
    if(props.lots.length != 0 && lot.value == '-') {
        alert('Veuillez choisir un lot');
        return;
    }
    isLoading.value = true;

    const formData = new FormData();
   
    formData.append('id', props.id);
    formData.append('created_by', JSON.parse(localStorage.getItem('user')).id);
    formData.append('file', fileInput.value.files[0]);

    if(props.lots.length != 0 && lot.value == '-') {
        formData.append('lot', lot.value);
    }

    await PMService.importBordereau(formData)
        .then(() => {
            isLoading.value = false;
            $('#import-bordereau').modal('hide');
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
                <div v-if="lots.length != 0" class="col-sm-12">
                    <div class="mb-3">
                        <label id="lots" class="form-label mb-2">Lot</label>
                        <select
                            id="lots"
                            v-model="lot"
                            class="form-select"
                            aria-label="Default select example"
                            required
                        >
                            <option value="-">Choisissez un lot</option>
                            <option v-for="item in lots" :key="item.id" :value="item.id">
                                {{ item.lot + ' - ' + item.localite }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="mb-3">
                        <label for="nameEx" class="form-label mb-2">Fichier</label>
                        <input id="formFile" ref="fileInput" class="form-control" type="file" />
                    </div>
                    <div class="col-sm-12">
                        <a href="/src/assets/Bordereau_template.xlsx">
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
