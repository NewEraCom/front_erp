<script setup lang="ts">
import { ref } from 'vue';
import { Modal } from '@/ui';

const isLoading = ref(false);
const isStock = ref('Stock');
const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
    articles: {
        type: Array,
        default: null,
    },
});

const formData = ref({
    selectedSoustrait: '-',
    remark: '',
    items: [1],
    service: [],
    qty: [],
    unite: [],
    price: [],
    total: [],
    itemsArticle: [],
    itemsArticleHors: [],
    articleHors: ['-'],
    qtyHors: [],
    unites: [],
});

const addItem = () => {
    formData.value.items.push(formData.value.items.length + 1);
};

const addItemHors = () => {
    formData.value.itemsArticle.push(formData.value.itemsArticle.length + 1);
};

const removeItem = (index) => {
    if (formData.value.items.length > 1) {
        formData.value.items?.splice(index - 1, 1);
        formData.value.article?.splice(index - 1, 1);
        formData.value.qty?.splice(index - 1, 1);
    }
};

const removeItemHors = (index) => {
    formData.value.itemsArticle.splice(index - 1, 1);
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


const checkItem = (value) => {
    if (value == 'Stock') {
        isStock.value = 'Stock';
    } else {
        isStock.value = 'Chantier';
    }
};
const submit = () => {
    isLoading.value = true;
    console.log(props.id);
    setTimeout(() => {
        isLoading.value = false;
    }, 2000);
};

</script>
<template>
    <Modal id="outOfStock" title="Demande de sortie de stock" size="modal-lg">
        <form @submit.prevent="submit">
            <div class="modal-body">
                <div class="row">
                    <div v-for="item in formData.items" :key="item" class="col-12">
                        <div class="repeater-wrapper pt-0 pt-md-4">
                            <div class="d-flex border rounded position-relative pe-0">
                                <div class="row w-100 p-3">
                                    <div class="col-md-6 col-12 mb-md-0 mb-3">
                                        <p class="mb-2 repeater-title">
                                            Article {{ item }}
                                        </p>
                                        <select v-model="formData.service[item]" class="form-select item-details mb-3"
                                            @change="changeValue(formData.service[item], item)">
                                            <option value="-">
                                                Sélectionner un article
                                            </option>
                                            <option v-for="(item, index) in articles" :key="index" :value="item">
                                                {{ item.article }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="col-md-3 col-12 mb-md-0 mb-3">
                                        <p class="mb-2 repeater-title">Qty</p>
                                        <input id="qteInput" v-model="formData.qty[item]" type="number"
                                            class="form-control invoice-item-qty" placeholder="1" min="1"
                                            :max="formData.service[item]?.qte_restant" @input="changeQuantity(item)" />
                                        <small class="text-muted" v-if="formData.service[item]?.qte_restant">Quantite
                                            restante:
                                            {{ formData.service[item]?.qte_restant ? formData.service[item]?.qte_restant : 0
                                            }}</small>
                                    </div>
                                    <div class="col-md-3 col-12 pe-0">
                                        <p class="mb-2 repeater-title">Unite</p>
                                        <p class="mb-0" v-html="formData.unite[item] ? formData.unite[item] : '-'"></p>
                                    </div>
                                </div>
                                <div class="d-flex flex-column align-items-center justify-content-between border-start p-2">
                                    <i class="ti ti-x cursor-pointer" @click="removeItem(item)"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-for="item in formData.itemsArticle" :key="item" class="col-12">
                        <div class="repeater-wrapper pt-0 pt-md-4">
                            <div class="d-flex border rounded position-relative pe-0">
                                <div class="row w-100 p-3">
                                    <div class="col-md-4 col-12 mb-md-0 mb-3">
                                        <p class="mb-2 repeater-title">
                                            Article Hors Bordereau {{ item }}
                                        </p>
                                        <input id="qteInput" v-model="formData.articleHors[item]" type="text"
                                            class="form-control" placeholder="Entrez le désignation de l'article" />
                                    </div>
                                    <div class="col-md-2 col-12 mb-md-0 mb-3">
                                        <p class="mb-2 repeater-title">Qty</p>
                                        <input id="qteInput" v-model="formData.qtyHors[item]" type="number"
                                            class="form-control" placeholder="1" min="1" max="50" />
                                    </div>
                                    <div class="col-md-2 col-12 mb-md-0 mb-3">
                                        <p class="mb-2 repeater-title">Unite</p>
                                        <input id="qteInput" v-model="formData.unites[item]" type="text"
                                            class="form-control" placeholder="M2" />
                                    </div>
                                </div>
                                <div class="d-flex flex-column align-items-center justify-content-between border-start p-2">
                                    <i class="ti ti-x cursor-pointer" @click="removeItemHors(item)"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 mb-1 mt-3">
                        <div class="mb-3">
                            <label for="recepteur" class="mb-3">Récepteur</label>
                            <input id="recepteur" v-model="recepteur" type="text" class="form-control"
                                placeholder="Entrez le nom du récepteur de la commande" />
                        </div>
                    </div>
                    <div class="col-12 mb-1">
                        <div class="mb-3">
                            <label for="recepteur" class="mb-3">Adresse de livraison</label>
                            <input id="recepteur" v-model="recepteur" type="text" class="form-control"
                                placeholder="Entrez l'adresse de livraison" />
                        </div>
                    </div>

                    <div class="col-12">
                        <textarea v-model="formData.remark" class="form-control" rows="2" placeholder="Remarque...">
                                </textarea>
                    </div>

                    <div class="col-12 mt-3">
                        <button type="button" class="btn btn-success" @click="addItem">
                            Ajouter un Article
                        </button>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div v-if="formData.itemsArticle.length > 0" class="alert alert-danger me-auto" role="alert">
                    Les articles hors bordereau doit être validé avant la demande d'achat envoyé au responsable d'achat.
                </div>
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