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

const today = new Date();

onMounted(() => {
  if (caisse.value && Object.keys(caisse.value).length > 0) {
    generatePDF('printsection');
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
      <div class="col-12 p-0" id="printsection">
        <div v-if="caisse && !pdfUrl">
          <div class="card card-border-shadow-primary p-9 m-0" style="height: 100vh">
            <img class="img-thumbnail" src="@/assets/img/Header.png" width="100%" height="100%"
              style="object-fit: contain" />
            <div class="card-body m-0 p-9" id="body">
              <div class="col-12 text-center">
                <h5 class="fw-bold">Recu de reception</h5>
              </div>
              <div class="row">
                <div class="col-12 d-flex p-3">
                  <h6 v-if="today" class="me-auto">Date : {{ formater.date(today) }}</h6>
                  <h6 class="me-auto">No : {{ 202403230 + caisse.id }}</h6>
                </div>
                <table class="table">
                  <thead>
                    <tr class="bg-secondary">
                      <th colspan="4" class="text-dark">
                        <h6 class="mb-0 text-dark fw-bold">Informations sur le récepteur</h6>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th class="fw-bold">Nom :</th>
                      <th>{{ caisse.recepteur.last_name }}</th>
                      <th class="fw-bold">Prenom :</th>
                      <th>{{ caisse.recepteur.first_name }}</th>
                    </tr>
                    <tr>
                      <th class="fw-bold">Adresse</th>
                      <th colspan="3">{{ caisse.recepteur.adresse }}</th>
                    </tr>
                    <tr>
                      <th class="fw-bold">Adresse email :</th>
                      <th>{{ caisse.recepteur.email }}</th>
                      <th class="fw-bold">Telephone :</th>
                      <th>{{ caisse.recepteur.phone_no }}</th>
                    </tr>
                    <tr>
                      <th class="fw-bold">Salarié :</th>
                      <th class="d-flex d-inline">
                        <div class="d-flex ">
                          <div class="border border-dark p-2" style="width: 25px;height: 25px;"></div>
                          <span class="ms-2">Oui</span>
                        </div>
                        <div class="d-flex ms-3">
                          <div class="border border-dark p-2" style="width: 25px;height: 25px;"></div>
                          <span class="ms-2">Non</span>
                        </div>
                      </th>
                      <th>
                      </th>
                      <th></th>
                    </tr>
                  </tbody>
                </table>
                <table class="table">
                  <thead>
                    <tr class="bg-secondary">
                      <th colspan="4" class="text-dark">
                        <h6 class="mb-0 text-dark fw-bold">Details</h6>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th class="fw-bold">Montant :</th>
                      <th>{{ formater.number(caisse.montant) }} MAD</th>
                      <th class="fw-bold">Type de transaction :</th>
                      <th>{{ caisse.type }}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-8">
                <div class="mt-4 w-100 d-flex flex-row align-items-center justify-content-between">
                  <p>
                    Signé par le Responsable de caisse :
                  </p>
                  <p>
                    Signé par le Recepteur :
                  </p>
                </div>
              </div>

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

thead>tr>th {
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
  margin-bottom: 0 !important;
}
</style>
