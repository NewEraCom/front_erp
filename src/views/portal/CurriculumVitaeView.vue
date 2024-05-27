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
                <li class="breadcrumb-item active">CV (Curriculum Vitae)</li>
            </ol>
        </nav>
        <div class="row" v-if="employee">
            <div class="col-12 d-flex align-items-center" v-if="employee">
                <h6 class="m-0">Votre Curriculum Vitae</h6>
                <button class="btn btn-outline-primary btn-sm ms-auto" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#uploadCv" aria-controls="offcanvasEnd" v-if="employee.cv != null">
                    <i class="ti ti-pencil me-2"></i>
                    Modifier
                </button>
            </div>
            <div class="col-12 mt-4" v-if="employee && employee.cv">
                <iframe :src="env + 'uploads/cv/' + employee.cv" width="100%" height="1000vh" style="border: none;">
                </iframe>
            </div>
            <div class="col-12 mt-4 text-center" v-else>
                <div class="card shadow-none border">
                    <div class="card-body">
                        <img src="@/assets/img/No_Results.png" height="250px" alt="alert" class="me-2" />
                        <h5 class="fw-medium mb-1">Vous n'avez pas encore de CV</h5>
                        <p class="text-muted fw-normal">
                            Merci de télécharger votre CV pour compléter votre profil
                        </p>
                        <button class="btn btn-outline-primary  mt-3" type="button" data-bs-toggle="offcanvas"
                            data-bs-target="#uploadCv" aria-controls="offcanvasEnd">
                            <i class="ti ti-upload me-2"></i>
                            Ajouter un CV
                        </button>
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