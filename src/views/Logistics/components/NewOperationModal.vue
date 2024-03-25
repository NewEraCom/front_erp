<script setup lang="ts">
import { ref } from 'vue';
import { logisticsService } from '@/services';
import { Modal } from '@/ui';
import { useToast } from 'vue-toastification';
const toast = useToast();

const isLoading = ref(false);

const formData = ref({
    emetteur: null,
    montant: null,
    operation: 'entree',
    type: 'cash',
    remark: null,
    date_operation: Date(),
});

const submit = async () => {
    isLoading.value = true;
    await logisticsService.newCaisseOperation(formData.value, 'caisse').then(() => {
        isLoading.value = false;
        $('#newOperation').modal('hide');
        toast.success('Opération ajoutée avec succès');
    }).catch(() => {
        isLoading.value = false;
    });

};
</script>

<template>
    <Modal id="newOperation" title="Nouvelle opération" size="lg">
        <form @submit.prevent="submit">
            <div class="modal-body">
                <div class="row">
                    <div class="col-12 mb-3">
                        <label for="user" class="mb-2">Emetteur <span class="text-danger">*</span></label>
                        <input type="text" id="user" class="form-control" v-model="formData.emetteur"
                            placeholder="Entrer le nom de l'emetteur" required />
                    </div>
                    <div class="col-12 mb-3">
                        <label for="montant" class="mb-2">Montant <span class="text-danger">*</span></label>
                        <input type="number" id="montant" class="form-control" v-model="formData.montant"
                            placeholder="Entrer le montant reçu" required />
                    </div>
                    <div class="col-12 mb-3">
                        <label for="description" class="mb-2">Description <span class="text-danger">*</span></label>
                        <textarea name="description" id="description" v-model="formData.remark" class="form-control"
                            placeholder="Entrer une note"></textarea>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">Fermer</button>
                <button type="submit" class="btn btn-primary" :disabled="isLoading">
                    <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status"
                        aria-hidden="true"></span>
                    <span v-else>Ajouter</span>
                </button>
            </div>
        </form>
    </Modal>
</template>