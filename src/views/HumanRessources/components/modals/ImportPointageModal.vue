<script setup lang="ts">
import { ref } from 'vue';
import { Modal } from '@/ui';
import { rhService } from '@/services';
import { useToast } from 'vue-toastification';


const isLoading = ref(false);

const formData = ref({
    file: null,
    date: null
});

const message = ref(null);


const submit = async () => {


};

const downloadFile = async () => {
    try {
        const response = await rhService.downloadFile();
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'pointage.xlsx'); // Ensure the file name is correct
        document.body.appendChild(link);
        link.click();
    } catch (error) {
        isLoading.value = false;
        console.log(error);
    }
};

</script>
<template>
    <Modal id="importPointage" title="Importer un liste de pointage" size="modal-md">
        <form @submit.prevent="submit">
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label class="form-label">
                                Date de pointage
                                <span class="text-danger font-18">*</span>
                            </label>
                            <input id="date" v-model="formData.date" class="form-control"
                                placeholder="Entre le titre de document" type="date" tabindex="0" required />
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label class="form-label">
                                Fichier a importer
                                <span class="text-danger font-18">*</span>
                            </label>
                            <input id="file" :ref="formData.file" class="form-control"
                                placeholder="Entre le titre de document" type="file" tabindex="0" required />
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <p class="text-danger">* Ne modifiez aucune information existante du fichier</p>
                    </div>
                    <div class="col-sm-12">
                        <button type="button" @click="downloadFile" class="bg-primary p-3 w-100 rounded text-white">
                            <i class="ti ti-download me-2"></i>
                            Télécharger le modèle
                        </button>

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