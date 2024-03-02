<script setup>
import { onMounted, ref ,computed} from 'vue';
// import { useBonCommndeStore } from '@/stores';
import { useRouter } from 'vue-router';
import { useSalesStore } from '@/store';
import { salesService } from '@/services';

// const bonCommandeStore = useBonCommndeStore();
const salesStore = useSalesStore();

const router = useRouter();
const props = defineProps({
  id: Number
});

const commande = ref(computed(() => salesStore.commande));
let bonCommande;
const bonCommandes = ref(computed(() => salesStore.bonDeCommande.data));

onMounted(async () => {
 
  await salesService.getBonDeCommande();
  console.log(bonCommandes);
  if (props && props.id) {
    bonCommande = bonCommandes.value.find((bc) => bc.achat.id === Number(props.id));
     console.log(bonCommande);

    await salesService.commande(bonCommande.achat.id);
    // commande.value = salesStore.commande;
    console.log(commande.value);
  }
});


const generatePDF = (fournisseurId) => {
  const selectedCommande = commande.value[fournisseurId];
  const selectedBonCommande = bonCommande;
  console.log(selectedCommande);
  console.log(selectedBonCommande);
  console.log(fournisseurId);
  salesStore.setPrintBonCommande(selectedBonCommande);
  salesStore.setPrintCommande(selectedCommande);

  router.push({
    name: 'Print',
    params: {
      id: fournisseurId
    }
  });
};

const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('fr-FR', options);
};
const addOneMonth = (date) => {
  const newDate = new Date(date);
  newDate.setMonth(date.getMonth() + 1);
  return newDate;
};
</script>

<template>
  <div class="container mt-3 " v-if="commande">
    <div class="d-flex flex-wrap justify-content-between">
      <div
        class="card m-2 p-4"
        v-for="(items, fournisseurId) in commande"
        :key="fournisseurId"
        :id="`content-${fournisseurId}`"
        style="width: 48%"
        v-if="items"
      >
        <button class="no-print btn btn-primary w-20 m-2" @click="generatePDF(fournisseurId)">
          Télécharger
        </button>
        <div class="row justify-content-between align-items-center mb-4 header">
          <img
            class="img-thumbnail h-px-100 w-px-250"
            src="../../../assets/img/Logo_Neweracom.png"
            alt="Company Logo"
          />

          <div class="col-md-6 ">
            <h5>Bon de Commande N° {{ bonCommande.num }}</h5>

            <span>
              Rabat, Le <span id="date">{{ formatDate(new Date()) }} .</span> </span
            ><br />
            <span>Date Limite de validitée {{ formatDate(addOneMonth(new Date())) }} .</span><br />
          </div>
        </div>
        <div class="row m-2">
          
          <div class="col-md-6">
            <h5 class="text-primary">Acheteur</h5>
            <span><strong>NewEraCom</strong></span
            ><br />
            <span><strong>10100, Rue Al Hodal Secteur 10 Bloc O Lot 7,</strong></span
            ><br />
            <span><strong>Hay Riad, Rabat.</strong></span
            ><br />
          </div>
          <div class="col-md-6">
            <h5 class="text-primary">Fournisseur</h5>
            <span><strong>Name:</strong> {{ items[0].fournisseur.commercial_name }}</span
            ><br />
            <span><strong>Adresse:</strong> {{ items[0].fournisseur.adresse }}</span
            ><br />
            <span><strong>Fix:</strong> {{ items[0].fournisseur.fix }}</span
            ><br />
            <span><strong>Telephone:</strong> {{ items[0].fournisseur.phone_no_1 }}</span
            ><br />
            <span><strong>Email:</strong> {{ items[0].fournisseur.email }}</span
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
              <th scope="col">Montant </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td>{{ item.article.article }}</td>
              <td>{{ item.designation }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item['prix_fournisseur_' + item.fournisseur_choisi] }} MAD</td>
              <td>
                {{ item.quantity * item['prix_fournisseur_' + item.fournisseur_choisi] }}
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
                        items.reduce((total, item) => {
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
                        items.reduce((total, item) => {
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
                        items.reduce((total, item) => {
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
          
        
        </div>
        <div class="col-md-12 p-2 mt-1">
            <p>Arret du present bon de commande toutes taxes comprises a la somme de :</p>
            <p class="fw-bold">{{
                new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'MAD' }).format(
                    items.reduce((total, item) => {
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
      <div class="container mt-3" v-else>
    <div class="mt-2 mb-4 text-center">
      <img src="/src/assets/img/No_Results.png" class="empty_stats_img_md" alt="no_results" />
      <h5 class="mt-3 fw-bold">Aucun bon de commande créé pour le moment.</h5>
      <p class="text-muted">
        Vous pouvez créer un nouveau bon de commande en vous rendant dans la rubrique Bons de
        commande
      </p>
    </div>
  </div>
    </div>
  </div>
  

  <iframe id="pdfPreview" style="width: 60%; height: 500px"></iframe>
</template>

<style scoped>

.header {
  /* ... your existing styles ... */
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  width: 100% !important;
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
