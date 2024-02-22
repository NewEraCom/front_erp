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
    first_name: null,
    last_name: null,
    phone_no: null,
    matricule: null,
    cin: null,
    copie_cin: null,
    birthdate: null,
    sexe: '-',
    email: null,
    adresse: null,
    date_embauche: null,
    employee_id: '-',

});

const handleFileChange = (e) => {
    formData.value.copie_cin = e.target.files[0];
};

const submit = async () => {
    console.log('submit');
};
</script>
<template>
    <Modal id="addNewLeave" title="Ajouter un nouveau congé" size="modal-xl">
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
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Date debut de congé <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" placeholder="" type="date" tabindex="0" id="nameEx"
                                v-model="formData.birthdate" required />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Date fin de congé <span
                                    class="text-danger">*</span></label>
                            <input class="form-control" placeholder="" type="date" tabindex="0" id="nameEx"
                                v-model="formData.birthdate" required />
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Type de congé <span class="text-danger">*</span></label>
                            <select name="" id="" class="form-select" required v-model="formData.sexe">
                                <option value="-">Choisir le sexe</option>
                                <option value="Conge">Congé</option>
                                <option value="Maladie">Maladie</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="mb-3">
                            <label for="nameEx" class="form-label">Durée de congé <span class="text-danger">*</span></label>
                            <input class="form-control" placeholder="Entre le nombre de jours" type="number" tabindex="0"
                                id="nameEx" v-model="formData.email" required />
                        </div>
                    </div>

                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="assurance" class="form-label">Attachement (Certificat médical, Email de demande,
                                etc.) <span class="text-danger">*</span></label>
                            <input class="form-control" placeholder="" type="file" tabindex="0" id="assurance"
                                name="copie_cin" @change="handleFileChange" required />
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