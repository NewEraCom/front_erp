<script setup lang="ts">
import { ref } from 'vue';
import { Modal } from '@/ui'
import { sharedService } from '@/services';
import { useToast } from 'vue-toastification';

const toast = useToast();

const isLoading = ref(false);

const props = defineProps({
    type: {
        type: String,
        default: 'add',
    },
});

const formData = ref({
    raison_social: '',
    adresse: '',
    email: '',
    ville: '',
    phone_no_1: '',
    num_rc: '',
    num_ice: '',
    m_paiment: '-',
    d_paiment: '',
    commercial_name: '',
    commercial_phone: '',
    type: props.type,
});

const onSubmit = async () => {

    await sharedService.createTier(formData.value).then(() => {
        $('#addFournisseur').modal('hide');
        toast.success('Fournisseur ajouté avec succès');
    }).catch((error) => {
        console.log(error);
        toast.error(error);
    }).finally(() => {
        isLoading.value = false;
    });
};

</script>

<template>
    <Modal id="addFournisseur" title="Nouveau Fournisseur" size="modal-lg">
        <form @submit.prevent="onSubmit">
            <div class="modal-body">
                <div class="row">
                    <div class="col-12 mb-3">
                        <label for="raison_social" class="mb-2">Raison sociale <span
                                class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="raison_social" v-model="formData.raison_social"
                            placeholder="Entre le nom de la société" required />
                    </div>
                    <div class="col-4 mb-3">
                        <label for="city" class="mb-2">Ville <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="city" v-model="formData.ville"
                            placeholder="Entrez la ville" required />
                    </div>
                    <div class="col-8 mb-3">
                        <label for="adresse" class="mb-2">Adresse <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="adresse" v-model="formData.adresse"
                            placeholder="Entrez l'adresse" required />
                    </div>
                    <div class="col-6 mb-3">
                        <label for="email" class="mb-2">Adresse e-mail <span class="text-danger">*</span></label>
                        <input type="email" class="form-control" id="email" v-model="formData.email"
                            placeholder="Entrez l'adresse e-mail" required />
                    </div>
                    <div class="col-6 mb-3">
                        <label for="phone_no" class="mb-2">Numéro de téléphone <span
                                class="text-danger">*</span></label>
                        <input type="number" class="form-control" id="phone_no" v-model="formData.phone_no_1"
                            placeholder="Entrez le numéro de téléphone" required />
                    </div>
                    <div class="col-6 mb-3">
                        <label for="num_rc" class="mb-2">Numéro de RC <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="num_rc" v-model="formData.num_rc"
                            placeholder="Entrez le numéro de RC" required />
                    </div>
                    <div class="col-6 mb-3">
                        <label for="num_ice" class="mb-2">Numéro de ICE <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="num_ice" v-model="formData.num_ice"
                            placeholder="Entrez le numéro de ICE" required />
                    </div>
                    <div class="col-6 mb-3">
                        <label for="mode_paiement" class="mb-2">Mode de paiement <span
                                class="text-danger">*</span></label>
                        <select class="form-select" aria-label="Default select example" v-model="formData.m_paiment"
                            required>
                            <option value="-">Selectionner le mode de paiement</option>
                            <option value="cheque">Chèque</option>
                            <option value="virement">Virement</option>
                            <option value="espece">Espèce</option>
                        </select>
                    </div>
                    <div class="col-6 mb-3">
                        <label for="d_paiement" class="mb-2">Délai de paiement <span
                                class="text-danger">*</span></label>
                        <input type="number" class="form-control" id="d_paiement" v-model="formData.d_paiment"
                            placeholder="Entrez le délai de paiement" required />
                    </div>
                    <div class="col-6 mb-3">
                        <label for="commerical_name" class="mb-2">Nom commercial <span
                                class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="commerical_name" v-model="formData.commercial_name"
                            placeholder="Entrez le nom commercial" required />
                    </div>
                    <div class="col-6 mb-3">
                        <label for="commercial_phone" class="mb-2">Numéro de téléphone de commercial <span
                                class="text-danger">*</span></label>
                        <input type="number" class="form-control" id="commercial_phone"
                            v-model="formData.commercial_phone"
                            placeholder="Entrez le numéro de téléphone de commercial" required />
                    </div>
                    <div class="col-12 mb-3">
                        <label for="attestation" class="mb-2">Fichier à télécharger <span
                                class="text-danger">*</span></label>
                        <input type="file" class="form-control" id="attestation" ref="formData.commercial_phone"
                            placeholder="Entrez le délai de paiement" required />
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