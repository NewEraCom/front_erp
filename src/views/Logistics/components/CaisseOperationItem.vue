<script setup lang="ts">
import { formater } from '@/utils';

defineProps({
    transactions: Object
});

</script>
<template>
    <ul class="m-0 p-0">
        <li v-for="item of transactions" :key="item.id" class="d-flex mb-3 align-items-center">
            <div :class="item.operation == 'entree' ? 'bg-label-success' : 'bg-label-danger'"
                class="badge me-3 rounded p-2">
                <i class="fw-bold ti" :class="item.operation == 'entree' ? 'ti-chevron-up' : 'ti-chevron-down'
                    "></i>
            </div>
            <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                <div class="me-2">
                    <small class="text-dark d-block">
                        {{ item.emetteur ? 'Emetteur :' : 'Recepteur :' }}
                        {{
                            item.emetteur
                            ? item.emetteur
                            : item.recepteur.last_name + ' ' + item.recepteur.first_name
                        }}
                    </small>
                    <small class="text-muted mb-0 fw-bold">{{ item.date_operation }}</small>
                </div>
                <div class="user-progress d-flex align-items-center gap-1">
                    <h6 class="mb-0" :class="item.operation == 'entree' ? 'text-success' : 'text-danger'">
                        {{ formater.number(item.montant) }}
                        <small class="fw-bold">MAD</small>
                    </h6>
                </div>
            </div>
        </li>
    </ul>
</template>