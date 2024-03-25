<script setup lang="ts">
import { ref } from 'vue';
import { DataTable } from '@/ui';
import router from '@/router';
import { usePMStore } from '@/store';

const pmStore = usePMStore();

const role = localStorage.getItem('role');


const props = defineProps({
    requestSales: {
        type: Array,
        required: true,
    },
});

const headers = [
    { text: 'N° Demande', value: 'n_order', type: 'text' },
    { text: 'Type', value: 'type', type: 'text' },
    { text: 'Date de demande', value: 'created_at', type: 'date' },
    { text: 'status', value: 'status', type: 'badge' },

];

const actionsConfig = [
    {
        icon: 'ti ti-eye', class: 'btn btn-primary btn-sm', text: 'Afficher', onClick: (item: any) => {
            router.push(`/purchase-order/details/${item.id}`);
        },
    },
];

if (role === 'Chef de projet') {
    actionsConfig.push(
        {
            icon: 'ti ti-trash', type: 'delete', class: 'btn btn-danger btn-sm', text: 'Supprimer', onClick: (item: any) => {
                pmStore.setSelectedArticle(item);
                $('#deleteModal').modal('show');
            },
        },
    );
}




const filteredData = ref(props.requestSales);

const searchQuery = ref('');
const statusQuery = ref('-');
const itemPerPage = ref(15);

const filter = () => {
    filteredData.value = props.requestSales.filter((item: any) => {
        const combinedFields = `${item.status} ${item.n_order} ${item.type}`.toLowerCase();
        const searchWords = searchQuery.value.toLowerCase().split(' ');
        return searchWords.every(word => combinedFields.includes(word)) &&
            (statusQuery.value === '-' || item.status == statusQuery.value);
    });
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
                            <option value="need validation">Besoin de validation</option>
                            <option value="pending">En attente</option>
                            <option value="on going">En cours</option>
                            <option value="on road">En route</option>
                            <option value="done">Terminé</option>
                        </select>
                    </div>
                    <div class="d-flex align-items-center ms-auto">
                        <select v-model="itemPerPage" name="" class="form-select ms-2 me-2 w-120">
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="45">45</option>
                            <option value="60">60</option>
                        </select>
                    </div>
                    <button class="btn btn-secondary" disabled data-bs-toggle="modal" data-bs-target="#import-modal">
                        <i class="ti ti-file-type-csv me-2"></i>
                        Exporter
                    </button>
                </div>
            </div>
        </div>
        <DataTable :items="filteredData" :headers="headers" :page-size='itemPerPage' :actionsConfig="actionsConfig"
            button-type="simple" disabled="pending" />
    </div>
</template>
<style>
.w-240 {
    width: 240px;
}
</style>