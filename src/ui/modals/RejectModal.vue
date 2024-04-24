<script setup lang="ts">
import finance_service from '@/services/finance_service'
import { useFinanceStore } from '@/store'
import { Modal } from '@/ui'
import { ref, computed } from 'vue'

const props = defineProps({
  id: String
})

const FinanceStore = useFinanceStore()
const facture = ref(computed(() => FinanceStore.print_facture))

const formData = ref({
  id : props.id,
  commentaire: ''
})

const Refuse = async () => {
  const fd = new FormData();
  fd.append('commentaire', formData.value.commentaire);
  await finance_service.RejectStatus(facture.value.id, fd)
}
</script>

<template>
  <Modal :id="id" title="Reject Facture">
    <div class="modal-body">
      <div class="col-sm-12">
        <div class="mb-3">
          <label class="form-label">Comment de Facture :</label>
          <textarea
            placeholder="Saisisser votre Commentaire"
            cols="30"
            rows="10"
            class="form-control"
            v-model="formData.commentaire"
          ></textarea>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
        Fermer
      </button>
      <button class="btn btn-success me-0" data-bs-dismiss="modal" @click="Refuse()">
        <span>Oui, Valider</span>
      </button>
    </div>
  </Modal>
</template>