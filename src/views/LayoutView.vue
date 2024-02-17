<script setup lang="ts">
import { RouterView } from 'vue-router';
import { TheSideBar,TheTopBar,LogoutModal } from '@/components';
</script>

<template>
    <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
            <TheSideBar />
            <div class="layout-page">
                <div class="content-wrapper mt-4">
                    <TheTopBar />
                    <RouterView />
                </div>
            </div>
        </div>
        <LogoutModal />
    </div>
</template>

<style scoped>
.layout-wrapper {
    display: flex;
}

.layout-container {
    display: flex;
    flex-grow: 1;
}

.layout-page {
    margin-left: 280px;
    flex-grow: 1;
    padding: 20px;
    background: #f1f1f1;
}

@media (max-width: 1458px) {
    .sidebar {
        display: none; /* Hide the sidebar */
    }
    .layout-page {
        margin-left: 75px;
    }
}
</style>