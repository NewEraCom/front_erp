<script setup>
import { ref } from 'vue';
import {pmService} from '@/services';
import { usePMStore } from '@/store';


const pmStore = usePMStore();
const isLoading = ref(false);

const submit = async () => {
    isLoading.value = true;
    await pmService.remove(pmStore.selectedItem.id)
        .then(() => {
            isLoading.value = false;
            $('#deleteInput').val('');
            $('#delete-chiffrage').modal('hide');
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
            <p>Êtes-vous sûr de vouloir supprimer cet article ?</p>
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
