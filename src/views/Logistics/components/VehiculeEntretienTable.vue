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
    { text: 'Kilometrage', value: 'kilometrage', type: 'meq' },
    { text: 'Date du service', value: 'service_date', type: 'meq' },
    { text: 'Date du prochain service', value: 'next_service', type: 'meq' },
];

const actionsConfig = [
    { icon: 'ti ti-trash-filled', class: 'btn btn-danger btn-sm', onClick: (item: any) => deleteItem(item) },
];

const deleteItem = (item: any) => {
    logisticsStore.setSelectedItem({id:item.pivot.id,idVeh:item.id});
    $('#delete-modal').modal('show');

};

const filteredData = ref(props.items);

const searchQuery = ref('');
const itemPerPage = ref(15);
const startQuery = ref();
const endQuery = ref();
const filter = () => {
    filteredData.value = props.items.filter((item: any) => {
        const combinedFields = `${item.pivot.kilometrage} ${item.pivot.service_date}`.toLowerCase();
        const searchWords = searchQuery.value.toLowerCase().split(' ');
        return searchWords.every(word => combinedFields.includes(word)) &&
             (!startQuery.value || formater.startOfDay(item.pivot.service_date) >= formater.startOfDay(startQuery.value)) &&
            (!endQuery.value || formater.startOfDay(item.pivot.next_service) <= formater.startOfDay(endQuery.value));
    });

};

</script>

<template>
    <div>
        <div class="row mb-4">
            <div class="col-12">
                <div class="d-flex align-items-center">
                    <!-- <input v-model="searchQuery" type="search" class="form-control w-240 me-2"
                        placeholder="Rechercher..." @input="filter" /> -->
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
