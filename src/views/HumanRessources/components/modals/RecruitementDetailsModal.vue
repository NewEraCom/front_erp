<script setup lang="ts">
import { ref, watch } from 'vue';
import { Modal } from '@/ui';
import { useSharedStore } from '@/store';
import { helpers } from '@/utils';


const sharedStore = useSharedStore();

const formData = ref({
    user_id: '-',
    user: null,
    post: null,
    description: null,
    displome: null,
    experience: null,
    status: null,
});

watch(() => sharedStore.selectedItem, () => {
    if (sharedStore.selectedItem) {
        formData.value.user_id = sharedStore.selectedItem.user.id;
        formData.value.user = sharedStore.selectedItem.user.employee.first_name + ' ' + sharedStore.selectedItem.user.employee.last_name;
        formData.value.post = sharedStore.selectedItem.post_name;
        formData.value.description = sharedStore.selectedItem.description;
        formData.value.displome = sharedStore.selectedItem.diploma;
        formData.value.status = sharedStore.selectedItem.status;
        formData.value.experience = sharedStore.selectedItem.experience;
    }
});

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
    <Modal id="showRecruitement" title="Details de l'avance sur salaire" size="modal-md">
        <form @submit.prevent="submit" enctype="multipart/form-data">
            <div class="modal-body">
                <div class="row">
                    <div v-if="formData.user" class="col-sm-12">
                        <div class="mb-3">
                            <label for="avance" class="form-label">Employé <span class="text-danger">*</span></label>
                            <input class="form-control" type="text"  tabindex="0"
                                id="avance" v-model="formData.user" disabled>
                        </div>
                    </div>

                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="post" class="form-label">Poste <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" type="text" 
                                tabindex="0" id="post" v-model="formData.post" disabled>
                        </div>
                    </div>

                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="description" class="form-label">Description <span
                                    class="text-danger">*</span></label>
                                <textarea name="" id="" cols="30" rows="10" class="form-control" v-model="formData.description" disabled></textarea>
                        </div>
                    </div>


                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="diplome" class="form-label">Diplome <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" type="text"  tabindex="0"
                                id="diplome" v-model="formData.displome" disabled>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="experience" class="form-label">Experience <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" type="text" tabindex="0"
                                id="experience" v-model="formData.experience" disabled>
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
                <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal" @click="rhStore.Item==null">
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
        </form>
    </Modal>
</template>