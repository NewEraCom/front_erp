<script setup lang="ts">
import { ref } from 'vue';
import { DataTable, Modal } from '@/ui';
import { formater, helpers } from '@/utils';
import { rhService } from '@/services';
import { useRhStore } from '@/store';
import { useRouter } from 'vue-router';

const rhStore = useRhStore();
const router = useRouter();
const props = defineProps({
    leaves: {
        type: Array,
        required: true,
    },
});

const headers = [
    { text: 'Employe', value: 'employee', isComplex: true, type: 'leave' },
    { text: 'Type', value: 'type', type: 'badge' },
    { text: 'Durée', value: 'duree', type: 'days' },
    { text: 'Date de début', value: 'date_start', type: 'date' },
    { text: 'Date de fin', value: 'date_end', type: 'date' },
    { text: 'Date de demande', value: 'created_at', type: 'datetime' },
    { text: 'Validation Responsable', value: 'validation_responsable', type: 'badge' },
    { text: 'Status', value: 'status', type: 'badge' },
];

const actionsConfig = [
    { icon: 'ti ti-eye', class: 'btn btn-primary btn-sm', onClick: (item: any) => detailsItem(item) },
    
    
];
if( [helpers.roles.DG ,helpers.roles.RH ].includes(localStorage.getItem('role'))){
    actionsConfig.push({ icon: 'ti ti-check', class: 'btn btn-success btn-sm', onClick: (item: any) => {
        showValidationModal(item);
    } },
    { icon: 'ti ti-ban', class: 'btn btn-warning btn-sm', onClick: (item: any) => RejectItem(item) },
    { icon: 'ti ti-trash', class: 'btn btn-danger btn-sm', onClick: (item: any) => deleteItem(item) },
    );
}else{
    actionsConfig.push(
    { icon: 'ti ti-check', class: 'btn btn-success btn-sm', onClick: (item: any) => showValidationModal(item) },
    { icon: 'ti ti-x', class: 'btn btn-danger btn-sm', onClick: (item: any) => RejectItem(item) },
    );
}

const detailsItem = (item: any) => {
    console.log(item);
    rhStore.setItem(item);
    $('#showLeave').modal('show');
    // router.push({ name: 'ProfileEmployee', params: { id: item.employe.id } });

};

const showValidationModal = (item: any) => {
    rhStore.setItemId(item.id);

    $('#validate-modal').modal('show');

};

const RejectItem = (item: any) => {
    console.log('Delete item', item);
    rhStore.setItemId(item.id);

    $('#reject-modal').modal('show');
};
const deleteItem = (item: any) => {
    console.log('Delete item', item);
    rhStore.setItemId(item.id);

    $('#delete-leave').modal('show');
};

const filteredData = ref(props.leaves);

const searchQuery = ref('');
const statusQuery = ref('-');
const startQuery = ref();
const endQuery = ref();
const itemPerPage = ref(15);

const filter = () => {
    filteredData.value = props.leaves.filter((item: any) => {
        const combinedFields = `${item.employe.first_name} ${item.employe.last_name} ${item.employe.matricule} ${item.type}`.toLowerCase();
        const searchWords = searchQuery.value.toLowerCase().split(' ');
        return searchWords.every(word => combinedFields.includes(word)) &&
            (statusQuery.value === '-' || item.status === statusQuery.value) && (!startQuery.value || formater.startOfDay(item.created_at) >= formater.startOfDay(startQuery.value)) &&
            (!endQuery.value || formater.startOfDay(item.created_at) <= formater.startOfDay(endQuery.value));
    });

};
const downloadFile = async() => {
    
await rhService.CongeExport()
            .then((res) => {
                let blob;
                if (res instanceof Blob) {
                    blob = res;
                } else {
                    blob = new Blob([res]);
                }
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'Conge.xlsx';
                link.click();
            })
            .catch(() => {
               
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
