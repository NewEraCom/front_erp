<script setup lang="ts">
import { ref } from 'vue';
import { DataTable } from '@/ui';
import { formater, helpers } from '@/utils';
import { useRhStore } from '@/store';
import { useRouter } from 'vue-router';
import * as XLSX from 'xlsx';

const props = defineProps({
    workers: {
        type: Array,
        required: true,
    },
});
const rhStore = useRhStore();
const router = useRouter();
const headers = [
    { text: 'Employe', value: 'fullname', isComplex: true, type: 'workers' },
    { text: 'Soustraitant', value: 'soustraitant', type: 'soustraitant' },
    { text: 'Projet', value: 'project', type: 'project' },
    { text: 'Poste', value: 'poste', type: 'text' },
    { text: 'Status', value: 'status', type: 'badge' },
    { text: 'Date de creation', value: 'created_at', type: 'date' },
];

const actionsConfig = [
    { icon: 'ti ti-eye', class: 'btn btn-primary btn-sm', onClick: (item: any) => detailsItem(item) },
    { icon: 'ti ti-trash-filled', class: 'btn btn-danger btn-sm', onClick: (item: any) => deleteItem(item) },
];

const detailsItem = (item: any) => {
    // rhStore.setItem(item);
    // $('#showWorker').modal('show');
    router.push({ name: 'WorkerEmployee', params: { id: item.id } });

    console.log(item);
};

const deleteItem = (item: any) => {
    rhStore.setItemId(item.id);
    $('#deleteModal').modal('show');
};

const filteredData = ref(props.workers);

const searchQuery = ref('');
const statusQuery = ref('-');
const startQuery = ref();
const endQuery = ref();
const itemPerPage = ref(15);

const filter = () => {
    filteredData.value = props.workers.filter((item: any) => {
        const combinedFields = `${item.first_name} ${item.last_name} ${item.project.code} ${item.soustraitant.raison_social} ${item.poste}`.toLowerCase();
        const searchWords = searchQuery.value.toLowerCase().split(' ');
        return searchWords.every(word => combinedFields.includes(word)) &&
            (statusQuery.value === '-' || item.status === statusQuery.value) && (!startQuery.value || formater.startOfDay(item.created_at) >= formater.startOfDay(startQuery.value)) &&
            (!endQuery.value || formater.startOfDay(item.created_at) <= formater.startOfDay(endQuery.value));
    });

};
const downloadFile = () => {
    helpers.ExportData();
   
};
</script>
<template>
    <div>
        <div class="row mb-4">
            <div class="col-12">
                <div class="d-flex align-items-center">
                    <input v-model="searchQuery" type="search" class="form-control w-240 me-2"
                        placeholder="Rechercher..." @input="filter" />

                    <div class="d-flex align-items-center ms-0">
                        <select v-model="statusQuery" class="form-select ms-2 me-2 w-180" @change="filter">
                            <option value="-">Tout</option>
                            <option value="1">Actif</option>
                            <option value="0">Non Actif</option>
                        </select>
                    </div>
                    <div class="d-flex align-items-center ms-2">
                        <label for="start">De</label>
                        <input v-model="startQuery" type="date" id="start" class="form-control ms-2 me-2"
                            @change="filter" />
                    </div>
                    <div class="d-flex align-items-center ms-0">
                        <label for="end">à</label>
                        <input v-model="endQuery" type="date" id="end" class="form-control ms-2 me-2"
                            @change="filter" />
                    </div>
                    <div class="d-flex align-items-center ms-auto">
                        <label for="">Afficher</label>
                        <select v-model="itemPerPage" name="" class="form-select ms-2 me-2 w-120">
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="45">45</option>
                            <option value="60">60</option>
                        </select>
                    </div>
                    <button class="btn btn-success"  @click="downloadFile">
                        <i class="ti ti-file-type-csv me-2"></i>
                        Exporter
                    </button>
                </div>
            </div>
        </div>
        <DataTable :items="filteredData" :headers="headers" :page-size=itemPerPage :actionsConfig="actionsConfig"
            button-type="simple" />
    </div>
</template>
<style>
.w-240 {
    width: 240px;
}
</style>
