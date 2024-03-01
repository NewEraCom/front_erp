
import { routerViewLocationKey } from 'vue-router';
<script setup lang="ts">
import { ref } from 'vue';
import { Modal } from '@/ui';

const props = defineProps({
    id: {
        type: Number,
        required: true
    },
    project: {
        type: Object,
        required: true
    }
});

const inputs = ref([]);
const items = ref([1]);
const isLoading = ref(false);

const article = ref([]);
const qty = ref([0]);
const unite = ref([]);
const price = ref([]);
const total = ref([]);

const addItem = () => {
    items.value.push(items.value.length + 1);
};

const changeValue = (item, index) => {
    price.value[index] = item.prix_ht.toFixed(2);
    unite.value[index] = item.unite;
    if (qty.value[index] != null) {
        total.value[index] = item.prix_ht * qty.value[index];
        total.value[index] = total.value[index].toFixed(2);
    }
};

const changeQuantity = (index) => {
    if (qty.value[index] != 0) {
        total.value[index] = price.value[index] * qty.value[index];
        total.value[index] = total.value[index].toFixed(2);
    } else {
        total.value[index] = 0;
    }
};

const handleFileChange = (event, index) => {
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (file) {
        inputs.value[index] = file;
    }
};

const removeItem = (index) => {
    if (items.value.length > 1) {
        items?.value.splice(index - 1, 1);
        article?.value.splice(index - 1, 1);
        qty?.value.splice(index - 1, 1);
    }
};

const submit = async () => {

};

</script>
<template>
    <Modal id="invoiceUpload" title="Attachements de la Facture" size="modal-xl">
        <form enctype="multipart/form-data" @submit.prevent="submit">
            <div class="modal-body">
                <div class="row p-2 border rounded m-1">
                    <div v-for="(comp, index) in project.facture_composante" :key="comp.id" class="col-sm-6">
                        <div class="mb-3">
                            <label :for="`input-${comp.id}`" class="mb-2">{{ comp.label }} <span
                                    class="text-danger fw-bold">*</span>
                            </label>
                            <input v-if="comp.type != 'file'" v-model="inputs[index]" :type="comp.type" class="form-control"
                                required />
                            <input v-else :type="comp.type" class="form-control" required
                                @change="handleFileChange($event, index)" />
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div v-for="item in items" :key="item" class="col-12">
                        <div class="repeater-wrapper pt-0 pt-md-4">
                            <div class="d-flex border rounded position-relative pe-0">
                                <div class="row w-100 p-3">
                                    <div class="col-md-4 col-12 mb-md-0 mb-3">
                                        <p class="mb-2 repeater-title">
                                            Article & Service {{ item }}
                                        </p>
                                        <select v-model="article[item]" class="form-select item-details mb-3"
                                            @change="changeValue(article[item], item)">
                                            <option selected="" disabled="">
                                                Sélectionner un article
                                            </option>
                                            <option
                                                v-for="(art, index) in project.pre_project.articles.filter(item => item.status === 1)"
                                                @change="changeValue(art, item)" :key="index">{{ art.article }}</option>
                                        </select>
                                    </div>
                                    <div class="col-md-2 col-12 mb-md-0 mb-3">
                                        <p class="mb-2 repeater-title">Qty</p>
                                        <input id="qteInput" v-model="qty[item]" type="number"
                                            class="form-control invoice-item-qty" placeholder="1" min="1"
                                            @input="changeQuantity(item)" />
                                    </div>
                                    <div class="col-md-2 col-12 pe-0">
                                        <p class="mb-2 repeater-title">Unite</p>
                                        <p class="mb-0" v-html="unite[item] ? unite[item] : '-'"></p>
                                    </div>
                                    <div class="col-md-2 col-12 pe-0">
                                        <p class="mb-2 repeater-title">Prix Unitaire</p>
                                        <p class="mb-0" v-html="(price[item] ? price[item] : '0') + ' MAD'"></p>
                                    </div>
                                    <div class="col-md-2 col-12 pe-0">
                                        <p class="mb-2 repeater-title">Prix Total</p>
                                        <p class="mb-0" v-html="(total[item] ? total[item] : '0') + ' MAD'"></p>
                                    </div>
                                </div>
                                <div class="d-flex flex-column align-items-center justify-content-between border-start p-2">
                                    <i class="ti ti-x cursor-pointer" @click="removeItem(item)"></i>
                                </div>
                            </div>
                        </div>
                    </div>
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
