<script setup>
import { ref } from 'vue';
import { PMService } from '@/services';
const props = defineProps({
    id: {
        type: Number,
        required: true
    }
});

const isLoading = ref(false);
const isCautionAuto = ref(false);

const submit = async () => {
    isLoading.value = true;
    const formData = new FormData();
    formData.append('id', props.id);
    formData.append('is_caution_auto', isCautionAuto.value == true ? 1 : 0);

    await PMService.validate(formData)
        .then(() => {
            isLoading.value = false;
            $('#validate-project').modal('hide');
        })
        .catch(() => {
            console.log('error');
        });
};
</script>
<template>
    <form @submit.prevent="submit">
        <div class="modal-body ">
            <p class="mb-1">Etes-vous sûr de vouloir valider cet avant-projet?</p>
            <div class="row mb-4">
                <div class="col-12">
                    <div class="form-check mt-3">
                        <input
                            id="defaultCheck1"
                            v-model="isCautionAuto"
                            class="form-check-input"
                            type="checkbox"
                            value="true"
                        />
                        <label class="form-check-label" for="defaultCheck1">
                            Demander la caution provisoire automatique
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer ">
            <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                Fermer
            </button>
            <button type="submit" class="btn btn-primary" :disabled="isLoading">
                <span v-if="isLoading" class="d-flex align-items-center">
                    <div class="spinner-border spinner-border-sm text-white me-2" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </span>
                <span v-else>Oui, Valider</span>
            </button>
        </div>
    </form>
</template>
