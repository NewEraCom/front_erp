<script setup lang="ts">
import { ref ,onUnmounted} from 'vue';
import { Modal } from '@/ui';
import { logisticsService } from '@/services';
import { useLogisticsStore } from '@/store';
import { useToast } from 'vue-toastification';
const toast = useToast();

const logisticStore = useLogisticsStore();


const isLoading = ref(false);

const formData = ref({
  bl: null,
  title: '',
  comment: '',
  qte_livre: 0,
  article_id:0,
  livraison_id: 0
});
console.log(logisticStore.livraison_id);

const handleFileChange = (e, type) => {
  formData.value[type] = e.target.files[0];
};
onUnmounted(async () => {
    logisticStore.ClearLivraison();
});
const submit = async () => {
    formData.value.article_id = logisticStore.article_id;
    formData.value.livraison_id = logisticStore.livraison_id;
  console.log(formData.value);
  isLoading.value = true;
    await logisticsService.ReceiveShipment(formData.value).then(() => {
        $('#AddLivraison').modal('hide');
        toast.success('Livraison ajouté avec succès');
    }).catch((error) => {
        console.error('Error during action execution', error);
        toast.error('Erreur lors de l\'ajout du livraison');
    }).finally(() => {
        isLoading.value = false;
    });
};
</script>
<template>
  <Modal id="AddLivraison" title="Ajouter une Livraison" size="modal-md">
    <form @submit.prevent="submit" enctype="multipart/form-data">
      <div class="modal-body">
        <div class="row">
            <div class="col-sm-12">
            <div class="mb-3">
              <label for="nameEx" class="form-label"
                >Quantité Livré <span class="text-danger">*</span></label
              >
              <input
                class="form-control"
                placeholder="Entrez le titre de l'attachement"
                tabindex="0"
                id="nameEx"
                v-model="formData.qte_livre"
                required
                type="number"
                :max="logisticStore.qte_demande"
                min="0"
              />
            </div>
          </div>
          <div class="col-sm-12">
            <div class="mb-3">
              <label for="nameEx" class="form-label"
                >Titre de document <span class="text-danger">*</span></label
              >
              <input
                class="form-control"
                placeholder="Entrez le titre de l'attachement"
                tabindex="0"
                id="nameEx"
                v-model="formData.title"
                required
              />
            </div>
          </div>

          <div class="col-sm-12">
            <div class="mb-3">
              <label for="copie_rib" class="form-label"
                >Attachement
                <span class="text-danger">*</span>
              </label>
              <input
                id="copie_rib"
                ref="copie_cnss"
                class="form-control"
                placeholder="Choisir le fichier"
                type="file"
                tabindex="0"
                name="copie_cnss"
                required
                @change="(e) => handleFileChange(e, 'bl')"
              />
            </div>
          </div>
          <div class="col-sm-12">
            <div class="mb-3">
              <label for="copie_rib" class="form-label"
                >Commentaire
                <span class="text-danger">*</span>
              </label>

              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                class="form-control"
                v-model="formData.comment"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
          Fermer
        </button>
        <button type="submit" :disabled="isLoading" class="btn btn-primary">
          <span v-if="isLoading" class="d-flex align-items-center">
            <div class="spinner-border spinner-border-sm text-white me-2" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            Chargement...
          </span>
          <span v-else> Terminer</span>
        </button>
      </div>
    </form>
  </Modal>
</template>
