<script setup>
import { ref, watch, computed, nextTick } from 'vue';
import { Modal } from '@/ui';
import { useLogisticsStore } from '@/store';
import html2pdf from 'html2pdf.js';
import { helpers } from '@/utils';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});
const logisticsStore = useLogisticsStore();

const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('fr-FR', options);
};
const addOneMonth = (date) => {
  const newDate = new Date(date);
  newDate.setMonth(date.getMonth() + 1);
  return newDate;
};

const demandesortie = ref(computed(() => logisticsStore.SelecteddemandeSortie));
// const articles = ref(computed(() => logisticsStore.SelecteddemandeSortie.articles));

// watch(
//     () => FactureStore.print_facture,
//     (newVal) => {
//         facture.value = newVal;
//     }
// );

// watch(
//     () => FactureStore.print_articles,
//     (newVal) => {
//         articles.value = newVal;
//     }
// );

console.log(demandesortie.value);

watch([() => demandesortie.value], () => {
  if (demandesortie.value) {
    nextTick(() => {
      generatePDF('printsection');
    });
  }
});
watch(() => {
  if (demandesortie.value) {
    generatePDF('printsection');
  }
});

let pdfUrl = ref(null);
const generatePDF = (elementId) => {
  const element = document.getElementById(elementId);
  const iframe = document.getElementById('pdfPreview');

  const opt = {
    margin: 0,
    filename: 'demandeSortie.pdf',
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
  <Modal :id="id" extra-class="modal-xl">
    <div class="modal-body">
      <iframe
        id="pdfPreview"
        name="pdfPreview"
        style="width: 100%; height: 80vh"
        class="container"
      ></iframe>
      <div class="container mt-3" v-if="!pdfUrl" id="printsection">
        <div class="d-flex flex-wrap justify-content-between" >
          <div class="p-2">
            <div class="row flex-container mb-4 header">
              <img
                class="img-thumbnail h-px-100 w-px-250 flex-item"
                src="../../../assets/img/Logo_Neweracom.png"
                alt="Company Logo"
              />
            </div>
            
          </div>
        </div>
        <div class="row m-2 flex-container d-flex justify-content-between align-items-center" v-if="demandesortie">
                <div class="col-md-6">
                    <h3 class="text-primary">Bon de Sortie</h3>
                    <span><strong>Demande De sortie De stock:</strong> {{ demandesortie.code }}</span><br />
                    <span><strong>Date de creation:</strong> {{ Date.now() }}</span><br />
                    <span><strong>Projet:</strong> {{ demandesortie.project.code }}</span><br />
                </div>
               
            </div>
        <table class="table mt-5 my-2">
          <thead class="table-light">
            <tr>
              <th scope="col">Article</th>
              <th scope="col">Unite</th>
              <th scope="col">Qte Demande</th>
              <th scope="col">Qte Envoye</th>
              <th scope="col">Qte Livree</th>
            </tr>
          </thead>
          <tbody
            v-if="demandesortie && demandesortie.articles && demandesortie.articles.length > 0"
          >
            <tr v-for="(article, i) in demandesortie.articles" :key="i">
              <td>{{ article.article.article }}</td>
              <td>{{ article.article.unite }}</td>
              <td>{{ article.qte_demande }}</td>
              <td>{{ article.qte_envoye }}</td>
              <td>{{ article.qte_livree }}</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="5" class="text-center">No data available</td>
            </tr>
          </tbody>
        </table>
        <div class="col-md-12 p-2 mt-3">
            
            <div class="col-md-6" v-if="demandesortie">
                    <span><strong>Nom Recepteur:</strong> {{ demandesortie.recepteur }}</span><br />
                    <span><strong>L'adresse de livraison :</strong> {{ demandesortie.lieu_livraison }}</span><br />
                </div>

          </div>
      </div>
    </div>
  </Modal>
</template>
