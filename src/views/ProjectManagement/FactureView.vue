<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { PMService } from '@/services'
import { usePMStore } from '@/store'
import { CardTwo, DeleteModal } from '@/ui';
import {FactureTable,EditFacture} from './components'
const PMStore = usePMStore()
const factures = ref(computed(() => PMStore.facture))
const stats = ref(computed(() => PMStore.stats))
onMounted(async () => {
  await PMService.getFacture()
})
const deleteST = async () => {
    const idToDelete = $('#deleteId').val();
    PMService.deleteFacture(idToDelete).then(() => {
        $('#delete-facture').modal('hide');
        const updatedFacture = PMStore.facture.filter(item => item.id !== idToDelete);
        PMStore.facture = updatedFacture;
        factures.value = updatedFacture;
    });
};
</script>

<template>
  <div class="flex-grow-1 container-fluid mt-3">
    <h5 class="py-3 mb-4 fw-medium text-muted">
      Facture / <span class="text-dark">Chef de projet</span>
    </h5>
    <div v-if="stats" class="row g-3">
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardTwo
          title="Total des Factures"
          :count="String(stats.facture)"
          color="bg-label-success"
          icon="ti-shopping-cart-copy"
          card-color="card-border-shadow-success"
        />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-3">
        <CardTwo
          title="Facture Payé"
          :count="String(stats.facture_paye)"
          color="bg-label-primary"
          icon="ti-shopping-cart-copy"
          card-color="card-border-shadow-primary"
        />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-3">
        <CardTwo
          title="Facture Annuler"
          :count="String(stats.facture_annule)"
          color="bg-label-info"
          icon="ti-shopping-cart-copy"
          card-color="card-border-shadow-info"
        />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-3">
        <CardTwo
          title="Facture En Attente"
          :count="String(stats.facture_waiting)"
          color="bg-label-secondary"
          icon="ti-shopping-cart-copy"
          card-color="card-border-shadow-secondary"
        />
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-12">
        <div class="card">
          <div class="card card-border-shadow-primary">
            <div class="card-header">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h5 class="fw-bold mb-1">Factures</h5>
                  <small class="fw-bold mb-1 text-muted">Liste des Factures</small>
                </div>

              </div>
            </div>
            <div v-if="factures != null" class="card-body border-top pt-4">
              <FactureTable :factures="factures" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <EditFacture id="edit-facture" :facture="PMStore.item"/>
    <DeleteModal id="delete-facture"
            title="Supprimer une Facture"
            text="Voulez-vous vraiment supprimer cette facture ?"
            textButton="Supprimer"
            :method="deleteST"/>
  </div>
</template>
