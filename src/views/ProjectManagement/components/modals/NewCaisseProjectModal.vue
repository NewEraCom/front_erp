<script setup lang="ts">
import { ref ,computed} from 'vue';
import { Modal } from '@/ui';
import { pmService } from '@/services';
import { useToast } from 'vue-toastification';
import { usePMStore } from '@/store';
const toast = useToast();


const props = defineProps({
    projectId: {
        type: Object,
        default: null,
    },
});
const chunk = (array: any[], size: number) => {
    return Array.from({ length: Math.ceil(array.length / size) }, (v, i) =>
        array.slice(i * size, i * size + size)
    );
};
const formData = ref({

    project_id:props.projectId,
    itemsCaisse: [],
});
const pmStore = usePMStore();

const caisseProject = ref(computed(() => pmStore.caisse_project));

let itemsCaisse = ref(caisseProject.value.length !== 0 ? [] : [
    {designation: 'Salaire', montant: 0},
    {designation: 'Budget', montant: 0},
    {designation: 'Gasoil', montant: 0},
    {designation: 'Loyer', montant: 0},
    {designation: 'Réception', montant: 0},
    {designation: 'Location de matériels NDF', montant: 0},
    {designation: 'Indemnité de transport', montant: 0},
    {designation: 'Panier', montant: 0},
]);

const initialLength = itemsCaisse.value.length;

const addCaisseItem = () => {
    itemsCaisse.value.push({designation: '', montant: 0});
};

const removeCaisseItem = (index) => {
    if (index >= initialLength) {
        itemsCaisse.value.splice(index, 1);
    }
};

const chunkedItemsCaisse = computed(() => chunk(itemsCaisse.value, 2));


const isLoading = ref(false);

const submit = async () => {
    formData.value.itemsCaisse = itemsCaisse.value;
    isLoading.value = true;
    console.log(formData.value);
    
    await pmService.addCaisseProject(formData.value)
        .then((res) => {
            
                
                $('#caisseProject').modal('hide');
                toast.success(res.data);
                isLoading.value = false;
                
            
           

        })
        .catch((e) => {
            console.error(e);
        });
    
};
</script>
<template>
    <Modal id="caisseProject" title="Ajouter la Caisse du projet" size="modal-xl">
        <form @submit.prevent="submit">
            <div class="modal-body">
                <div class="row" v-for="(row, rowIndex) in chunkedItemsCaisse" :key="'row-' + rowIndex">
                    <div class="col-md-6" v-for="(item, index) in row" :key="'item-' + index">
                        <div class="repeater-wrapper pt-0 pt-md-4">
                            <div class="d-flex border rounded position-relative pe-0">
                                <div class="row w-100 p-3">
                                    <div class="col-md-6 col-12 mb-md-0 mb-3">
                                        <div class="mb-3">
                                            <input type="text" class="form-control" v-model="item.designation" :disabled="rowIndex * 2 + index < initialLength" placeholder="Designation" required >
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-12 mb-md-0 mb-3">
                                        <div class="mb-3">
                                            <input type="number" class="form-control" v-model="item.montant" placeholder="Choisir un Montant" required>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    v-if="rowIndex * 2 + index >= initialLength"
                                    class="d-flex flex-column align-items-center justify-content-between border-start p-2">
                                    <i class="ti ti-x cursor-pointer"  @click="removeCaisseItem(rowIndex * 2 + index)"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row pt-2">
                    <div class="col-sm-12 float-end">
                        <button type="button" class="btn btn-label-dark btn-sm" @click="addCaisseItem">
                            <i class="ti ti-square-rounded-plus-filled me-2"></i>Plus de composants
                        </button>
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
