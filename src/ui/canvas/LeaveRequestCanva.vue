<script setup lang="ts">
import { portalService } from '@/services';
import { ref, watch } from 'vue';
import { helpers } from '@/utils';
import { push } from 'notivue';

const isLoading = ref(false);

const formData = ref({
    start_date: '',
    end_date: '',
    duration: '',
    type: '',
    certificat: '',
    message: '',
    deduction_type: '',
});

const today = new Date();
const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
const minDate = ref((nextWeek).toISOString().split('T')[0]);

const minDateEnd = ref((nextWeek).toISOString().split('T')[0]);

const handleUploadFile = (event: any) => {
    formData.value.certificat = event.target.files[0];
};

const submit = async () => {
    isLoading.value = true;

    const query = new FormData();
    query.append('duration', formData.value.duration);
    query.append('start_date', formData.value.start_date);
    query.append('end_date', formData.value.end_date);
    query.append('type', formData.value.type);
    query.append('attachment', formData.value.certificat);
    query.append('deduction_type', formData.value.deduction_type);

    await portalService.requestLeave(query).then((status: any) => {
        if (status == 200) {
            push.success({
                title: 'Demande de congé',
                message: 'Votre demande de congé a été soumise avec succès.'
            });
            clearForm();
        } else {
            push.error({
                title: 'Demande de congé',
                message: 'Vous avez déjà une demande similaire en cours.'
            });
        }
    }).catch(() => {
        push.error({
            title: 'Demande de congé',
            message: 'Une erreur est survenue lors de la soumission de votre demande.'
        });
    }).finally(() => {
        isLoading.value = false;
        helpers.closeCanva();

    });
};

const setMinDateEnd = () => {
    minDateEnd.value = formData.value.start_date;
};


const clearForm = () => {
    formData.value = {
        duration: '',
        start_date: '',
        end_date: '',
        type: '',
        deduction_type: '',
        certificat: '',
        message: ''
    };
};

watch(() => formData.value.type, (value) => {
    if (value === 'maladie') {
        const todayWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2);
        minDate.value = (todayWeek).toISOString().split('T')[0];
    }
});
</script>

<template>
    <div class="offcanvas offcanvas-end off-canva-width" tabindex="-1" id="requestLeave"
        aria-labelledby="offcanvasEndLabel">
        <div class="offcanvas-header">
            <h5 id="offcanvasEndLabel" class="offcanvas-title">Demande de congé
            </h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body  mx-0 flex-grow-0">
            <form @submit.prevent="submit">
                <div class="row">
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="type" class="form-label">Type <span class="text-danger">*</span></label>
                            <select class="form-select" id="type" v-model="formData.type" required>
                                <option value="">Choisir un type</option>
                                <option value="congé">Congé</option>
                                <option value="maladie">Maladie</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="duration" class="form-label">Duration <span class="text-danger">*</span></label>
                            <input type="number" class="form-control" id="duration" placeholder="Duration" maxlength="2"
                                pattern="\d{9}" title="Please enter exactly 9 digits." v-model="formData.duration"
                                oninput="this.value = this.value.replace(/[^1-9]/g, '').slice(0, 2);" required>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="dateDebut" class="form-label">Date de début <span
                                    class="text-danger">*</span></label>
                            <input type="date" class="form-control" id="dateDebut" @change="setMinDateEnd"
                                :min="minDate" v-model="formData.start_date" required>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="dateFin" class="form-label">Date de fin <span class="text-danger">*</span>
                                <small class="text-danger">(Dernier jour inclus)</small> </label>
                            <input type="date" class="form-control" id="dateFin" :min="minDateEnd"
                                v-model="formData.end_date" required>
                        </div>
                    </div>

                    <div class="col-12" v-if="formData.type == 'maladie'">
                        <div class="mb-3">
                            <label for="certificat" class="form-label">Certificat <span
                                    class="text-danger">*</span></label>
                            <input type="file" class="form-control" id="certificat" @change="handleUploadFile"
                                placeholder="certificat" required>
                        </div>
                    </div>
                    <div class="col-12" v-if="formData.type != 'maladie'">
                        <div class="alert alert-danger" role="alert">
                            <p>Votre demande doit être soumise au moins une semaine à l'avance pour être validée.</p>
                        </div>
                    </div>
                    <div class="col-12" v-if="formData.type == 'maladie' && Number(formData.duration) > 3">
                        <div class="mb-3">
                            <label for="message" class="form-label">Source de deduction <span
                                    class="text-danger">*</span></label>
                            <div class="row">
                                <div class="col-6 d-flex align-items-center">
                                    <input type="radio" name="deduction_type" id="salary" value="salary"
                                        v-model="formData.deduction_type">
                                    <label for="salary" class="ms-2 fw-medium">Salaire</label>
                                </div>
                                <div class="col-6 d-flex align-items-center">
                                    <input type="radio" name="deduction_type" id="leave_balance" value="leave_balance"
                                        v-model="formData.deduction_type">
                                    <label for="leave_balance" class="ms-2 fw-medium">Solde de conge</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12" v-if="formData.type == 'maladie' && Number(formData.duration) > 3">
                        <div class="alert alert-warning">
                            Votre conge maladie depasse 3 jours, veuillez choisir la source de deduction pour les jours
                            non payes a partir du 4eme jour.
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 d-flex justify-content-end">
                        <button type="button" class="btn close-button btn-label-outline-dark"
                            data-bs-dismiss="offcanvas">Annuler</button>
                        <button type="submit" class="btn btn-primary" :disabled="isLoading">
                            <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status"
                                aria-hidden="true"></span>
                            <span v-else>
                                Envoyer
                            </span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>