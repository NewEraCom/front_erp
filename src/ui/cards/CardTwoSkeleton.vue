<script setup lang="ts">
</script>
<template>
    <div class="card h-100">
        <div class="card-body d-flex justify-content-between align-items-center">
            <div class="card-title mb-0">
                <div class="skeleton-text pb-2" style="width: 40px; height: 1rem"></div>
                <small class="fw-bold">
                    <div class="skeleton-text" style="width: 130px; height: 0.8rem"></div>
                </small>
            </div>
            <div class="card-icon">
                <span class="badge rounded p-3 bg-secondary">
                    <i class="ti-sm"></i>
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.avatar-initial {
    background-color: #a7a7a7;
    border-radius: 4px;
    opacity: 0.4;
    height: 100%;
    width: 100%;
    margin-bottom: 0.5rem;
    animation: fadeInOut 1.5s infinite;
}

.skeleton-text {
    background-color: #a7a7a7;
    border-radius: 4px;
    opacity: 0.4;
    height: 1rem;
    width: 100%;
    margin-bottom: 0.5rem;
    animation: fadeInOut 1.5s infinite;
}

@keyframes fadeInOut {

    0%,
    100% {
        opacity: 0.8;
    }

    50% {
        opacity: 0.2;
    }
}
</style>
