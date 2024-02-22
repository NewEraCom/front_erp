<script setup lang="ts">
import { ref } from 'vue';

defineProps({
    id: String,
    title: String,
    text: String,
    textButton: String,
    action: Promise<void>
});

const isLoading = ref(false);

const handleSubmit = async () => {

};
</script>

<template>
    <div :id="id" class="modal fade" data-bs-backdrop="static" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title fw-bold">{{ title }}</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form @submit.prevent="handleSubmit">
                    <div class="modal-body">
                        <input id="deleteId" />
                        <p>{{ text }}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                            Fermer
                        </button>
                        <button type="submit" class="btn btn-danger" :disabled="isLoading">
                            <span v-if="isLoading" class="d-flex align-items-center">
                                <div class="spinner-border spinner-border-sm text-white" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </span>
                            <span v-else>{{ textButton }}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style></style>
