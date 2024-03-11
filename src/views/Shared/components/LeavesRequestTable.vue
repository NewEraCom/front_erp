<script setup lang="ts">
import { ref } from 'vue';
import { DataTable } from '@/ui';
import { formater } from '@/utils';

const props = defineProps({
    leaves: {
        type: Array,
        required: true,
    },
});

const headers = [
    { text: 'Durée', value: 'duree', type: 'days' },
    { text: 'Date de début', value: 'date_start', type: 'date' },
    { text: 'Date de fin', value: 'date_end', type: 'date' },
    { text: 'Date de demande', value: 'created_at', type: 'datetime' },
    { text: 'Type', value: 'type', type: 'badge' },
    { text: 'Status', value: 'status', type: 'badge' },
];

const actionsConfig = [
    {
        icon: 'ti ti-eye', class: 'btn btn-primary btn-sm', onClick: (item: any) => {
            console.log(item);
        }
    },
    {
        icon: 'ti ti-trash-filled', type: 'delete', class: 'btn btn-danger btn-sm', onClick: (item: any) => {
            $('#deleteModal').modal('show');
        }
    },
];



const filteredData = ref(props.leaves);

const searchQuery = ref('');
const statusQuery = ref('-');
const startQuery = ref();
const endQuery = ref();
const itemPerPage = ref(15);

const filter = () => {
    filteredData.value = props.leaves.filter((item: any) => {
        const combinedFields = `${item.nom} ${item.prenom}`.toLowerCase();
        const searchWords = searchQuery.value.toLowerCase().split(' ');
        return searchWords.every(word => combinedFields.includes(word)) &&
            (statusQuery.value === '-' || item.type === statusQuery.value) && (!startQuery.value || formater.startOfDay(item.created_at) >= formater.startOfDay(startQuery.value)) &&
            (!endQuery.value || formater.startOfDay(item.created_at) <= formater.startOfDay(endQuery.value));
    });

};

</script>

<template>
    <div>
        <div class="row mb-4">
            <div class="col-12">
                <div class="d-flex align-items-center">
                    <div class="d-flex align-items-center">
                        <label for="start">De</label>
                        <input v-model="startQuery" type="date" id="start" class="form-control ms-2 me-2"
                            @change="filter" />
                    </div>
                    <div class="d-flex align-items-center ms-0">
                        <label for="end">à</label>
                        <input v-model="endQuery" type="date" id="end" class="form-control ms-2 me-2"
                            @change="filter" />
                    </div>
                    <div class="d-flex align-items-center ms-2">
                        <select v-model="statusQuery" class="form-select ms-2 me-2 w-180" @change="filter">
                            <option value="-">Tout</option>
                            <option value="Congé">Congé</option>
                            <option value="Maladie">Maladie</option>
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
                    <button class="btn btn-secondary" disabled data-bs-toggle="modal" data-bs-target="#import-modal">
                        <i class="ti ti-file-type-csv me-2"></i>
                        Exporter
                    </button>
                </div>
            </div>
        </div>
        <DataTable :items="filteredData" :headers="headers" :page-size=itemPerPage :actionsConfig="actionsConfig"
            buttonType="simple" disabled="pending" />
    </div>
</template>

<style>
.w-240 {
    width: 240px;
}
</style>
