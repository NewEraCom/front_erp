<script lang="ts">
import '/src/assets/vendor/css/pages/page-auth.css';
import '/src/assets/vendor/libs/@form-validation/umd/styles/index.min.css';
import '/src/assets/js/pages-auth.js';
</script>

<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import { helpers } from '@/utils';
import { authService } from '@/services';


const passwordType = ref(['ti-eye', 'password']);
const isLoading = ref(false);
const isError = ref([false, '']);

const formData = ref({ password: '', email: '', });

const togglePwd = () => {
    passwordType.value = helpers.togglePassword(passwordType.value);
};

const submit = async () => {
    isLoading.value = true;
    const res: any = await authService.login(formData.value);
    if (res.success == false) {
        isError.value = [true, res.message];
        isLoading.value = false;
    }

};
onUnmounted(() => {
    isLoading.value = false;
    isError.value = [false, ''];
});

</script>

<template>
    <div class="container-xxl">
        <div class="authentication-wrapper authentication-basic container-p-y">
            <div class="authentication-inner py-4">
                <div class="card">
                    <div class="card-body">
                        <div class="app-brand justify-content-center mb-4 mt-2">
                            <img src="/src/assets/img/Logo_bg.png" alt="logo" class="logo-img" />
                        </div>
                        <h4 class="mb-1 pt-2 fw-bold">Bienvenu sur NewEraERP 👋</h4>
                        <p class="mb-4 fw-normal">Connectez-vous à votre compte pour accéder à votre tableau de bord.
                        </p>
                        <form @submit.prevent="submit">
                            <div v-if="isError[0] === true" class="alert alert-danger" role="alert" v-html="isError[1]">
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label fw-medium">Adresse e-mail</label>
                                <input id="email" v-model="formData.email" type="text" class="form-control" name="email"
                                    placeholder="Entrez votre adresse e-mail" autofocus autosuggest="off"
                                    autocomplete="on" :disabled="isLoading" />
                            </div>
                            <div class="mb-3 form-password-toggle">
                                <div class="d-flex justify-content-between">
                                    <label class="form-label fw-medium" for="password">Mot de passe</label>
                                    <router-link :to="{ name: 'ForgetPassword' }">
                                        <small class="fw-normal">Mot de passe oublié?</small>
                                    </router-link>
                                </div>
                                <div class="input-group input-group-merge">
                                    <input id="password" v-model="formData.password" :type="passwordType[1]"
                                        class="form-control" name="password" autocomplete="on"
                                        placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                        aria-describedby="password" :disabled="isLoading" />
                                    <span class="input-group-text cursor-pointer" :disabled="isLoading"
                                        @click="togglePwd"><i :class="'ti ' + passwordType[0]"></i></span>
                                </div>
                            </div>
                            <button class="btn btn-primary d-grid w-100" type="submit" :disabled="isLoading">
                                <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status"
                                    aria-hidden="true"></span>
                                <span v-else>Se connecter</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.logo-img {
    width: 86% !important;
}
</style>
