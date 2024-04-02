<script setup>
import { formater } from '@/utils';

defineProps({
    item: {
        type: Object,
        required: true,
    }
});

const getTitle = (type) => {
    switch (type) {
        case 'total':
            return ['Total des cautions', 'bg-label-primary'];
        case 'in':
            return ['Caution provisoire non récupéré', 'bg-label-danger'];
        case 'out':
            return ['Caution provisoire récupéré', 'bg-label-success'];
        case 'def_in':
            return ['Caution defenitive non récupéré', 'bg-label-warning'];
        case 'def_out':
            return ['Caution defenitive récupéré', 'bg-label-info'];
        default:
            return 'Total Income';
    }
};
</script>

<template>
    <li class="d-flex mb-3">
        <div class="avatar flex-shrink-0 me-3">
            <span class="avatar-initial rounded" :class="getTitle(item.type)[1]">
                <i class="ti ti-coins"> </i>
            </span>
        </div>
        <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
            <div class="me-2">
                <h6 class="mb-0 fw-bold">{{ getTitle(item.type)[0] }}</h6>
                <small>{{ formater.number(item.total) }} MAD</small>
            </div>
        </div>
    </li>
</template>

<style></style>
