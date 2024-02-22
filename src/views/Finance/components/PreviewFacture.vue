<script setup>
import { ref, watch, computed } from 'vue';
import { Modal } from '@/ui';
import { useFactureStore } from '@/store';
import html2pdf from 'html2pdf.js';
// import {baseUrl} from '@/utils';
import { helpers } from '@/utils';


const getFileUrl = (attachment) => {
    return helpers.baseUrl() + `${attachment}`;
};
const FactureStore = useFactureStore();
const props = defineProps({
    id: {
        type: String,
        required: true
    }
});
const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
};
const addOneMonth = (date) => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + 1);
    return newDate;
};

const facture = ref(computed(() => FactureStore.print_facture));
const articles = ref(computed(() => FactureStore.print_articles));

const comment = ref('comment');
const objet = ref('test');
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

console.log(facture.value);
console.log(articles.value);

// watch([() => facture.value, () => articles.value], () => {
//     if (facture.value && articles.value) {
//         nextTick(() => {
//             generatePDF('printsection');
//         });
//     }
// });
const Submit = () => {
    generatePDF('printsection');
};
let pdfUrl = ref(null);
const generatePDF = (elementId) => {
    const element = document.getElementById(elementId);
    const iframe = document.getElementById('pdfPreview');

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
        });
};
</script>

<template>
    <!-- <Modal :id="id" extra-class="modal-xl">
        <div class="modal-body"> -->
    <div class="row container-fluid" v-if="!pdfUrl">
        <div class="col-12 mt-4">
            <div class="card mb-4 card-border-shadow-primary p-3">
                <div class="col-sm-12">
                    <div class="mb-3">
                        <label for="nameEx" class="form-label">Objet de Facture :</label>
                        <input class="form-control" placeholder="Entrez le numéro de l'offre" type="text" tabindex="0"
                            id="nameEx" v-model="objet" autofocus required />
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="mb-3">
                        <label for="nameEx" class="form-label">Commentaire</label>

                        <textarea placeholder="Saisisser votre Commentaire" id="" cols="30" rows="10" class="form-control"
                            v-model="comment"></textarea>
                    </div>
                </div>
                <div>
                    <button type="button" class="btn btn-primary float-right" @click="Submit()">
                        Générer la Facture
                    </button>
                </div>
            </div>
        </div>
    </div>
    <iframe id="pdfPreview" name="pdfPreview" style="width: 100%; height: 80vh" class="container"></iframe>
    <div class="container mt-3" v-if="!pdfUrl" id="printsection">
        <div class="d-flex flex-wrap justify-content-between" v-if="articles && facture">
            <div class="p-2">
                <div class="row flex-container mb-4 header">
                    <img class="img-thumbnail h-px-100 w-px-250 flex-item" src="../../../assets/img/Logo_Neweracom.png"
                        alt="Company Logo" />

                    <div class="col-md-6 flex-item">
                        <h3>Facture N° {{ facture.numero }}</h3>

                        <span>
                            Rabat, Le
                            <span id="date">{{ formatDate(new Date()) }} .</span> </span><br />
                        <span>Date Limite de validitée
                            {{ formatDate(addOneMonth(new Date())) }} .</span><br />
                    </div>
                </div>
                <div class="row m-2 flex-container">
                    <div class="col-md-6 flex-item">
                        <h4 class="text-primary">Client</h4>
                        <span><strong>Raison Social:</strong>
                            {{ facture.project.client.raison_social }}</span><br />
                        <span><strong>Adresse:</strong> {{ facture.project.client.adresse }}</span><br />
                        <span><strong>Fix:</strong> {{ facture.project.client.fix }}</span><br />
                        <span><strong>Telephone:</strong> {{ facture.project.client.phone }}</span><br />
                        <span><strong>Email:</strong> {{ facture.project.client.email }}</span><br />
                    </div>
                    <div class="col-md-6 flex-item">
                        <h4 class="text-primary">Societe</h4>
                        <span><strong>NewEraCom</strong></span><br />
                        <span><strong>10100, Rue Al Hodal Secteur 10 Bloc O Lot 7,</strong></span><br />
                        <span><strong>Hay Riad, Rabat.</strong></span><br />
                    </div>
                </div>
                <div class="row flex-item m-2 mt-2">
                    <div style="display: flex; align-items: center">
                        <h4 class="text-primary">Objet :{{ objet }}</h4>
                        <!-- <h5 class=""></h5> -->
                    </div>
                </div>
                <div class="row flex-item m-2 mt-2">
                    <h4 class="text-primary">Attachements</h4>
                    <div style="display: flex; flex-wrap: wrap">
                        <div class="p-2" style="flex: 1 0 50%" v-for="(attachment, index) in facture.facture_attachement"
                            :key="index" v-if="facture.facture_attachement.length > 0">
                            <strong>{{ attachment.composent.label }}:</strong>
                            <div v-if="attachment.composent.type === 'file'">
                                <a :href="getFileUrl(attachment.value)" target="_blank">View File</a>
                            </div>
                            <div v-else>
                                {{ attachment.value }}
                            </div>
                        </div>
                        <div v-else class="text-center">No Attachements</div>
                    </div>
                </div>
                <table class="table table-bordered mt-2 my-2">
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
                            <td colspan="4" style="border: none"></td>
                            <td style="text-align: right; border: 1px solid">
                                <strong>Total:</strong>
                            </td>
                            <td id="totalAmount" style="border: 1px solid">
                                {{
                                    articles.reduce((total, item) => {
                                        return total + item.article.quantite * item.article.prix_ht;
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
                    <div class="col-md-6 text-end">
                        <p>Total HT: XX €</p>
                        <p>TVA: XX €</p>
                        <p>Total TTC: XX €</p>
                    </div>
                </div>
                <div class="row">
                    <span class="font-weight-bold" style="text-decoration: underline; color: red">NB :</span>
                    <span>{{ comment }}</span>
                </div>
            </div>
        </div>
    </div>
    <div class="container text-center" v-else-if="!pdfUrl">
        <div class="mb-4">
            <img src="/src/assets/img/No_Results.png" class="empty_stats_img_md" alt="no_results" />
            <h5 class="mt-3 fw-bold">Aucune Facture créé pour le moment.</h5>
            <p class="text-muted">
                Vous pouvez créer une nouvelle facture en vous rendant dans la rubrique Facture
            </p>
        </div>
    </div>
    <!-- </div>
    </Modal> -->
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
</style>
