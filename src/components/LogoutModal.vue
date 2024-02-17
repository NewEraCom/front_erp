<script setup lang="ts">
import { ref } from 'vue';

const isLoading = ref(false);

const handleLogout = async () => {
    isLoading.value = true;   
};
</script>

<template>
    <div
        id="logout-modal"
        class="modal fade"
        data-bs-backdrop="static"
        tabindex="-1"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title fw-bold">Confirmer</h4>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <form @submit.prevent="handleLogout">
                    <div class="modal-body">
                        <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-label-outline-dark"
                            data-bs-dismiss="modal"
                        >
                            Fermer
                        </button>
                        <button type="submit" class="btn btn-danger" :disabled="isLoading">
                            <span v-if="isLoading" class="d-flex align-items-center">
                                <div
                                    class="spinner-border spinner-border-sm text-white"
                                    role="status"
                                >
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </span>
                            <span v-else>Oui, Déconnecter</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style></style>
