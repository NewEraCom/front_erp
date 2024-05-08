<script setup>
import { ref, onMounted, computed } from 'vue'
import { financeService } from '@/services'
import { useFinanceStore } from '@/store'
import { helpers } from '@/utils'

const financeStore = useFinanceStore()

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const facture = ref(computed(() => financeStore.facture))

onMounted(async () => {
  await financeService.getById(props.id)
})
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
                  <span><strong>Facture :</strong>{{ facture.type }}</span
                  ><br />
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
                  <tr v-for="items in facture.avoir" :key="items.id">
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
                        facture.avoir.reduce((total, item) => {
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
                        facture.avoir.reduce((total, item) => {
                          return total + item.qte * item.article.prix_ht * 0.2
                        }, 0)
                      }}
                      MAD
                    </td>
                  </tr>
                  <tr style="border: none">
                    <td style="text-align: left; border: none">
                      <strong>Total TTC:</strong>
                    </td>
                    <td colspan="3" style="border: none"></td>
                    <td style="border: none"></td>
                    <td
                      id="totalAmount"
                      style="text-align: right; border: 1px solid"
                    >
                      {{
                        facture.avoir.reduce((total, item) => {
                          return total + item.qte * item.article.prix_ht * 1.2
                        }, 0)
                      }}
                      MAD
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-4 col-12 invoice-actions">
        <div class="card card-border-shadow-primary mb-4">
          <div class="card-body">
            <button
              class="btn btn-label-primary d-grid w-100 mb-2 waves-effect d-flex"
              target="_blank"
              @click="Submit()"
            >
              <i class="ti ti-printer me-2"></i> Imprimer la facture
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
