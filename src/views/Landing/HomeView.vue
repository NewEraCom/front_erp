<script setup lang="ts">
import { NavBar, FooterBar } from './components';
</script>

<template>
  <div>
    <NavBar />
    <section id="landingContact" class="section-py bg-body landing-contact mt-5 mb-5 pb-5">
      <div class="container">
        <div class="text-center mb-3 pb-1 mt-5 pt-5">
          <span class="badge bg-label-primary">Bienvenu</span>
        </div>
        <div class="row">
          <div class="col-12 text-center">
            <img src="@/assets/img/Logo_bg.png" width="425px" alt="" srcset="" class="mb-5" />
          </div>
        </div>

        <h3 class="text-center mb-1">
          <span class="section-title">Bienvenue dans l'ERP NewEraCom</span>
        </h3>
        <div class="row mt-4 mb-4">
          <div class="col-12 text-center">
            <router-link
              to="/login"
              class="btn btn-primary btn-lg waves-effect waves-light"
              target="_blank"
            >
              <span class="tf-icons ti ti-login scaleX-n1-rtl me-md-1"></span>
              <span class="d-none d-md-block">Se connecter</span>
            </router-link>
          </div>
        </div>
        <div class="row gy-4">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
                <h4 class="mb-1">Contactez le support</h4>
                <p class="mb-4">
                  Si vous souhaitez discuter de tout ce qui concerne l'ERP, n'hésitez pas
                </p>
                <form>
                  <div class="row g-3">
                    <div class="col-md-6">
                      <label class="form-label" for="contact-form-fullname"> Nom et prénom </label>
                      <input
                        id="contact-form-fullname"
                        type="text"
                        class="form-control"
                        placeholder="Ex : John Doe"
                      />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label" for="contact-form-email"> Adresse email </label>
                      <input
                        id="contact-form-email"
                        type="text"
                        class="form-control"
                        placeholder="johndoe@gmail.com"
                      />
                    </div>
                    <div class="col-12">
                      <label class="form-label" for="contact-form-message"> Message </label>
                      <textarea
                        id="contact-form-message"
                        class="form-control"
                        rows="8"
                        placeholder="Écrire un message"
                      ></textarea>
                    </div>
                    <div class="col-12">
                      <button type="submit" class="btn btn-primary waves-effect waves-light">
                        Envoyer
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
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
