<script setup lang="ts">
import { ref, watch } from 'vue';
import { Modal } from '@/ui';
import { rhService } from '@/services';
import { useToast } from 'vue-toastification';

const toast = useToast();
const isLoading = ref(false);

const props = defineProps({
    id: {
        type: Object,
        required: true,
    },
    oldCnss: {
        type: Number,
        required: true,
    },

});


const formData = ref({
    cnss: props.oldCnss,
    copie_cnss: null,
});

const handleFileChange = (e, type) => {
    formData.value[type] = e.target.files[0];
};

const submit = async () => {
    isLoading.value = true;
    console.log(props.id);

    await rhService.EditCnssEmployee(props.id, formData.value).then(() => {
        $('#editInfoCnss').modal('hide');
        toast.success('Informations CNSS modifiées avec succès');
    }).catch((error) => {
        console.error('Error during action execution', error);
        toast.error('Une erreur est survenue');
    }).finally(() => {
        isLoading.value = false;
    });
};

watch(() => props.oldCnss, (value) => {
    formData.value.cnss = value;
});


</script>

<template>
    <Modal id="editInfoCnss" title="Modifier les informations CNSS" size="modal-md">
        <form @submit.prevent="submit">
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="newSalary" class="form-label">
                                Numéro CNSS
                                <span class="text-danger font-18">*</span>
                            </label>
                            <input id="newSalary" v-model="formData.cnss" class="form-control"
                                placeholder="Saisir le nouveau salaire" type="number" required />
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="copie_rib" class="form-label">Copie CNSS
                                <span class="text-danger">*</span>
                            </label>
                            <input id="copie_rib" ref="copie_cnss" class="form-control" placeholder="Choisir le fichier"
                                type="file" tabindex="0" name="copie_cnss" required
                                @change="e => handleFileChange(e, 'copie_cnss')" />
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
                    <span v-else> Modifier</span>
                </button>
            </div>
        </form>
    </Modal>
</template>