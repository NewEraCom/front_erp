<script setup lang="ts">
import { ref } from 'vue';
import { DataTable } from '@/ui';
import router from '@/router';
import { helpers } from '@/utils';

const props = defineProps({
    purchaseOrders: {
        type: Array,
        required: true,
    },
});

const headers = [
    { text: 'N° de commande', value: 'num', type: 'text' },
    { text: 'Facture', value: 'facture', type: 'facture' },
    { text: 'Date de création', value: 'created_at', type: 'date' },
    { text: 'Status', value: 'status', type: 'badge' },
];

const actionsConfig = [
    {
        icon: 'ti ti-eye', class: 'btn btn-primary btn-sm', onClick: (item: any) => {
            console.log(item);
            router.push({ name: 'DetailBonCommande', params: { id: item.d_achat_id } });
        }
    },
];

const filteredData = ref(props.purchaseOrders);

const searchQuery = ref('');
const itemPerPage = ref(15);

const filter = () => {
    filteredData.value = props.purchaseOrders.filter((item: any) => {
        const combinedFields = `${item.raison_social} ${item.ville}`.toLowerCase();
        const searchWords = searchQuery.value.toLowerCase().split(' ');
        return searchWords.every(word => combinedFields.includes(word));

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
                    <input v-model="searchQuery" type="search" class="form-control w-240 me-2"
                        placeholder="Rechercher..." @input="filter" />
                    <div class="d-flex align-items-center ms-auto">
                        <label for="">Afficher</label>
                        <select v-model="itemPerPage" name="" class="form-select ms-2 me-2 w-120">
                            <option value="1">1</option>
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
            buttonType="simple" disabled="actif" />
    </div>
</template>

<style>
.w-240 {
    width: 240px;
}
</style>
