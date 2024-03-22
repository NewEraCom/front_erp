<script setup lang="ts">
import { ref } from 'vue';
import { Modal, CustomSelect } from '@/ui';
import { rhService } from '@/services';
import { useToast } from 'vue-toastification';

const toast = useToast();

const porps = defineProps({
    employees: {
        type: Object,
        default: () => ({})
    },
    source: {
        type: String,
        default: 'simple'
    },
    id: {
        type: Number,
        default: 0
    },
});


const isLoading = ref(false);

const formData = ref({
    employee_id: '-',
    shift_date: null,
    shift_in: null,
    shift_out: null,
    break_in: null,
    break_out: null,
});

const message = ref(null);


const submit = async () => {

    isLoading.value = true;

    if (porps.source == 'simple') {
        formData.value.employee_id = String(porps.id);
    } else {
        formData.value.employee_id = formData.value.employee_id.key;
    }

    await rhService.addPointage(formData.value).then(() => {
        $('#addPointage').modal('hide');
        toast.success('Pointage ajouté avec succès');
    }).catch((error) => {
        console.error('Error during action execution', error);
        toast.error('Erreur lors de l\'ajout du pointage');
    }).finally(() => {
        isLoading.value = false;
    });
};

</script>
<template>
    <Modal id="addPointage" title="Ajouter un pointage" size="modal-lg">
        <form @submit.prevent="submit">
            <div class="modal-body">
                <div class="row">
                    <div v-if="employees != null && source != 'simple'" class="col-12 mb-3">
                        <CustomSelect v-model="formData.employee_id" placeholder="Choisir un employee" label="Employee"
                            :data="employees.filter(item => item.status == 1).map((item) => ({
            key: item.id,
            value: item.first_name + ' ' + item.last_name
        }))
            " />
                    </div>
                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label class="form-label">
                                Date de pointage
                                <span class="text-danger font-18">*</span>
                            </label>
                            <input id="shift_date" v-model="formData.shift_date" class="form-control"
                                placeholder="Entre le titre de document" type="date" tabindex="0" required />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label class="form-label">
                                Heure d'entrée
                                <span class="text-danger font-18">*</span>
                            </label>
                            <input id="shift_in" v-model="formData.shift_in" class="form-control"
                                placeholder="Entre le titre de document" type="time" tabindex="0" required />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label class="form-label">
                                Heure de sortie
                                <span class="text-danger font-18">*</span>
                            </label>
                            <input id="shift_out" v-model="formData.shift_out" class="form-control"
                                placeholder="Entre le titre de document" type="time" tabindex="0" required />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label class="form-label"> Heure de pause </label>
                            <input id="break_in" v-model="formData.break_in" class="form-control"
                                placeholder="Entre le titre de document" type="time" required />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label class="form-label"> Heure de reprise </label>
                            <input id="break_out" v-model="formData.break_out" class="form-control"
                                placeholder="Entre le titre de document" type="time" required />
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div v-if="message != null" class="alert alert-danger" role="alert">
                    <span class="message-error"> {{ message }}</span>
                </div>
                <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                    Fermer
                </button>

                <button type="submit" :disabled="isLoading" class="btn btn-primary">
                    <span v-if="isLoading" class="d-flex align-items-center">
                        <div class="spinner-border spinner-border-sm text-white" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </span>
                    <span v-else> Terminer</span>
                </button>
            </div>
        </form>
    </Modal>
</template>