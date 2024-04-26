<script lang="ts" setup>
import { ref ,computed,onMounted,watch} from 'vue';
import { Modal, CustomSelect } from '@/ui';
import { rhService, pmService } from '@/services';
import { useToast } from 'vue-toastification';
import { usePMStore } from '@/store';
const toast = useToast();

const isLoading = ref(false);
const isChecked = ref(false);
const props = defineProps({
    emp_id: {
        type: Number,
        required: true,
    }
});
watch(isChecked, (newVal) => {
      if (newVal) {
        formData.value.date_fin = '-';
      }
    });
const pmStore = usePMStore();

const projects = ref(computed(() => pmStore.projects));
onMounted(async () => {
    await pmService.getProjects();
});
const formData = ref({
    project_id: '-',
    employe_id: props.emp_id,
    date_debut: '',
    date_fin: '',
    poste: '',
});

const submit = async () => {
    if (formData.value.project_id == '-') {
        toast.error('Veuillez choisir un project');
        return;
    }

    isLoading.value = true;

    formData.value.project_id = formData.value.project_id.key;
    console.log(formData.value);
    
    await rhService.AffecterEmpProjet(props.emp_id,formData.value).then(() => {
        isLoading.value = false;
        $('#AffecteEmp').modal('hide');

        toast.success('Affecter avec succès');

        formData.value = {
            project_id: '-',
            employe_id: props.emp_id,
            date_debut: '',
            date_fin: '',
            poste: '',
        };

    }).catch(() => {
        isLoading.value = false;
    });
};

</script>

<template>
    <Modal id="AffecteEmp" title="Affecter Employé(e)" size="modal-md">
        <form @submit.prevent="submit">
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="mb-3">

                            <div v-if="projects != null">
                                <CustomSelect v-model="formData.project_id" placeholder="Choisir un projet"
                                    label="Projets" :data="projects.filter(item => item.status == 'on going').map((item) => ({
                                        key: item.id,
                                        value: item.code
                                    }))
                                " />
                            </div>
                        </div>
                    </div>
                    

                    <div class="col-12 mb-3">
                        <label for="montant" class="mb-2">Date Debut<span class="text-danger fw-bold">*</span></label>
                        <input type="date" class="form-control" id="montant" v-model="formData.date_debut"
                            placeholder="Entre la date de debut" required />
                    </div>
                    <div class="col-12 mb-3">
                        <label for="montant" class="mb-2">Date Fin<span class="text-danger fw-bold">*</span></label>
                        <input type="date" class="form-control" id="montant" v-model="formData.date_fin" :disabled="isChecked"
                            placeholder="Entre la date de debut" required />
                    </div>
                    
                    <div class="col-12 mb-3">
                    <input
                        id="defaultCheck1"
                        v-model="isChecked"
                        class="form-check-input"
                        type="checkbox"
                        value="true"
                    />
                    <label class="form-check-label px-2" for="defaultCheck1">
                        Date de fin indeterminée
                    </label>
                </div>
                    <div class="col-12 mb-3">
                        <label for="montant" class="mb-2">Poste<span class="text-danger fw-bold">*</span></label>
                        <input type="text" class="form-control" id="montant" v-model="formData.poste"
                            placeholder="Entre la poste occupé par l'employé(e)" required />
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