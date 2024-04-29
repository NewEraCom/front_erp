<script setup lang="ts">
import { ref } from 'vue';
import { DataTable, Modal } from '@/ui';
import { formater, helpers } from '@/utils';
import { useSharedStore } from '@/store';

const sharedStore = useSharedStore();
const props = defineProps({
    budget: {
        type: Array,
        required: true,
    },
});

const headers = [
    { text: 'Créer par', type: 'created_by' },
    { text: 'Project', isComplex: true, type: 'project' },
    { text: 'Mois', value: 'mois', type: 'text' },
    { text: 'Designation', value: 'designation', type: 'text' },
    { text: 'Montant', value: 'montant', type: 'text' },
    { text: 'Validation DO', value: 'validation_DO', type: 'badge' },
    { text: 'Validation DS', value: 'validation_DS', type: 'badge' },
    { text: 'Validation DG', value: 'validation_DG', type: 'badge' },
    { text: 'Status', value: 'status', type: 'badge' },
];

const actionsConfig = [
    
    
];
if( [helpers.roles.DG , helpers.roles.DS ,helpers.roles.DO ].includes(localStorage.getItem('role'))){
    actionsConfig.push({ icon: 'ti ti-check', class: 'btn btn-success btn-sm', onClick: (item: any) => {
        showValidationModal(item);
    } },
    { icon: 'ti ti-ban', class: 'btn btn-warning btn-sm', onClick: (item: any) => RejectItem(item) },
    );
}

const showValidationModal = (item: any) => {

    sharedStore.setSelectedItem(item.id);

    $('#validate-modal').modal('show');

};

const RejectItem = (item: any) => {
    sharedStore.setSelectedItem(item.id);
    $('#reject-modal').modal('show');
};




const filteredData = ref(props.budget);

const searchQuery = ref('');
const statusQuery = ref('-');
const startQuery = ref();
const endQuery = ref();
const itemPerPage = ref(15);

const filter = () => {
    filteredData.value = props.budget.filter((item: any) => {
        const combinedFields = `${item.employe.first_name} ${item.employe.last_name} ${item.designation} ${item.mois} ${item.status}`.toLowerCase();
        const searchWords = searchQuery.value.toLowerCase().split(' ');
        return searchWords.every(word => combinedFields.includes(word)) &&
            (statusQuery.value === '-' || item.status === statusQuery.value) && (!startQuery.value || formater.startOfDay(item.created_at) >= formater.startOfDay(startQuery.value)) &&
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
                    <input v-model="searchQuery" type="search" class="form-control w-240 me-2" placeholder="Rechercher..."
                        @input="filter" />

                    <div class="d-flex align-items-center ms-0">
                        <select v-model="statusQuery" class="form-select ms-2 me-2 w-180" @change="filter">
                            <option value="-">Tout</option>
                            <option value="pending">En attente</option>
                            <option value="approved">Approuvé</option>
                            <option value="disapproved">Rejeté</option>
                        </select>
                    </div>
                    <div class="d-flex align-items-center ms-2">
                        <label for="start">De</label>
                        <input v-model="startQuery" type="date" id="start" class="form-control ms-2 me-2"
                            @change="filter" />
                    </div>
                    <div class="d-flex align-items-center ms-0">
                        <label for="end">à</label>
                        <input v-model="endQuery" type="date" id="end" class="form-control ms-2 me-2" @change="filter" />
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
            buttonType="simple" />
        <Modal title="Importation des données" id="details-modal" size="modal-lg" class-name="bring-to-front">
        </Modal>
    </div>
</template>
<style>
.w-240 {
    width: 240px;
}
</style>
