<script setup lang="ts">
import { ref, watch } from 'vue';
import { Modal } from '@/ui';
import { useRhStore } from '@/store';
import { helpers } from '@/utils';
import { rhService } from '@/services';

const rhStore = useRhStore();

const isLoading = ref(false);

const formData = ref({
    employee_id: '-',
    employee: null,
    avance: null,
    deduction: null,
    date_start: null,
    status: null,
    approval_rh: null,
});

watch(() => rhStore.salaryAdvanceSelected, () => {
    if (rhStore.salaryAdvanceSelected) {
        formData.value.employee_id = rhStore.salaryAdvanceSelected.employe.id;
        formData.value.employee = rhStore.salaryAdvanceSelected.employe.first_name + ' ' + rhStore.salaryAdvanceSelected.employe.last_name;
        formData.value.avance = rhStore.salaryAdvanceSelected.avance;
        formData.value.deduction = rhStore.salaryAdvanceSelected.deduction;
        formData.value.date_start = rhStore.salaryAdvanceSelected.start_payment;
        formData.value.status = rhStore.salaryAdvanceSelected.status;
        formData.value.approval_rh = rhStore.salaryAdvanceSelected.approval_rh;
    }
});

const submit = async () => {
    isLoading.value = true;
    if (formData.value.employee_id === '-' || formData.value.employee === null || formData.value.avance === null || 
    formData.value.deduction === null || formData.value.date_start === null || formData.value.status === null || 
    formData.value.approval_rh === null ) {
        isLoading.value = false;
        return;
    }
    const data = { status: 1,};
    await rhService.validateAvavnce(rhStore.salaryAdvanceSelected.id,data).then(() => {
        console.log('Employee added');
        rhStore.salaryAdvanceSelected = null;
        $('#showSalaryAdvance').modal('hide');
    }).catch((error) => {
        console.error('Error during action execution', error);
    }).finally(() => {
        isLoading.value = false;
    });
};


</script>
<template>
    <Modal id="showSalaryAdvance" title="Details de l'avance sur salaire" size="modal-md">
        <form @submit.prevent="submit" enctype="multipart/form-data">
            <div class="modal-body">
                <div class="row">
                    <div v-if="formData.employee" class="col-sm-12">
                        <div class="mb-3">
                            <label for="avance" class="form-label">Employé <span class="text-danger">*</span></label>
                            <input class="form-control" type="text" placeholder="Entrez le total des salaires" tabindex="0"
                                id="avance" v-model="formData.employee" disabled>
                        </div>
                    </div>

                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="avance" class="form-label">Montant d'avance <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" type="number" placeholder="Entrez le total des salaires"
                                tabindex="0" id="avance" v-model="formData.avance" disabled>
                        </div>
                    </div>

                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="deduction" class="form-label">Payer chaque mois <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" type="number" placeholder="Entrez le total des salaires"
                                tabindex="0" id="deduction" v-model="formData.deduction" disabled>
                        </div>
                    </div>


                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="date_start" class="form-label">Date de début <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" type="date" placeholder="Entrez le total des salaires" tabindex="0"
                                id="date_start" v-model="formData.date_start" disabled>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="date_start" class="form-label">Status</label>
                            <span class="d-flex fw-bold align-items-center badge badge-pill" style=" height: 40px;"
                                :class="helpers.returnBadge(String(formData.status))[0]">
                                {{ helpers.returnBadge(String(formData.status))[1] }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                    Fermer
                </button>
                <button v-if="formData.approval_rh == '0'" type="submit" :disabled="isLoading" class="btn btn-success">
                    <span v-if="isLoading" class="d-flex align-items-center">
                        <div class="spinner-border spinner-border-sm text-white me-2" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        Chargement...
                    </span>
                    <span v-else> Valider </span>
                </button>
            </div>
        </form>
    </Modal>
</template>