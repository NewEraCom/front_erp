<script setup lang="ts">
import { ref } from 'vue';

const isLoading = ref(false);

const formData = ref({
    message: '',
    subject: ''
});

const handleLogout = async () => {

};

</script>

<template>
    <div id="contactSupport" class="modal fade" data-bs-backdrop="static" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title fw-bold">Contactez le support</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form @submit.prevent="handleLogout">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12">
                                <div class="mb-3">
                                    <label for="message" class="form-label">Sujet <span
                                            class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="subject" placeholder="Entrez le sujet"
                                        v-model="formData.subject" required>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="mb-3">
                                    <label for="message" class="form-label">Message <span
                                            class="text-danger">*</span></label>
                                    <textarea class="form-control" id="message" rows="5"
                                        placeholder="Entrez votre message" v-model="formData.message"
                                        required></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <div class="alert alert-warning" role="alert">
                                    <p class="mb-0">Votre demande sera traitée entre 24 et 72 heures, en cas d'urgence.
                                        l'équipe de support vous contactera</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn dismiss-close btn-label-outline-dark" data-bs-dismiss="modal">
                            Fermer
                        </button>
                        <button type="submit" class="btn btn-primary" :disabled="isLoading">
                            <span v-if="isLoading" class="d-flex align-items-center">
                                <div class="spinner-border spinner-border-sm text-white" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </span>
                            <span v-else>Envoyer</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style></style>
