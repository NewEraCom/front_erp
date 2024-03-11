<script setup>
import { ref } from 'vue';
import { Modal } from '@/ui';

const isLoading = ref(false);

defineProps({
    type: {
        type: String,
        default: 'validate'
    },
    title: {
        type: String,
        default: 'Valider l\'article hors bordereau'
    },
    message: {
        type: String,
        default: 'Êtes-vous sûr de valider cet Article ?'
    },
    buttonText: {
        type: String,
        default: 'Oui, Valider'
    },
    id: {
        type: String,
        default: 'validateArticle'
    }
});

const submit = async () => {
    isLoading.value = true;
};
</script>

<template>
    <Modal :id="id" :title="title">
        <form @submit.prevent="submit">
            <div class="modal-body">
                <p>{{ message }}</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                    Fermer
                </button>
                <button type="submit" class="btn me-0" :class="type === 'validate' ? 'btn-success' : 'btn-danger'"
                    :disabled="isLoading">
                    <span v-if="isLoading" class="d-flex align-items-center">
                        <div class="spinner-border spinner-border-sm text-white" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </span>
                    <span v-else>{{ buttonText }}</span>
                </button>
            </div>
        </form>
    </Modal>
</template>

<style></style>
