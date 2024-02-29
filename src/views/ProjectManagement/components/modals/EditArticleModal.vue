<script setup lang="ts">
import { ref, watch } from 'vue';
import { Modal } from '@/ui';

const props = defineProps({
    selectedArticle: {
        type: Object,
        required: true,
    },
});

const isLoading = ref(false);

const formData = ref({
    article: props.selectedArticle?.article,
    unite: props.selectedArticle?.unite,
});

const submit = () => {
    isLoading.value = true;
    console.log(props.id);
    setTimeout(() => {
        isLoading.value = false;
    }, 2000);
};

watch(() => props.selectedArticle, (newVal) => {
    formData.value.article = newVal.article;
    formData.value.unite = newVal.unite;
});

</script>
<template>
    <Modal id="editArticle" title="Modifier Article" size="modal-lg">
        <form @submit.prevent="submit">
            <div class="modal-body">
                <div class="row">
                    <div class="col-12">
                        <div class="repeater-wrapper pt-0 pt-md-4">
                            <div class="d-flex border rounded position-relative pe-0">
                                <div class="row w-100 p-3">
                                    <div class="col-md-8 col-12 mb-md-0 mb-3">
                                        <p class="mb-2 repeater-title">
                                            Service
                                        </p>
                                        <input class="form-control" type="text" v-model="formData.article" />
                                    </div>
                                    <div class="col-md-4 col-12 pe-0">
                                        <p class="mb-2 repeater-title">Unite</p>
                                        <p class="mb-0" v-html="formData.unite ? formData.unite : '-'"></p>
                                    </div>
                                </div>
                            </div>
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
                    <span v-else> Terminer</span>
                </button>
            </div>
        </form>
    </Modal>
</template>