<script setup>
import { ref, computed } from 'vue';
import { LoaderView } from '@/ui';
import { useAuthStore } from '@/stores';

const store = useAuthStore();

const employee = ref(computed(() => store.getUser));

const env = import.meta.env.VITE_UPLOADS_URL;

</script>

<template>
    <div class="flex-grow-2 container-md mt-3 mb-5">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link :to="{ name: 'DashboardPortal' }">Dashboard</router-link>
                </li>
                <li class="breadcrumb-item active">Documents administratifs</li>
            </ol>
        </nav>

        <div class="alert alert-warning border-warning" role="alert">
            <p class="mb-0">Tous les documents doivent être cachetés par les ressources humaines avant utilisation.</p>
        </div>

        <div class="card mt-3">
            <div class="card-body m-0 p-0">
                <div class="row p-0 m-0 p-0">
                    <div class="col-12 border-bottom item-clicable p-3" @click="click('attestation_travail')">
                        <div class="d-flex align-items-center">
                            <div class="bg-primary align-items-center d-flex justify-content-center rounded-circle"
                                style="width: 45px;height: 45px;">
                                <i class="ti ti-folders text-white"></i>
                            </div>
                            <div class="d-block align-items-center ms-3">
                                <h6 class="mb-0">Attestation de travail</h6>
                            </div>
                            <i class="bg-secondary rounded-circle p-2 ti ti-chevron-right text-white ms-auto"></i>
                        </div>
                    </div>
                    <div class="col-12 border-bottom  item-clicable p-3">
                        <div class="d-flex align-items-center">
                            <div class="bg-primary align-items-center d-flex justify-content-center rounded-circle"
                                style="width: 45px;height: 45px;">
                                <i class="ti ti-folders text-white"></i>
                            </div>
                            <div class="d-block align-items-center ms-3">
                                <h6 class="mb-0">Attestation de salaire</h6>
                            </div>
                            <i class="bg-secondary rounded-circle p-2 ti ti-chevron-right text-white ms-auto"></i>
                        </div>
                    </div>
                    <div class="col-12 border-bottom  item-clicable p-3">
                        <div class="d-flex align-items-center">
                            <div class="bg-primary align-items-center d-flex justify-content-center rounded-circle"
                                style="width: 45px;height: 45px;">
                                <i class="ti ti-folders text-white"></i>
                            </div>
                            <div class="d-block align-items-center ms-3">
                                <h6 class="mb-0">Bulletin de paie</h6>
                            </div>
                            <i class="bg-secondary rounded-circle p-2 ti ti-chevron-right text-white ms-auto"></i>
                        </div>
                    </div>
                    <div class="col-12 border-bottom  item-clicable p-3">
                        <div class="d-flex align-items-center">
                            <div class="bg-primary align-items-center d-flex justify-content-center rounded-circle"
                                style="width: 45px;height: 45px;">
                                <i class="ti ti-folders text-white"></i>
                            </div>
                            <div class="d-block align-items-center ms-3">
                                <h6 class="mb-0">La chartre de l'entreprise</h6>
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
.btn-link {
    color: rgb(166, 0, 0);
    text-decoration: none;
    cursor: pointer;
    border: none;
    font-weight: 700;
}

.item-clicable:hover {
    cursor: pointer;
    background-color: #f5f5f5;

}

.container-md {
    padding-right: 0rem;
    padding-left: 0rem;
    width: 100% !important;
}
</style>