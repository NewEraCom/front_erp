<script lang="ts">
import '/src/assets/vendor/css/pages/page-auth.css';
import '/src/assets/vendor/libs/@form-validation/umd/styles/index.min.css';
import '/src/assets/js/pages-auth.js';
</script>

<script setup lang="ts">
import { ref } from 'vue';

const isLoading = ref(false);
const isError = ref([false, '']);
const formData = ref({
	email: ''
});

const submit = async () => {};
</script>

<template>
  <div class="container-xxl">
    <div class="authentication-wrapper authentication-basic container-p-y">
      <div class="authentication-inner py-4">
        <div class="card">
          <div class="card-body">
            <div class="app-brand justify-content-center mb-4 mt-2">
              <img src="/src/assets/img/Logo_bg.png" alt="logo" class="logo" />
            </div>
            <h4 class="mb-1 pt-2">Mot de passe oublié 🔒</h4>
            <p class="mb-4">
              Entrez votre email associé à votre compte, et récupérez votre mot de passe.
            </p>
            <form @submit.prevent="submit">
              <div v-if="isError[0] == true" class="alert alert-danger" role="alert">
                {{ isError[1] }}
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Adresse e-mail</label>
                <input
                  id="email"
                  v-model="formData.email"
                  type="text"
                  class="form-control"
                  name="email"
                  placeholder="Entrez votre adresse e-mail"
                  autofocus
                  :disabled="isLoading"
                  required
                />
              </div>
              <button class="btn btn-primary d-grid w-100" type="submit" :disabled="isLoading">
                <span
                  v-if="isLoading"
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span v-else>Récupérer mon mot de passe</span>
              </button>
            </form>
            <hr />
            <div class="row">
              <div class="col-12 text-center">
                <router-link to="/login" class="text-center">
                  Retour à la page de connexion
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  width: 86%;
}
</style>
