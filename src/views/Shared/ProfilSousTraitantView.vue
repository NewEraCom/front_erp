<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { sharedService } from '@/services';
import { useSharedStore } from '@/store';
// import { helpers } from '@/utils';

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});

const sharedStore = useSharedStore();


const worker = ref(computed(() => sharedStore.soustraitant));


onMounted(async () => {
    await sharedService.getSousTraitantById(props.id);
});

onUnmounted(() => {
    sharedStore.soustraitant = null;
});


watch(sharedStore.worker, (newValue) => {
    worker.value = newValue;
}, { deep: true });

// const getFileUrl = (attachment) => {
//   return helpers.baseUrl() + `uploads/${attachment}`;
// };


</script>

<template>
    <main>
        Prodile sous traitant
    </main>
</template>