<script setup>
import { ref, onMounted, computed } from 'vue';
import {  useRhStore } from '@/store';
import {  Modal, CustomSelect } from '@/ui';
import {rhService,logisticsService} from '@/services';
const props = defineProps({
    id: String
});

// store
// const carHistoryStore = useCartHistoryStore();
const employeeStore = useRhStore();
// data

const message = ref(null);
const isLoading = ref(false);
const employees = ref(computed(() => employeeStore.employees));
//
onMounted(async () => {
    await rhService.getEmployees();
});
const formData = ref({
    id_vehicule: props.id,
    id_employee: '-',
    date_debut: '',
});
// submit function
const submit = async () => {
    try {
        isLoading.value = true;
        // eslint-disable-next-line camelcase
        formData.value.id_employee = formData.value.id_employee.key;
        console.log(formData.value);
        await logisticsService.affectVehicule(formData.value);
        isLoading.value = false;
        formData.value = {
            id_vehicule: props.id,
            id_employee: '-',
            date_debut: '',
        };
        $('#create-history-cars').modal('hide');
    } catch (e) {
        console.log(e);
    }
};
</script>
<template>
    <Modal id="create-history-cars" title="Nouvelle Sortie">
        <form class="needs-validation" @submit.prevent="submit">
            <div class="modal-body ">
                <div class="row">
                    <div v-if="employees != null" class="col-12">
                        <CustomSelect
                            v-model="formData.id_employee"
                            placeholder="Choisir un employee"
                            label="Employee"
                            :data="
                                employees.map((item) => ({
                                    key: item.id,
                                    value: item.first_name + ' ' + item.last_name
                                }))
                            "
                        />
                    </div>
                    <div class="col-6 mt-3">
                        <label for="nameEx" class="form-label">Date Sortie <span
                                    class="text-danger">*</span></label>
                        <input v-model="formData.date_debut" class="form-control" type="date"  required />
                    </div>
                
                </div>
            </div>
            <div class="modal-footer ">
                <div v-if="message != null" class="alert alert-danger" role="alert">
                    <span class="message-error"> {{ message }}</span>
                </div>
                <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                    Fermer
                </button>

                <button type="submit" :disabled="isLoading" class="btn btn-primary me-0">
                    <span v-if="isLoading" class="d-flex align-items-center">
                        <div class="spinner-border spinner-border-sm text-white" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </span>
                    <span v-else> Enregister</span>
                </button>
            </div>
        </form>
    </Modal>
</template>
<style></style>
