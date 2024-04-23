<script setup lang="ts">
import { ref } from 'vue';
import { DataTable } from '@/ui';
import { useRhStore } from '@/store';
import { helpers } from '@/utils';

const props = defineProps({
    interns: {
        type: Array,
        required: true,
    },
});
const rhStore = useRhStore();

const headers = [
    { text: 'Stagiaires', value: 'nom', isComplex: true, type: 'fullname' },
    { text: 'Numéro de téléphone', value: 'tel', type: 'phone' },
    { text: 'Poste', value: 'poste', type: 'text' },
    { text: 'Diplome', value: 'diplome', type: 'text' },
    { text: 'Status', value: 'status', type: 'badge' },
];

const actionsConfig = [
    { icon: 'ti ti-pencil', class: 'btn btn-warning btn-sm', onClick: (item: any) => UpdateStg(item) },
    { icon: 'ti ti-trash-filled', class: 'btn btn-danger btn-sm', onClick: (item: any) => deleteItem(item) },
    { 

        icon: (item: any) => item.potentiel === '1' ? 'ti ti-bookmark-filled' : 'ti ti-bookmark',
        class: 'btn bg-label-primary btn-sm',
        onClick: (item: any) => {
            rhStore.setItemId(item.id);
            if (item.potentiel === '1') {
                $('#remove-potentiel').modal('show');
            } else {
                $('#add-potentiel').modal('show');
            }
        },
        type: 'potential'
    }
];



const UpdateStg = (item: any) => {
    rhStore.setItem(item);
    $('#edit-stg').modal('show');
};
const deleteItem = (item: any) => {
    console.log('Delete item', item);
    rhStore.setItemId(item.id);
    $('#delete-doc').modal('show');
};


const filteredData = ref(props.interns);

const searchQuery = ref('');
const statusQuery = ref('-');
const itemPerPage = ref(15);

const filter = () => {
    filteredData.value = props.interns.filter((item: any) => {
        const combinedFields = `${item.nom} ${item.prenom} ${item.poste} ${item.diplome} ${item.status}`.toLowerCase();
        const searchWords = searchQuery.value.toLowerCase().split(' ');
        return searchWords.every(word => combinedFields.includes(word)) &&
            (statusQuery.value === '-' || item.status === statusQuery.value);
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
                    <input v-model="searchQuery" type="search" class="form-control w-240 me-2" placeholder="Rechercher..."
                        @input="filter" />

                    <div class="d-flex align-items-center ms-0">
                        <select v-model="statusQuery" class="form-select ms-2 me-2 w-180" @change="filter">
                            <option value="-">Tout</option>
                            <option value="1">Actif</option>
                            <option value="0">Non Actif</option>
                        </select>
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
                    <button class="btn btn-success" @click="downloadFile">
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
