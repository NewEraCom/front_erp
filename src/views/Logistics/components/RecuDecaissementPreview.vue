<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useLogisticsStore } from '@/store';
import html2pdf from 'html2pdf.js';
import { helpers, formater } from '@/utils';

const router = useRouter();
const logisticsStore = useLogisticsStore();

const caisse = ref({});

caisse.value = logisticsStore.selectedItem;

let pdfUrl = ref(null);

onMounted(() => {
  if (caisse.value && Object.keys(caisse.value).length > 0) {
    generatePDF('printsection');
    console.log(caisse.value);
  } else {
    router.push({ name: 'Caisse' });
  }
});

const generatePDF = (elementId) => {
  const element = document.getElementById(elementId);

  const opt = {
    margin: 0,
    filename: 'Recu.pdf',
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
      pdfUrl.value = pdf.output('datauristring');
    })
    .catch(error => {
      console.error('PDF Generation Error:', error);
    });
};
</script>



<template>
  <div class="flex-grow-1 container-fluid mt-3">
    <div class="d-flex justify-content-between align-items-center">
      <h5 class="py-3 mb-4 fw-medium text-muted">
        Dashboard / <span class="text-dark">Recu d'encaissement</span>
      </h5>
    </div>
    <div class="row">
      <div class="col-12 p-0" id="printsection" >
        <div v-if="caisse && !pdfUrl">
          <div
           
            
            class="card card-border-shadow-primary p-9 m-0"
            style="height: 90vh"
          >
            <img
              class="img-thumbnail"
              src="@/assets/img/Header.png"
              width="100%"
              height="100%"
              style="object-fit: contain"
            />
            <div class="card-body m-0 p-9" id="body">
              <div class="row justify-content-between align-items-center mb-2 mt-4 header">
                <div class="col-6 p-3">
                  <p class="mb-1 text-dark">
                    <strong>Recu N° : </strong> {{ 10 }}
                  </p>
                  <p class="mb-1 text-dark">
                    <strong class="text-dark">Date : </strong>
                    {{ formater.date(caisse.date_operation) }}
                  </p>
                  
                  <p class="mb-1 text-dark">
                    <strong class="text-dark">Projet : </strong> {{ caisse.project.code }}
                  </p>
                </div>
                <div class="col-6 border border-primary rounded p-2">
                  <h4 class="font-bold text-dark mb-1" style="font-size: 12px">
                    {{ caisse.recepteur.first_name + " " + caisse.recepteur.last_name }}
                  </h4>
                  <p class="mb-1 text-dark">{{ caisse.recepteur.adresse }}</p>
                  <p class="mb-1 text-dark">{{ caisse.recepteur.phone }}</p>
                  <p class="mb-1 text-dark">{{ caisse.recepteur.email }}</p>
                </div>
              </div>
              <div class="row table-responsive text-nowrap">
                <table class="table striped-table mt-3 my-2">
                    <thead>
                        <tr style="background-color: #4e96de !important">
                            <th scope="col">Emetteur</th>
                            <th scope="col">Montant</th>
                            <th scope="col">Type</th>
                            <th scope="col">Date d'operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{ caisse.emetteur }}</td>
                            <td>{{ caisse.montant }} MAD</td>
                            <td>{{ caisse.type }}</td>
                            <td>{{ caisse.date_operation}}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="mt-3">
                    <h6 class="text-primary fw-bold">Commentaire</h6>
                    <p class=" text-dark" >
                        {{ caisse.comment }}
                       
                    </p>
                </div>
              </div>
              <div class="row mt-3 w-100 header">
                <div class="col-md-12 p-2 mt-1">
                  <p class="text-dark">
                    Arret du present Recu toutes taxes comprises a la somme de :
                  </p>
                  <p class="text-dark fw-bold">
                    {{
                      helpers.numberToTextMAD(caisse.montant)
                    }}
                  </p>
                </div>
                
              </div>
              <div class="mt-4 w-100 d-flex flex-row align-items-center justify-content-between">
                <p>
                    Signé par le Responsable de caisse :
                </p>
                <p>
                    Signé par le Recepteur :
                </p>
              </div>
            </div>
            <div class="card-footer footer" style="margin-top: auto">
              <img class="img-thumbnail" src="@/assets/img/Footer.png" width="100%" height="100%" />
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <!-- <iframe id="pdfPreview" style="width: 100%; height: 100%;" :src="pdfUrl"></iframe> -->
        <object id="pdfPreview" type="application/pdf" style="width: 100%; height: 900px;" :data="pdfUrl"></object>
          </div>
    </div>
  </div>
</template>

<style scoped>
p {
  font-size: 12px;
}

thead > tr > th {
  color: #fff !important;
}

.card {
  position: relative;
  min-height: 100vh;
}

.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
}

.header {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  width: 100% !important;
}

thead > tr > th {
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
  margin-bottom: 0 !important;
}
</style>
