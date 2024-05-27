<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores';

const store = useAuthStore();

const employee = ref(computed(() => store.getUser));

const env = import.meta.env.VITE_UPLOADS_URL;

</script>

<template>
    <nav class="navbar navbar-sticky nav-primray p-0">
        <div class="d-flex container-md justify-content-between w-100">
            <div class="d-flex  flex-grow-1">
                <img src="@/assets/img/Logo_white_bg.png" alt="logo" class="logo" />
            </div>
            <ul class="navbar-nav flex-row align-items-center">
            </ul>
            <ul class="navbar-nav flex-row align-items-center">
                <li class="nav-item navbar-dropdown dropdown-user dropdown">
                    <a class="nav-link d-flex align-items-center dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                        <div class="d-flex flex-column text-end me-2">
                            <span class="fw-normal">{{ employee.first_name + ' ' +
                                employee.last_name
                                }}</span>
                            <small class="fw-normal mt-1 f-12">Matricule : NEC-{{ employee.matricule
                                }}</small>
                        </div>
                        <div class="avatar avatar-online border rounded-circle" v-if="employee">
                            <img :src="env + 'uploads/pictures/' + employee.user.profile_picture" class="rounded-circle"
                                style="object-fit: cover; height: 100%" />
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </nav>
</template>