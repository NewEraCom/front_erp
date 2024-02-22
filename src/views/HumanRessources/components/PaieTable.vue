<script setup lang="ts">
import { ref } from 'vue';
import { DataTable } from '@/ui';

const props = defineProps({
    paies: {
        type: Array,
        required: true,
    },
});

const headers = [
    { text: 'Mois', value: 'mounth', type: 'text' },
    { text: 'Masa Salarial', value: 'total_salaire', type: 'currency' },
    { text: 'Total prime', value: 'total_prime', type: 'currency' },
    { text: 'Total d\'employés', value: 'total_employee', type: 'text' },
    { text: 'status', value: 'status', type: 'badge' },

];

const actionsConfig = [
    { icon: 'ti ti-eye', class: 'btn btn-primary btn-sm', onClick: (item: any) => detailsItem(item) },
    { icon: 'ti ti-trash-filled', class: 'btn btn-danger btn-sm', onClick: (item: any) => deleteItem(item) },
];

const detailsItem = (item: any) => {
    console.log(item);
};

const deleteItem = (item: any) => {
    console.log('Delete item', item);
};

const filteredData = ref(props.paies);

const searchQuery = ref('');
const statusQuery = ref('-');
const itemPerPage = ref(15);

const filter = () => {
    filteredData.value = props.paies.filter((item: any) => {
        const combinedFields = `${item.mounth}`.toLowerCase();
        const searchWords = searchQuery.value.toLowerCase().split(' ');
        return searchWords.every(word => combinedFields.includes(word)) &&
            (statusQuery.value === '-' || item.status === statusQuery.value);
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
                    <div class="d-flex align-items-center ms-0">
                        <select v-model="statusQuery" class="form-select ms-2 me-2 w-180" @change="filter">
                            <option value="-">Tout</option>
                            <option value="open">Ouvert</option>
                            <option value="closed">Fermé</option>
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
                    <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#import-modal">
                        <i class="ti ti-file-type-csv me-2"></i>
                        Exporter
                    </button>
                </div>
            </div>
        </div>
        <DataTable :items="filteredData" :headers="headers" :page-size=itemPerPage :actionsConfig="actionsConfig" />
    </div>
</template>
<style>
.w-240 {
    width: 240px;
}
</style>
