<script setup>
import { ref } from 'vue';
import { Modal } from '@/ui';
import {rhService} from '@/services';



const statusQuery = ref('');
const startQuery = ref();
const endQuery = ref();
const isLoading = ref(false);

const submit = async () => {
    try {
        let data = {
            status: statusQuery.value,
            date_start: startQuery.value,
            date_end: endQuery.value
        };
        await rhService.EmployeExport(data)
            .then((res) => {
                let blob;
                if (res instanceof Blob) {
                    blob = res;
                } else {
                    blob = new Blob([res]);
                }
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'Employe.xlsx';
                link.click();
            })
            .catch(() => {
                isLoading.value = false;
            });
    } catch (error) { }
};
</script>

<template>
<Modal id="ExportEmploye" title="Export des Employes" size="modal-lg">

    <form @submit.prevent="submit">
        <div class="modal-body ">
            <div class="row">
                <div class="col-12">
                    
                <div class="d-flex align-items-center justify-content-around">
    
                    <div class="d-flex align-items-center ms-0">
                        <select v-model="statusQuery" class="form-select ms-2 me-2 w-180" >
                            <option value="">Tout</option>
                            <option value="1">Actif</option>
                            <option value="0">Non Actif</option>
                           
                        </select>
                    </div>
                    <div class="d-flex align-items-center ms-2">
                        <label for="start">De</label>
                        <input v-model="startQuery" type="date" id="start" class="form-control ms-2 me-2"
                             />
                    </div>
                    <div class="d-flex align-items-center ms-0">
                        <label for="end">à</label>
                        <input v-model="endQuery" type="date" id="end" class="form-control ms-2 me-2"
                             />
                    </div>
                    
                    
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
                <span v-else> Exporter</span>
            </button>
        </div>
    </form>
</Modal>
</template>
