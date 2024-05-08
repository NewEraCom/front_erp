<script setup lang="ts">
import { ref } from 'vue'
import { rhService } from '@/services'
import { useToast } from 'vue-toastification'
import { Modal } from '@/ui'

const isLoading = ref(false)
const toast = useToast()

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const fd = ref({
  attachement: ''
})

const handleFileChange = (e) => {
  fd.value.attachement = e.target.files[0]
}

const submit = async () => {
 console.log("attachement :",fd.value.attachement)
  const formData = new FormData();
  formData.append('value', fd.value.attachement);

  await rhService
    .insertAttachement(props.id, fd.value)
    .then(() => {
      isLoading.value = false
      $('#attachement-modal').modal('hide')
      toast.success('Attachement ajouté avec succès')
      window.location.reload();
    })
    .catch(() => {
      isLoading.value = false
      toast.error('Une erreur est survenue')
    })
}
</script>

<template>
  <Modal id="attachement-modal" title="Ajouter Attachement" size="modal-lg">
    <form @submit.prevent="submit" enctype="multipart/form-data">
      <div class="row p-2 border rounded m-1">
        <div class="col-sm-6">
          <label for="attachemet" class="form-label"
            >Attachement <span class="text-danger">*</span></label
          >
          <input class="form-control" type="file" @change="handleFileChange" required />
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
