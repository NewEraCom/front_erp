<script setup lang="ts">
import { ref } from 'vue';
import { Modal, CustomSelect } from '@/ui';
import { salesService } from '@/services';

const isLoading = ref(false);

const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
    services: {
        type: Array,
        default: null,
    },
    soustraitants: {
        type: Array,
        default: null,
    }
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

const submit = async () => {
    isLoading.value = true;

    await salesService.createExecutionOrder({
        project_id: props.id,
        items: formData.value.items,
        articles: JSON.stringify(formData.value.service),
        qty: JSON.stringify(formData.value.qty),
        unite: JSON.stringify(formData.value.unite),
        price: JSON.stringify(formData.value.price),
        total: JSON.stringify(formData.value.total),
        remark: formData.value.remark,
        itemsArticle: JSON.stringify(formData.value.itemsArticle),
        articleHors: JSON.stringify(formData.value.articleHors),
        qtyHors: JSON.stringify(formData.value.qtyHors),
        unites: JSON.stringify(formData.value.unites),
    }).then(() => {
        isLoading.value = false;
        $('#newService').modal('hide');
    }).catch(() => {
        isLoading.value = false;
    });
};

</script>
<template>
    <Modal id="newService" title="Demande d'exécution" size="modal-xl">
        <form @submit.prevent="submit">
            <div class="modal-body">
                <div class="row">
                    <div v-if="soustraitants != null" class="col-12 mb-2">
                        <CustomSelect v-model="formData.selectedSoustrait" placeholder="Choisir un sous-traitant"
                            label="Sous-traitant" :data="soustraitants
            .filter((item) => item.is_active == 1)
            .map((item) => ({
                key: item.id,
                value: item.raison_social
            }))" />
                    </div>
                    <div v-for="item in formData.items" :key="item" class="col-12">
                        <div class="repeater-wrapper pt-0 pt-md-4">
                            <div class="d-flex border rounded position-relative pe-0">
                                <div class="row w-100 p-3">
                                    <div class="col-md-4 col-12 mb-md-0 mb-3">
                                        <p class="mb-2 repeater-title">
                                            Service {{ item }}
                                        </p>
                                        <select v-model="formData.service[item]" class="form-select item-details mb-3"
                                            @change="changeValue(formData.service[item], item)">
                                            <option value="-">
                                                Sélectionner un article
                                            </option>
                                            <option v-for="(service, index) in services" :key="index" :value="service">
                                                {{ service.article }}
                                            </option>
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

                    <div v-for="item in formData.itemsArticle" :key="item" class="col-12">
                        <div class="repeater-wrapper pt-0 pt-md-4">
                            <div class="d-flex border rounded position-relative pe-0">
                                <div class="row w-100 p-3">
                                    <div class="col-md-4 col-12 mb-md-0 mb-3">
                                        <p class="mb-2 repeater-title">
                                            Service Hors Bordereau {{ item }}
                                        </p>
                                        <input id="qteInput" v-model="formData.articleHors[item]" type="text"
                                            class="form-control" placeholder="Entrez le désignation du service" />
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
                                <div
                                    class="d-flex flex-column align-items-center justify-content-between border-start p-2">
                                    <i class="ti ti-x cursor-pointer" @click="removeItemHors(item)"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 mt-4">
                        <textarea v-model="formData.remark" class="form-control" rows="2" placeholder="Remarque...">
                                </textarea>
                    </div>

                    <div class="col-12 mt-3">
                        <button type="button" class="btn btn-success" @click="addItem">
                            Ajouter un Service
                        </button>
                        <button type="button" class="ms-2 btn btn-danger" @click="addItemHors">
                            Ajouter un Service Hors Bordereau
                        </button>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div v-if="formData.itemsArticle.length > 0" class="alert alert-danger me-auto" role="alert">
                    Les services hors bordereau doit être validé avant la demande d'exécution envoyé au responsable
                    d'achat.
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