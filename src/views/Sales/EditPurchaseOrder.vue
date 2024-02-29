<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue';
import { useSalesStore } from '@/store';
import { salesService } from '@/services';

const salesStore = useSalesStore();

const purchase = ref(computed(() => salesStore.purchase));

const props = defineProps({
    id: {
        type: Number,
        default: 0
    }
});

onMounted(() => {
    salesService.getPurchaseOrderById(props.id);
});

onUnmounted(() => {
    salesStore.clearPurchase();
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
    recepteur: '',
});

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
        formData.value.article?.splice(index - 1, 1);
        formData.value.qty?.splice(index - 1, 1);
    }
};

</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <h5 v-if="purchase" class="py-3 mb-4">
            <span class="text-muted fw-light">Dashboard /
                {{ purchase.type == 'Service' ? "Demande d'execution" : "Demande d'achat" }} /
            </span>
            {{ purchase.n_order }}
        </h5>
        <div v-if="purchase" class="row invoice-preview">
            <div class="col-xl-9 col-md-8 col-12 mb-md-0 mb-4">
                <div class="card card-border-shadow-primary invoice-preview-card">
                    <div class="card-header">
                        <h5 class="fw-bold">Modifier la demande d'achat</h5>
                    </div>
                    <div class="card-body">

                        <div v-for="(item, index) in purchase.purchase_article" :key="item" class="col-12">
                            <div class="repeater-wrapper pt-0 pt-md-4">
                                <div class="d-flex border rounded position-relative pe-0">
                                    <div class="row w-100 p-3">
                                        <div class="col-md-4 col-12 mb-md-0 mb-3">
                                            <p class="mb-2 repeater-title">
                                                Article {{ index + 1 }}
                                            </p>
                                            <select v-model="formData.service[item]" class="form-select item-details mb-3"
                                                @change="changeValue(formData.service[item], item)">
                                                <option value="-">
                                                    Sélectionner un article
                                                </option>
                                                <!-- <option v-for="(item, index) in articles" :key="index" :value="item">
                                                    {{ item.article }}
                                                </option> -->
                                            </select>
                                        </div>
                                        <div class="col-md-2 col-12 mb-md-0 mb-3">
                                            <p class="mb-2 repeater-title">Qty</p>
                                            <input id="qteInput" v-model="formData.qty[item]" type="number"
                                                class="form-control invoice-item-qty" placeholder="1" min="1"
                                                :max="formData.service[item]?.qte_restant" @input="changeQuantity(item)" />
                                            <small class="text-muted" v-if="formData.service[item]?.qte_restant">Quantite
                                                restante:
                                                {{ formData.service[item]?.qte_restant ? formData.service[item]?.qte_restant
                                                    : 0
                                                }}</small>
                                        </div>
                                        <div class="col-md-2 col-12 pe-0">
                                            <p class="mb-2 repeater-title">Unite</p>
                                            <p class="mb-0" v-html="formData.unite[item] ? formData.unite[item] : '-'"></p>
                                        </div>
                                        <div class="col-md-2 col-12 pe-0">
                                            <p class="mb-2 repeater-title">Prix Unitaire</p>
                                            <p class="mb-0" v-html="(formData.price[item] ? formData.price[item] : '0') + ' MAD'
                                                "></p>
                                        </div>
                                        <div class="col-md-2 col-12 pe-0">
                                            <p class="mb-2 repeater-title">Prix Total</p>
                                            <p class="mb-0" v-html="(formData.total[item] ? formData.total[item] : '0') + ' MAD'
                                                "></p>
                                        </div>


                                    </div>
                                    <div
                                        class="d-flex flex-column align-items-center justify-content-between border-start p-2">
                                        <i class="ti ti-x cursor-pointer" @click="removeItem(item)"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.bottom-image {
    position: fixed;
    bottom: 35px;
    width: 80%;
    /* Adjust the width as needed */
}

.f-18 {
    font-size: 18px;
}

.f-36 {
    font-size: 36px;
}

.empty_stats_img_md {
    width: 100%;
    max-width: 180px;
    margin: 0 auto;
}

.only-in-mobile {
    display: block;
}

.hide-in-mobile {
    display: none;
}

@media (min-width: 980px) {
    .only-in-mobile {
        display: none;
    }

    .hide-in-mobile {
        display: block;
    }
}
</style>
