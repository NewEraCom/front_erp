<script setup lang="ts">
import { ref, watch } from 'vue';
import { Modal } from '@/ui';
import { useSalesStore } from '@/store';
import { salesService } from '@/services';

import { useToast } from 'vue-toastification';
const toast = useToast();

const salesStore = useSalesStore();

const isLoading = ref(false);

const selectedItem = ref(salesStore.selectedItem);

watch(() => salesStore.selectedItem, () => {
    selectedItem.value = salesStore.selectedItem;
});

const formData = ref({
    id: '',
    qte: '',
});

const submit = async () => {
    isLoading.value = true;

    formData.value.id = selectedItem.value.id;

    await salesService.newSuivieProject(formData.value).then(() => {
        $('#suivieModal').modal('hide');
        isLoading.value = false;
        toast.success('Comsomation ajouté avec success');
    }).catch(() => {
        isLoading.value = false;
    }).finally(() => {
        isLoading.value = false;
    });
};

</script>
<template>
    <Modal id="suivieModal" title="Comsomation" size="modal-lg">
        <form @submit.prevent="submit">
            <div class="modal-body">
                <div class="row">
                    <div class="col-12">
                        <div class="repeater-wrapper pt-0 pt-md-4">
                            <div class="d-flex border rounded position-relative pe-0">
                                <div class="row w-100 p-3">
                                    <div class="col-md-8 col-12 mb-md-0 mb-3">
                                        <p class="mb-2 repeater-title">
                                            Article
                                        </p>
                                        <input class="form-control" type="text" :value="selectedItem?.designation"
                                            disabled />
                                    </div>
                                    <div class="col-md-4 col-12 pe-0">
                                        <p class="mb-2 repeater-title">Quantite</p>
                                        <input class="form-control" type="text" v-model="formData.qte" required />
                                        <small class="mt-2">Quantite restant : {{ selectedItem?.qte -
            selectedItem?.suivie }}</small>
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