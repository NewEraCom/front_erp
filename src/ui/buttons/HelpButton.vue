<script setup lang="ts">
import { HelpCanva } from '@/ui';
</script>

<template>
    <div>
        <div class="helping-menu">
            <button class="helping-btn" data-bs-toggle="offcanvas" data-bs-target="#helpCanva"
                aria-controls="helpCanva">
                <i class="ti ti-help"></i>
            </button>
        </div>
        <HelpCanva />
    </div>
</template>

<style scoped>
.helping-menu {
    position: fixed;
    bottom: 50%;
    right: -1px;
    z-index: 100;
}

.helping-btn {
    width: 60px;
    height: 45px;
    border: none;
    border-radius: 5px 0px 0px 5px;
    background-color: #ee6c16;
    color: white;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.helping-btn:focus {
    outline: none;
}

.helping-btn:hover,
.menu a:hover {
    background-color: #a7490b;
}
</style>