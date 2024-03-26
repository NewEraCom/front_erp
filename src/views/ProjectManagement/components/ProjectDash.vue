<script setup lang="ts">
import { ref } from 'vue';
import { DataTable } from '@/ui';
import { formater } from '@/utils';
import router from '@/router';

const props = defineProps({
    projects: {
        type: Array,
        required: true,
    },
});

const headers = [
    { text: 'Projet', value: 'code', type: 'text' },
    { text: 'Client', value: 'client', type: 'soustraitant' },
    { text: 'Chef de projet', value: 'employee', type: 'project_manager' },
    { text: 'Budget', value: 'budget', type: 'currency' },
    { text: 'Date de début', value: 'date_start', type: 'date' },
    { text: 'Status', value: 'status', type: 'badge' },
];

const actionsConfig = [
    { icon: 'ti ti-eye', class: 'btn btn-primary btn-sm', onClick: (item: any) => router.push({ name: 'DetailsProject', params: { id: item.id } }) },
];

const filteredData = ref(props.projects);

const itemPerPage = ref(15);

</script>
<template>
    <div>
        <DataTable :items="filteredData" :headers="headers" :page-size=itemPerPage :actionsConfig="actionsConfig"
            buttonType="simple" disabled="on going" />
    </div>
</template>
<style>
.w-240 {
    width: 240px;
}
</style>
