<script setup>
import { onMounted, ref, computed, onUnmounted } from 'vue';
import { useSalesStore } from '@/store';
import { salesService } from '@/services';
import { formater, helpers } from '@/utils';
import html2pdf from 'html2pdf.js';

const salesStore = useSalesStore();

const props = defineProps({
  id: Number
});

const loading = ref(false);

const order = ref(computed(() => salesStore.selectedBonDeCommande));

onMounted(async () => {
  await salesService.getBonDeCommandeById(props.id);
  loading.value = true;
  generatePDF();
});

onUnmounted(() => {
  salesStore.clearOneBonDeCommande();
});


const priceFromSelectedSupplier = (item) => {
  const supplierPrices = {
    [item.fournisseur1_id]: item.prix_fournisseur_1,
    [item.fournisseur2_id]: item.prix_fournisseur_2,
    [item.fournisseur3_id]: item.prix_fournisseur_3,
  };
  return supplierPrices[item.fournisseur_choisi] || 'Price not found';
};

const pdfUrl = ref('');

const generatePDF = () => {
  const element = document.getElementById('printSection');
  const childElement = element.querySelector('.card');
  const iframe = document.getElementById('pdfPreview');

  const body = document.getElementById('body');

  // Remove the classes before printing
  element.classList.replace('col-9', 'col-12');
  element.classList.add('m-0');
  element.classList.add('p-0');
  body.classList.add('ps-5');
  body.classList.add('pe-5');
  body.classList.add('mn-0');
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
</script>

<template>
  <div class="flex-grow-1 container-fluid mt-3">
    <div class="d-flex justify-content-between align-items-center">
      <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Bon de commande</span></h5>
    </div>
    <div class="row">
      <div class="col-12 p-0" id="printSection">
        <div class="card card-border-shadow-primary p-9 m-0" style="height: 90vh;" v-if="order && !pdfUrl">
          <img class="img-thumbnail" src="@/assets/img/Header.png" width="100%" height="100%"
            style="object-fit: contain;" />
          <div class="card-body m-0 p-0" id="body">
            <div class="row justify-content-between align-items-center mb-2 mt-4 header">

              <div class="col-6 p-3">
                <p class="mb-1"><strong class="text-dark">Bon de commande N° : </strong> {{ order.bon_commande[0].num }}
                </p>
                <p class="mb-1"><strong class="text-dark">Date : </strong> {{
          formater.date(order.bon_commande[0].created_at) }}</p>
                <p class="mb-1"><strong class="text-dark">Affaire : </strong> {{ order.project.code }}</p>
                <p class="mb-1"><strong class="text-dark">Projet : </strong> {{ order.project.code }}</p>
              </div>
              <div class="col-6 border border-primary rounded p-2">
                <h6 class="font-bold text-dark mb-1" style="font-size: 11px;">{{
          order.bon_commande[0].soustraitant.raison_social }}</h6>
                <h6 class="font-bold text-dark mb-1" style="font-size: 11px;">ICE : {{
          order.bon_commande[0].soustraitant.num_ice }}</h6>
                <p class="mb-1">{{ order.bon_commande[0].soustraitant.adresse }}</p>
              </div>
            </div>
            <div class="row table-responsive text-nowrap">
              <table class="table striped-table mt-3 my-2">
                <thead>
                  <tr style="background-color: #4e96de !important;">
                    <th scope="col" class="text-start">Désignation</th>
                    <th scope="col">Unite</th>
                    <th scope="col">Quantité</th>
                    <th scope="col">Prix Unitaire</th>
                    <th scope="col">Prix Total</th>
                  </tr>
                </thead>
                <tbody>

                  <tr v-for="item in order.purchase_article" :key="item.id">
                    <td class="text-dark text-start">{{ item.designation }}</td>
                    <td class="text-dark text-center">{{ item.unity }}</td>
                    <td class="text-dark text-center">{{ item.quantity }}</td>
                    <td class="text-dark text-center">{{ formater.number(priceFromSelectedSupplier(item)) }} MAD</td>
                    <td class="text-dark text-center">
                      {{ formater.number(priceFromSelectedSupplier(item) * item.quantity) }}
                      MAD
                    </td>
                  </tr>
                  <tr>
                    <td colspan="4" class="text-dark">
                      MONTANT TOTAL EN DIRHAMS HT
                    </td>
                    <td class="text-center">
                      {{
          formater.number(order.purchase_article.reduce((total, item) => {
            const priceProperty = `prix_fournisseur_${item.fournisseur_choisi}`
            const unitPrice = item[priceProperty]
            return total + item.quantity * unitPrice
          }, 0))
        }}
                      MAD
                    </td>
                  </tr>
                  <tr>
                    <td colspan="4" class="text-dark">
                      MONTANT TVA 20%
                    </td>
                    <td class="text-center">
                      {{
            formater.number(order.purchase_article.reduce((total, item) => {
              const priceProperty = `prix_fournisseur_${item.fournisseur_choisi}`
              const unitPrice = item[priceProperty]
              return total + item.quantity * unitPrice * 0.2
            }, 0))
          }}
                      MAD
                    </td>
                  </tr>
                  <tr>
                    <td colspan="4" class="text-dark">
                      MONTANT TOTAL EN DIRHAMS TTC
                    </td>
                    <td class="text-center">
                      {{
            formater.number(order.purchase_article.reduce((total, item) => {
              const priceProperty = `prix_fournisseur_${item.fournisseur_choisi}`
              const unitPrice = item[priceProperty]
              return total + item.quantity * unitPrice * 1.2
            }, 0)
            ) }}
                      MAD
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="row mt-3 w-100 header">
              <div class="col-md-12 p-2 mt-1">
                <p>Arret du present bon de commande toutes taxes comprises a la somme de :</p>
                <p class="text-dark font-bold">
                  {{ helpers.numberToTextMAD(
          order.purchase_article.reduce((total, item) => {
            const priceProperty = `prix_fournisseur_${item.fournisseur_choisi}`
                  const unitPrice = item[priceProperty]
                  return total + item.quantity * unitPrice * 1.2
                  }, 0))
                  }}
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <iframe id="pdfPreview" style="width: 100%; height: 900px"></iframe>
      </div>
    </div>
  </div>
</template>

<style scoped>
p {
  font-size: 12px;
}

thead>tr>th {
  color: #fff !important;
}

.footer {
  margin-top: auto;
}

.header {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  width: 100% !important;
}

thead>tr>th {
  font-size: 10px;
}

.img-fluid {
  width: 100px !important;
  height: 100px !important;
}

.empty_stats_img_md {
  width: 100%;
  max-width: 180px;
  margin: 0 auto;
}


.table {
  font-size: 10px;
}

.striped-table {
  width: 100%;
  border-collapse: collapse;
  /* Optional: Collapses the border to make it look neat */
}

.striped-table th,
.striped-table td {

  /* Optional: Adds a light border to each cell */
  padding: 8px;
  /* Adjust padding to your preference */
  text-align: left;
  /* Adjust text alignment as needed */
}


.striped-table tr {
  align-items: center;
}

/* Stripe effect for table rows */
.striped-table tr:nth-child(even) {
  background-color: #dcecfd;
  /* Lighter shade for even rows */
}

.striped-table tr:nth-child(odd) {
  background-color: #fff;
  /* White or any other color for odd rows */
}

#footer {
  margin-top: auto !important;
}
</style>
