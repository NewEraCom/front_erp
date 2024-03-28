<script setup lang="ts">
import { ref, watch } from 'vue';
import { Modal } from '@/ui';
import { useRhStore } from '@/store';
import { helpers, formater } from '@/utils';

const rhStore = useRhStore();


const formData = ref({
    employee_id: '-',
    employee: null,
    type: null,
    status: null,
    duree: null,
    date_start: null,
    date_end: null,
    attachement: null,
    created_at: null,
});

watch(() => rhStore.Item, () => {
    if (rhStore.Item) {
        formData.value.employee_id = rhStore.Item.employe.id;
        formData.value.employee = rhStore.Item.employe.first_name + ' ' + rhStore.Item.employe.last_name;
        formData.value.type = rhStore.Item.type;
        formData.value.status = rhStore.Item.status;
        formData.value.duree = rhStore.Item.duree;
        formData.value.status = rhStore.Item.status;
        formData.value.date_start = rhStore.Item.date_start;
        formData.value.date_end = rhStore.Item.date_end;
        formData.value.attachement = rhStore.Item.attachements;
        formData.value.created_at = rhStore.Item.created_at;
    }
});
const getFileUrl = (attachment) => {
    return helpers.baseUrl() + `uploads/employe/${attachment}`;
};

// const submit = async () => {
//     isLoading.value = true;
//     if (formData.value.employee_id === '-' || formData.value.employee === null || formData.value.avance === null || 
//     formData.value.deduction === null || formData.value.date_start === null || formData.value.status === null || 
//     formData.value.approval_rh === null ) {
//         isLoading.value = false;
//         return;
//     }
//     const data = { status: 1,};
//     await rhService.validateAvavnce(rhStore.salaryAdvanceSelected.id,data).then(() => {
//         console.log('Employee added');
//         rhStore.salaryAdvanceSelected = null;
//         $('#showSalaryAdvance').modal('hide');
//     }).catch((error) => {
//         console.error('Error during action execution', error);
//     }).finally(() => {
//         isLoading.value = false;
//     });
// };


</script>
<template>
    <Modal id="showLeave" title="Details de la demande de congé" size="modal-xl">
        <div class="modal-body">
            <div class="row">
                <div v-if="formData.employee" class="col-sm-12">
                    <div class="mb-3">
                        <label for="avance" class="form-label">Employé</label>
                        <input class="form-control" type="text" tabindex="0" id="avance" v-model="formData.employee"
                            disabled>
                    </div>
                </div>

                <div class="col-sm-6">
                    <div class="mb-3">
                        <label for="Type" class="form-label">Type</label>
                        <input class="form-control" type="text" tabindex="0" id="Type" v-model="formData.type" disabled>
                    </div>
                </div>

                <div class="col-sm-6">
                    <div class="mb-3">
                        <label for="deduction" class="form-label">Durée</label>
                        <input class="form-control" type="text" tabindex="0" id="Type" v-model="formData.duree"
                            disabled>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="mb-3">
                        <label for="deduction" class="form-label">Date debut</label>
                        <input class="form-control" type="date" tabindex="0" id="Type" v-model="formData.date_start"
                            disabled>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="mb-3">
                        <label for="deduction" class="form-label">Date fin</label>
                        <input class="form-control" type="date" tabindex="0" id="Type" v-model="formData.date_end"
                            disabled>
                    </div>
                </div>
                <div class="col-sm-12" v-if="formData.attachement">
                    <div class="mb-3">
                        <label for="deduction" class="form-label">Attachement</label>
                        <div class="card-body d-flex align-items-center">
                            <div class="bg-label-primary p-3 rounded">
                                <i class="ti ti-file-filled"></i>
                            </div>
                            <div class="ms-2">
                                <a :href="getFileUrl(formData.attachement)">
                                    <h6 class="mb-2">
                                        {{
                    formater.limitText(
                        formData.attachement,
                        55
                    )
                }}
                                    </h6>
                                </a>
                                <small class="mt-auto">Créé le
                                    {{
                        formater.date(
                            formData.created_at
                        )
                    }}</small>
                            </div>

                        </div>
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
            <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal"
                @click="rhStore.Item == null">
                Fermer
            </button>
            <!-- <button v-if="formData.approval_rh == '0'" type="submit" :disabled="isLoading" class="btn btn-success">
                    <span v-if="isLoading" class="d-flex align-items-center">
                        <div class="spinner-border spinner-border-sm text-white me-2" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        Chargement...
                    </span>
                    <span v-else> Valider </span>
                </button> -->
        </div>
    </Modal>
</template>