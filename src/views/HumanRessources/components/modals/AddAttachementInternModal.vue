<script setup lang="ts">
import { ref } from 'vue';
import { Modal } from '@/ui';
import { rhService } from '@/services';
import { useToast } from 'vue-toastification';
import { useRhStore } from '@/store';

const toast = useToast();
const rhStore = useRhStore();

const props = defineProps({
    id: {
        type: Number,
        required: true,
    }
});
const isLoading = ref(false);

const formData = ref({
    attachement: null,
    file: null,
});
const handleFileChange = (e) => {
    formData.value.file = e.target.files[0];
};

const submit = async () => {
    formData.value.attachement = rhStore.attachement;
    console.log(formData.value);
    isLoading.value = true;
    await rhService.updateAttachement(props.id, formData.value).then(() => {
        $('#upload-attachement').modal('hide');
        toast.success('Document ajouté avec succès');
    }).catch((error) => {
        console.error('Error during action execution', error);
        toast.error('Erreur lors de l\'ajout du document');
    }).finally(() => {
        isLoading.value = false;
    });
    
};
</script>
<template>
    <Modal id="upload-attachement" title="Ajouter cet attachement" size="modal-md">
        <form @submit.prevent="submit" enctype="multipart/form-data">
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="copie_rib" class="form-label">Copie Attachement
                                <span class="text-danger">*</span>
                            </label>
                            <input id="copie_rib"  class="form-control" placeholder="Choisir le fichier"
                                type="file" tabindex="0"  required
                                @change="e => handleFileChange(e)" />
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