<script setup lang="ts">
import { ref, watch } from 'vue';
import { Modal } from '@/ui';
import { rhService } from '@/services';

const isLoading = ref(false);

const props = defineProps({
    id: {
        type: Object,
        required: true,
    },
    oldSalary: {
        type: Number,
        required: true,
    },
});


const newSalary = ref(null);


const submit = async() => {
    isLoading.value = true;
    console.log(props.id);
    isLoading.value = true;
    const formData = {
        salary: newSalary.value
    };
    await rhService.UpdateSalaire(props.id,formData).then(() => {
        console.log('Employee added');
        $('#editSalary').modal('hide');
    }).catch((error) => {
        console.error('Error during action execution', error);
    }).finally(() => {
        isLoading.value = false;
    });
};

watch(() => props.oldSalary, (value) => {
    newSalary.value = value;
});


</script>

<template>
    <Modal id="editSalary" title="Modification de salaire" size="modal-md">
        <form @submit.prevent="submit">
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="newSalary" class="form-label">
                                Nouveau salaire
                                <span class="text-danger font-18">*</span>
                            </label>
                            <input id="newSalary" v-model="newSalary" class="form-control"
                                placeholder="Saisir le nouveau salaire" type="number" required />
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
                        <div class="spinner-border spinner-border-sm text-white" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </span>
                    <span v-else> Modifier</span>
                </button>
            </div>
        </form>
    </Modal>
</template>