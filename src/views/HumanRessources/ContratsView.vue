<script setup lang="ts">
import { CardOne, DataTable } from '@/ui';


let myItems = [{ id: 1, name: 'Alexa Doe', matricule: 123, email: 'alexa@example.com' }];

// Function to generate names starting from 'B'
function generateNames(startingId, count) {
  const names = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = 0; i < count; i++) {
    // Calculate position in the alphabet for the next character
    // 'B' starts at index 1 in 'names', adjust accordingly
    const charIndex = (i + 1) % 26; // Start from 'B'
    const name = `${names[charIndex]} Name`;
    const matricule = `123${i + 2}`; // +2 to start matricule from 123
    const email = `user${i + 2}@example.com`; // +2 to start emails from user2@example.com
    myItems.push({ id: startingId + i, name, matricule, email });
  }
}


// Generate 24 more items, starting from ID 2
generateNames(2, 24);

// Sort the items by name
myItems.sort((a, b) => a.name.localeCompare(b.name));
</script>
<template>
  <div class="flex-grow-1 container-fluid mt-3">
    <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Contrats</span> </h5>
    <div class="row g-3">
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
        <CardOne title="Nombre de Contrats CDI" :count="120" color="bg-label-primary" icon="ti-bolt"
          card-color="card-border-shadow-primary" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
        <CardOne title="Nombre de Contrats CDD" :count="120" color="bg-label-primary" icon="ti-bolt"
          card-color="card-border-shadow-primary" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
        <CardOne title="Nombre de Contrats Chantier" :count="120" color="bg-label-primary" icon="ti-bolt"
          card-color="card-border-shadow-primary" />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
        <CardOne title="Nombre de Contrats Commercial" :count="120" color="bg-label-primary" icon="ti-bolt"
          card-color="card-border-shadow-primary" />
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-12">
        <div class="card">
          <div class="card card-border-shadow-primary">
            <div class="card-header">
              <h5 class="fw-bold mb-1">Employés CDD</h5>
              <small class="fw-bold mb-1 text-muted">0 employées expirés ce mois</small>
            </div>
            <div class="card-body border-top pt-4">
              <DataTable :items="myItems" :pageSize="10" :actionsConfig="[
                { icon: 'ti ti-eye', class: 'btn btn-primary btn-sm', onClick: (item) => editItem(item) },
                { icon: 'ti ti-check', class: 'btn btn-success btn-sm', onClick: (item) => deleteItem(item) }
              ]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
