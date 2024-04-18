<script setup lang="ts">
import { ref } from 'vue';
import { Modal } from '@/ui';
import { pmService } from '@/services';
import { usePMStore } from '@/store';
import { useToast } from 'vue-toastification';
const toast = useToast();

const pmStore = usePMStore();

const props = defineProps({
    project:{
        type: Number,
        required: true
    }
});
const isLoading = ref(false);

const formData = ref({
    mois: '-',
    project: props.project,
    pointage: null,

});


const submit = async () => {
    console.log('formData', formData.value);
    console.log('submit');
    isLoading.value = true;
    if (formData.value.mois === '-' || formData.value.project === null || formData.value.pointage === null) {
        isLoading.value = false;
        return;
    }
    await pmService.PointageEmployeeImport(formData.value).then(() => {
        console.log('Import Successful');
        toast.success('Import ajouté avec succès');
        $('#import-pointage').modal('hide');
    }).catch((error) => {
        console.error('Error during action execution', error);
    }).finally(() => {
        isLoading.value = false;
    });
};

const handleFileChange = (e) => {
    formData.value.pointage = e.target.files[0];
};


</script>
<template>
    <Modal id="import-pointage" title="Importer le pointages des employés" size="modal-md">
        <form @submit.prevent="submit" enctype="multipart/form-data">
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="month" class="form-label">Mois <span class="text-danger">*</span></label>
                            <select id="month" class="form-select" required v-model="formData.mois">
                                <option value="-">Choisir un mois</option>
                                <option value="Janvier">Janvier</option>
                                <option value="Février">Février</option>
                                <option value="Mars">Mars</option>
                                <option value="Avril">Avril</option>
                                <option value="Mai">Mai</option>
                                <option value="Juin">Juin</option>
                                <option value="Juillet">Juillet</option>
                                <option value="Août">Août</option>
                                <option value="Septembre">Septembre</option>
                                <option value="Octobre">Octobre</option>
                                <option value="Novembre">Novembre</option>
                                <option value="Décembre">Décembre</option>
                            </select>
                        </div>
                    </div>
                    

                    

                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="copie_paie" class="form-label">Copie de la paie <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" placeholder="" type="file" tabindex="0" id="copie_paie"
                                name="copie_paie" @change="handleFileChange" required />
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