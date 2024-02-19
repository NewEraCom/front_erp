<script setup lang="ts">
import { ref } from 'vue';
import { DataTable } from '@/ui';

const props = defineProps({
    employees: {
        type: Array,
        required: true,
    },
});

const headers = [
    { text: 'Employe', value: 'first_name', isComplex: true, type: 'employee' },
    { text: 'Poste', value: 'poste' },
    { text: 'Departement', value: 'departement' },
    { text: 'Contrat', value: 'type_contrat', type: 'badge' },
    { text: 'Date d\'embauche', value: 'date_embauche', type: 'date' },
    { text: 'Status', value: 'status', type: 'badge' },
];

const actionsConfig = [
    { icon: 'ti ti-eye', class: 'btn btn-primary btn-sm', onClick: (item: any) => editItem(item) },
    { icon: 'ti ti-trash-filled', class: 'btn btn-danger btn-sm', onClick: (item: any) => deleteItem(item) }
];

const editItem = (item: any) => {
    console.log('Edit item', item);
};

const deleteItem = (item: any) => {
    console.log('Delete item', item);
};

const filteredData = ref(props.employees);

const searchQuery = ref('');
const contratQuery = ref('-');
const statusQuery = ref('-');
const itemPerPage = ref(15);

const filter = () => {
    filteredData.value = props.employees.filter((item: any) => {
        const combinedFields = `${item.first_name} ${item.last_name} ${item.matricule} ${item.poste}`.toLowerCase();
        const searchWords = searchQuery.value.toLowerCase().split(' ');
        return searchWords.every(word => combinedFields.includes(word)) &&
            (contratQuery.value === '-' || item.type_contrat === contratQuery.value) &&
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
                        <select v-model="contratQuery" class="form-select ms-2 me-2 w-180" @change="filter">
                            <option value="-">Tout les contrats</option>
                            <option value="CDD">CDD</option>
                            <option value="CDI">CDI</option>
                            <option value="Chantier">Contrat de chantier</option>
                            <option value="COMMERCIALE">Contrat commerciale</option>
                        </select>
                    </div>
                    <div class="d-flex align-items-center ms-0">
                        <select v-model="statusQuery" class="form-select ms-2 me-2 w-180" @change="filter">
                            <option value="-">Tout</option>
                            <option value="1">Actif</option>
                            <option value="0">Non Actif</option>
                        </select>
                    </div>
                    <div class="d-flex align-items-center ms-auto">
                        <label for="">Afficher</label>
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
        <DataTable :items="filteredData" :headers="headers" :page-size=itemPerPage :actionsConfig="actionsConfig" />
    </div>
</template>
<style>
.w-240 {
    width: 240px;
}
</style>
