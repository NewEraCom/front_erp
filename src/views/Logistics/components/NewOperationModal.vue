<script setup lang="ts">
import { ref } from 'vue';
import { Modal } from '@/ui';


const isLoading = ref(false);
</script>

<template>
    <Modal id="newOperation" title="Nouvelle opération" size="lg">
        <form action="">
            <div class="modal-body">
                <div class="row">
                    <div class="col-12 mb-3">
                        <label for="user" class="mb-2">Emetteur <span class="text-danger">*</span></label>
                        <input type="text" id="user" class="form-control" placeholder="Entrer le nom de l'emetteur"
                            required />
                    </div>
                    <div class="col-12 mb-3">
                        <label for="montant" class="mb-2">Montant <span class="text-danger">*</span></label>
                        <input type="number" id="montant" class="form-control" placeholder="Entrer le montant reçu"
                            required />
                    </div>
                    <div class="col-12 mb-3">
                        <label for="description" class="mb-2">Description <span class="text-danger">*</span></label>
                        <textarea name="description" id="description" class="form-control"
                            placeholder="Entrer une note"></textarea>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">Fermer</button>
                <button type="submit" class="btn btn-primary" :disabled="isLoading">
                    <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span v-else>Ajouter</span>
                </button>
            </div>
        </form>
    </Modal>
</template>