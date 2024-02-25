<script setup lang="ts">

</script>
<template>
    <div class="card h-100">
        <div class="card-body">
            <div class="d-flex align-items-center mb-2 pb-1">
                <div class="avatar me-2">
                    <span class="avatar-initial rounded"></span>
                </div>
                <div class="skeleton-text ms-1 mb-0" style="width: 50px; height: 1.2rem"></div>
            </div>
            <div class="mb-1 skeleton-text" style="width: 100%; height: 1rem"></div>
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
