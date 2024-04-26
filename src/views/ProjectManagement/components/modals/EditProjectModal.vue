<script lang="ts" setup>
import { ref ,computed,onMounted,watch} from 'vue';
import { Modal, CustomSelect } from '@/ui';
import { useToast } from 'vue-toastification';
import { pmService, sharedService } from '@/services';
import { useSharedStore } from '@/store';

const toast = useToast();

const isLoading = ref(false);
const isChecked = ref(false);
const props = defineProps({
    project:{
        type:Object,
        required:true
    
    }
});
const sharedStore = useSharedStore();
const clients = ref(computed(() => sharedStore.clients.data));
onMounted(async () => {
    await sharedService.getClients();
});
const formData = ref({
    pre_project_id: '',
    code: '',
    date_start: '',
    date_end: '',
    budget: '',
    status: '',
    type_project: '',
    client_id: '-',
});
// watch(props,()=>{
    if(props.project){
        formData.value.pre_project_id = props.project.pre_project_id;
        formData.value.code = props.project.code;
        formData.value.date_start = props.project.date_start;
        formData.value.date_end = props.project.date_end;
        formData.value.budget = props.project.budget;
        formData.value.status = props.project.status;
        formData.value.type_project = props.project.type_project;
        formData.value.client_id = props.project.client_id;
        console.log(props.project);
    }
// });



const submit = async () => {
    if (formData.value.client_id == '-') {
        toast.error('Veuillez choisir un project');
        return;
    }

    isLoading.value = true;

    formData.value.client_id = formData.value.client_id.key;
    console.log(formData.value);
    
    await pmService.EditProject(props.project.id,formData.value).then(() => {
        isLoading.value = false;
        $('#edit-project').modal('hide');

        toast.success('Modifier avec succès');

        formData.value = {
            pre_project_id: '',
            code: '',
            date_start: '',
            date_end: '',
            budget: '',
            status: '',
            type_project: '',
            client_id: '-',
        };

    }).catch(() => {
        isLoading.value = false;
    });
};

</script>

<template>
    <Modal id="edit-project" title="Modifier Project" size="modal-lg">
        <form @submit.prevent="submit">
            <div class="modal-body">
                
                <div class="row">
                    <div class="col-sm-6">
                        <div class="mb-3">

                            <div v-if="clients != null">
                                <CustomSelect v-model="formData.client_id" placeholder="Choisir un projet"
                                    label="Clients" :data="clients.filter(item => item.is_active == 1 ).map((item) => ({
                                        key: item.id,
                                        value: item.raison_social
                                    }))
                                " />
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-6 mb-3">
                        <label for="montant" class="mb-2">Code<span class="text-danger fw-bold">*</span></label>
                        <input type="text" class="form-control" id="montant" v-model="formData.code"
                            placeholder="Entre la poste occupé par l'employé(e)" required />
                    </div>
                    <div class="col-6 mb-3">
                        <label for="montant" class="mb-2">Budget<span class="text-danger fw-bold">*</span></label>
                        <input type="text" class="form-control" id="montant" v-model="formData.budget"
                            placeholder="Entre la poste occupé par l'employé(e)" required />
                    </div>
                    <div class="col-6 mb-3">
                        <label for="montant" class="mb-2">Date Debut<span class="text-danger fw-bold">*</span></label>
                        <input type="date" class="form-control" id="montant" v-model="formData.date_start"
                            placeholder="Entre la date de debut" required />
                    </div>
                    <div class="col-6 mb-3">
                        <label for="montant" class="mb-2">Date Fin</label>
                        <input type="date" class="form-control" id="montant" v-model="formData.date_end" :disabled="isChecked"
                            placeholder="Entre la date de debut" required />
                    </div>
                    
                    <div class="col-6 mb-3">
                        <label for="montant" class="mb-2">Status<span class="text-danger fw-bold">*</span></label>
                        <select name="" id="" class="form-select" v-model="formData.status">
                            <option value="on going">En cours</option>
                            <option value="done">Terminé</option>
                            <option value="pending">En attente</option>
                        </select>
                    </div>
                    <div class="col-6 mb-3">
                        <label for="montant" class="mb-2">Type de projet<span class="text-danger fw-bold">*</span></label>
                        <select name="" id="" class="form-select" v-model="formData.type_project">
                            <option value="simple">Simple</option>
                            <option value="complex">Complex</option>
                        </select>
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