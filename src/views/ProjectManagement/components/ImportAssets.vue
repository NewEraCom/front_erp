<script setup>
import { ref } from 'vue';
import {pmService} from '@/services';
const props = defineProps({
    id: {
        type: Number,
        required: true
    }
});

const cps = ref();
const rc = ref();
const others = ref();

const isLoading = ref(false);

const submit = async () => {
    isLoading.value = true;

    const formData = new FormData();
    formData.append('id', props.id);
    formData.append('cps_file', cps.value.files[0]);
    formData.append('rc_file', rc.value.files[0]);
    // formData.append('others', others.value.files[0]);

    await pmService.uploadFiles(formData).then(() => {
        isLoading.value = false;
        $('#import-assets').modal('hide');
    });
};
</script>

<template>
    <form @submit.prevent="submit">
        <div class="modal-body ">
            <div class="row">
                <div class="col-sm-12">
                    <div class="mb-3">
                        <label for="nameEx" class="form-label mb-2">CPS</label>
                        <input id="formFile" ref="cps" class="form-control" type="file"
                            accept=".pdf,.doc,.xlsx,.xls,.csv" />
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="mb-3">
                        <label for="nameEx" class="form-label mb-2">RC</label>
                        <input id="formFile" ref="rc" class="form-control" type="file"
                            accept=".pdf,.doc,.xlsx,.xls,.csv" />
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer ">
            <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                Fermer
            </button>
            <button type="submit" :disabled="isLoading" class="btn btn-primary">
                <span v-if="isLoading" class="d-flex align-items-center">
                    <div class="spinner-border spinner-border-sm text-white me-2" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </span>
                <span v-else> Términer</span>
            </button>
        </div>
    </form>
</template>

<style></style>
