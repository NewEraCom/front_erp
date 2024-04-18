<script setup lang="ts">
import { ref } from 'vue';
import { DataTable } from '@/ui';
import { formater, helpers } from '@/utils';
import { useSharedStore } from '@/store';

const sharedStore = useSharedStore();
const role = localStorage.getItem('role');
const props = defineProps({
    data: {
        type: Array,
        required: true,
    },
});
const headers = [
    { text: 'Project', isComplex: true, type: 'project' },
    // { text: 'Designation', value: 'caisses.designation', type: 'text' },
    { text: 'Montant Total des caisses', value: 'total_amount', type: 'text' },
    { text: 'Mois', value: 'mois', type: 'text' },
    // { text: 'Créer par', isComplex: true, type: 'created_by' },
    { text: 'Status', value: 'status', type: 'badge' },
];

const actionsConfig = [
    {
        icon: 'ti ti-eye', class: 'btn btn-primary btn-sm', onClick: (item: any) => {
            sharedStore.setSelectedCaisse(item);
            $('#detailsCaisseModal').modal('show');
        }
    },
    {
        icon: 'ti ti-trash-filled', type: 'delete', class: 'btn btn-danger btn-sm', onClick: (item: any) => {
            sharedStore.setSelectedItem(item);
            $('#deleteModal').modal('show');
        }
    },
];
if ([helpers.roles.DS , helpers.roles.DO,helpers.roles.DG ].includes(role)) {
    actionsConfig.push({
        icon: 'ti ti-check', class: 'btn btn-success btn-sm', onClick: (item: any) => {
            console.log(item);
            sharedStore.setSelectedCaisse(item);

            $('#validate-modal').modal('show');
            
        }
    });
}

/* const showValidationModal = (item: any) => {
    rhStore.setItemId(item.id)
    $("#validate-recruitement-modal").modal("show");

}; */

const filteredData = ref(props.data);

const searchQuery = ref('');
const statusQuery = ref('-');
const startQuery = ref();
const endQuery = ref();
const itemPerPage = ref(15);

const filter = () => {
    filteredData.value = props.data.filter((item: any) => {
        const combinedFields = `${item.titre}`.toLowerCase();
        const searchWords = searchQuery.value.toLowerCase().split(' ');
        return searchWords.every(word => combinedFields.includes(word)) &&
            (statusQuery.value === '-' || item.status === statusQuery.value) && (!startQuery.value || formater.startOfDay(item.created_at) >= formater.startOfDay(startQuery.value)) &&
            (!endQuery.value || formater.startOfDay(item.created_at) <= formater.startOfDay(endQuery.value));
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
                            <option value="pending">En attente</option>
                            <option value="done">Traité</option>
                            <option value="delivered">Livré</option>
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
