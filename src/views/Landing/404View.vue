<script setup lang="ts">
import { NavBar, FooterBar } from './components';
</script>

<template>
    <div>
        <NavBar />
        <section id="landingContact" class="section-py bg-body landing-contact mt-5 mb-5 pb-5">
            <div class="container">
                <div class="text-center mb-3 pb-1 mt-5 pt-5">
                    <span class="badge bg-label-primary">404</span>
                </div>
                <div class="row">
                    <div class="col-12 text-center">
                        <img src="@/assets/img/avatars/404.webp" width="425px" alt="" srcset="" class="mb-5" />
                    </div>
                </div>

                <h3 class="text-center mb-1">
                    <span class="section-title">Page non trouvée :(</span>
                </h3>
                <h6 class="text-center">Oops! 😖 L'URL demandée n'a pas été trouvée sur ce serveur.</h6>
                <div class="row mt-4 mb-4">
                    <div class="col-12 text-center">
                        <router-link to="/login" class="btn btn-primary btn-lg waves-effect waves-light" target="_blank">
                            <span class="tf-icons ti ti-login scaleX-n1-rtl me-md-1"></span>
                            <span class="d-none d-md-block">Se connecter</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </section>
        <FooterBar />
    </div>
</template>

<style scoped>
.bg-footer {
    background-color: #1f2c4a !important;
}
</style>
