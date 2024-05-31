<script lang="ts">
import '/src/assets/vendor/css/pages/page-auth.css';
import '/src/assets/vendor/libs/@form-validation/umd/styles/index.min.css';
import '/src/assets/js/pages-auth.js';
import { authService } from '@/services';
import router from '@/router';
import { helpers } from '@/utils';
</script>

<script setup lang="ts">
import { ref } from 'vue';

const passwordType = ref(['ti-eye', 'password']);

const togglePwd = () => {
    passwordType.value = helpers.togglePassword(passwordType.value);
};

const isLoading = ref(false);
const isError = ref([false, '']);
const isSuccess = ref(false);
const formData = ref({
    new_password: '',
    confirm_password: '',
    token: '',
    email: ''
});

const submit = async () => {
    if (formData.new_password !== formData.confirm_password) {
        isError.value = [true, 'Les mots de passe ne correspondent pas'];
        return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    const query = new FormData();
    query.append('email', urlParams.get('email'));
    query.append('token', urlParams.get('token'));
    query.append('new_password', formData.value.new_password);

    const res: any = await authService.resetPassword(query);

    if (res.success == false) {
        isError.value = [true, res.message];
        isLoading.value = false;
    } else {
        isSuccess.value = true;
        isLoading.value = false;
    }
};
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
                        <h4 class="mb-1 pt-2">Réinitialiser le mot de passe🔒</h4>
                        <p class="mb-4">
                            Entrez votre nouveau mot de passe et confirmez-le pour réinitialiser votre mot de passe.
                        </p>
                        <form @submit.prevent="submit">
                            <div v-if="isError[0] == true" class="alert alert-danger" role="alert">
                                {{ isError[1] }}
                            </div>
                            <div v-if="isSuccess == true" class="alert alert-success" role="alert">
                                Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter
                                avec votre nouveau mot de passe.
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Nouveau mot de passe</label>
                                <div class="input-group input-group-merge">
                                    <input id="password" v-model="formData.new_password" :type="passwordType[1]"
                                        class="form-control" name="password" autocomplete="on"
                                        placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                        aria-describedby="password" :disabled="isLoading" />
                                    <span class="input-group-text cursor-pointer" :disabled="isLoading"
                                        @click="togglePwd"><i :class="'ti ' + passwordType[0]"></i></span>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="confirme_password" class="form-label">Confirmer le mot de passe</label>
                                <div class="input-group input-group-merge">
                                    <input id="password" v-model="formData.confirm_password" :type="passwordType[1]"
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
                                <span v-else>Réinitialiser le mot de passe</span>
                            </button>
                            <hr />
                            <div class="row">
                                <div class="col-12 text-center">
                                    <router-link :to="{ name: 'Login' }" class="text-center">
                                        Retour à la page de connexion
                                    </router-link>
                                </div>
                            </div>
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