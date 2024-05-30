<script lang="ts" setup>
import { ref, computed } from 'vue';
import { PortalButton, LoaderView, UploadAvatarCanva } from '@/ui';
import { portalMenus } from '@/utils';
import { useAuthStore } from '@/stores';

const store = useAuthStore();

const employee = ref(computed(() => store.getUser));

const env = import.meta.env.VITE_UPLOADS_URL;

</script>

<template>
    <div class="flex-grow-2 container-md mt-3 mb-5" v-if="employee">
        <div class="row mt-2">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="user-profile-header d-flex flex-column flex-sm-row ms-auto-end mb-4">
                        <div class="flex-shrink-0 mt-n4 mx-sm-0 ms-auto me-auto border-none">
                            <div class="user-profile-container text-center">
                                <img :src="env + 'uploads/pictures/' + employee.user.profile_picture" width="120px"
                                    height="120px" alt="user image"
                                    class="d-block ms-0 ms-auto ps-auto me-auto rounded user-profile-img"
                                    style="object-fit: cover;">
                                <button class="edit-button" data-bs-toggle="offcanvas" data-bs-target="#uploadCanva">
                                    <i class="ti ti-edit-circle"></i>
                                </button>
                                <UploadAvatarCanva />
                            </div>
                            <div class="text-center mt-4">
                                <h4 class="text-dark fw-bold mb-2 mt-3 fw-medium">Bonjour, {{ employee.first_name }}
                                </h4>
                                <p class="text-dark w-sm-80 app-academy-xl-100 mb-1 fw-medium">
                                    {{ employee.poste }} chez NewEraCom
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-1">
            <div class="d-grid gap-3 col-lg-12 mx-auto">
                <PortalButton v-for="item in portalMenus" :key="item.id" :text="item.text" :icon="item.icon"
                    :to="item.to" />
            </div>
        </div>
    </div>
    <LoaderView v-else />
</template>

<style>
.user-profile-container {
    position: relative;
}

.user-profile-img {
    display: block;
}

.edit-button {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: none;
    /* Remove default button border */
    padding: 5px 10px;
    background-color: #39465C;
    color: white;
    border-radius: 5px;
}

.edit-button:hover {
    background-color: #39465C;
    color: white;
    cursor: pointer;
    transition: 0.3s;
}

.edit-button i {
    font-size: 14px;
}
</style>