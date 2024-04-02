<script setup lang="ts">
import { ref } from 'vue';
import { Modal } from '@/ui';
import { logisticsService } from '@/services';
import { useToast } from 'vue-toastification';

const toast = useToast();

const isLoading = ref(false);

const formData = ref({
    designation: '',
    montant: 0,
    recepteur: '',
    type: '-',
    date: '',
    mode_paiement: '-',
    adresse: '',
});

const onSubmit = async () => {
    isLoading.value = true;
    await logisticsService.createLouer(formData.value).then(() => {
        $('#newLouer').modal('hide');
        toast.success('Louer ajouté avec succès');
    }).catch((error) => {
        console.log(error);
        toast.error('Erreur lors de l\'ajout');
    }).finally(() => {
        isLoading.value = false;
    });
};


</script>

<template>
    <Modal id="newLouer" title="Nouvelle Louer" size="modal-md">
        <form @submit.prevent="onSubmit">
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12 mb-3">
                        <label for="designation" class="mb-2">Désignation <span class="text-danger">*</span> </label>
                        <input type="text" v-model="formData.designation" class="form-control"
                            placeholder="Entrer la désignation" required />
                    </div>
                    <div class="col-md-12 mb-3">
                        <label for="montant" class="mb-2">Montant <span class="text-danger">*</span> </label>
                        <input type="number" v-model="formData.price" class="form-control"
                            placeholder="Entrer le montant" required />
                    </div>
                    <div class="col-md-12 mb-3">
                        <label for="recepteur" class="mb-2">Récepteur <span class="text-danger">*</span></label>
                        <input type="text" v-model="formData.recepteur" class="form-control"
                            placeholder="Entrer le récepteur" required />
                    </div>
                    <div class="col-md-12 mb-3">
                        <label for="type" class="mb-2">Type <span class="text-danger">*</span></label>
                        <select name="type" id="type" class="form-select" v-model="formData.type" required>
                            <option value="-">Sélectionner le type</option>
                            <option value="Appartement">Appartement</option>
                            <option value="Villa">Villa</option>
                            <option value="Magasin">Magasin</option>
                            <option value="required">Dépôt</option>
                            <option value="autre">Autre</option>
                        </select>
                    </div>
                    <div class="col-md-12 mb-3">
                        <label for="date_payment" class="mb-2">Date de paiement <span
                                class="text-danger">*</span></label>
                        <input type="date" v-model="formData.date" class="form-control" />
                    </div>
                    <div class="col-md-12 mb-3">
                        <label for="mode_payment" class="mb-2">Mode de paiement <span
                                class="text-danger">*</span></label>
                        <select name="mode_payment" id="mode_payment" class="form-select"
                            v-model="formData.mode_paiement">
                            <option value="-">Sélectionner le mode de paiement</option>
                            <option value="cash">Cash</option>
                            <option value="cheque">Chèque</option>
                            <option value="virement">Virement</option>
                        </select>
                    </div>
                    <div class="col-md-12 mb-3">
                        <label for="adresse" class="mb-2">Adresse</label>
                        <input type="text" v-model="formData.adresse" class="form-control"
                            placeholder="Entrer l'adresse" />
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
