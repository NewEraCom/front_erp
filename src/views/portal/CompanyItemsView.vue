<script setup>


</script>

<template>
    <div class="flex-grow-2 container-md mt-3 mb-5">

        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link :to="{ name: 'DashboardPortal' }">Dashboard</router-link>
                </li>
                <li class="breadcrumb-item active">Article de l'entreprise</li>
            </ol>
        </nav>

        <div class="card mt-3">
            <div class="card-body m-0 p-0">
                <div class="row p-0 m-0 p-0">
                    <div class="col-12 border-bottom  item-clicable p-3">
                        <div class="d-flex align-items-center">
                            <div class="bg-primary align-items-center d-flex justify-content-center rounded-circle"
                                style="width: 45px;height: 45px;">
                                <i class="ti ti-bookmark-filled text-white"></i>
                            </div>
                            <div class="d-block align-items-center ms-3">
                                <h6 class="mb-2">Macbook Pro 2021 16 pouces</h6>
                                <small class="text-muted fw-medium">Affectation: 2021-09-01</small>
                            </div>
                            <i class="bg-secondary rounded-circle p-2 ti ti-chevron-right text-white ms-auto"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.item-clicable:hover {
    background-color: #f5f5f5;
    cursor: pointer;
    border-radius: 8px;
}
</style>