<script setup>
import { ref } from 'vue';
import { pmService } from '@/services';


const isLoading = ref(false);
const motif = ref('');

const submit = async () => {
    isLoading.value = true;

    const formData = new FormData();
    formData.append('motif', motif.value);
    formData.append('id', props.id);

    await pmService.cancel(formData)
        .then(() => {
            isLoading.value = false;
            $('#cancel-submission').modal('hide');
        })
        .catch(() => {
            console.log('error');
        });
};
</script>

<template>
    <form @submit.prevent="submit">
        <div class="modal-body ">
            <p>Etes-vous sûr de vouloir annuler la soumission pour cet avant-projet ?</p>
            <textarea v-model="motif" class="form-control" rows="3" placeholder="Motif de l'annulation"></textarea>
        </div>
        <div class="modal-footer  mt-2">
            <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                Fermer
            </button>
            <button type="submit" class="btn btn-primary " :disabled="isLoading">
                <span v-if="isLoading" class="d-flex align-items-center">
                    <div class="spinner-border spinner-border-sm text-white me-2" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </span>
                <span v-else>Oui, Annuler</span>
            </button>
        </div>
    </form>
</template>
