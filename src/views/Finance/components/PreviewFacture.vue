<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { financeService } from '@/services'
import { useFinanceStore } from '@/store'
import { formater, helpers } from '@/utils'
import UpdateFacture from './UpdateFacture.vue'
import RejectModal from '@/ui/modals/RejectModal.vue'
import ValidModal from '@/ui/modals/ValidModal.vue'
import AvoirModal from '@/ui/modals/AvoirModal.vue'

const financeStore = useFinanceStore()

const updateModal = 'update-facture'
const rejectModal = 'rejeter-modal'
const validModal = 'valid-modal'

const uploadsUrl = import.meta.env.VITE_UPLOADS_URL

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const facture = ref(computed(() => financeStore.facture))
const comment = ref(computed(() => financeStore.comment))
const objet = ref(computed(() => financeStore.objet))
const item = ref(null)

onMounted(async () => {
  await financeService.getById(props.id)
})

watch(
  item,
  () => {
    facture.value = item.value
  },
  { deep: true }
)
</script>

<template>
  <div class="flex-grow-1 container-fluid mt-3" v-if="facture">
    <h5 class="py-3 mb-4">
      <span class="text-muted fw-light">Dashboard / </span>
      {{ facture.numero }}
    </h5>
    <div class="row invoice-preview">
      <div class="col-xl-9 col-md-8 col-12 mb-md-0 mb-4" id="printsection">
        <div class="card card-border-shadow-primary invoice-preview-card">
          <div class="card-body">
            <div class="p-2">
              <div class="row flex-container mb-4 header">
                <div class="col-md-12 float-left">
                  <img
                    class="img-thumbnail flex-item"
                    src="../../../assets/img/Logo_Neweracom.png"
                    alt="Company Logo"
                    width="30%"
                    height="13px"
                  />
                </div>
              </div>
              <div class="row m-2 d-flex justify-content-between align-items-center">
                <div class="col-md-6 flex-item fs-6">
                  <span><strong>Facture N° :</strong>{{ facture.numero }}</span
                  ><br />
                  <span><strong>Affaire N° :</strong>{{ facture.project.code }}</span
                  ><br />
                  <span><strong>Projet :</strong>{{ facture.project.code }}</span
                  ><br />
                  <span
                    ><strong>Status :</strong>
                    <span class="badge" :class="helpers.returnBadge(facture.status)[0]">
                      {{ helpers.returnBadge(facture.status)[1] }}</span
                    ></span
                  ><br />
                </div>
                <div class="col-md-6 flex-item fs-6 rounded border border-primary p-3">
                  <span>{{ facture.project.client.raison_social }}</span
                  ><br />
                  <span>{{ facture.project.client.adresse }}</span
                  ><br />
                  <span> {{ facture.project.client.fix }}</span
                  ><br />
                </div>
              </div>
              <div class="row flex-item m-2 mt-4">
                <div style="display: flex; align-items: center">
                  <h4 class="text-primary">Objet :{{ objet }}</h4>
                </div>
              </div>
              <table class="table table-bordered mt-4 my-2" id="table">
                <thead>
                  <tr>
                    <th scope="col">Article</th>
                    <th scope="col">Type</th>
                    <th scope="col">Quantité</th>
                    <th scope="col">Prix Unitaire HT</th>
                    <th scope="col">Prix Unitaire TTC</th>
                    <th scope="col">Montant HT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="items in facture.facture_article" :key="items.id">
                    <td>{{ items.article.article }}</td>
                    <td>{{ items.article.type }}</td>
                    <td>{{ items.qte }}</td>
                    <td>{{ items.article.prix_ht }} MAD</td>
                    <td>{{ items.article.prix_ttc }} MAD</td>
                    <td>
                      {{ items.qte * items.article.prix_ht }}
                      MAD
                    </td>
                  </tr>

                  <tr style="border: none">
                    <td style="text-align: left; border: none">
                      <strong>Total HT:</strong>
                    </td>
                    <td colspan="3" style="border: none"></td>
                    <td style="border: none"></td>
                    <td id="totalAmount" style="text-align: right; border: 1px solid">
                      {{
                        facture.facture_article.reduce((total, item) => {
                          return total + item.qte * item.article.prix_ht
                        }, 0)
                      }}
                      MAD
                    </td>
                  </tr>
                  <tr style="border: none">
                    <td style="text-align: left; border: none">
                      <strong>Total TVA:</strong>
                    </td>
                    <td colspan="3" style="border: none"></td>
                    <td style="border: none"></td>
                    <td id="totalAmount" style="text-align: right; border: 1px solid">
                      {{
                        facture.facture_article.reduce((total, item) => {
                          return total + item.qte * item.article.prix_ht * 0.2
                        }, 0)
                      }}
                      MAD
                    </td>
                  </tr>
                  <tr v-if="facture.type === 'Facture RG'" style="border: none">
                    <td style="text-align: left; border: none">
                      <strong>Garantie:</strong>
                    </td>
                    <td colspan="3" style="border: none"></td>
                    <td style="border: none"></td>
                    <td id="totalAmount" style="text-align: right; border: 1px solid">
                      {{
                        (facture.facture_article.reduce((total, item) => {
                          return total + item.qte * item.article.prix_ht * 1.2
                        }, 0) *
                          facture.extra) /
                        100
                      }}
                      MAD
                    </td>
                  </tr>
                  <tr v-if="facture.type === 'Facture avec Avance'" style="border: none">
                    <td style="text-align: left; border: none">
                      <strong>Avance:</strong>
                    </td>
                    <td colspan="3" style="border: none"></td>
                    <td style="border: none"></td>
                    <td id="totalAmount" style="text-align: right; border: 1px solid">
                      {{ facture.extra }} MAD
                    </td>
                  </tr>
                  <tr style="border: none">
                    <td style="text-align: left; border: none">
                      <strong>Total TTC:</strong>
                    </td>
                    <td colspan="3" style="border: none"></td>
                    <td style="border: none"></td>
                    <td
                      v-if="facture.type === 'Facture RG'"
                      id="totalAmount"
                      style="text-align: right; border: 1px solid"
                    >
                      {{
                        facture.facture_article.reduce((total, item) => {
                          return total + item.qte * item.article.prix_ht * 1.2
                        }, 0) -
                        (facture.facture_article.reduce((total, item) => {
                          return total + item.qte * item.article.prix_ht * 1.2
                        }, 0) *
                          facture.extra) /
                          100
                      }}
                      MAD
                    </td>
                    <td
                      v-if="facture.type === 'Facture avec Avance'"
                      id="totalAmount"
                      style="text-align: right; border: 1px solid"
                    >
                      {{
                        facture.facture_article.reduce((total, item) => {
                          return total + item.qte * item.article.prix_ht * 1.2
                        }, 0) - facture.extra
                      }}
                      MAD
                    </td>
                    <td
                      v-if="facture.type === 'client'"
                      id="totalAmount"
                      style="text-align: right; border: 1px solid"
                    >
                      {{
                        facture.facture_article.reduce((total, item) => {
                          return total + item.qte * item.article.prix_ht * 1.2
                        }, 0)
                      }}
                      MAD
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="row flex-item m-2 mt-4">
                <div style="display: flex; align-items: center">
                  <h4 class="text-primary">Facture attachements</h4>
                </div>
              </div>
              <table class="table table-bordered mt-2 my-2" id="table">
                <thead>
                  <tr>
                    <th scope="col">Label</th>
                    <th scope="col">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="items in facture.facture_attachement" :key="items.id">
                    <td>{{ items.composent.label }}</td>
                    <td v-if="items.composent.type === 'file'">
                      <a
                        :href="`${uploadsUrl}storage/` + items.value"
                        style="max-width: 200px; color: white"
                        >File</a
                      >
                    </td>
                    <td v-else style="max-width: 200px">{{ items.value }}</td>
                  </tr>
                </tbody>
              </table>

              <div class="row mt-5 w-100 header">
                <div class="col-md-6">
                  <p>Conditions de paiement: À réception de la facture</p>
                  <p>Date de livraison: À convenir</p>
                </div>
              </div>
              <div class="col-md-12 p-2 mt-1">
                <p class="fs-6">*Disponibilité :</p>
                <p class="fs-6">*Facture devra etre accompagnée d'une copie du BC :</p>
                <p class="fs-6">
                  *Paiément : Avance 50% a la commande / le reste a la livraison final sur la base
                  des quantités livré ,posé ,installer et mise en service
                </p>
              </div>
              <div class="row">
                <span class="font-weight-bold" style="text-decoration: underline; color: red"
                  >NB :</span
                >
                <span>{{ comment }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-4 col-12 invoice-actions">
        <div
          v-if="facture.status !== 'approved' && facture.status !== 'rejected'"
          class="card card-border-shadow-primary mb-4"
        >
          <div class="card-body">
            <button
              data-bs-toggle="modal"
              data-bs-target="#valid-modal"
              class="btn btn-label-success d-grid w-100 mb-2 waves-effect d-flex"
            >
              <i class="ti ti-check me-2"></i> Valider la facture
            </button>
            <button
              data-bs-toggle="modal"
              data-bs-target="#rejeter-modal"
              class="btn btn-label-danger d-grid w-100 mb-2 waves-effect d-flex"
            >
              <i class="ti ti-trash me-2"></i> Rejeter la facture
            </button>
          </div>
        </div>

        <div class="card card-border-shadow-primary mb-4">
          <div class="card-body">
            <button
              class="btn btn-label-primary d-grid w-100 mb-2 waves-effect d-flex"
              target="_blank"
              @click="Submit()"
            >
              <i class="ti ti-printer me-2"></i> Imprimer la facture
            </button>

            <button
              class="btn btn-primary d-grid w-100 waves-effect waves-light"
              data-bs-toggle="modal"
              data-bs-target="#update-facture"
            >
              <span class="d-flex align-items-center justify-content-center text-nowrap"
                ><i class="ti ti-download ti-xs me-2"></i> Modifier la facture</span
              >
            </button>
          </div>
        </div>
      </div>
    </div>
    <iframe
      id="pdfPreview"
      name="pdfPreview"
      style="width: 100%; height: 80vh"
      class="container"
    ></iframe>

    <UpdateFacture :id="updateModal" />
    <RejectModal :id="rejectModal" />
    <ValidModal :id="validModal" :articles="facture.facture_article" />
    <AvoirModal :id="facture.id" :articles="facture.facture_article" />
  </div>
</template>

<style>
#table > thead > tr > th {
  background-color: #387adf !important;
  color: white !important;
  text-align: center !important;
}
#table > tbody > tr:nth-child(odd) {
  background-color: #8eb5ef;
  color: white;
}
</style>
