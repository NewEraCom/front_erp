<script setup lang="ts">
import { ref } from 'vue';
import { Modal } from '@/ui';
import { useToast } from 'vue-toastification';
import { logisticsService } from '@/services';

const toast = useToast();

const isLoading = ref(false);
const props = defineProps({
    type: {
        type: String,
        required: true
    }
});
const formData = ref({
  article: '',
  unite: '',
  qte: '',
  prix_ht: '',
  type:'bordereau',
  type_category: props.type,
});

const submit = async () => {
    
  await logisticsService
    .addArticle(formData.value)
    .then(() => {
      $('#addArticle').modal('hide');
      toast.success('Article ajouté avec succès');
    })
    .catch((error) => {
      console.log(error);
      toast.error(error);
    })
    .finally(() => {
      isLoading.value = false;
    });
};
</script>

<template>
<Modal id="addArticle" :title="`Nouveau Article ${type.charAt(0).toUpperCase() + type.slice(1)}`" size="modal-lg">
    <form @submit.prevent="submit">
      <div class="modal-body">
        <div class="row">
          <div class="col-6 mb-3">
            <label for="code" class="mb-2">Article <span class="text-danger">*</span></label>
            <input
              type="text"
              class="form-control"
              v-model="formData.article"
              placeholder="Entre le code de cachet"
              required
            />
          </div>
          <div class="col-6 mb-3">
            <label for="limit" class="mb-2">Unite <span class="text-danger">*</span></label>
            <input
              type="text"
              class="form-control"
              v-model="formData.unite"
              placeholder="Entre le nom de cachet"
              required
            />
          </div>
          <div class="col-6 mb-3">
            <label for="limit" class="mb-2">Quantite <span class="text-danger">*</span></label>
            <input
              type="text"
              class="form-control"
              v-model="formData.qte"
              placeholder="Entre le nom de cachet"
              required
            />
          </div>
          <div class="col-6 mb-3">
            <label for="limit" class="mb-2">Prix HT  <span class="text-danger">*</span></label>
            <input
              type="text"
              class="form-control"
              v-model="formData.prix_ht"
              placeholder="Entre le nom de cachet"
              required
            />
          </div>
          <!-- <div class="col-6 mb-3">
            <label for="limit" class="mb-2">Type <span class="text-danger">*</span></label>
            <select name="" id="" v-model="formData.type" class="form-select" required>
                <option value="" disabled selected>Selectionner</option>
                <option value="bordereau">Bordereaux</option>
                <option value="hors bordereau">Hors Bordereaux </option>
            </select>
          </div> -->
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
