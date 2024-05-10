<script setup lang="ts">
import { ref } from 'vue';
import { DataTable } from '@/ui';
import { formater, helpers } from '@/utils';
import { useLogisticsStore } from '@/store';

const props = defineProps({
    caisse: {
        type: Array,
        required: true,
    },
});
const logisticsStore = useLogisticsStore();
const headers = [
    { text: 'Récepteur/Émetteur', value: 'recepteur', type: 'caisse' },
    { text: 'Montant', value: 'montant', type: 'currency' },
    { text: 'Type d\'opération', value: 'operation', type: 'badge' },
    { text: 'Date d\'opération', value: 'date_operation', type: 'date' },
    { text: 'Status', value: 'status', type: 'badge' },
];

const actionsConfig = [
    {
        icon: 'ti ti-eye', class: 'btn btn-primary btn-sm', onClick: (item: any) => {
            logisticsStore.setDetailsOperationCaisse(item);
            $('#detailsOperation').modal('show');
        }
    },
];

if ([ helpers.roles.DS , helpers.roles.LOGISTICS].includes(localStorage.getItem('role'))) {
    actionsConfig.push({ icon: 'ti ti-check', class: 'btn btn-success btn-sm', onClick: (item: any) => {
        showValidationModal(item);
    } },
    { icon: 'ti ti-trash-filled', class: 'btn btn-danger btn-sm', onClick: (item: any) => deleteItem(item) },
    );
}
const showValidationModal = (item: any) => {
    logisticsStore.setSelectedItem(item.id);
    console.log(item.id);
    
    $('#validate-caisse-modal').modal('show');

};


const deleteItem = (item: any) => {
    logisticsStore.setDetailsOperationCaisse(item.id);
    console.log(item.id);
    $('#deleteModal').modal('show');
};

const filteredData = ref(props.caisse);

const searchQuery = ref('');
const statusQuery = ref('-');
const startQuery = ref();
const endQuery = ref();
const itemPerPage = ref(15);

const filter = () => {
    filteredData.value = props.caisse.filter((item: any) => {
        const combinedFields = `${item.emetteur} ${item.type} ${item.recepteur?.first_name} ${item.recepteur?.last_name} ${item.recepteur?.matricule}`.toLowerCase();
        const searchWords = searchQuery.value.toLowerCase().split(' ');
        return searchWords.every(word => combinedFields.includes(word)) &&
            (statusQuery.value === '-' || item.status == statusQuery.value) && (!startQuery.value || formater.startOfDay(item.created_at) >= formater.startOfDay(startQuery.value)) &&
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
                            <option value="pending">En attente</option>
                            <option value="on going">En cours</option>
                            <option value="done">Terminé</option>
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
                    <button class="btn btn-success" @click="downloadFile">
                        <i class="ti ti-file-type-csv me-2"></i>
                        Exporter
                    </button>
                </div>
            </div>
        </div>
        <DataTable :items="filteredData" :headers="headers" :page-size=itemPerPage :actionsConfig="actionsConfig"
            buttonType="simple" disabled="done"/>
    </div>
</template>
<style>
.w-240 {
    width: 240px;
}
</style>
