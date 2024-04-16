<script setup lang="ts">
import { ref } from 'vue'
import { Modal } from '@/ui'
import { useToast } from 'vue-toastification'
import { logisticsService } from '@/services'

const toast = useToast()

const isLoading = ref(false)

const cachet = ref({
  code: '',
  name: ''
})

const submit = async () => {
  await logisticsService
    .createCachet(cachet.value)
    .then(() => {
      $('#addCachet').modal('hide')
      toast.success('Cachet ajouté avec succès')
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
  <Modal id="addCachet" title="Nouveau Cachet" size="modal-lg">
    <form @submit.prevent="submit">
      <div class="modal-body">
        <div class="row">
          <div class="col-6 mb-3">
            <label for="code" class="mb-2">code de carte <span class="text-danger">*</span></label>
            <input
              type="text"
              class="form-control"
              v-model="cachet.code"
              placeholder="Entre le code de cachet"
              required
            />
          </div>
          <div class="col-6 mb-3">
            <label for="limit" class="mb-2">Nom de cachet <span class="text-danger">*</span></label>
            <input
              type="text"
              class="form-control"
              v-model="cachet.name"
              placeholder="Entre le nom de cachet"
              required
            />
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
