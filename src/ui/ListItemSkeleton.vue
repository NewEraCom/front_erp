<script setup lang="ts"></script>

<template>
    <li class="d-flex align-items-center mb-4">
        <div class="skeleton-image rounded-circle me-3"></div>
        <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
            <div class="me-2">
                <div class="d-flex align-items-center">
                    <div class="skeleton-title"></div>
                </div>
                <div class="skeleton-text"></div>
            </div>
            <div class="user-progress">
                <div class="skeleton-badge"></div>
            </div>
        </div>
    </li>
</template>

<style>
.skeleton-image {
    width: 46px;
    height: 40px;
    background-color: #a7a7a7;
    animation: fadeInOut 1.5s infinite;
}

.skeleton-title {
    width: 180px;
    height: 22px;
    border-radius: 4px;
    background-color: #a7a7a7;
    animation: fadeInOut 1.5s infinite;
}

.skeleton-text {
    margin-top: 5px;
    width: 120px;
    height: 18px;
    border-radius: 4px;
    background-color: #a7a7a7;
    animation: fadeInOut 1.5s infinite;
}

.skeleton-badge {
    width: 46px;
    height: 32px;
    border-radius: 4px;
    background-color: #a7a7a7;
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