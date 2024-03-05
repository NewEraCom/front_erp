<script setup>
import { ref, watch, computed } from 'vue';
import { useFinanceStore } from '@/store';
import html2pdf from 'html2pdf.js';
import { helpers } from '@/utils';
import { useRouter } from 'vue-router';
import { UpdateFacture } from '.';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const router = useRouter();

const getFileUrl = (attachment) => {
  return helpers.baseUrl() + `${attachment}`;
};
const FinanceStore = useFinanceStore();
const updateModal = 'update-facture';

// const props = defineProps({
//     id: {
//         type: String,
//         required: true
//     }
// });
const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('fr-FR', options);
};
const addOneMonth = (date) => {
  const newDate = new Date(date);
  newDate.setMonth(date.getMonth() + 1);
  return newDate;
};

const facture = ref(computed(() => FinanceStore.print_facture));
const articles = ref(computed(() => FinanceStore.print_articles));

const comment = ref(computed(() => FinanceStore.comment));
const objet = ref(computed(() => FinanceStore.objet));

console.log(facture.value);
console.log(articles.value);

watch([() => facture.value, () => articles.value], () => {
  if (facture.value === null && articles.value === null) {
    router.push({
      name: 'FnFacture'
    });
  }
});
const Submit = () => {
  generatePDF('printsection');
};
let pdfUrl = ref(null);
const generatePDF = (elementId) => {
  console.log('PRINTING');
  const element = document.getElementById(elementId);
  const childElement = element.querySelector('.card.card-border-shadow-primary');
  const iframe = document.getElementById('pdfPreview');

  // Remove the classes before printing
  element.classList.replace('col-xl-9', 'col-md-12');
  element.classList.add('p-3');
  if (childElement) {
    childElement.classList.remove('card');
    childElement.classList.remove('card-border-shadow-primary');
  }

  const opt = {
    margin: 0,
    filename: 'Facture.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  html2pdf()
    .set(opt)
    .from(element)
    .toPdf()
    .get('pdf')
    .then(function (pdf) {
      iframe.src = pdf.output('datauristring');
      pdfUrl.value = pdf.output('datauristring');
    })
    .then(function () {
      // Add the classes back after printing
      if (childElement) {
        childElement.classList.add('card');
        childElement.classList.add('card-border-shadow-primary');
      }
    });
};
const downloadAllAttachments = async () => {
  const zip = new JSZip();
  const promises = facture.value.facture_attachement.map(async (attachment, index) => {
    if (attachment.composent.type === 'file') {
      const url = getFileUrl(attachment.value);
      const link = document.createElement('a');
      link.href = url;
      link.download = `attachment_${index}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      zip.file(`attachment_${index}.txt`, attachment.value);
    }
  });

  await Promise.all(promises);

  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, 'attachments.zip');
};
const total = computed(() => {
      return articles.value.reduce((total, item) => {
        return total + item.article.quantite * item.article.prix_ht * 1.2;
      }, 0);
    });

    const totalInWords = computed(() => {
      return helpers.numberToTextMAD(total.value);
    });
</script>

<template>
  <div class="flex-grow-1 container-fluid mt-3" v-if="articles && facture">
    <h5 class="py-3 mb-4">
      <span class="text-muted fw-light">Dashboard / </span>
      test
    </h5>
    <div v-if="!pdfUrl" class="row invoice-preview">
      <div class="col-xl-9 col-md-8 col-12 mb-md-0 mb-4" id="printsection">
        <div class="card card-border-shadow-primary invoice-preview-card">
          <div class="card-body">
            <div class="p-2">
              <div class="row flex-container mb-4 header">
                <div class="col-md-12 float-left">
                  <img
                    class="img-thumbnail h-px-100 w-px-250 flex-item"
                    src="../../../assets/img/Logo_Neweracom.png"
                    alt="Company Logo"
                  />
                </div>

                <!-- <div class="col-md-6 flex-item">
                        <h3>Facture N° {{ facture.numero }}</h3>

                        <span>
                            Rabat, Le
                            <span id="date">{{ formatDate(new Date()) }} .</span> </span><br />
                        <span>Date Limite de validitée
                            {{ formatDate(addOneMonth(new Date())) }} .</span><br />
                    </div> -->
              </div>
              <div class="row m-2 d-flex justify-content-between align-items-center">
                <div class="col-md-6 flex-item fs-6">
                  <!-- <h5 class="text-primary">Societe</h5> -->
                  <span><strong>Date :</strong> {{ formatDate(new Date()) }}</span
                  ><br />
                  <span><strong>Facture N° :</strong>{{ facture.numero }}</span
                  ><br />
                  <span><strong>Affaire N° :</strong>{{ facture.project.code }}</span
                  ><br />
                  <span><strong>Projet :</strong>{{ facture.project.code }}</span
                  ><br />
                </div>
                <div class="col-md-6 flex-item fs-6 border border-primary p-3">
                  <!-- <h5 class="text-primary">Client</h5> -->
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
                  <!-- <h5 class=""></h5> -->
                </div>
              </div>

              <table class="table table-bordered mt-2 my-2" id="table">
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
                  <tr v-for="items in articles" :key="items.id">
                    <td>{{ items.article.article }}</td>
                    <td>{{ items.article.type }}</td>
                    <td>{{ items.article.quantite }}</td>
                    <td>{{ items.article.prix_ht }} MAD</td>
                    <td>{{ items.article.prix_ttc }} MAD</td>
                    <td>
                      {{ items.article.quantite * items.article.prix_ht }}
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
                        articles.reduce((total, item) => {
                          return total + item.article.quantite * item.article.prix_ht
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
                        articles.reduce((total, item) => {
                          return total + item.article.quantite * item.article.prix_ht * 0.2
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
                    <td id="totalAmount" style="text-align: right; border: 1px solid">
                      {{
                        articles.reduce((total, item) => {
                          return total + item.article.quantite * item.article.prix_ht * 1.2
                        }, 0)
                      }}
                      MAD
                    </td>
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
                <p>Arret du present bon de commande toutes taxes comprises a la somme de :</p>
                <p class="fw-bold">
                  {{
                    
                    totalInWords
                    
                  }}
                </p>
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
        <div class="card card-border-shadow-primary mb-4">
          <div class="card-body">
            <button
              class="btn btn-label-primary d-grid w-100 mb-2 waves-effect d-flex"
              @click="downloadAllAttachments"
            >
              <i class="ti ti-download me-2"></i> Telecharger les attachements
            </button>
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
