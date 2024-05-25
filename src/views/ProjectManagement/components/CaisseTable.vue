<script setup lang="ts">
import { ref } from 'vue';
import { DataTable } from '@/ui';
import { helpers } from '@/utils';


const props = defineProps({
    items: {
        type: Array,
        required: true,
    },
});

const headers = [
    { text: 'Créer par', type: 'created_by' },
    { text: 'Mois', value: 'mois', type: 'text' },
    { text: 'Designation', value: 'designation', type: 'text' },
    { text: 'Montant', value: 'montant', type: 'text' },
    { text: 'Motif', value: 'justif', type:'attachement' },
    { text: 'Status', value: 'status', type: 'badge' },
];

const actionsConfig = [
];




const filteredData = ref(props.items);

const searchQuery = ref('');
const itemPerPage = ref(15);

const filter = () => {
    filteredData.value = props.items.filter((item: any) => {
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
                    <input v-model="searchQuery" type="search" class="form-control w-240 me-2"
                        placeholder="Rechercher..." @input="filter" />

                    <div class="d-flex align-items-center ms-auto">
                        <select v-model="itemPerPage" name="" class="form-select ms-2 me-2 w-120">
                            <option value="5">5</option>
                            <option value="10">10</option>
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
            disabled="pending" button-type="simple" />
    </div>
</template>
<style>
.w-240 {
    width: 240px;
}
</style>