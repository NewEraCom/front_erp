<script setup lang="ts">
import { ref } from 'vue';
import { Modal } from '@/ui';
import { rhService } from '@/services';
import { useToast } from 'vue-toastification';

const toast = useToast();

const props = defineProps({
    id: {
        type: String,
        required: true,
    }
});
const isLoading = ref(false);

const formData = ref({
    date_depart: 0,
    attachement: null,
    commentaire: '',


});
const handleFileChange = (e, type) => {
    formData.value[type] = e.target.files[0];
};

const submit = async () => {

    console.log(formData.value);
    isLoading.value = true;
    await rhService.RuptureContractEmployee(props.id, formData.value).then(() => {
        $('#ruptureContrat').modal('hide');
        toast.success('Rupture de contrat effectuée avec succès');
    }).catch((error) => {
        console.error('Error during action execution', error);
        toast.error('Erreur lors de la rupture de contrat');
    }).finally(() => {
        isLoading.value = false;
    });
};
</script>
<template>
    <Modal id="ruptureContrat" title="Rupture de contrat" size="modal-md">
        <form @submit.prevent="submit" enctype="multipart/form-data">
            <div class="modal-body">
                <div class="row">

                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Date de depart <span
                                    class="text-danger">*</span></label>
                            <input type="date" class="form-control" v-model="formData.date_depart">
                        </div>
                    </div>

                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="copie_rib" class="form-label">Attachement
                                <span class="text-danger">*</span>
                            </label>
                            <input id="copie_rib" ref="copie_cnss" class="form-control" placeholder="Choisir le fichier"
                                type="file" tabindex="0" name="copie_cnss" required
                                @change="e => handleFileChange(e, 'attachement')" />
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Motif de depart <span
                                    class="text-danger">*</span></label>
                            <textarea class="form-control" id="" cols="30" rows="3"
                                v-model="formData.commentaire"></textarea>
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
                        <div class="spinner-border spinner-border-sm text-white me-2" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        Chargement...
                    </span>
                    <span v-else> Terminer</span>
                </button>
            </div>
        </form>

    </Modal>
</template>