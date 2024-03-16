<script setup lang="ts">
import { ref } from 'vue';
import { Modal, CustomSelect } from '@/ui';
import { rhService } from '@/services';
import { useToast } from 'vue-toastification';

const toast = useToast();


defineProps({
    employees: {
        type: Object,
        default: () => ({})
    }
});
const isLoading = ref(false);

const formData = ref({
    employee_id: '-',
    otherTitle: null,
    description: null,
    title: '-',

});

const submit = async () => {

    formData.value.employee_id = formData.value.employee_id.key;
    console.log(formData.value);
    isLoading.value = true;
    await rhService.addDemandeRh(formData.value).then(() => {
        $('#addDemandeRh').modal('hide');
        toast.success('Demande ajoutée avec succès');
    }).catch((error) => {
        console.error('Error during action execution', error);
        toast.error('Une erreur est survenue');
    }).finally(() => {
        isLoading.value = false;
    });
};
</script>
<template>
    <Modal id="addDemandeRh" title="Ajouter une demande RH" size="modal-md">
        <form @submit.prevent="submit" enctype="multipart/form-data">
            <div class="modal-body">
                <div class="row">
                    <div v-if="employees != null" class="col-12 mb-3">
                        <CustomSelect v-model="formData.employee_id" placeholder="Choisir un employee" label="Employee"
                            :data="employees.filter(item => item.status == 1).map((item) => ({
            key: item.id,
            value: item.first_name + ' ' + item.last_name
        }))
            " />
                    </div>

                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Type d'attestation <span
                                    class="text-danger">*</span></label>
                            <select name="" id="" class="form-select" required v-model="formData.title">
                                <option value="-">Choisir un type</option>
                                <option value="Attestation de travail">Attestation de travail</option>
                                <option value="Attestation de stage">Attestation de stage</option>
                                <option value="Attestation de salaire">Attestation de salaire</option>
                                <option value="Attestation de congé">Attestation de congé</option>
                                <option value="Solde de tout compte">Solde de tout compte</option>
                                <option value="Autre">Autre</option>
                            </select>
                        </div>
                    </div>
                    <div v-if="formData.title === 'Autre'" class="col-sm-12">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Titre d'attestation <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" placeholder="Entrez le titre de l'attestation" tabindex="0"
                                id="nameEx" v-model="formData.otherTitle" required>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="assurance" class="form-label">Description <span
                                    class="text-danger">*</span></label>
                            <textarea class="form-control" placeholder="Entrez la description du poste" tabindex="0"
                                id="assurance" v-model="formData.description" required></textarea>
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