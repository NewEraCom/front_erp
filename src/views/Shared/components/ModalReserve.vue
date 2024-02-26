<script setup lang="ts">
import { ref } from 'vue';
import { Modal } from '@/ui';
import { sharedService } from '@/services';

const props = defineProps({
    type: {
        type: String,
        required: true
    },
    title: {
        type: String,
        default: 'Ajouter un événement'
    }
});

const formData = ref({
    event: '',
    date: '',
    start: '',
    end: '',
    comment: '',
    shared: true,
    type: props.type
});

const isLoading = ref(false);


const submit = async () => {
    isLoading.value = true;

    await sharedService.createEvent(formData.value);
    $('#addEventModal').modal('hide');
    isLoading.value = false;
};
</script>
<template>
    <Modal id="addEventModal" :title="title">
        <form @submit.prevent="submit">
            <div class="modal-body">
                <div class="row">
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="eventTitle" class="form-label">Titre <span class="text-danger">*</span> </label>
                            <input v-model="formData.event" type="text" class="form-control" id="eventTitle"
                                placeholder="Titre de l'événement" />
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="eventDate" class="form-label">Date d'événement <span class="text-danger">*</span>
                            </label>
                            <input v-model="formData.date" type="date" class="form-control" id="eventDate" />
                        </div>
                    </div>
                    <div class=" col-6">
                        <div class="mb-3">
                            <label for="evenetDateStart" class="form-label">Date debut <span class="text-danger">*</span>
                            </label>
                            <input v-model="formData.start" type="time" class="form-control" id="evenetDateStart" />
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="mb-3">
                            <label for="eventDateEnd" class="form-label">Date fin <span class="text-danger">*</span>
                            </label>
                            <input v-model="formData.end" type="time" class="form-control" id="eventDateEnd" />
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="eventComment" class="form-label">Description <span class="text-danger">*</span>
                            </label>
                            <textarea v-model="formData.comment" class="form-control" id="eventComment"
                                placeholder="Commentaire"></textarea>
                        </div>
                    </div>
                    <div v-if="type === 'event'" class="col-12">
                        <div class="mb-3 d-flex align-items-center">
                            <input v-model="formData.shared" :value=1 type="checkbox" class="form-check-input me-2"
                                id="sharedEvent" />
                            <label for="sharedEvent" class="form-check-label">Partager avec tout le monde</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">Fermer</button>
                <button type="submit" class="btn btn-primary" :disabled="isLoading">
                    <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span v-else>Ajouter</span>
                </button>
            </div>
        </form>
    </Modal>
</template>