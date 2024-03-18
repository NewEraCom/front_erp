<script setup lang="ts">
defineProps({
    itemOne: {
        type: Array,
        required: true,
    },
    itemTwo: {
        type: Array,
        required: true,
    },
    itemThree: {
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
                            <div class="col-sm-6 col-lg-4">
                                <div
                                    class="d-flex justify-content-between align-items-start card-widget-1 border-end pb-3 pb-sm-0">
                                    <div>
                                        <h6 class="fw-bold mb-2">{{ itemOne[0] }}</h6>
                                        <h5 class="fw-bold mb-2">
                                            {{ itemOne[1] }}
                                            <small v-if="itemOne[2] === 'currency'" class="fw-bold">MAD</small>
                                        </h5>
                                    </div>
                                    <span class="avatar me-sm-4">
                                        <span class="avatar-initial rounded" :class="itemOne[4]">
                                            <i class="ti-md" :class="itemOne[3]"></i>
                                        </span>
                                    </span>
                                </div>
                                <hr class="d-none d-sm-block d-lg-none me-4">
                            </div>
                            <div class="col-sm-6 col-lg-4">
                                <div
                                    class="d-flex justify-content-between align-items-start card-widget-1 border-end pb-3 pb-sm-0">
                                    <div>
                                        <h6 class="fw-bold mb-2">{{ itemTwo[0] }}</h6>
                                        <h5 class="fw-bold mb-2">
                                            {{ itemTwo[1] }}
                                            <small v-if="itemTwo[2] === 'currency'" class="fw-bold">MAD</small>
                                        </h5>
                                    </div>
                                    <span class="avatar me-sm-4">
                                        <span class="avatar-initial rounded" :class="itemTwo[4]">
                                            <i class="ti-md" :class="itemTwo[3]"></i>
                                        </span>
                                    </span>
                                </div>
                                <hr class="d-none d-sm-block d-lg-none me-4">
                            </div>
                            <div class="col-sm-6 col-lg-4">
                                <div
                                    class="d-flex justify-content-between align-items-start card-widget-1  pb-3 pb-sm-0">
                                    <div>
                                        <h6 class="fw-bold mb-2">{{ itemThree[0] }}</h6>
                                        <h5 class="fw-bold mb-2">
                                            {{ itemThree[1] }}
                                            <small v-if="itemThree[2] === 'currency'" class="fw-bold">MAD</small>
                                        </h5>
                                    </div>
                                    <span class="avatar me-sm-4">
                                        <span class="avatar-initial rounded" :class="itemThree[4]">
                                            <i class="ti-md" :class="itemThree[3]"></i>
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
