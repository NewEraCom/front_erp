<script setup lang="ts">
import { ref } from 'vue';
import { Modal } from '@/ui';
import { useToast } from 'vue-toastification';
import finance_service from '@/services/finance_service';

const toast = useToast();
const isLoading = ref(false);
const isStock = ref();

const props = defineProps({
  composants: {
    type: Array,
    default: null
  },
  id: {
    type: Number,
    required: true
  },
  articles: {
    type: Array,
    default: null
  }
});

const formData = ref({
  project_id: [],
  numero: [],
  montant: [],
  type: '',
  date: [],
  date_echeance: [],
  items: [1],
  service: [],
  qty: [],
  unite: [],
  price: [],
  total: [],
  articles: [],
  article_id: [],
  composants: [],
  value: [],
});

const addItem = () => {
  formData.value.items.push(formData.value.items.length + 1);
};

const changeValue = (item, index) => {
  formData.value.price[index] = item.prix_ht?.toFixed(2);
  formData.value.unite[index] = item.unite;
  if (formData.value.qty[index] != null) {
    formData.value.total[index] = item.prix_ht * formData.value.qty[index];
    formData.value.total[index] = formData.value.total[index].toFixed(2);
  }
};

const changeQuantity = (index) => {
  if (formData.value.qty[index] != 0) {
    formData.value.total[index] = formData.value.price[index] * formData.value.qty[index];
    formData.value.total[index] = formData.value.total[index].toFixed(2);
  } else {
    formData.value.total[index] = 0;
  }
};

const removeItem = (index) => {
  if (formData.value.items.length > 1) {
    formData.value.items?.splice(index - 1, 1);
    formData.value.service?.splice(index - 1, 1);
    formData.value.qty?.splice(index - 1, 1);
  }
};

const checkArticles = (articles) => {
  let uniqueArticles = new Set();
  for (const article of articles) {
    if (article === null || article === '-') {
      isLoading.value = false;
      toast.error('Veuillez sélectionner un article');
      return false;
    }

    if (uniqueArticles.has(article)) {
      isLoading.value = false;
      toast.error('Les articles ne doivent pas être dupliqués');
      return false;
    } else {
      uniqueArticles.add(article);
    }
  }
  return true;
};

const handleFileChange = (event, index) => {
  formData.value.value[index] = event.target.files[0];
};

const submit = async () => {
  isLoading.value = true;
  if (!checkArticles(formData.value.service)) {
    isLoading.value = false;
    return;
  }

  if (isStock.value != null) {
    isLoading.value = false;
    toast.error('Veuillez sélectionner un emplacement de livraison');
    return;
  }

  let data = new FormData();
  data.append('project_id', props.id);
  data.append('numero', formData.value.numero);
  data.append('montant', JSON.stringify(formData.value.total));
  data.append('type', 'client');
  data.append('date', formData.value.date);
  data.append('date_echeance', formData.value.date_echeance);
  data.append('facture_id', formData.value);
  data.append('qty', JSON.stringify(formData.value.qty));
  data.append('unite', JSON.stringify(formData.value.unite));
  data.append('price', JSON.stringify(formData.value.price));
  data.append('composants', JSON.stringify(props.composants));
  data.append('articles', JSON.stringify(formData.value.service));

  // Append files to FormData
  for (let i = 0; i < formData.value.value.length; i++) {
    if (formData.value.value[i] instanceof File) {
      data.append(`value[${i}]`, formData.value.value[i]);
    } else {
      data.append(`value[${i}]`, formData.value.value[i]);
    }
  }

  await finance_service
    .insertFactureAttachement(data)
    .then(() => {
      isLoading.value = false;
      $('#invoice').modal('hide');
      toast.success('Demande de facturation envoyé avec succès');
    })
    .catch(() => {
      isLoading.value = false;
      toast.error('Une erreur est survenue');
    });
};
</script>
<template>
  <Modal id="invoice" title="Demande de facturation" size="modal-xl">
    <form @submit.prevent="submit">
      <div class="modal-body">
        <div class="border p-3 rounded">
          <div class="row">
            <div class="col-6 mb-2" v-for="(composant, index) in props.composants" :key="composant.id">
              <div class="mb-3">
                <label for="" class="mb-3">{{ composant.label }}</label>
                <input v-if="composant.type === 'file'" @change="handleFileChange($event, index)" type="file"
                  class="form-control" />
                <input v-else v-model="formData.value[index]" :type="composant.type" class="form-control" />
              </div>
            </div>
          </div>
        </div>

        <div v-for="item in formData.items" :key="item" class="col-12">
          <div class="repeater-wrapper pt-0 pt-md-4">
            <div class="d-flex border rounded position-relative pe-0">
              <div class="row w-100 p-3">
                <div class="col-md-4 col-12 mb-md-0 mb-3">
                  <p class="mb-2 repeater-title">Article {{ item }}</p>
                  <select v-model="formData.service[item]" class="form-select item-details mb-3"
                    @change="changeValue(formData.service[item], item)">
                    <option value="-">Sélectionner un article</option>
                    <option v-for="(item, index) in props.articles" :key="index" :value="item">
                      {{ item.article }}
                    </option>
                  </select>
                </div>
                <div class="col-md-2 col-12 mb-md-0 mb-3">
                  <p class="mb-2 repeater-title">Qty</p>
                  <input id="qteInput" v-model="formData.qty[item]" type="number" class="form-control invoice-item-qty"
                    placeholder="1" min="1" :max="formData.service[item]?.qte_restant" @input="changeQuantity(item)"
                    required />
                  <small class="text-muted" v-if="formData.service[item]?.qte_restant">Quantite restante:
                    {{
      formData.service[item]?.qte_restant ? formData.service[item]?.qte_restant : 0
    }}</small>
                </div>
                <div class="col-md-2 col-12 pe-0">
                  <p class="mb-2 repeater-title">Unite</p>
                  <p class="mb-0" v-html="formData.unite[item] ? formData.unite[item] : '-'"></p>
                </div>
                <div class="col-md-2 col-12 pe-0">
                  <p class="mb-2 repeater-title">Prix Unitaire</p>
                  <p class="mb-0" v-html="(formData.price[item] ? formData.price[item] : '0') + ' MAD'"></p>
                </div>
                <div class="col-md-2 col-12 pe-0">
                  <p class="mb-2 repeater-title">Prix Total</p>
                  <p class="mb-0" v-html="(formData.total[item] ? formData.total[item] : '0') + ' MAD'"></p>
                </div>
              </div>
              <div class="d-flex flex-column align-items-center justify-content-between border-start p-2">
                <i class="ti ti-x cursor-pointer" @click="removeItem(item)"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 mt-3 mb-3">
          <div class="col-12 mt-3">
            <button type="button" class="btn btn-success" @click="addItem">
              Ajouter un Article
            </button>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
          Fermer
        </button>
        <button type="submit" :disabled="isLoading" class="btn btn-primary">
          <span v-if="isLoading" class="d-flex align-items-center">
            <div class="spinner-border spinner-border-sm text-white" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </span>
          <span v-else> Terminer</span>
        </button>
      </div>
    </form>
  </Modal>
</template>
