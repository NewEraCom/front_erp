<script setup lang="ts">
import { ref } from 'vue';
import { DataTable } from '..';

const props = defineProps({
    composants: {
        type: Array,
        required: true,
    },
});

const headers = (props.composants as any[]).map(item => {
    return {
        text: (item as any).key.charAt(0).toUpperCase() + (item as any).key.slice(1), 
        value: (item as any).key,
        type: 'text' 
    };
});



const actionsConfig = [];

const filteredData = ref(props.composants);
const itemPerPage = ref(15);

</script>
<template>
    <div>
        <DataTable :items="filteredData" :headers="headers" :page-size='itemPerPage' :actionsConfig="actionsConfig" />
    </div>
</template>