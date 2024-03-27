<script setup lang="ts">
import { ref } from 'vue';
import { DataTable } from '@/ui';

const props = defineProps({
    preproject: {
        type: Array,
        required: true,
    },
});

const headers = [
    { text: 'PROJET', isComplex:true,type: 'preProjects'},
    { text: 'STATUS', value: 'status',type:'badge'}
];


const filteredData = ref(props.preproject);
const itemPerPage = ref(4);

</script>

<template>
    <div>
        <DataTable :items="filteredData" :headers="headers" :page-size='itemPerPage'
        buttonType="simple" disabled="on going" />
    </div>
</template>