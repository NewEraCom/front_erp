<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useLogisticsStore } from '@/store';
import { logisticsService } from '@/services';
import { CardCaisse } from '@/ui';

const logisticsStore = useLogisticsStore();

const caisse = ref(computed(() => logisticsStore.caisse.stats));

onMounted(async () => {
    await logisticsService.getCaisse();
});

onUnmounted(() => {
    logisticsStore.clearCaisse();
});


</script>
<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <h5 class="py-3 mb-4 fw-medium">Dashboard</h5>
        <div v-if="caisse" class="row">
            <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 mb-4">
                <CardCaisse :stats="caisse" />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
