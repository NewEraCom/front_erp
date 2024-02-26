<script setup lang="ts">
import { ref } from 'vue';
import { DataTable } from '@/ui';
import { formater, helpers } from '@/utils';
import {usePMStore} from '@/store'
const PMStore = usePMStore();
const props = defineProps({
    factures: {
        type: Array,
        required: true,
    },
});
const deleteFactureModal = 'delete-facture';
const editFactureModal ='edit-facture';

const showEditModal = (item:any) => {
    PMStore.setItem(item)
    $(`#${editFactureModal}`).modal('show');
};
const deleteItem = (item: any) => {
    helpers.setDeleteId(item.id);
    $(`#${deleteFactureModal}`).modal('show');
};
const headers = [
    { text: 'Numero', value: 'numero', type: 'text' },
    { text: 'Type', value: 'type', type: 'text' },
    { text: 'Date de paiement', value: 'date_paiement', type: 'date' },
    { text: 'Projecto',  value: 'code',isComplex: true, type: 'project'},
    { text: 'Status', value: 'status', type: 'badge' },
];

const actionsConfig = [
    {
        icon: 'ti ti-pencil', class: 'btn btn-warning btn-sm', onClick: (item:any) => {  
            showEditModal(item);
        },
    },
    {
        icon: 'ti ti-trash', class: 'btn btn-danger btn-sm', onClick: (item:any) => {
            deleteItem(item);

        }
    },
];




const filteredData = ref(props.factures);

const searchQuery = ref('');
const statusQuery = ref('-');
const startQuery = ref();
const endQuery = ref();
const itemPerPage = ref(15);

const filter = () => {
    filteredData.value = props.factures.filter((item: any) => {
        const combinedFields = `${item.numero} ${item.type} ${item.date_paiement} ${item.status} ${item.project.code}`.toLowerCase();
        const searchWords = searchQuery.value.toLowerCase().split(' ');
        return searchWords.every(word => combinedFields.includes(word)) &&
            (statusQuery.value === '-' || item.status === statusQuery.value) && (!startQuery.value || formater.startOfDay(item.date_paiement) >= formater.startOfDay(startQuery.value)) &&
            (!endQuery.value || formater.startOfDay(item.date_paiement) <= formater.startOfDay(endQuery.value));
    });
};

</script>
<template>
    <div>
        <div class="row mb-4">
            <div class="col-12">
                <div class="d-flex align-items-center">
                    <input v-model="searchQuery" type="search" class="form-control w-240 me-2" placeholder="Rechercher..."
                        @input="filter" />
                    <div class="d-flex align-items-center ms-2">
                        <label for="start">De</label>
                        <input v-model="startQuery" type="date" id="start" class="form-control ms-2 me-2"
                            @change="filter" />
                    </div>
                    <div class="d-flex align-items-center ms-0">
                        <label for="end">à</label>
                        <input v-model="endQuery" type="date" id="end" class="form-control ms-2 me-2" @change="filter" />
                    </div>
                    <div class="d-flex align-items-center ms-0">
                        <select v-model="statusQuery" class="form-select ms-2 me-2 w-180" @change="filter">
                            <option value="-">Tout</option>
                            <option value="annule">Annuler</option>
                            <option value="en attente">En Attente</option>
                            <option value="paye">Payé</option>
                        </select>
                    </div>
                    <div class="d-flex align-items-center ms-auto">
                        <select v-model="itemPerPage" name="" class="form-select ms-2 me-2 w-120">
                            <option value="15">5</option>
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="45">45</option>
                            <option value="60">60</option>
                        </select>
                    </div>
                    <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#import-modal">
                        <i class="ti ti-file-type-csv me-2"></i>
                        Exporter
                    </button>
                </div>
            </div>
        </div>
        <DataTable :items="filteredData" :headers="headers" :page-size='itemPerPage' :actionsConfig="actionsConfig" button-type="simple" />
    </div>
</template>
<style>
.w-240 {
    width: 240px;
}
</style>