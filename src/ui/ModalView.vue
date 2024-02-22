<script setup lang="ts">
defineProps({
    title: String,
    id: String,
    className: String,
    size: {
        type: String,
        default: 'md',
    },
});

</script>

<template>
    <div :id="id" class="modal fade" :class="className" data-bs-backdrop="static" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" :class="size" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title fw-bold">{{ title }}</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <slot>
                </slot>
            </div>
        </div>
    </div>
</template>

<style>
    .modal {
    position: fixed;
    /* Or another non-static position */
    z-index: 10000;
    /* Adjust as needed */
}
</style>
