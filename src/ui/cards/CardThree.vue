<script setup lang="ts">

defineProps({
    title: String,
    count: String,
    color: String,
    icon: String,
    cardColor: String,
    actif: String,
});

</script>

<template>
    <div class="card" :class="cardColor">
        <div class="card-body">
            <div class="d-flex align-items-center mb-2 pb-1">
                <div class="avatar me-2">
                    <span class="avatar-initial rounded" :class="color"><i class="ti ti-md" :class="icon"></i></span>
                </div>
                <h4 class="ms-1 mb-0">
                    {{ count }}
                </h4>
            </div>
            <p class="mb-1">{{ title }}</p>
            <p class="mb-0 d-flex justify-content-start">
                <span class="fw-medium me-1 text-success fw-bold">
                    <i class="ti ti-progress-check"></i>
                    {{ actif }}
                </span>
                <span class="fw-medium me-1 text-danger fw-bold ms-2">
                    <i class="ti ti-progress-x ti-sm"></i>
                    {{ Number(count) - Number(actif) }}
                </span>
            </p>
        </div>
    </div>
</template>