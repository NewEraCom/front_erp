<script setup lang="ts">
import finance_service from '@/services/finance_service'
import { Modal } from '..'
import { useFinanceStore } from '@/store'
import { ref, computed } from 'vue'

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  articles: {
    type: Object,
    default: null
  }
})

const formData = ref({
  items: [1],
  service: [],
  qty: [],
  unite: [],
  price: [],
  total: [],
  // unites: []
})

const addItem = () => {
  formData.value.items.push(formData.value.items.length + 1)
}

const removeItem = (index) => {
  if (formData.value.items.length > 1) {
    formData.value.items?.splice(index - 1, 1)
    formData.value.service?.splice(index - 1, 1)
    formData.value.qty?.splice(index - 1, 1)
  }
}

const changeQuantity = (index) => {
  if (formData.value.qty[index] != 0) {
    formData.value.total[index] = formData.value.price[index] * formData.value.qty[index]
    formData.value.total[index] = formData.value.total[index].toFixed(2)
  } else {
    formData.value.total[index] = 0
  }
}

const changeValue = (selectedItem, index) => {
  if (selectedItem && selectedItem.article) {
    formData.value.unite[index] = selectedItem.article.unite;
    formData.value.price[index] = selectedItem.article.prix_ht.toFixed(2);

    if (formData.value.qty[index] !== null) {
      formData.value.total[index] = (selectedItem.article.prix_ht * formData.value.qty[index]).toFixed(2);
    }
  }
};

const Valide = async () => {
  console.log("formData.value :",formData.value)
  let data = new FormData();
  data.append('montant', JSON.stringify(formData.value.total));
  data.append('facture_id', formData.value);
  data.append('qty', JSON.stringify(formData.value.qty));
  data.append('articles', JSON.stringify(formData.value.service));
  data.append('type', 'Facture Avoir');
  await finance_service.ValidAvoir(props.id, data)
  window.location.reload()
  // window.location.reload()
}
</script>

<template>
  <Modal id="avoir" title="Facture Avoir">
    <div class="modal-body">
      <div div class="col-sm-12">
        <div class="row">
          <div class="row">
            <div v-for="item in formData.items" :key="item" class="col-12">
              <div class="repeater-wrapper pt-0 pt-md-4">
                <div class="d-flex border rounded position-relative pe-0">
                  <div class="row w-100 p-3">
                    <div class="col-md-4 col-12 mb-md-0 mb-3">
                      <p class="mb-2 repeater-title">Article {{ item }}</p>
                      <select
                        v-model="formData.service[item]"
                        class="form-select item-details mb-3"
                        @change="changeValue(formData.service[item], item)"
                      >
                        <option value="-">Sélectionner un article</option>
                        <option v-for="(item, index) in props.articles" :key="index" :value="item">
                          {{ item.article.article }}
                        </option>
                      </select>
                    </div>
                    <div class="col-md-2 col-12 mb-md-0 mb-3">
                      <p class="mb-2 repeater-title">Qty</p>
                      <input
                        id="qteInput"
                        v-model="formData.qty[item]"
                        type="number"
                        class="form-control invoice-item-qty"
                        placeholder="1"
                        min="1"
                        @input="changeQuantity(item)"
                        required
                      />
                    </div>
                    <div class="col-md-2 col-12 pe-0">
                      <p class="mb-2 repeater-title">Unite</p>
                      <p
                        class="mb-0"
                        v-html="formData.unite[item] ? formData.unite[item] : '-'"
                      ></p>
                    </div>
                    <div class="col-md-2 col-12 pe-0">
                      <p class="mb-2 repeater-title">Prix Unitaire</p>
                      <p
                        class="mb-0"
                        v-html="(formData.price[item] ? formData.price[item] : '0') + ' MAD'"
                      ></p>
                    </div>
                    <div class="col-md-2 col-12 pe-0">
                      <p class="mb-2 repeater-title">Prix Total</p>
                      <p
                        class="mb-0"
                        v-html="(formData.total[item] ? formData.total[item] : '0') + ' MAD'"
                      ></p>
                    </div>
                  </div>
                  <div
                    class="d-flex flex-column align-items-center justify-content-between border-start p-2"
                  >
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
        </div>
      </div>
    </div>

    <div class="modal-footer">
      <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
        Fermer
      </button>
      <button class="btn btn-success me-0" data-bs-dismiss="modal" @click="Valide()">
        <span>Valider</span>
      </button>
    </div>
  </Modal>
</template>
