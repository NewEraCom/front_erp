<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

const props = defineProps({
    title: String,
    text: String,
    textButton: String,
    action: Function,
    message: String
});

const isLoading = ref(false);

const handleSubmit = async () => {

    if (typeof props.action === 'function') {
        isLoading.value = true; // Start loading

        try {

            await props.action().then(() => {
                console.log('Deleted');
                $('#deleteModal').modal('hide');
                toast.success(props.message);
            });
        } catch (error) {
            console.error('Error during action execution', error);
            toast.error('Une erreur est survenue');
        } finally {
            isLoading.value = false; // End loading
        }
    } else {
        console.error('The action prop is not a function');
        toast.error('Une erreur est survenue');
    }
}
    ;
</script>

<template>
    <div id="deleteModal" class="modal fade" data-bs-backdrop="static" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title fw-bold">{{ title }}</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form @submit.prevent="handleSubmit">
                    <div class="modal-body">
                        <input id="deleteId" hidden />
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
