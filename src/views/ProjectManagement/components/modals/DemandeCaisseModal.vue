<script lang="ts" setup>
import { ref } from 'vue';
import { Modal, CustomSelect } from '@/ui';
import { logisticsService } from '@/services';
import { useToast } from 'vue-toastification';
const toast = useToast();

const isLoading = ref(false);

defineProps({
    projects: {
        type: Array,
        required: true,
    }
});


const formData = ref({
    project_id: '-',
    montant: null,
    recepteur: JSON.parse(localStorage.getItem('user')).employee.id,
    remark: null,
    date_operation: Date(),
    operation: 'sortie',
    type: 'cash'
});

const submit = async () => {
    if (formData.value.project_id == '-') {
        toast.error('Veuillez choisir un project');
        return;
    }

    formData.value.project_id = formData.value.project_id.key;
    await logisticsService.newCaisseOperation(formData.value, 'chef').then(() => {
        isLoading.value = false;
        $('#newDemandeCaisse').modal('hide');
        toast.success('Demande de caisse ajoutée avec succès');
    }).catch(() => {
        isLoading.value = false;
    });
};

</script>

<template>
    <Modal id="newDemandeCaisse" title="Demande de caisse" size="modal-md">
        <form @submit.prevent="submit">
            <div class="modal-body">
                <div class="row">
                    <div v-if="projects != null" class="col-12 mb-3">
                        <CustomSelect v-model="formData.project_id" placeholder="Choisir un project" label="Project"
                            :data="projects.map((item) => ({ key: item.id, value: item.code }))" />
                    </div>
                    <div class="col-12 mb-3">
                        <label for="montant" class="mb-2">Montant<span class="text-danger fw-bold">*</span></label>
                        <input type="number" class="form-control" id="montant" v-model="formData.montant"
                            placeholder="Entre le montant demande" required />
                    </div>
                    <div class="col-12">
                        <textarea v-model="formData.remark" class="form-control" rows="2" placeholder="Remarque...">
                                </textarea>
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                    Fermer
                </button>
                <button type="submit" class="btn btn-success" :disabled="isLoading">
                    <span v-if="isLoading" class="d-flex align-items-center">
                        <div class="spinner-border spinner-border-sm text-white" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </span>
                    <span v-else>Envoyer</span>
                </button>
            </div>
        </form>
    </Modal>
</template>