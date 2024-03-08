<script setup lang="ts">
import { ref } from 'vue';
import { Modal } from '@/ui';
import { sharedService } from '@/services';
import { useToast } from 'vue-toastification';

const toast = useToast();


const isLoading = ref(false);

const formData = ref({
    post_name: null,
    description: null,
    diploma: '-',
    experience: '-',

});

const submit = async () => {
    isLoading.value = true;

    await sharedService.addNewRecruitment(formData.value).then(() => {
        isLoading.value = false;
        $('#addNewRecruitment').modal('hide');
        toast.success('Demande de recrutement ajoutée avec succès');
    });
};
</script>

<template>
    <Modal id="addNewRecruitment" title="Ajouter une demande de recrutement" size="modal-lg">
        <form @submit.prevent="submit" enctype="multipart/form-data">
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Poste <span class="text-danger">*</span></label>
                            <input class="form-control" placeholder="Entrez le nom du poste" type="text" tabindex="0"
                                id="nameEx" v-model="formData.post_name" required>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Diplome <span class="text-danger">*</span></label>
                            <select name="" id="" class="form-select" required v-model="formData.diploma">
                                <option value="-">Choisir un diplome</option>
                                <option value="Baccalauréat">Baccalauréat</option>
                                <option value="Baccalauréat + 2">Baccalauréat + 2</option>
                                <option value="Baccalauréat + 3">Baccalauréat + 3</option>
                                <option value="Baccalauréat + 4">Baccalauréat + 4</option>
                                <option value="Baccalauréat + 5">Baccalauréat + 5</option>
                                <option value="Ingénieur">Ingénieur</option>
                                <option value="Autre">Autre</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Expérience <span class="text-danger">*</span></label>
                            <select name="" id="" class="form-select" required v-model="formData.experience">
                                <option value="-">Choisir une expérience</option>
                                <option value="Moins de 1 an">Moins de 1 an</option>
                                <option value="1 à 3 ans">1 a 3 ans</option>
                                <option value="3 à 5 ans">3 a 5 ans</option>
                                <option value="5 à 10 ans">5 a 10 ans</option>
                            </select>
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