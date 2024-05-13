<script setup lang="ts">
import { ref } from 'vue';
import { Modal } from '@/ui';
import { rhService } from '@/services';
import { useToast } from 'vue-toastification';

const toast = useToast();

const isLoading = ref(false);

const formData = ref({
    file: null,
});

const message = ref(null);

const handleFileChange = (e: any) => {
    formData.value.file = e.target.files[0];
};

const submit = async () => {
    isLoading.value = true;
    const fd = new FormData();
    fd.append('file', formData.value.file);

    try {
        await rhService.importLeave(fd).then((response) => {
            console.log(response);
            isLoading.value = false;
            $('#importLeave').modal('hide');
            toast.success('Conge importé avec succès');
            
        }).catch((error) => {
            console.log(error);
        });
    } catch (error) {
        isLoading.value = false;
        message.value = error.response.data.message;
        console.error('Error during action execution', error);
        toast.error('Erreur lors de l\'importation du conge');
    }

};



</script>
<template>
    <Modal id="importLeave" title="Importer la liste des conges" size="modal-md">
        <form @submit.prevent="submit" enctype="multipart/form-data">
            <div class="modal-body">
                <div class="row">
                    
                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label class="form-label">
                                Fichier a importer
                                <span class="text-danger font-18">*</span>
                            </label>
                            <input id="file" class="form-control" required @change="e => handleFileChange(e)"
                                placeholder="Entre le titre de document" type="file" tabindex="0" />
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <p class="text-danger">* Ne modifiez aucune information existante du fichier</p>
                        <p class="text-danger">* Les employees qui ont plusieus conges dupliquer leur ligne</p>
                    </div>
                    <div class="col-sm-12">
                        <a type="button" href="/src/assets/Leave_Import.xlsx"
                            class="bg-primary p-3 w-100 rounded text-white border-none">
                            <i class="ti ti-download me-2"></i>
                            Télécharger le modèle
                        </a>

                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div v-if="message != null" class="alert alert-danger" role="alert">
                    <span class="message-error"> {{ message }}</span>
                </div>
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