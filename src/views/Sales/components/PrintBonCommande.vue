<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useSalesStore } from '@/store';
import html2pdf from 'html2pdf.js';

const route = useRoute();
const salesStore = useSalesStore();

const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('fr-FR', options);
};
const addOneMonth = (date) => {
  const newDate = new Date(date);
  newDate.setMonth(date.getMonth() + 1);
  return newDate;
};

const commande = ref({});
const bonCommande = ref({});
const fournisseurId = ref(null);

commande.value = salesStore.print_commande;
bonCommande.value = salesStore.print_bonCommande;
console.log(commande.value);
console.log(bonCommande.value);
onMounted(() => {
  if (route.params.id && !isNaN(route.params.id)) {
    fournisseurId.value = Number(route.params.id);
    console.log(fournisseurId.value);
  }
});
onMounted(() => {
  if (commande.value && Object.keys(commande.value).length > 0) {
    generatePDF('printsection');
  }
});
let pdfUrl = ref(null);
const generatePDF = (elementId) => {
  const element = document.getElementById(elementId);
  const iframe = document.getElementById('pdfPreview');

  const opt = {
    margin: 0,
    filename: 'BonCommande.pdf',
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
    });
};
</script>

<template>
  <iframe
    id="pdfPreview"
    name="pdfPreview"
    style="width: 90%; height: 85%"
    class="container"
  ></iframe>
  <div class="container mt-3" v-if="commande && !pdfUrl" id="printsection">
    <div class="d-flex flex-wrap justify-content-between">
      <div class="p-2">
        <div class="row flex-container mb-4 header">
          <img
            class="img-thumbnail h-px-100 w-px-250 flex-item"
            src="../../../assets/img/Logo_Neweracom.png"
            alt="Company Logo"
          />

          <div class="col-md-6 flex-item">
            <h5>Bon de Commande N° {{ bonCommande.num }}</h5>

            <span>
              Rabat, Le <span id="date">{{ formatDate(new Date()) }} .</span> </span
            ><br />
            <span>Date Limite de validitée {{ formatDate(addOneMonth(new Date())) }} .</span><br />
          </div>
        </div>
        <div class="row m-2 flex-container">
          <div class="col-md-6 flex-item">
            <h5 class="text-primary">Vendeur</h5>
            <span><strong>Name:</strong> {{ commande[0].fournisseur.commercial_name }}</span
            ><br />
            <span><strong>Adresse:</strong> {{ commande[0].fournisseur.adresse }}</span
            ><br />
            <span><strong>Fix:</strong> {{ commande[0].fournisseur.fix }}</span
            ><br />
            <span><strong>Telephone:</strong> {{ commande[0].fournisseur.phone_no_1 }}</span
            ><br />
            <span><strong>Email:</strong> {{ commande[0].fournisseur.email }}</span
            ><br />
          </div>
          <div class="col-md-6 flex-item">
            <h5 class="text-primary">Acheteur</h5>
            <span><strong>NewEraCom</strong></span
            ><br />
            <span><strong>10100, Rue Al Hodal Secteur 10 Bloc O Lot 7,</strong></span
            ><br />
            <span><strong>Hay Riad, Rabat.</strong></span
            ><br />
          </div>
        </div>

        <table class="table table-bordered mt-5 my-2">
          <thead>
            <tr>
              <th scope="col">Référence</th>
              <th scope="col">Désignation</th>
              <th scope="col">Quantité</th>
              <th scope="col">Prix Unitaire</th>
              <th scope="col">Montant</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="items in commande" :key="items.id">
              <td>{{ items.article.article }}</td>
              <td>{{ items.designation }}</td>
              <td>{{ items.quantity }}</td>
              <td>{{ items['prix_fournisseur_' + items.fournisseur_choisi] }} MAD</td>
              <td>
                {{ items.quantity * items['prix_fournisseur_' + items.fournisseur_choisi] }}
                MAD
              </td>
            </tr>

            <tr style="border: none">
                <td style="text-align: left; border: none">
                    <strong>Total HT:</strong>
                </td>
                <td colspan="2" style="border: none"></td>
                <td style="border: none"></td>
                <td id="totalAmount" style="text-align: right; border: 1px solid">
                    {{
                        commande.reduce((total, item) => {
                            const priceProperty = `prix_fournisseur_${item.fournisseur_choisi}`
                            const unitPrice = item[priceProperty]
                            return total + item.quantity * unitPrice
                        }, 0)
                    }}
                    MAD
                </td>
            </tr>
            <tr style="border: none">
                <td style="text-align: left; border: none">
                    <strong>Total TVA:</strong>
                </td>
                <td colspan="2" style="border: none"></td>
                <td style="border: none"></td>
                <td id="totalAmount" style="text-align: right; border: 1px solid">
                    {{
                        commande.reduce((total, item) => {
                            const priceProperty = `prix_fournisseur_${item.fournisseur_choisi}`
                            const unitPrice = item[priceProperty]
                            return total + item.quantity * unitPrice * 0.2
                        }, 0)
                    }}
                    MAD
                </td>
            </tr>
            <tr style="border: none">
                <td style="text-align: left; border: none">
                    <strong>Total TTC:</strong>
                </td>
                <td colspan="2" style="border: none"></td>
                <td style="border: none"></td>
                <td id="totalAmount" style="text-align: right; border: 1px solid">
                    {{
                        commande.reduce((total, item) => {
                            const priceProperty = `prix_fournisseur_${item.fournisseur_choisi}`
                            const unitPrice = item[priceProperty]
                            return total + item.quantity * unitPrice * 1.2
                        }, 0)
                    }}
                    MAD
                </td>
            </tr>
          </tbody>
        </table>

        <div class="row mt-5 w-100 header">
          
          
          <div class="col-md-12 p-2 mt-1">
            <p>Arret du present bon de commande toutes taxes comprises a la somme de :</p>
            <p class="fw-bold">{{
                new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'MAD' }).format(
                    commande.reduce((total, item) => {
                    const priceProperty = `prix_fournisseur_${item.fournisseur_choisi}`
                    const unitPrice = item[priceProperty]
                    return total + item.quantity * unitPrice * 1.2
                    }, 0)
                )
            }}</p>
            <p class="fs-6">*Disponibilité :</p>
            <p class="fs-6">*Facture devra etre accompagnée d'une copie du BC :</p>
            <p class="fs-6">*Paiément : Avance 50% a la commande / le reste a la livraison final sur la base des quantités livré ,posé ,installer et mise en service</p>

          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container mt-3 text-center" v-else-if="!pdfUrl">
    <div class="mt-2 mb-4">
      <img src="/src/assets/img/No_Results.png" class="empty_stats_img_md" alt="no_results" />
      <h5 class="mt-3 fw-bold">Aucun bon de commande créé pour le moment.</h5>
      <p class="text-muted">
        Vous pouvez créer un nouveau bon de commande en vous rendant dans la rubrique Bons de
        commande
      </p>
    </div>
  </div>
</template>

<style>
.header {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  width: 100% !important;
}

.img-fluid {
  max-width: none !important;
  width: auto !important;
  height: 100px !important;
}

@media print {
  .header {
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
  }

  .flex-container {
    display: table;
    width: 100%;
  }

  .flex-item {
    display: table-cell;
  }
}
.empty_stats_img_md {
  width: 100%;
  max-width: 180px;
  margin: 0 auto;
}
.table > thead > tr > th {
    background-color: #387ADF !important;
    color: white !important;
    text-align: center !important;
}
.table > tbody > tr:nth-child(odd) {
  background-color: #8eb5ef;
  color: white;

}


</style>
