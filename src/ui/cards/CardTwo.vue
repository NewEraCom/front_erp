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
    <div class="card h-100" :class="cardColor">
        <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
                <div class="content-left">
                    <h4 class="mb-0 fw-bold">{{ count }}</h4>
                    <small class="fw-bold">{{ title }}</small>
                </div>
                <span class="badge rounded-circle p-2" :class="color">
                    <i class="ti" :class="icon"></i>
                </span>
            </div>
        </div>
    </div>
</template>