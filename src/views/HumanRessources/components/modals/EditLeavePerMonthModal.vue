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
    oldDayPerMonth: {
        type: Number,
        required: true,
    },
});


const dayPerMonth = ref(null);


const submit = async() => {
    isLoading.value = true;
    console.log(props.id);
    
    const formData = {
        conge_mois: dayPerMonth.value,

    };
    await rhService.EditLeaveEmployee(props.id,formData).then(() => {
        $('#editLeavePerMonth').modal('hide');
    }).catch((error) => {
        console.error('Error during action execution', error);
    }).finally(() => {
        isLoading.value = false;
    });
};

watch(() => props.oldDayPerMonth, (value) => {
    dayPerMonth.value = value;
});


</script>

<template>
    <Modal id="editLeavePerMonth" title="Modification de conge" size="modal-md">
        <form @submit.prevent="submit">
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="newSalary" class="form-label">
                                Jour de congé par mois
                                <span class="text-danger font-18">*</span>
                            </label>
                            <input id="newSalary" v-model="dayPerMonth" class="form-control"
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