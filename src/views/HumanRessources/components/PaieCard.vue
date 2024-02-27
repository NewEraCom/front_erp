<script setup lang="ts">
import { formater } from '@/utils';

defineProps({
    itemOne: {
        type: Array,
        required: true,
    },

});
</script>

<template>
    <div class="row g-3">
        <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <div class="card card-border-shadow-primary shadow-none mb-4">
                <div class="card-widget-separator-wrapper">
                    <div class="card-body card-widget-separator">
                        <div class="row gy-4 gy-sm-1">
                            <div class="col-sm-6 col-lg-3">
                                <div
                                    class="d-flex justify-content-between align-items-start card-widget-1 border-end pb-3 pb-sm-0">
                                    <div>
                                        <h6 class="fw-bold mb-2">Mois</h6>
                                        <h5 class="fw-bold mb-2">
                                            {{ itemOne[0] }}
                                        </h5>
                                    </div>
                                    <span class="avatar me-sm-4">
                                        <span class="avatar-initial bg-label-primary rounded">
                                            <i class="ti ti-md ti-calendar"></i>
                                        </span>
                                    </span>
                                </div>
                                <hr class="d-none d-sm-block d-lg-none me-4">
                            </div>
                            <div class="col-sm-6 col-lg-3">
                                <div
                                    class="d-flex justify-content-between align-items-start card-widget-1 border-end pb-3 pb-sm-0">
                                    <div>
                                        <h6 class="fw-bold mb-2">Total Employee</h6>
                                        <h5 class="fw-bold mb-2">
                                            {{ itemOne[1] }}
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
                            <div class="col-sm-6 col-lg-3">
                                <div
                                    class="d-flex justify-content-between align-items-start card-widget-1 border-end pb-3 pb-sm-0">
                                    <div>
                                        <h6 class="fw-bold mb-2">Total Salaire</h6>
                                        <h5 class="fw-bold mb-2">
                                            {{ formater.number(itemOne[2] as number) }}
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
                            <div class="col-sm-6 col-lg-3">
                                <div class="d-flex justify-content-between align-items-start card-widget-1 pb-3 pb-sm-0">
                                    <div>
                                        <h6 class="fw-bold mb-2">Total Prime</h6>
                                        <h5 class="fw-bold mb-2">
                                            {{ formater.number(itemOne[3] as number) }}
                                            <small class="fw-bold">MAD</small>
                                        </h5>
                                    </div>
                                    <span class="avatar me-sm-4">
                                        <span class="avatar-initial bg-label-success rounded">
                                            <i class="ti ti-md ti-coins"></i>
                                        </span>
                                    </span>
                                </div>
                                <hr class="d-none d-sm-block d-lg-none me-4">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
