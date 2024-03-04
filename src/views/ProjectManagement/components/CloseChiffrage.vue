<script setup>
import { ref } from 'vue';
import {PMService} from '@/services';

const props = defineProps({
    id: {
        type: Number,
        required: true
    }
});
const isLoading = ref(false);

const submit = async () => {
    isLoading.value = true;
    await PMService.markChiffrageDone(props.id)
        .then(() => {
            isLoading.value = false;
            $('#close-chiffrage').modal('hide');
        })
        .catch((error) => {
            console.log(error);
        });
};
</script>
<template>
    <form @submit.prevent="submit">
        <div class="modal-body ">
            <input id="deleteInput" type="text" hidden />
            <p>Etes-vous sûr de vouloir faire comme terminé ?</p>
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
                <span v-else>Oui, Marque comme terminé</span>
            </button>
        </div>
    </form>
</template>
