<script setup>
import { ref } from 'vue';
import { pmService } from '@/services';


</script>

<template>
    <form @submit.prevent="submit">
        <div class="modal-body ">
            <p>Etes-vous sûr de vouloir annuler la soumission pour cet avant-projet ?</p>
            <textarea v-model="motif" class="form-control" rows="3" placeholder="Motif de l'annulation"></textarea>
        </div>
        <div class="modal-footer m-0 p-0 mt-2">
            <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                Fermer
            </button>
            <button type="submit" class="btn btn-primary m-0" :disabled="isLoading">
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
