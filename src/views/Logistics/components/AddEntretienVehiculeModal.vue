<script setup>
import { ref, onMounted, computed } from 'vue';
import {  Modal } from '@/ui';
import {logisticsService} from '@/services';
const props = defineProps({
    id: String
});

// store
// const carHistoryStore = useCartHistoryStore();
// data

const message = ref(null);
const isLoading = ref(false);
//

const formData = ref({
    id_vehicule: props.id,
    service_date: '-',
    next_service: '',
    kilometrage: '',
});
// submit function
const submit = async () => {
    try {
        isLoading.value = true;
        // eslint-disable-next-line camelcase
        console.log(formData.value);
        await logisticsService.entretienVehicule(formData.value);
        isLoading.value = false;
        formData.value = {
            id_vehicule: props.id,
            service_date: '-',
            next_service: '',
            kilometrage: '',
        };
        $('#entretien-car').modal('hide');
    } catch (e) {
        console.log(e);
    }
};
</script>
<template>
    <Modal id="entretien-car" title="Nouveau Entretien">
        <form class="needs-validation" @submit.prevent="submit">
            <div class="modal-body ">
                <div class="row">
                    <div class="col-12 mt-3">
                        <label for="nameEx" class="form-label">Kilometrage <span
                                    class="text-danger">*</span></label>
                        <input v-model="formData.kilometrage" class="form-control" type="number"  required />
                    </div>
                
                </div>
                <div class="row">
                    <div class="col-12 mt-3">
                        <label for="nameEx" class="form-label">Date du service <span
                                    class="text-danger">*</span></label>
                        <input v-model="formData.service_date" class="form-control" type="date"  required />
                    </div>
                
                </div>
                <div class="row">
                    <div class="col-12 mt-3">
                        <label for="nameEx" class="form-label">Date du prochain service <span
                                    class="text-danger">*</span></label>
                        <input v-model="formData.next_service" class="form-control" type="date"  required />
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
