<script setup>
import { ref, onMounted } from 'vue';
import{pmService} from '@/services';

const props = defineProps({
    id: {
        type: Number,
        required: true
    },   
});


const nomberDocs = ref(null);
const isLoading = ref(false);

const submit = async () => {
    const formData = new FormData();
    
    formData.append('id', props.id);
    formData.append('doc_id', $('#docID').val());
    formData.append('number_file', nomberDocs.value);

    await pmService.setFiles(formData).then(() => {
        isLoading.value = false;
        nomberDocs.value = '';
        $('#set-number_file').modal('hide');
    });
};
</script>

<template>
    <form @submit.prevent="submit">
        <div class="modal-body ">
            <div class="mb-3">
                <input id="docID" type="text" hidden />
                <label for="numberDoc" class="form-label">
                    Nombre de documents<span class="text-danger font-18">*</span>
                </label>
                <input id="numberDoc" v-model="nomberDocs" class="form-control"
                    placeholder="Entre le nomber de documents" type="number" tabindex="0" required />
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
