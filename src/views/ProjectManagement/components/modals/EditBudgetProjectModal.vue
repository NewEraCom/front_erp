<script setup lang="ts">
import { ref, watch } from 'vue';
import { Modal } from '@/ui';
import { useToast } from 'vue-toastification';
import { pmService } from '@/services';

const toast = useToast();

const isLoading = ref(false);

const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
    oldBudget: {
        type: Number,
        required: true,
    },
});


const budget = ref(props.oldBudget);


const submit = async () => {
    isLoading.value = true;
    console.log(props.id);
    isLoading.value = true;
    const formData = {
        budget: budget.value
    };
    await pmService.EditProject(props.id, formData).then(() => {
        $('#editBudget').modal('hide');
        toast.success('Budget modifié avec succès');
    }).catch((error) => {
        console.error('Error during action execution', error);
        toast.error('Une erreur est survenue');
    }).finally(() => {
        isLoading.value = false;
    });
};

watch(() => props.oldBudget, (value) => {
    budget.value = value;
});


</script>

<template>
    <Modal id="editBudget" title="Modification de Budget" size="modal-md">
        <form @submit.prevent="submit">
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="newSalary" class="form-label">
                                Nouveau Budget
                                <span class="text-danger font-18">*</span>
                            </label>
                            <input id="newSalary" v-model="budget" class="form-control"
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