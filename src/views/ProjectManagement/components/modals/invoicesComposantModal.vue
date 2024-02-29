
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Modal } from '@/ui';

const props = defineProps({
    id: {
        type: Number,
        required: true
    }
});
let fields = ref([{ type: 'text', label: '', options: '' }]);

function addField() {
    fields.value.push({ type: 'text', label: '', options: '' });
}

onMounted(async () => {
});

const submit = async () => {


};
</script>
<template>
    <Modal id="invoicesComposant" title="Ajouter les composants de Facture" size="modal-lg">
        <form @submit.prevent="submit">
            <div class="modal-body">
                <div v-for=" (field, index) in fields" :key="index" class="row">
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Label</label>
                            <input v-model="field.label" type="text" placeholder="Type" class="form-control" />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Type</label>

                            <select v-model="field.type" class="form-select">
                                <option value="text">Text</option>
                                <option value="number">Number</option>
                                <option value="date">Date</option>
                                <option value="file">Fichier</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12 float-end">
                        <button type="button" class="btn btn-label-dark btn-sm" @click="addField">
                            <i class="ti ti-square-rounded-plus-filled me-2"></i>Plus de composants
                        </button>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                    Fermer
                </button>
                <button type="submit" :disabled="isLoading" class="btn btn-primary m-0">
                    <span v-if="isLoading" class="d-flex align-items-center">
                        <div class="spinner-border spinner-border-sm text-white me-2" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </span>
                    <span v-else> Terminer</span>
                </button>
            </div>
        </form>
    </Modal>
</template>
