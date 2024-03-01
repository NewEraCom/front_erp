<script setup lang="ts">
import { sharedService } from '@/services';
import { useSharedStore } from '@/store';
import { TopBarSupport } from './components';

import { ref, onMounted, onUnmounted, computed } from 'vue';

const sharedStore = useSharedStore();

const stats = ref(computed(() => sharedStore.dashboard.stats));


onMounted(async () => {
    await sharedService.getDashboard();
});

onUnmounted(() => {
    sharedStore.clearDashboardStats();
});

</script>
<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <h5 class="py-3 mb-4 fw-medium">Dashboard</h5>
        <TopBarSupport :stats="stats" />

    </div>
</template>

<style scoped></style>
