<script setup lang="ts">
import { watch, ref, computed, onMounted } from 'vue';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import { useSharedStore } from '@/store';
import { sharedService } from '@/services';
import { ModalReserve } from './components';

const sharedStore = useSharedStore();

const minDate = new Date();
const events = ref(computed(() => sharedStore.events));
const dataEvents = ref(events.value);

const onEventClick = (event: any) => {
    console.log(event);
};

watch(events, () => {
    dataEvents.value = events.value;
}, { deep: true });

onMounted(async () => {
    sharedService.getEvent('coursier');
});

</script>
<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <div class="d-flex align-items-center justify-content-between">
            <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Coursier</span> </h5>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addEventModal">
                <i class="ti ti-calendar-plus me-2"></i>
                Réserver un coursier
            </button>
        </div>
        <div class="card">
            <div v-if="events" class="card-body m-0 p-0 ">
                <vue-cal class="vuecal--green-theme" click-to-navigate :time-from="8 * 60" :time-to="19.5 * 60"
                    :time-step="30" active-view="month" :disable-views="['years', 'year']" locale="fr" :min-date="minDate"
                    style="width: 100%;height: 56rem" events-on-month-view="short" :events="dataEvents" hide-weekends
                    :onEventClick="onEventClick" />
            </div>
        </div>
        <ModalReserve type="coursier" title="Réserver un coursier" />
    </div>
</template>

<style>
.vuecal__event.coursier {
    background-color: rgb(239, 227, 67);
    border: 1px solid rgb(239, 194, 46);
    color: #000000;
}

.vuecal__event.personal {
    background-color: rgba(102, 107, 255, 0.9);
    border: 1px solid rgb(46, 62, 239);
    color: #fff;
}

.vuecal--green-theme .vuecal__menu {
    background-color: #2a3042ff !important;
}

.vuecal--green-theme .vuecal__title-bar {
    background-color: rgb(217, 221, 232) !important;
}
</style>
