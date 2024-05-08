<script setup lang="ts">
import finance_service from '@/services/finance_service'
import { Modal } from '..'
import { useFinanceStore } from '@/store'
import { ref, computed, watch } from 'vue'
import AvoirModal from './AvoirModal.vue';

const props = defineProps({
  id: String
})

const formData = ref({
  id: props.id,
  extra: '',
  type: ''
})

const handleInvoiceTypeChange = () => {
  if (formData.value.type === 'Facture RG') {
    formData.value.extra = ''
  } else if (formData.value.type === 'Facture Avoir') {
    formData.value.extra = ''
  } else if (formData.value.type === 'Facture avec Avance') {
    formData.value.extra = ''
  }else if (formData.value.type === 'Facture Avance') {
    formData.value.extra = ''
}}


const financeStore = useFinanceStore()
const facture = ref(computed(() => financeStore.facture))

const Valide = async () => {
  const fd = new FormData()
  fd.append('extra', formData.value.extra)
  fd.append('type', formData.value.type)
  console.log('type:' + formData.value.type)
  await finance_service.ValidStatus(facture.value.id, fd)
  window.location.reload()
}
</script>

<template>
  <Modal :id="id" title="Valid Facture">
    <div class="modal-body">
      <div class="col-sm-12">
        <div class="mb-3">
          <select class="form-select" v-model="formData.type" @change="handleInvoiceTypeChange">
            <option value="">Selectionner le type de facture</option>
            <option value="Facture RG">Facture RG</option>
            <option value="Facture Avoir">Facture Avoir</option>
            <option value="Facture avec Avance">Facture avec Avance</option>
            <option value="Facture Avance">Facture d'Avance</option>
          </select>
        </div>
        <div class="mb-3">
          <div v-if="formData.type === 'Facture RG'">
            <label>Entrer la valeur de garantie :</label>
            <input class="form-control" type="text" v-model="formData.extra" />
          </div>
          <div v-if="formData.type === 'Facture Avoir'">
            <button
              data-bs-toggle="modal"
              data-bs-target="#avoir"
              class="btn btn-label-success d-grid w-100 mb-2 waves-effect d-flex"
            >
              <i class="ti ti-check me-2"></i> Ajouter Article
            </button>
          </div>
          <div v-if="formData.type === 'Facture avec Avance'">
            <label>Entrer la valeur d'avance :</label>
            <input class="form-control" type="text" v-model="formData.extra" />
          </div>
          <div v-if="formData.type === 'Facture Avance'">
          </div>
          <div v-if="formData.type === 'Facture Avance'">
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
        Fermer
      </button>
      <button class="btn btn-success me-0" data-bs-dismiss="modal" @click="Valide()">
        <span>Valider</span>
      </button>
    </div>
  </Modal>
</template>
