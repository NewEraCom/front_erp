<script setup lang="ts">
import { ref } from 'vue';
import { DataTable } from '@/ui';
import { formater, helpers } from '@/utils';
import router from '@/router';

const props = defineProps({
    purchaseOrders: {
        type: Array,
        required: true,
    },
});

const headers = [
    { text: 'N° de commande', value: 'n_order', type: 'text' },
    { text: 'Créé par', value: 'created_by', type: 'created_by' },
    { text: 'Projet', value: 'project', type: 'project' },
    { text: 'Date de création', value: 'created_at', type: 'datetime' },
    { text: 'Status', value: 'status', type: 'badge' },
];

const actionsConfig = [
    {
        icon: 'ti ti-eye',class: 'btn btn-primary btn-sm', onClick: (item: any) => {
            router.push(`/purchase-order/details/${item.id}`);
        }
    },
];

// if ([helpers.roles.DG , helpers.roles.DS ,helpers.roles.DO ].includes(localStorage.getItem('role'))) {
//     actionsConfig.push({ icon: 'ti ti-check', class: 'btn btn-success btn-sm', onClick: (item: any) => {
//         console.log(item);
        
//     },type: 'validate'});
// }
// <button v-for="action in actionsConfig" :key="action.icon" class="btn me-2"
//                             :class="['delete', 'validate'].includes(action.type) && item.status != 'on going' ? 'btn btn-secondary btn-sm' : action.class"
//                             @click="action.onClick(item)"
//                             :disabled="['delete', 'validate'].includes(action.type) && item.status != 'on going'">
//                             <i v-if="action.type == 'potential'"
//                                 :class="item.potentiel === '1' ? 'ti ti-bookmark-filled' : 'ti ti-bookmark'"></i>
//                             <i v-else :class="action.icon"></i>
//                         </button>



const filteredData = ref(props.purchaseOrders);

const searchQuery = ref('');
const statusQuery = ref('-');
const startQuery = ref();
const endQuery = ref();
const itemPerPage = ref(15);

const filter = () => {
    filteredData.value = props.purchaseOrders.filter((item: any) => {
        const combinedFields = `${item.created_by.employee.first_name} ${item.created_by.employee.last_name} ${item.project.code} ${item.n_order}`.toLowerCase();
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
                            <option value="need validation">Besoin de validation</option>
                            <option value="pending">En attente</option>
                            <option value="on going">En cours</option>
                            <option value="done">Traité</option>
                            <option value="on road">En route</option>
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
            buttonType="simple" disabled="on going" />
    </div>
</template>
<style>
.w-240 {
    width: 240px;
}
</style>
