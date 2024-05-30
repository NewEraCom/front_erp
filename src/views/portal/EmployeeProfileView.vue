<script setup>
import { ref, onMounted } from 'vue';

const employee = ref(null);
const env = ref(null);
onMounted(() => {
    employee.value = JSON.parse(localStorage.getItem('selectedEmployee'));
    env.value = import.meta.env.VITE_UPLOADS_URL;
});

</script>

<template>
    <div class="flex-grow-2 container-md mt-3 mb-5" v-if="employee">

        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link :to="{ name: 'DashboardPortal' }">Dashboard</router-link>
                </li>
                <router-link :to="{ name: 'WhoIsWho' }" class="breadcrumb-item">Qui est qui</router-link>
                <li class="breadcrumb-item active">{{ employee.first_name + ' ' + employee.last_name }}</li>
            </ol>
        </nav>

        <div class="card border shadow-none">
            <div class="card-body text-center">
                <img :src="env + 'uploads/pictures/' + employee.user.profile_picture" class="rounded-circle border"
                    style="object-fit: cover; height: 150px; width: 150px;" alt="profile">
                <h4 class="mt-4 mb-1">{{ employee.first_name + ' ' + employee.last_name }}</h4>
                <p class="text-muted">
                    {{ employee.poste }}
                </p>
                <hr>
                <small class="mb-1 d-block">Département : {{ employee.departement }}</small>
                <small class="mt-0">Responsable : {{ employee.responsable.first_name + ' ' +
                    employee.responsable.last_name
                    }} </small>
            </div>
        </div>
        <h6 class="mt-4 mb-4">Contact information</h6>
        <div class="col-12 mt-4">
            <div class="card shadow-none border">
                <div class="card-body">
                    <div class="row">
                        <div class="col-12">
                            <h6 class="text-primary">Adresse email professionnel</h6>
                            <p class="mb-2 fw-normal">
                                {{ employee.user.email }}
                            </p>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-12">
                            <h6 class="text-primary">Téléphone professionnel</h6>
                            <p class="mb-2 fw-normal">{{ employee.flotte }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>