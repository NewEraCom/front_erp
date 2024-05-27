<script setup lang="ts">
import { helpsMenusPortal } from '@/utils'
import { ContactSupportModal } from '@/ui'
</script>
<template>
    <div class="offcanvas offcanvas-end off-canva-width" tabindex="-1" id="helpCanva"
        aria-labelledby="offcanvasEndLabel">
        <div class="offcanvas-header">
            <h5 id="offcanvasEndLabel" class="offcanvas-title">Vous avez besoin d'aide ?</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body mx-0 flex-grow-0">
            <p>Pour vous aider à démarrer, voici quelques instructions pour tirer le meilleur parti de votre expérience
                :</p>
            <button v-for="item in helpsMenusPortal" :key="item.id"
                class="btn btn-full btn-white btn-lg shadow-none border mb-3 text-start" type="button"
                data-bs-toggle="modal" data-bs-target="#leaveRequestHelp">
                <div class="d-flex justify-content-between align-items-center me-auto">
                    <small>
                        <strong>{{ item.text }}</strong>
                    </small>
                </div>
                <div class="text-primary">
                    <i class="ti ti-chevron-right m-auto"></i>
                </div>
            </button>
            <button class="btn btn-full btn-white btn-lg shadow-none border mb-3 text-start" type="button"
                data-bs-toggle="modal" data-bs-target="#contactSupport">
                <div class="d-flex justify-content-between align-items-center me-auto">
                    <small>
                        <strong>Si vous avez besoin d'aide supplémentaire, contactez le support</strong>
                    </small>
                </div>
                <div class="text-primary">
                    <i class="ti ti-chevron-right m-auto"></i>
                </div>
            </button>
        </div>
        <ContactSupportModal />
    </div>
</template>
<style>
.btn-full {
    width: 100% !important;
}

.btn-full:hover {
    border: 1px solid #0B4B71 !important;
}
</style>