<script setup lang="ts">
import { ref } from 'vue';
import { DataTable } from '@/ui';
import { useSalesStore } from '@/store';

const salesStore = useSalesStore();

const props = defineProps({
    items: {
        type: Array,
        required: true,
    },
});

const headers = [
    { text: 'Designation', value: 'designation', type: 'text' },
    { text: 'Unite', value: 'unite', type: 'text' },
    { text: 'Qte', value: 'qte', type: 'number' },
    { text: 'Comsomation', value: 'suivie', type: 'number' },
    { text: 'Etat', value: 'état', type: 'percentage' },
];

const actionsConfig = [
    {
        class: 'btn btn-primary btn-sm', icon: 'ti ti-square-rounded-plus', onClick: (item: any) => {
            salesStore.setSelectedItem(item);
            $('#suivieModal').modal('show');
        },
    },
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
                    <button class="btn btn-secondary" disabled data-bs-toggle="modal" data-bs-target="#import-modal">
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