<script setup>
import { ref } from 'vue';
import {pmService} from '@/services';
const props = defineProps({
    id: {
        type: Number,
        required: true
    }
});

const isLoading = ref(false);
const comment = ref(null);

const submit = async () => {
    isLoading.value = true;
    const formData = new FormData();
    formData.append('id', props.id);
    formData.append('remarque', comment.value);
    await pmService.refuser(formData)
        .then(() => {
            isLoading.value = false;
            $('#refuse-project').modal('hide');
        })
        .catch(() => {
            console.log('error');
        });
};
</script>

<template>
    <form @submit.prevent="submit">
        <div class="modal-body ">
            <p>Etes-vous sûr de vouloir Refuser cet avant-projet?</p>
            <div class="row">
                <div class="col-sm-12">
                    <div class="mb-3">
                        <label id="remaqure" class="form-label">Remarque</label>
                        <textarea id="remaqure" v-model="comment" class="form-control" rows="3"></textarea>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer ">
            <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                Fermer
            </button>
            <button type="submit" class="btn btn-primary" :disabled="isLoading">
                <span v-if="isLoading" class="d-flex align-items-center">
                    <div class="spinner-border spinner-border-sm text-white me-2" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </span>
                <span v-else>Oui, Refuser</span>
            </button>
        </div>
    </form>
</template>
