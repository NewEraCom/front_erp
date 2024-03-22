<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';

import { useSharedStore, useRhStore } from '@/store';
import { TopBarSupport } from './components';
import { EmployeeChart } from '../HumanRessources/components';

import { sharedService, rhService } from '@/services';

const RhStore = useRhStore();
const sharedStore = useSharedStore();

const stats = ref(computed(() => sharedStore.dashboard.stats));
const rhStats = ref(computed(() => RhStore.stats));


onMounted(async () => {
    await rhService.getEmployees();
    await sharedService.getDashboard();
});

onUnmounted(() => {
    RhStore.clearStats();
    sharedStore.clearDashboardStats();
});

</script>
<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <h5 class="py-3 mb-4 fw-medium">Dashboard</h5>
        <TopBarSupport :stats="stats" />

        <div v-if="rhStats" class="row mt-2 g-3">
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-6">
                <EmployeeChart title="Statistique des employés" subtitle="Nombre d'employés par mois en"
                    color="rgb(37, 144, 250)" :data="rhStats.employee_per_month" pin="total_employee"
                    legened="Employees" type="line" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-6">
                <EmployeeChart title="Statistique des salaires" subtitle="Mass salarial par mois en"
                    color="rgb(103, 52, 235)" :data="rhStats.mass_salariale_per_month" pin="masse"
                    legened="Mass Salariale" type="bar" />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
