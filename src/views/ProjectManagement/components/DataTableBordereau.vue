<script setup lang="ts">
import { ref } from 'vue';
import { DataTable } from '@/ui';
import { formater } from '@/utils';

const props = defineProps({
    data: {
        type: Array,
        required: true,
    },
});

const headers = [
    { text: 'Article', value: 'article', type: 'text' },
    { text: 'Unite', value: 'unite', type: 'text' },
    { text: 'Quantite', value: 'quantite', type: 'text' },
    { text: 'Prix HT', value: 'prix_ht', type: 'currency' },
    { text: 'Prix TTC', value: 'prix_ttc', type: 'currency' },
    { text: 'Prix TTC tOTAL', value: 'prix_tttc', type: 'currency' },
    { text: 'Lot', value: 'lot', type: 'text' },
];

const actionsConfig = [
    {
        icon: 'ti ti-recycle', class: 'btn btn-danger btn-sm', onClick: (item: any) => {
        },
    },
];




const filteredData = ref(props.data);

const searchQuery = ref('');
const statusQuery = ref('-');
const startQuery = ref();
const endQuery = ref();
const itemPerPage = ref(15);

const filter = () => {
    filteredData.value = props.data.filter((item: any) => {
        const combinedFields = `${item.article} ${item.unite} ${item.quantite} ${item.prix_ht} ${item.prix_ttc} ${item.prix_tttc} ${item.lot}`.toLowerCase();
        const searchWords = searchQuery.value.toLowerCase().split(' ');
        return searchWords.every(word => combinedFields.includes(word)) &&
            (statusQuery.value === '-' || item.status === statusQuery.value) && (!startQuery.value || formater.startOfDay(item.date_recuperation) >= formater.startOfDay(startQuery.value)) &&
            (!endQuery.value || formater.startOfDay(item.date_recuperation) <= formater.startOfDay(endQuery.value));
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
        <DataTable :items="filteredData" :headers="headers" :page-size='itemPerPage' :actionsConfig="actionsConfig"
            disabled="1" button-type="simple"/>
    </div>
</template>
<style>
.w-240 {
    width: 240px;
}
</style>