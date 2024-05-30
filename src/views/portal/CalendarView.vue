<script setup>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import { ref, computed, onMounted } from 'vue';
import { usePortalStore } from '@/stores';
import { portalService } from '@/services';

const portalStore = usePortalStore();
const events = ref(computed(() => portalStore.events));


onMounted(async () => {
    await portalService.getEvents();
});

const minDate = ref(new Date().toISOString().split('T')[0]);
const dailyHours = { from: 8 * 60, to: 18 * 60, class: 'business-hours' }
const specialHours = {
    1: dailyHours,
    2: dailyHours,
    3: dailyHours,
    4: dailyHours,
    5: dailyHours,
    6: {
        from: 7 * 60,
        to: 20 * 60,
        class: 'closed',
        label: 'Fermé'
    }, 7: {
        from: 7 * 60,
        to: 20 * 60,
        class: 'closed',
        label: 'Fermé'
    }
}


</script>

<template>
    <div class="flex-grow-2 container-md mt-3 mb-5">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link :to="{ name: 'DashboardPortal' }">Dashboard</router-link>
                </li>
                <li class="breadcrumb-item active">Calendrier</li>
            </ol>
        </nav>

        <div class="bg-white shadow rounded" v-if="events != null">
            <div class="row">
                <div class="col-12 d-flex align-items-center">
                    <span class="d-flex align-items-center p-3">
                        <i class="ti ti-square-rounded-filled key-icon in-office me-2"></i>
                        <span class="fw-bold">Au bureau</span>
                    </span>
                    <span class="d-flex align-items-center p-3">
                        <i class="ti ti-square-rounded-filled key-icon leave me-2"></i>
                        <span class="fw-bold">Congé</span>
                    </span>
                    <span class="d-flex align-items-center p-3">
                        <i class="ti ti-square-rounded-filled key-icon sick-leave me-2"></i>
                        <span class="fw-bold">Congé maladie</span>
                    </span>
                    <span class="d-flex align-items-center p-3">
                        <i class="ti ti-square-rounded-filled key-icon remote me-2"></i>
                        <span class="fw-bold">Télétravail</span>
                    </span>
                </div>
            </div>
            <vue-cal style="height: 700px" active-view="month" :disable-views="['years', 'year']" :min-date="minDate"
                :special-hours="specialHours" locale="fr" :time-from="8 * 60" :time-to="19 * 60" :time-step="30"
                events-on-month-view="short" :events="events" hide-weekends hide-now-line hide-now-line-on-month-view>
            </vue-cal>
        </div>
    </div>
</template>

<style>
.key-icon {
    font-size: 1.5rem;
}

.in-office {
    color: #689bee;
}

.remote {
    color: #4cf65a;
}

.absent {
    color: #f64c4c;
}

.leave {
    color: #f6984c;
}

.sick-leave {
    color: #994cf6;
}

.vuecal__menu {
    background-color: #39465C !important;
    color: white;
}

.vuecal__cell--before-min {
    color: #b6bfd6;
}

.vuecal__cell--after-max {
    color: #008b8b;
}

.vuecal__now-line {
    color: #06c;
}

.leaves {
    background-color: #f6984c;
    color: #ffffff;
}

.sick-leaves {
    background-color: #994cf6;
    color: #ffffff;
}

.remote-works {
    background-color: #4cf65a;
    color: #ffffff;
}

.in-offices {
    background-color: #689bee;
    color: #f0f6ff;
}

.doctor-3 {
    background-color: #979797;
    color: #979797;
}

.closed {
    background:
        #fff7f0 repeating-linear-gradient(-45deg,
            rgba(255, 162, 87, 0.25),
            rgba(255, 162, 87, 0.25) 5px,
            rgba(255, 255, 255, 0) 5px,
            rgba(255, 255, 255, 0) 15px);
    color: #f6984c;
}
</style>