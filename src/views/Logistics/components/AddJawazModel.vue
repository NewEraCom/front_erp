<script setup lang="ts">
import { ref } from 'vue'
import { Modal } from '@/ui'
import { useToast } from 'vue-toastification'
import { logisticsService } from '@/services'

const toast = useToast()

const isLoading = ref(false)

const jawaz = ref({
  code: '',
  solde: '',
  date_debut: '',
  date_fin: ''
})

const submit = async () => {
  await logisticsService
    .createJawaz(jawaz.value)
    .then(() => {
      $('#addJawaz').modal('hide')
      toast.success('Jawaz ajouté avec succès')
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
  <Modal id="addJawaz" title="Nouvell Carte Jawaz" size="modal-lg">
    <form @submit.prevent="submit">
      <div class="modal-body">
        <div class="row">
          <div class="col-6 mb-3">
            <label for="code" class="mb-2">Code de carte <span class="text-danger">*</span></label>
            <input
              type="text"
              class="form-control"
              v-model="jawaz.code"
              placeholder="Entre le numéro de carte"
              required
            />
          </div>
          <div class="col-6 mb-3">
            <label for="limit" class="mb-2"
              >Solde de carte <span class="text-danger">*</span></label
            >
            <input
              type="number"
              class="form-control"
              v-model="jawaz.solde"
              placeholder="Entre un solde"
              required
            />
          </div>
          <div class="col-6 mb-3">
            <label for="date_debut" class="mb-2">Date Debut <span class="text-danger">*</span></label>
            <input type="date" class="form-control" v-model="jawaz.date_debut" required />
          </div>
          <div class="col-6 mb-3">
            <label for="date_fin" class="mb-2">Date Fin<span class="text-danger">*</span></label>
            <Input class="form-control" v-model="jawaz.date_fin" type="date" label="Date fin" />
          </div>
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
