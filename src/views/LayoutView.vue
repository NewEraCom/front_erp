<script setup lang="ts">
import { RouterView } from 'vue-router';
import { TheTopBarPortal, FloatingButton, HelpButton } from '../ui';
import { Notivue, Notification } from 'notivue';

</script>
<template>
    <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
            <div class="portal-page p-0">
                <TheTopBarPortal />
                <div class="content-wrapper mt-4">
                    <RouterView />
                </div>
            </div>
        </div>
        <HelpButton />
        <FloatingButton />
        <Notivue v-slot="item">
            <Notification :item="item" />
        </Notivue>
    </div>
</template>

<style>
.Notivue__notification {
    z-index: 1000;
}

.layout-wrapper {
    display: flex;
}

.f-14 {
    font-size: 12px !important;
}

.layout-container {
    display: flex;
    flex-grow: 1;
}

.layout-page {
    margin-left: 250px;
    flex-grow: 1;
    padding: 20px;
    background: #f1f1f1;
}

.nav-primray {
    background-color: #39465C !important;
    color: white;
    height: 80px;
}

.portal-page {
    margin-left: 0;
    flex-grow: 1;
    padding: 20px;
    background: #f1f1f1;

}


@media (max-width: 1458px) {
    .sidebar {
        display: none;
        /* Hide the sidebar */
    }

    .layout-page {
        margin-left: 75px;
    }
}

.sidebar {
    width: 250px;
    height: 100vh;
    position: fixed;
    background-color: #333;
    color: white;
    transition: width 0.3s;
    overflow: hidden;
}

.bg-primary {
    background-color: #39465C !important;
    color: white;
    height: 80px;
}

.logo {
    width: 150px;
    height: 40px;
    object-fit: contain !important;
}

.navbar-sticky {
    position: sticky;
    top: 0;
    z-index: 100;
}


@media (max-width: 768px) {
    .container-md {
        padding-right: 2rem !important;
        padding-left: 2rem !important;
    }
}

@media (max-width: 992px) and (min-width: 768px) {
    .container-md {
        padding-right: 1rem !important;
        padding-left: 1rem !important;
    }
}

@media (max-width: 1200px) and (min-width: 992px) {
    .container-md {
        padding-right: 10rem !important;
        padding-left: 10rem !important;
    }
}

@media (max-width: 1458px) and (min-width: 1200px) {
    .container-md {
        padding-right: 18rem !important;
        padding-left: 18rem !important;
    }
}

@media (min-width: 1458px) {
    .container-md {
        padding-right: 24rem !important;
        padding-left: 24rem !important;
    }
}
</style>