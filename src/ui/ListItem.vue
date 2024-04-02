<script setup lang="ts">
import { helpers } from '@/utils';
defineProps({
    preProject: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <li class="d-flex align-items-center mb-4">
        <img src="/src/assets/img/icons/brands/social-label.png" alt="User" class="rounded-circle me-3" width="34" />
        <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
            <div class="me-2">
                <div class="d-flex align-items-center">
                    <router-link :to="{ name: 'PreProjectDetail', params: { id: preProject.id } }" target="_blank">
                        <h6 class="mb-0 me-1 fw-bold text-primary">
                            {{ helpers.limitedClientName(preProject.maitre_ouvrage) }}
                        </h6>
                    </router-link>
                </div>
                <small class="text-muted">{{ preProject.n_offre }}</small>
            </div>
            <div class="user-progress">
                <span class="badge" :class="helpers.returnBadge(preProject.status)[0]">
                    <i class="ti font-18" :class="helpers.returnBadge(preProject.status)[2]"></i>
                </span>
            </div>
        </div>
    </li>
</template>

<style scoped>
.font-18 {
    font-size: 18px !important;
}
</style>
