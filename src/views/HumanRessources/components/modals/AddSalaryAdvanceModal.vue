<script setup lang="ts">
import { ref } from 'vue';
import { Modal, CustomSelect } from '@/ui';

defineProps({
    employees: {
        type: Object,
        default: () => ({})
    }
});

const isLoading = ref(false);

const formData = ref({
    employee_id: '-',
    avance: null,
    deduction: null,
    date_start: null,
    date_end: null
});

const submit = async () => {
    console.log('submit');
};



</script>
<template>
    <Modal id="addSalaryAdvance" title="Ajouter une avance sur salaire" size="modal-md">
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
                            <label for="avance" class="form-label">Montant d'avance <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" type="number" placeholder="Entrez le total des salaires"
                                tabindex="0" id="avance" v-model="formData.avance" required>
                        </div>
                    </div>

                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="deduction" class="form-label">Payer chaque mois <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" type="number" placeholder="Entrez le total des salaires"
                                tabindex="0" id="deduction" v-model="formData.deduction" required>
                        </div>
                    </div>


                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="date_start" class="form-label">Date de début <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" type="number" placeholder="Entrez le total des salaires"
                                tabindex="0" id="date_start" v-model="formData.date_start" required>
                        </div>
                    </div>


                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="date_end" class="form-label">Date de fin <span class="text-danger">*</span></label>
                            <input class="form-control" type="number" placeholder="Entrez le total des salaires"
                                tabindex="0" id="date_end" v-model="formData.date_end" required>
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