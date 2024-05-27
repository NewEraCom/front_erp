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
                <li class="breadcrumb-item active">Contracts</li>
            </ol>
        </nav>
        <div class="row" v-if="employee">
            <div class="col-12 d-flex align-items-center">
                <h6 class="m-0">Vos Contrats</h6>
            </div>
            <div class="col-12 mt-4" v-if="employee.contrat">
                <iframe :src="env + 'uploads/contrats/' + employee.contrat" width="100%" height="1000vh"
                    style="border: none;">
                </iframe>
            </div>
            <div class="col-12 text-center mt-4" v-else>
                <div class="card">
                    <div class="card-body">
                        <img src="@/assets/img/no_pre_project.png" height="350px" alt="">
                        <h6 class="mt-4 fw-bold">Rien ici pour l'instant !</h6>
                        <p class="text-muted fw-medium">Quand vous obtenez un nouveau contrat, vous le trouverez ici.
                        </p>
                    </div>
                </div>
            </div>
            <UploadCvCanva />
        </div>
        <LoaderView v-else />
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