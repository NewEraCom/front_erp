<script setup lang="ts">
import { watch, ref, computed, onMounted } from 'vue';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import { ModalReserve } from './components';
import { sharedService } from '@/services';
import { useSharedStore } from '@/store';

const sharedStore = useSharedStore();

const minDate = new Date();
const events = ref(computed(() => sharedStore.events));

const onEventClick = (event: any) => {
  console.log(event);
};

watch(events, () => {
  events.value = sharedStore.events;
}, { deep: true });

onMounted(async () => {
  sharedService.getEvent('event');
});

</script>
<template>
  <div class="flex-grow-1 container-fluid mt-3">
    <div class="d-flex align-items-center justify-content-between">
      <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Calendrier</span> </h5>
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addEventModal">
        <i class="ti ti-calendar-plus me-2"></i>
        Ajouter un événement
      </button>
    </div>
    <div class="card">
      <div v-if="events" class="card-body m-0 p-0 ">
        <vue-cal class="vuecal--green-theme" click-to-navigate :time-from="8 * 60" :time-to="19.5 * 60" :time-step="30"
          active-view="month" :disable-views="['years', 'year']" locale="fr" :min-date="minDate"
          style="width: 100%;height: 56rem" events-on-month-view="short" :events="events" hide-weekends
          :onEventClick="onEventClick" />
      </div>
    </div>
    <ModalReserve type="event" title="Ajouter un événement" />
  </div>
</template>

<style>
.vuecal__event.shared {
  background-color: rgba(255, 102, 102, 0.9);
  border: 1px solid rgb(235, 82, 82);
  color: #fff;
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
