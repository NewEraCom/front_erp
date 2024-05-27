<script setup lang="ts">
import { ref } from 'vue';
import { portalService } from '@/services';
import { push } from 'notivue';
import { helpers } from '@/utils';

const isLoading = ref(false);

const formData = ref({
    duration: '',
    start_date: '',
    end_date: '',
    message: ''
});



const today = new Date();
const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
const minDate = (nextWeek).toISOString().split('T')[0];

const submit = async () => {
    isLoading.value = true;

    console.log(formData.value);

    const query = new FormData();
    query.append('duration', formData.value.duration);
    query.append('start_date', formData.value.start_date);
    query.append('end_date', formData.value.end_date);
    query.append('reason', formData.value.message);

    await portalService.requestRemote(query).then((status: any) => {
        if (status == 200) {
            push.success({
                title: 'Demande de travail à distance',
                message: 'Votre demande a été soumise avec succès.'
            });
            clearForm();
        } else {
            push.warning({
                title: 'Demande de travail à distance',
                message: 'Vous avez déjà une demande similaire en cours.'
            });
        }
    }).catch(() => {
        push.error({
            title: 'Demande de travail à distance',
            message: 'Une erreur est survenue lors de la soumission de votre demande.'
        });
    }).finally(() => {
        isLoading.value = false;
        helpers.closeCanva();
    });
};


const clearForm = () => {
    formData.value = {
        duration: '',
        start_date: '',
        end_date: '',
        message: ''
    };
};

</script>
<template>

    <div class="offcanvas offcanvas-end off-canva-width" tabindex="-1" id="requestRemotly"
        aria-labelledby="offcanvasEndLabel">
        <div class="offcanvas-header">
            <h5 id="offcanvasEndLabel" class="offcanvas-title">Demande de travail à distance
            </h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body  mx-0 flex-grow-0">
            <form @submit.prevent="submit">
                <div class="row">
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="duration" class="form-label">Duration <span class="text-danger">*</span></label>
                            <input type="number" class="form-control" id="duration" v-model="formData.duration"
                                maxlength="2" pattern="\d{9}" title="Please enter exactly 9 digits."
                                oninput="this.value = this.value.replace(/[^1-9]/g, '').slice(0, 2);"
                                placeholder="Entrez la durée" required>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="start_date" class="form-label">Date de début <span
                                    class="text-danger">*</span></label>
                            <input type="date" class="form-control" id="start_date" v-model="formData.start_date"
                                :min="minDate" required>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="end_date" class="form-label">Date de fin <span class="text-danger">*</span>
                                <small class="text-danger">(Le dérnier jour inclus)</small></label>
                            <input type="date" class="form-control" id="end_date" v-model="formData.end_date"
                                :min="minDate" required>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="message" class="form-label">Message <span class="text-danger">*</span></label>
                            <textarea class="form-control" id="message" rows="5" placeholder="Entrez votre message"
                                v-model="formData.message" required></textarea>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="alert alert-danger" role="alert">
                            <p>Votre demande doit être soumise au moins une semaine à l'avance pour être validée.</p>
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