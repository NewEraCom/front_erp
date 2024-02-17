<script setup lang="ts">
const year = new Date().getFullYear();
</script>
<template>
  <footer class="landing-footer text-white footer-text mt-5 bg-primary">
    <div class="footer-top">
      <div class="container">
        <div class="row gx-0 gy-4 g-md-5">
          <div class="col-lg-4">
            <a href="/" class="app-brand-link mb-4">
              <img src="@/assets/img/Logo_white_bg.png" width="125px" alt="" srcset="" />
            </a>
          </div>

          <div class="col-lg-4 col-md-4 text-start">
            <h6 class="footer-title mb-4 text-white">Téléchargez notre application</h6>
            <a href="javascript:void(0);" class="d-block footer-link mb-3 pb-2">
              <img
                src="@/assets/img/front-pages/landing-page/apple-icon.png"
                alt="apple icon"
                width="200px"
            /></a>
            <a href="javascript:void(0);" class="d-block footer-link">
              <img
                src="@/assets/img/front-pages/landing-page/google-play-icon.png"
                alt="google play icon"
                width="200px"
            /></a>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom py-3 bg-footer mt-5">
      <div
        class="container d-flex flex-wrap justify-content-between flex-md-row flex-column text-center text-md-start"
      >
        <div class="mb-2 mb-md-0">
          <span class="footer-text">© {{ year }} </span>
          <a href="#" target="_blank" class="fw-medium text-white footer-link"> NewEraCom </a>
        </div>
      </div>
    </div>
  </footer>
</template>
