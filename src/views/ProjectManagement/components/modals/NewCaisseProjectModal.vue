<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { Modal ,CustomSelect} from '@/ui';
import { pmService, sharedService } from '@/services';
// import { useSharedStore } from '@/store';
import { useToast } from 'vue-toastification';
// const sharedStore = useSharedStore();
const toast = useToast();

// const projects = ref(computed(() => sharedStore.projects.data));

// onMounted(async () => {
//     await sharedService.getProjects();
// });
// onUnmounted(() => {
//     sharedStore.clearProjects();
// });
const props = defineProps({
    projectId: {
        type: Object,
        default: null,
    },
});
const formData = ref({
    montant: null,
    designation: '',
    mois: null,
    project_id:props.projectId
});

const months = [
    { value: 'janvier', label: 'Janvier' },
    { value: 'février', label: 'Février' },
    { value: 'mars', label: 'Mars' },
    { value: 'avril', label: 'Avril' },
    { value: 'mai', label: 'Mai' },
    { value: 'juin', label: 'Juin' },
    { value: 'juillet', label: 'Juillet' },
    { value: 'août', label: 'Août' },
    { value: 'septembre', label: 'Septembre' },
    { value: 'octobre', label: 'Octobre' },
    { value: 'novembre', label: 'Novembre' },
    { value: 'décembre', label: 'Décembre' },
];

const isLoading = ref(false);

const submit = async () => {
    isLoading.value = true;
    await pmService.addCaisseProject(formData.value)
        .then((res) => {
            if (res.status == 200) {
                
                $('#caisseProject').modal('hide');
                toast.success(res.data);
                isLoading.value = false;
                
            
            }else toast.warning(res.data.message);

        })
        .catch((e) => {
            console.error(e);
        });
    
};
</script>
<template>
    <Modal id="caisseProject" title="Ajouter la Caisse du projet" size="modal-md">
        <form @submit.prevent="submit">
            <div class="modal-body">
                <!-- <div class="col-sm-12">
                    <div v-if="projects != null" class="col-12 mb-3">
                        <CustomSelect v-model="formData.project_id" placeholder="Choisir un Projet" label="Projet"
                            :data="projects.filter(item => item.status == 'on going').map((item) => ({
                            key: item.id,
                            value: item.code 
                        }))" />
                    </div>
                </div> -->
                <div class="col-sm-12">
                    <div class="mb-3">
                        <label for="nameEx" class="form-label">Mois <span class="text-danger">*</span></label>
                        <select v-model="formData.mois" class="form-select" required>
                            <option value="" disabled selected>Choisir un mois</option>
                            <option v-for="month in months" :value="month.value" :key="month.value">{{ month.label }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="mb-3">
                        <label for="nameEx" class="form-label">Montant <span class="text-danger">*</span></label>
                        <input type="number" class="form-control" v-model="formData.montant" placeholder="Choisir un Montant" required>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="mb-3">
                        <label for="nameEx" class="form-label">Designation <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" v-model="formData.designation" placeholder="Choisir une Designation" required>
                    </div>
                </div>
                
                
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                    Fermer
                </button>
                <button type="submit" :disabled="isLoading" class="btn btn-primary m-0">
                    <span v-if="isLoading" class="d-flex align-items-center">
                        <div class="spinner-border spinner-border-sm text-white me-2" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </span>
                    <span v-else> Terminer</span>
                </button>
            </div>
        </form>
    </Modal>
</template>
