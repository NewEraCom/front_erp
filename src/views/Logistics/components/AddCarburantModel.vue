<script setup lang="ts">
import { ref } from 'vue'
import { Modal } from '@/ui'
import { useToast } from 'vue-toastification'
import { logisticsService } from '@/services'

const toast = useToast()

const isLoading = ref(false)

const props = defineProps({
  type: {
    type: String,
    default: 'add'
  }
})

const card = ref({
  code: '',
  limit: '',
  type: props.type
})

const submit = async () => {
  await logisticsService
    .createCarburant(card.value)
    .then(() => {
      $('#addCarburant').modal('hide')
      toast.success('Carburant ajouté avec succès')
    })
    .catch((error) => {
      console.log(error)
      toast.error(error)
    })
    .finally(() => {
      isLoading.value = false
    })
}
</script>

<template>
  <Modal id="addCarburant" title="Nouvell Carte Gasoil" size="modal-lg">
    <form @submit.prevent="submit">
      <div class="modal-body">
        <div class="row">
          <div class="col-6 mb-3">
            <label for="code" class="mb-2"
              >Numéro de carte <span class="text-danger">*</span></label
            >
            <input
              type="text"
              class="form-control"
              v-model="card.code"
              placeholder="Entre le numéro de carte"
              required
            />
          </div>
          <div class="col-6 mb-3">
            <label for="limit" class="mb-2"
              >Planfond de carte <span class="text-danger">*</span></label
            >
            <input
              type="number"
              class="form-control"
              v-model="card.limit"
              placeholder="Entre le planfond de carte"
              required
            />
          </div>
        </div>
        <div class="col-12 mb-3">
          <label for="mode_paiement" class="mb-2"
            >Type de carte <span class="text-danger">*</span></label
          >
          <select class="form-select" v-model="card.type" required>
            <option value="">Selectionner le type de carte</option>
            <option value="Carte Confort">Carte Confort</option>
            <option value="Carte Premium">Carte Premium</option>
            <option value="Carte Gold">Carte Gold</option>
          </select>
        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
          Fermer
        </button>
        <button type="submit" :disabled="isLoading" class="btn btn-primary">
          <span v-if="isLoading" class="d-flex align-items-center">
            <div class="spinner-border spinner-border-sm text-white" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </span>
          <span v-else> Terminer</span>
        </button>
      </div>
    </form>
  </Modal>
</template>
