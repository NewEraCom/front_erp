<script setup lang="ts">
import { helpers } from '@/utils';

const role = localStorage.getItem('role');
defineProps({
    stats: {
        type: Array,
        required: true,
    },

});
</script>

<template>
      <div class="row g-3" v-if="[helpers.roles.DG,helpers.roles.DS,helpers.roles.DO].includes(role)">
        <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <div class="card card-border-shadow-primary shadow-none mb-4">
                <div class="card-widget-separator-wrapper">
                    <div class="card-body card-widget-separator">
                        <div class="row gy-4 gy-sm-1">
                            
                            <div class="col-sm-6 col-lg-4">
                                <div
                                    class="d-flex justify-content-between align-items-start card-widget-1 border-end pb-3 pb-sm-0">
                                    <div>
                                        <h6 class="fw-bold mb-2">Total Budgets Saisie</h6>
                                        <h5 class="fw-bold mb-2">
                                            {{ stats.total }}
                                        </h5>
                                    </div>
                                    <span class="avatar me-sm-4">
                                        <span class="avatar-initial bg-label-warning rounded">
                                            <i class="ti ti-md ti-users-group"></i>
                                        </span>
                                    </span>
                                </div>
                                <hr class="d-none d-sm-block d-lg-none me-4">
                            </div>
                            <div class="col-sm-6 col-lg-4">
                                <div
                                    class="d-flex justify-content-between align-items-start card-widget-1 border-end pb-3 pb-sm-0">
                                    <div>
                                        <h6 class="fw-bold mb-2">Total Budgets Siege</h6>
                                        <h5 class="fw-bold mb-2">
                                            {{ stats.total_budget }}
                                            <small class="fw-bold">MAD</small>
                                        </h5>
                                    </div>
                                    <span class="avatar me-sm-4">
                                        <span class="avatar-initial bg-label-danger rounded">
                                            <i class="ti ti-md ti-coins"></i>
                                        </span>
                                    </span>
                                </div>
                                <hr class="d-none d-sm-block d-lg-none me-4">
                            </div>
                            <div class="col-sm-6 col-lg-4">
                                <div class="d-flex justify-content-between align-items-start card-widget-1 pb-3 pb-sm-0">
                                    <div>
                                        <h6 class="fw-bold mb-2">Total Budgets Projets</h6>
                                        <h5 class="fw-bold mb-2">
                                            {{ stats.count_projets }}
                                            <small class="fw-bold">MAD</small>
                                        </h5>
                                    </div>
                                    <span class="avatar me-sm-4">
                                        <span class="avatar-initial bg-label-success rounded">
                                            <i class="ti ti-md ti-coins"></i>
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div class="row g-3" v-else>
        <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <div class="card card-border-shadow-primary shadow-none mb-4">
                <div class="card-widget-separator-wrapper">
                    <div class="card-body card-widget-separator">
                        <div class="row gy-4 gy-sm-1">
                            
                            <div class="col-sm-6 col-lg-6">
                                <div
                                    class="d-flex justify-content-between align-items-start card-widget-1 border-end pb-3 pb-sm-0">
                                    <div>
                                        <h6 class="fw-bold mb-2">Total Budgets Saisie</h6>
                                        <h5 class="fw-bold mb-2">
                                            {{ stats.count_siege }}
                                        </h5>
                                    </div>
                                    <span class="avatar me-sm-4">
                                        <span class="avatar-initial bg-label-warning rounded">
                                            <i class="ti ti-md ti-users-group"></i>
                                        </span>
                                    </span>
                                </div>
                                <hr class="d-none d-sm-block d-lg-none me-4">
                            </div>
                            <div class="col-sm-6 col-lg-6">
                                <div
                                    class="d-flex justify-content-between align-items-start card-widget-1 border-end pb-3 pb-sm-0">
                                    <div>
                                        <h6 class="fw-bold mb-2">Total Budgets Siege</h6>
                                        <h5 class="fw-bold mb-2">
                                            {{ stats.total_budget }}
                                            <small class="fw-bold">MAD</small>
                                        </h5>
                                    </div>
                                    <span class="avatar me-sm-4">
                                        <span class="avatar-initial bg-label-danger rounded">
                                            <i class="ti ti-md ti-coins"></i>
                                        </span>
                                    </span>
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
</template>