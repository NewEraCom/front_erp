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
                <li class="breadcrumb-item active">Votre dossier RH</li>
            </ol>
        </nav>

        <div class="row mt-3" v-if="employee">
            <div class="col-12 text-center" v-if="employee">
                <div class="card shadow">
                    <div class="card-body">
                        <img src="@/assets/img/no_pre_project.png" height="350px" alt="">
                        <p class="mt-4">Rien ici pour l'instant !</p>
                        <p class="text-muted fw-normal">Il n'y a aucun document téléchargé par la ressource humaine
                            responsable.</p>
                    </div>
                </div>
            </div>
            <div class="col-12" v-else>
                <iframe :src="contrat" width="100%" height="1200vh" style="border: none;">
                </iframe>
            </div>
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