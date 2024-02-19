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
            <div class="d-flex align-items-center mb-2 pb-1">
                <div class="avatar me-2">
                    <span class="avatar-initial rounded" :class="color">
                        <i class="ti-md ti" :class="icon"></i>
                    </span>
                </div>
                <h4 class="ms-1 mb-0 fw-bold">{{ count }}</h4>
            </div>
            <p class="mb-1 fw-bold">{{ title }}</p>
        </div>
    </div>
</template>