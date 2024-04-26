<script setup lang="ts">
import { ref } from 'vue';
import { DataTable } from '@/ui';
import { helpers } from '@/utils';

const props = defineProps({
    invoices: {
        type: Array,
        required: true,
    },
});

const headers = [
    { text: 'Numéro', value: 'numero', type: 'text' },
    { text: 'Montant', value: 'montant', type: 'currency' },
    { text: 'Date de paiement', value: 'date_paiement', type: 'date' },
    { text: 'Date de création', value: 'created_at', type: 'date' },
    { text: 'Status', value: 'status', type: 'badge' },

];

const actionsConfig = [
    {
        class: 'text-dark text-small', text: 'Afficher', onClick: (item: any) => {
            console.log(item);
        },
    },
    {
        class: 'text-dark text-small', type: 'delete', text: 'Modifier', onClick: (item: any) => {
            console.log(item);
        },
    },
    {
        class: 'text-danger text-small', type: 'delete', text: 'Supprimer', onClick: (item: any) => {
            console.log(item);
        },
    },
];




const filteredData = ref(props.invoices);

const searchQuery = ref('');
const itemPerPage = ref(15);

const filter = () => {
    filteredData.value = props.invoices.filter((item: any) => {
        const combinedFields = `${item.article} ${item.code}`.toLowerCase();
        const searchWords = searchQuery.value.toLowerCase().split(' ');
        return searchWords.every(word => combinedFields.includes(word));
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

                    <div class="d-flex align-items-center ms-auto">
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
        <DataTable :items="filteredData" :headers="headers" :page-size='itemPerPage' :actionsConfig="actionsConfig"
            disabled="pending" />
    </div>
</template>
<style>
.w-240 {
    width: 240px;
}
</style>