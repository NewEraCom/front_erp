<script lang="ts" setup>
defineProps({
    text: String,
    icon: String,
    to: String,
})
</script>

<template>
    <router-link :to="{ name: to }" class="btn btn-white btn-lg" type="button">
        <div class="d-flex justify-content-between align-items-center me-auto">
            <i class="ti me-3" :class="icon"></i>
            <small>
                <strong>{{ text }}</strong>
            </small>
        </div>
        <div class="text-primary">
            <i class="ti ti-chevron-right m-auto"></i>
        </div>
    </router-link>
</template>


<style scoped>
.btn {
    height: 50px !important;
    color: #1e1e1e !important;
}

.btn:hover {
    border: 1px solid #1e1e1e !important;
}
</style>