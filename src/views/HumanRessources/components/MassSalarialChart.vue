<script setup lang="ts">

const year = new Date().getFullYear();
</script>

<template>
    <div class="card mb-4 card-border-shadow-primary">
        <div class="card-header">
            <h5 class="fw-bold mb-1">Statistique des employés</h5>
            <small class="fw-bold mb-1 text-muted">Nombre d'employés par mois en {{ year }}</small>
        </div>
        <div class="card-body">
            
        </div>
    </div>
</template>