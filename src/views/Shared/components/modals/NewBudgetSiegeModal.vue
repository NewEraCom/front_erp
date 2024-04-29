<script lang="ts" setup>
import { ref } from 'vue';
import { Modal, CustomSelect } from '@/ui';
import { sharedService } from '@/services';
import { useToast } from 'vue-toastification';
const toast = useToast();

const isLoading = ref(false);



const formData = ref({
    montant: null,
    designation: null,
    mois: '-',
});

const submit = async () => {
    

    isLoading.value = true;

    await sharedService.addCaisseSiege(formData.value).then(() => {
        isLoading.value = false;
        $('#newCaisse').modal('hide');
        toast.success('Demande de caisse ajoutée avec succès');

        formData.value = {
            
            montant: null,
            designation: null,
            mois: '-',
        };

    }).catch(() => {
        isLoading.value = false;
    });
};

</script>

<template>
    <Modal id="newCaisse" title="Demande de caisse" size="modal-md">
        <form @submit.prevent="submit">
            <div class="modal-body">
                <div class="row">
                    
                    <div class="col-12 mb-3">
                        <label for="montant" class="mb-2">Mois<span class="text-danger fw-bold">*</span></label>
                        <select name="" id="" class="form-select" v-model="formData.mois">
                            <option value="-">Choisir un mois</option>
                                <option value="Janvier">Janvier</option>
                                <option value="Février">Février</option>
                                <option value="Mars">Mars</option>
                                <option value="Avril">Avril</option>
                                <option value="Mai">Mai</option>
                                <option value="Juin">Juin</option>
                                <option value="Juillet">Juillet</option>
                                <option value="Août">Août</option>
                                <option value="Septembre">Septembre</option>
                                <option value="Octobre">Octobre</option>
                                <option value="Novembre">Novembre</option>
                                <option value="Décembre">Décembre</option>
                        </select>
                    </div>
                    <div class="col-12 mb-3">
                        <label for="montant" class="mb-2">Montant<span class="text-danger fw-bold">*</span></label>
                        <input type="number" class="form-control" id="montant" v-model="formData.montant"
                            placeholder="Entre le montant demande" required />
                    </div>
                    <div class="col-12">
                        <label for="montant" class="mb-2">Designation<span class="text-danger fw-bold">*</span></label>
                        <textarea v-model="formData.designation" class="form-control" rows="2" placeholder="Remarque...">
                                </textarea>
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                    Fermer
                </button>
                <button type="submit" class="btn btn-primary" :disabled="isLoading">
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