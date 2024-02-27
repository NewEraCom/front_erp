<script setup lang="ts">
import { ref } from 'vue';
import { Modal } from '@/ui';

const isLoading = ref(false);

const props = defineProps({
    id: {
        type: Object,
        required: true,
    },

});


const newSalary = ref(null);
const commentaire = ref(null);


const submit = () => {
    isLoading.value = true;
    console.log(props.id);
    setTimeout(() => {
        isLoading.value = false;
    }, 2000);
};



</script>

<template>
    <Modal id="augemntSalary" title="Augemtation de salaire" size="modal-md">
        <form @submit.prevent="submit">
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="newSalary" class="form-label">
                                Nouveau salaire
                                <span class="text-danger font-18">*</span>
                            </label>
                            <input id="newSalary" v-model="newSalary" class="form-control"
                                placeholder="Saisir le nouveau salaire" type="number" required />
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="newSalary" class="form-label">
                                Commentaire
                                <span class="text-danger font-18">*</span>
                            </label>
                            <textarea id="commentaire" v-model="commentaire" class="form-control"
                                placeholder="Saisir un commentaire" required></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                    Fermer
                </button>

                <button type="submit" :disabled="isLoading" class="btn btn-primary">
                    <span v-if="isLoading" class="d-flex align-items-center">
                        <div class="spinner-border spinner-border-sm text-white" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </span>
                    <span v-else> Modifier</span>
                </button>
            </div>
        </form>
    </Modal>
</template>