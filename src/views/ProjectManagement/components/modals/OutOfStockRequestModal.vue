<script setup lang="ts">
import { ref } from 'vue';
import { Modal } from '@/ui';
import { logisticsService } from '@/services';

const isLoading = ref(false);

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
    remark: '',
    recepteur: '',
    address: '',
    items: [1],
    articles: [],
    unite: [],
    qte_demande: [],
});

const addItem = () => {
    formData.value.items.push(formData.value.items.length + 1);
};

const removeItem = (index) => {
    if (formData.value.items.length > 1) {
        formData.value.items?.splice(index - 1, 1);
        formData.value.article?.splice(index - 1, 1);
        formData.value.qty?.splice(index - 1, 1);
    }
};


const changeValue = (item, index) => {
    formData.value.unite[index] = item.unite;
};

const submit = async () => {
    isLoading.value = true;

    await logisticsService.createOutOfStock({
        project_id: props.id,
        articles: JSON.stringify(formData.value.articles),
        qte_demande: JSON.stringify(formData.value.qte_demande),
        recepteur: formData.value.recepteur,
        address: formData.value.address,
        remark: formData.value.remark,
    }).then(() => {
        isLoading.value = false;
        $(`#outOfStock`).modal('hide');

    }).catch(() => {
        isLoading.value = false;
    });
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
                                        <select v-model="formData.articles[item]" class="form-select item-details mb-3"
                                            @change="changeValue(formData.articles[item], item)">
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
                                        <input id="qteInput" v-model="formData.qte_demande[item]" type="number"
                                            class="form-control invoice-item-qty" placeholder="1" min="1"
                                            :max="formData.articles[item]?.qte_restant" />
                                        <small class="text-muted" v-if="formData.articles[item]?.qte_restant">Quantite
                                            restante:
                                            {{ formData.articles[item]?.qte_restant ? formData.articles[item]?.qte_restant :
                                                0
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


                    <div class="col-12 mb-1 mt-3">
                        <div class="mb-3">
                            <label for="recepteur" class="mb-3">Récepteur <span class="text-danger">*</span></label>
                            <input id="recepteur" v-model="formData.recepteur" type="text" class="form-control"
                                placeholder="Entrez le nom du récepteur de la commande" required />
                        </div>
                    </div>
                    <div class="col-12 mb-1">
                        <div class="mb-3">
                            <label for="recepteur" class="mb-3">Adresse de livraison <span
                                    class="text-danger">*</span></label>
                            <input id="recepteur" v-model="formData.address" type="text" class="form-control"
                                placeholder="Entrez l'adresse de livraison" required />
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