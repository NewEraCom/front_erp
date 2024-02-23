<script setup lang="ts">

defineProps({
    title: String,
    count: String,
    color: String,
    icon: String,
    cardColor: String,
});

</script>

<template>
    <div class="card" :class="cardColor">
        <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
                <div class="content-left">
                    <h4 class="mb-0">{{ count }}</h4>
                    <small>{{ title }}</small>
                </div>
                <span class="badge bg-label-primary rounded-circle p-2">
                    <i class="ti" :class="icon"></i>
                </span>
            </div>
        </div>
    </div>
</template>