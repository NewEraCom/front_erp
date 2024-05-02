<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Modal } from '@/ui';
import { salesService, sharedService } from '@/services';
import { useToast } from 'vue-toastification';
const toast = useToast();

const isLoading = ref(false);
const isStock = ref('Stock');
onMounted(() => {
    sharedService.getItems();
});
const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
    articles: {
        type: Array,
        default: null,
    },
    mainItems: {
        type: Array,
        default: null,
    }
});

const formData = ref({
    selectedSoustrait: null,
    remark: '',
    items: [],
    service: [],
    qty: [],
    unite: [],
    price: [],
    mainItem: [],
    total: [],
    itemsArticle: [],
    itemsArticleHors: [],
    articleHors: [],
    qtyHors: [],
    delivery_date: '',
    unites: [],
    recepteur: '',
});
console.log(props.articles);


const addItem = () => {
    formData.value.items.push(formData.value.items.length + 1);
};

const addItemHors = () => {
    formData.value.itemsArticle.push(formData.value.itemsArticle.length + 1);
};

const removeItem = (index) => {
    
        formData.value.items?.splice(index - 1, 1);
        formData.value.service?.splice(index - 1, 1);
        formData.value.qty?.splice(index - 1, 1);
    
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
    console.log(formData.value);
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
const submit = async () => {
    isLoading.value = true;

    if (!checkArticles(formData.value.service)) {
        isLoading.value = false;
        return;
    }

    if (isStock.value == null) {
        isLoading.value = false;
        toast.error('Veuillez sélectionner un emplacement de livraison');
        return;
    }

    await salesService.createPurchaseOrder({
        project_id: props.id,
        items: formData.value.items,
        articles: JSON.stringify(formData.value.service),
        qty: JSON.stringify(formData.value.qty),
        unite: JSON.stringify(formData.value.unite),
        mainItem: JSON.stringify(formData.value.mainItem),
        price: JSON.stringify(formData.value.price),
        total: JSON.stringify(formData.value.total),
        delivery_date: formData.value.delivery_date,
        location: isStock.value,
        remark: formData.value.remark,
        recepteur: formData.value.recepteur,
        itemsArticle: JSON.stringify(formData.value.itemsArticle),
        articleHors: JSON.stringify(formData.value.articleHors),
        qtyHors: JSON.stringify(formData.value.qtyHors),
        unites: JSON.stringify(formData.value.unites),
    }).then(() => {
        isLoading.value = false;
        toast.success('Demande d\'achat envoyé avec succès');
        $('#newPurchaseOrder').modal('hide');
    }).catch(() => {
        isLoading.value = false;
        toast.error('Une erreur est survenue');
    });
    console.log(formData.value);


};

const checkArticles = (articles) => {
    let uniqueArticles = new Set();
    for (const article of articles) {
        // Check if the article is null or '-'
        if (article === null || article === '-') {
            isLoading.value = false;
            toast.error('Veuillez sélectionner un article');
            return false;
        }

        // Check for duplicates
        if (uniqueArticles.has(article)) {
            isLoading.value = false;
            toast.error('Les articles ne doivent pas être dupliqués');
            return false; // Duplicate found, return false
        } else {
            uniqueArticles.add(article);
        }
    }
    return true; // No nulls, '-', or duplicates found
};



</script>
<template>
    <Modal id="newPurchaseOrder" title="Demande d'achat" size="modal-xl">
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
                                        <select v-model="formData.service[item]" class="form-select item-details mb-1"
                                            @change="changeValue(formData.service[item], item)">
                                            <option value="-">
                                                Sélectionner un article
                                            </option>
                                            <option v-for="(item, index) in articles" :key="index" :value="item">
                                                {{ item.article }}
                                            </option>
                                        </select>
                                        <small class="text-muted" v-if="formData.service[item]">
                                            Item : {{ formData.service[item]?.items.designation }}
                                        </small>
                                    </div>
                                    <div class="col-md-3 col-12 mb-md-0 mb-3">
                                        <p class="mb-2 repeater-title">Qty</p>
                                        <input id="qteInput" v-model="formData.qty[item]" type="number"
                                            class="form-control invoice-item-qty mb-1" placeholder="1" min="1"
                                            :max="formData.service[item]?.qte_restant" @input="changeQuantity(item)"
                                            required />
                                        <small class="text-muted" v-if="formData.service[item]?.qte_restant">Quantite
                                            restante:
                                            {{ formData.service[item]?.qte_restant ? formData.service[item]?.qte_restant
            : 0
                                            }}</small>
                                    </div>
                                    <div class="col-md-3 col-12 pe-0">
                                        <p class="mb-2 repeater-title">Unite</p>
                                        <p class="mb-0" v-html="formData.unite[item] ? formData.unite[item] : '-'"></p>
                                    </div>
                                </div>
                                <div
                                    class="d-flex flex-column align-items-center justify-content-between border-start p-2">
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
                                            class="form-control" placeholder="1" min="1" />
                                    </div>
                                    <div class="col-md-2 col-12 mb-md-0 mb-3">
                                        <p class="mb-2 repeater-title">Unite</p>
                                        <input id="qteInput" v-model="formData.unites[item]" type="text"
                                            class="form-control" placeholder="M2" />
                                    </div>
                                    <div class="col-md-4 col-12 mb-md-0 mb-3">
                                        <p class="mb-2 repeater-title">Item</p>
                                        <select v-model="formData.mainItem[item]" class="form-select item-details mb-1"
                                            @change="changeValue(formData.mainItem[item], item)">
                                            <option value="-">
                                                Sélectionner un Item
                                            </option>
                                            <option v-for="(item, index) in mainItem" :key="index" :value="item.id">
                                                {{ item.designation }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div
                                    class="d-flex flex-column align-items-center justify-content-between border-start p-2">
                                    <i class="ti ti-x cursor-pointer" @click="removeItemHors(item)"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 mt-3 mb-3">
                        <div class="row">
                            <div class="col-6">
                                <div class="form-check custom-option custom-option-icon"
                                    :class="isStock == 'Stock' ? 'checked' : ''" @click="checkItem('Stock')">
                                    <label class="form-check-label custom-option-content" for="customRadioHome">
                                        <span class="custom-option-body">
                                            <i class="ti ti-home f-28"></i>
                                            <span class="custom-option-title">Stock</span>
                                            <small>(Livraison au stock)</small>
                                        </span>
                                        <input id="customCheckTemp1" v-model="isStock" name="customRadioIcon"
                                            class="form-check-input" type="radio" value="Stock" style="display: none" />
                                    </label>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-check custom-option custom-option-icon"
                                    :class="isStock == 'Chantier' ? 'checked' : ''" @click="checkItem('Chantier')">
                                    <label class="form-check-label custom-option-content" for="customRadioHome">
                                        <span class="custom-option-body">
                                            <i class="ti ti-road f-28"></i>

                                            <span class="custom-option-title">Chantier</span>
                                            <small>(Livraison au chantier)</small>
                                        </span>
                                        <input id="customCheckTemp2" v-model="isStock" name="customRadioIcon"
                                            class="form-check-input" type="radio" value="Chantier"
                                            style="display: none" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="isStock == 'Chantier'" class="col-12">
                        <div class="mb-3">
                            <label for="recepteur" class="mb-3">Récepteur</label>
                            <input id="recepteur" v-model="formData.recepteur" type="text" class="form-control"
                                placeholder="Entrez le nom du récepteur de la commande" />
                        </div>
                    </div>
                    <div class="col-12 mb-2">
                        <div class="mb-3">
                            <label for="delivery_date" class="mb-3">Date de livraison</label>
                            <input id="delivery_date" v-model="formData.delivery_date" type="date" class="form-control"
                                placeholder="Entrez la date de livraison" />
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
                        <button type="button" class="ms-2 btn btn-danger" @click="addItemHors">
                            Ajouter un Article Hors Bordereau
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