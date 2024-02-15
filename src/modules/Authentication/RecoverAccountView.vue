<script lang="ts">
import '/src/assets/vendor/css/pages/page-auth.css';
import '/src/assets/vendor/libs/@form-validation/umd/styles/index.min.css';
import '/src/assets/js/pages-auth.js';
</script>

<script setup lang="ts">
import router from '../../router';
import { onMounted } from 'vue';

onMounted(() => {
	setTimeout(() => {
		router.push({ name: 'Login' });
	}, 5000);
});
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
            <h4 class="mb-1 pt-2 fw-bold">Récupérez votre mot de passe</h4>
            <p class="mb-4">
              Un mail avec votre nouveau mot de passe a été envoyé à l'adresse email que vous avez
              renseignée. cette page sera automatiquement redirigée vers la page de connexion.
            </p>
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
