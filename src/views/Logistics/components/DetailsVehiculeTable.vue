<script setup lang="ts">
import { ref } from 'vue';
import { DataTable } from '@/ui';
import { formater } from '@/utils';
import { useLogisticsStore } from '@/store';

const logisticsStore = useLogisticsStore();

const props = defineProps({
    items: {
        type: Array,
        required: true,
    },
});

const headers = [
    { text: 'Employee', value: 'employee', isComplex: true, type: 'employee' },
    { text: 'Date d\'affectation', value: 'date_affectation', type: 'gsm' },
    { text: 'Date de retour', value: 'date_retour', type: 'gsm' },
];

const actionsConfig = [
    { icon: 'ti ti-trash-filled', class: 'btn btn-danger btn-sm', onClick: (item: any) => deleteItem(item) },
];

const deleteItem = (item: any) => {
    logisticsStore.setSelectedItem({id:item.pivot.id,idVeh:item.pivot.vehicule_id});
    
    $('#delete-hist-modal').modal('show');
};

const filteredData = ref(props.items);

const searchQuery = ref('');
const itemPerPage = ref(15);

const filter = () => {
    filteredData.value = props.items.filter((item: any) => {
        const combinedFields = `${item.first_name} ${item.last_name}`.toLowerCase();
        const searchWords = searchQuery.value.toLowerCase().split(' ');
        return searchWords.every(word => combinedFields.includes(word));
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
            buttonType="simple" />
    </div>
</template>

<style>
.w-240 {
    width: 240px;
}
</style>
