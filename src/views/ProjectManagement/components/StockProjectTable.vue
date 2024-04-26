<script setup lang="ts">
import { ref } from 'vue';
import { DataTable } from '@/ui';
import { usePMStore } from '@/store';
import { helpers } from '@/utils';

const props = defineProps({
    articles: {
        type: Array,
        required: true,
    },
});

const pmStore = usePMStore();
const role = localStorage.getItem('role');


const headers = [
    { text: 'Code', value: 'code', type: 'text' },
    { text: 'Désignation', value: 'article', type: 'text' },
    { text: 'Unite', value: 'unite', type: 'text' },
    { text: 'Qte En Stock', value: 'qte_restant', type: 'number' },
    { text: 'Status', value: 'qte_restant', type: 'stock' },
];

const actionsConfig = [

];

if (role === 'Chef de projet') {
    actionsConfig.push(
        {
            class: 'text-dark text-small', text: 'Modifier', onClick: (item: any) => {
                pmStore.setSelectedArticle(item);
                $('#editArticle').modal('show');
            },
        },
    );
}



const filteredData = ref(props.articles);

const searchQuery = ref('');
const itemPerPage = ref(15);

const filter = () => {
    filteredData.value = props.articles.filter((item: any) => {
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