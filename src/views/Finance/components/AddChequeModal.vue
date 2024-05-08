<script setup lang="ts">
import { financeService } from '@/services'
import shared_service from '@/services/shared_service'
import { useFinanceStore, useSharedStore } from '@/store'
import { Modal } from '@/ui'
import { computed, onMounted, ref } from 'vue'
import { useToast } from 'vue-toastification'

const isLoading = ref(false)
const toast = useToast()

const FinanceStore = useFinanceStore()
const sharedStore = useSharedStore()

const tiers = ref(computed(() => sharedStore.fournisseurs.data))
const carnets = ref(computed(() => FinanceStore.carnets.data))

onMounted(async () => {
  await financeService.getCarnets()
  await shared_service.getSoustraitant()
})

const cheque = ref({
  numero: '',
  montant: '',
  date_emission: '',
  date_encaissement: '',
  statut: '',
  remarque: '',
  carnet_id: null,
  tier_id: null,
  type:'cheque',
})

const submit = async () => {
  await financeService
    .insertCheque(cheque.value)
    .then(() => {
      $('#addCheque').modal('hide')
      toast.success('Cheque ajouté avec succès')
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
  <Modal id="addCheque" title="Nouveau Cheque" size="modal-lg">
    <form @submit.prevent="submit">
      <div class="modal-body">
        <div class="row">
          <div class="col-6 mb-3">
            <label for="numero" class="mb-2"
              >Entrez le numero de Cheque<span class="text-danger">*</span></label
            >
            <input
              type="text"
              class="form-control"
              v-model="cheque.numero"
              placeholder="Entrez le numero de Cheque"
              required
            />
          </div>
          <div class="col-6 mb-3">
            <label for="carnet_id" class="mb-2">Carnet <span class="text-danger">*</span></label>
            <select class="form-select" v-model="cheque.carnet_id" required>
              <option
                v-if="carnets !== null"
                v-for="carnet in carnets.filter((carnet) => carnet.type === 'cheque')"
                :key="carnet.id"
                :value="carnet.id"
              >
                {{ carnet.numero }}
              </option>
            </select>
        </div>
          <div class="col-6 mb-3">
            <label for="tier_id" class="mb-2">Tier <span class="text-danger">*</span></label>
            <select
              class="form-select"
              v-model="cheque.tier_id"
              required
              :data="
                tiers ? tiers.map((item) => ({ key: item.id, value: item.raison_social })) : []
              "
            >
              <option v-for="tier_id in tiers" :key="tier_id.id" :value="tier_id.id">
                {{ tier_id.raison_social }}
              </option>
            </select>
          </div>
          <div class="col-6 mb-3">
            <label for="statut" class="mb-2">Status <span class="text-danger">*</span></label>
            <select class="form-control" v-model="cheque.statut" required>
              <option value="">Select an option</option>
              <option value="encaissé">Encaissé</option>
              <option value="non encaissé">Non Encaissé</option>
            </select>
          </div>
          <div class="col-6 mb-3">
            <label for="montant" class="mb-2">Montant <span class="text-danger">*</span></label>
            <input
              type="number"
              class="form-control"
              v-model="cheque.montant"
              placeholder="Montant"
              required
            />
          </div>
          <div class="col-6 mb-3">
            <label for="remarque" class="mb-2">Remarque <span class="text-danger">*</span></label>
            <textarea
              type="number"
              class="form-control"
              v-model="cheque.remarque"
              placeholder="remarque"
              required
            ></textarea>
          </div>
          <div class="col-6 mb-3">
            <label for="date_emission" class="mb-2"
              >Date Emmission <span class="text-danger">*</span></label
            >
            <input type="date" class="form-control" v-model="cheque.date_emission" required />
          </div>
          <div class="col-6 mb-3">
            <label for="date_encaissement" class="mb-2"
              >Date Encaissement <span class="text-danger">*</span></label
            >
            <input type="date" class="form-control" v-model="cheque.date_encaissement" required />
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
