<script setup lang="ts">
import { ref } from 'vue';
import { Modal } from '@/ui';
import { rhService } from '@/services';

const isLoading = ref(false);

const formData = ref({
    mois: '-',
    year: '-',
    file: null,

});

const submit = async () => {
    console.log('submit');
    isLoading.value = true;
    if (formData.value.mois === '-' || formData.value.year === '-' || formData.value.file === null) {
        isLoading.value = false;
        return;
    }
    await rhService.addPayImport(formData.value).then(() => {
        console.log('Employee added');
        $('#addPaie').modal('hide');
    }).catch((error) => {
        console.error('Error during action execution', error);
    }).finally(() => {
        isLoading.value = false;
    });
};

const handleFileChange = (e) => {
    formData.value.file = e.target.files[0];
};

const year = ref(new Date().getFullYear());

</script>
<template>
    <Modal id="addPaie" title="Ajouter une paie" size="modal-md">
        <form @submit.prevent="submit" enctype="multipart/form-data">
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-7">
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
                    <div class="col-sm-5">
                        <div class="mb-3">
                            <label for="year" class="form-label">Année <span class="text-danger">*</span></label>
                            <select id="year" class="form-select" required v-model="formData.year">
                                <option value="-">Choisir une année</option>
                                <option v-for="(item, index) in 10" :key="index" :value="year + index">{{ year + index }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <!-- <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="total_salary" class="form-label">Mass salarial <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" type="number" placeholder="Entrez le total des salaires"
                                tabindex="0" id="total_salary" v-model="formData.total_salary" required>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="total_prime" class="form-label">Total prime <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" type="number" placeholder="Entrez le total des primes" tabindex="0"
                                id="total_prime" v-model="formData.total_prime" required>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="total_employee" class="form-label">Total employee <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" type="number" placeholder="Entrez le total des employees"
                                id="total_employee" v-model="formData.total_employee" required>
                        </div>
                    </div> -->

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