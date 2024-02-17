<script setup lang="ts">
import { useRoute } from 'vue-router';
import { helpers } from '@/utils';

const route = useRoute();

const navBarItem = [
	{
		id : 1,
		name: 'Accueil',
		path: '/',
	},
	{
		id : 2,
		name: 'Demande de congé',
		path: '/demande-conge',
	}, 
	{
		id : 3,
		name: 'Demande de document administratif',
		path: '/demande-document',
	}
];

</script>

<template>
  <nav class="layout-navbar shadow-none py-0 navbar-active mb-5">
    <div class="container">
      <div class="navbar navbar-expand-lg landing-navbar px-5 py-3 px-md-4">
        <div class="navbar-brand app-brand demo d-flex py-0 py-lg-2 me-4">
          <button
            class="navbar-toggler border-0 px-0 me-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="ti ti-menu-2 ti-sm align-middle"></i>
          </button>
          <!-- Mobile menu toggle: End-->
          <a href="landing-page.html" class="app-brand-link">
            <img src="@/assets/img/Logo_bg.png" width="125px" alt="" srcset="" />
          </a>
        </div>
        <!-- Menu logo wrapper: End -->

        <!-- Menu wrapper: Start -->
        <div class="collapse navbar-collapse landing-nav-menu" id="navbarSupportedContent">
          <button
            class="navbar-toggler border-0 text-heading position-absolute end-0 top-0 scaleX-n1-rtl"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="ti ti-x ti-sm"></i>
          </button>
          <ul class="navbar-nav me-auto">
            <li v-for="item in navBarItem" :key="item.id" class="nav-item">
              <router-link :to="item.path" class="nav-link fw-medium" :class="helpers.isActiveRoute(item.path,route.path)"> 
                {{ item.name }}  
              </router-link>
            </li>
            
          </ul>
        </div>
        <div class="landing-menu-overlay d-lg-none"></div>
        <!-- Menu wrapper: End -->
        <!-- Toolbar: Start -->
        <ul class="navbar-nav flex-row align-items-center ms-auto">
          <li>
            <router-link
              to="/login"
              class="btn btn-primary waves-effect waves-light"
              target="_blank"
            >
              <span class="tf-icons ti ti-login scaleX-n1-rtl me-md-1"></span>
              <span class="d-none d-md-block">Se connecter</span>
            </router-link>
          </li>
          <!-- navbar button: End -->
        </ul>
        <!-- Toolbar: End -->
      </div>
    </div>
  </nav>
</template>
