<script setup>
import { ref } from 'vue';
import {PMService} from '@/services';

const props = defineProps({
    id: {
        type: Number,
        required: true
    }
});

const client = ref('');
const montant = ref('');
const commentaire = ref('');

const isLoading = ref(false);

const method = async () => {
    isLoading.value = true;
    const formData = {
        id: props.id,
        client: client.value,
        montantMarche: montant.value,
        comment: commentaire.value
    };
    await PMService.clotureLostProject(formData)
        .then((result) => {
            isLoading.value = false;
            if (result === 200) {
                $('#close').modal('hide');
            }
        })
        .catch((err) => {
            isLoading.value = false;
        });
};
</script>
<template>
    <form @submit.prevent="method">
        <div class="modal-body ">
            <div class="col-sm-12">
                <div class="mb-3">
                    <label id="client" class="form-label mb-2">
                        Client <span class="text-danger">*</span>
                    </label>
                    <input
                        id="client"
                        v-model="client"
                        class="form-control"
                        placeholder="Entrez le client"
                        type="text"
                        tabindex="0"
                        autofocus
                        required
                    />
                </div>
                <div class="mb-3">
                    <label id="montant" class="form-label mb-2">
                        Montant de marche <span class="text-danger">*</span>
                    </label>
                    <input
                        id="montant"
                        v-model="montant"
                        class="form-control"
                        placeholder="Entrez le montant de marche"
                        type="number"
                        tabindex="0"
                        required
                    />
                </div>
                <div class="mb-3">
                    <label for="commentaire" class="form-label mb-2">Commentaire</label>
                    <textarea
                        id="commentaire"
                        v-model="commentaire"
                        class="form-control"
                        rows="3"
                    ></textarea>
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
                <span v-else>Oui, Terminer</span>
            </button>
        </div>
    </form>
</template>
