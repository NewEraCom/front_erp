<script setup>
import { ref } from 'vue';
import {pmService } from '@/services';
const props = defineProps({
    id: {
        type: Number,
        required: true
    }
});

const formData = ref({
    projectId: props.id,
    article: '',
    purchasePrice: null,
    sellingPrice: null,
    extraFees: null,
    quantity: null,
    unite: '-',
    fournisseur: '',
    description: '',
    userId: JSON.parse(localStorage.getItem('user')).id
});

const isLoading = ref(false);

const submit = async () => {
    isLoading.value = true;
    await pmService.create(formData.value)
        .then(() => {
            formData.value = {
                projectId: props.id,
                article: '',
                purchasePrice: null,
                sellingPrice: null,
                extraFees: null,
                quantity: null,
                unite: '-',
                fournisseur: '',
                description: '',
                userId: JSON.parse(localStorage.getItem('user')).id
            };
            isLoading.value = false;
            $('#add-chiffrage').modal('hide');
        })
        .catch((error) => {
            console.log(error);
            isLoading.value = false;
        });
};
</script>
<template>
    <form @submit.prevent="submit">
        <div class="modal-body ">
            <div class="row">
                <div class="col-sm-12">
                    <div class="mb-3">
                        <label for="nameItem" class="form-label mb-2">Nom d'article</label>
                        <input
                            id="nameItem"
                            v-model="formData.article"
                            class="form-control"
                            placeholder="Entrez le nom d'article"
                            type="text"
                            tabindex="0"
                            required
                        />
                    </div>
                </div>
                <div class="col-6">
                    <div class="mb-3">
                        <label for="purchasePrice" class="form-label mb-2">Prix d'achat</label>
                        <input
                            id="purchasePrice"
                            v-model="formData.purchasePrice"
                            class="form-control"
                            placeholder="Entrez le prix d'achat"
                            type="number"
                            tabindex="0"
                            required
                        />
                    </div>
                </div>
                <div class="col-6">
                    <div class="mb-3">
                        <label for="sellingPrice" class="form-label mb-2">Prix de vente</label>
                        <input
                            id="sellingPrice"
                            v-model="formData.sellingPrice"
                            class="form-control"
                            placeholder="Entrez le prix de vente"
                            type="number"
                            tabindex="0"
                            required
                        />
                    </div>
                </div>
                <div class="col-12">
                    <div class="mb-3">
                        <label for="extraFees" class="form-label mb-2">Frais supplémentaires</label>
                        <input
                            id="extraFees"
                            v-model="formData.extraFees"
                            class="form-control"
                            placeholder="Entrez les frais supplémentaires (transport..)"
                            type="number"
                            tabindex="0"
                        />
                    </div>
                </div>
                <div class="col-6">
                    <div class="mb-3">
                        <label for="quantity" class="form-label mb-2">Quantite</label>
                        <input
                            id="quantity"
                            v-model="formData.quantity"
                            class="form-control"
                            placeholder="Entrez la quantité"
                            type="number"
                            tabindex="0"
                            required
                        />
                    </div>
                </div>
                <div class="col-6">
                    <div class="mb-3">
                        <label for="unite" class="form-label mb-2">Unité</label>
                        <select id="unite" v-model="formData.unite" class="form-select" required>
                            <option value="-">-</option>
                            <option value="Unite">Unite</option>
                            <option value="Litre">Litre</option>
                            <option value="Kilogram">Kilogram</option>
                            <option value="Tonne">Tonne</option>
                            <option value="Quintal">Quintal</option>
                            <option value="Abonnement">Tonne</option>
                            <option value="ML">ML</option>
                            <option value="M2">M<sup>2</sup></option>
                            <option value="M3">M<sup>3</sup></option>
                            <option value="M3">M<sup>3</sup></option>
                        </select>
                    </div>
                </div>
                <div class="col-12">
                    <div class="mb-3">
                        <label for="fournisseur" class="form-label mb-2">Fournisseur</label>
                        <input
                            id="fournisseur"
                            v-model="formData.fournisseur"
                            class="form-control"
                            placeholder="Entrez le nom du fournisseur"
                            type="text"
                            tabindex="0"
                            unite
                        />
                    </div>
                </div>

                <div class="col-12">
                    <div class="mb-3">
                        <label for="comment" class="form-label mb-2">Remarque</label>
                        <textarea
                            id="comment"
                            v-model="formData.description"
                            class="form-control"
                            placeholder="Entrez votre remque ici"
                            type="number"
                            tabindex="0"
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-footer ">
            <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                Fermer
            </button>
            <button type="submit" :disabled="isLoading" class="btn btn-primary">
                <span v-if="isLoading" class="d-flex align-items-center">
                    <div class="spinner-border spinner-border-sm text-white me-2" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </span>
                <span v-else> Términer</span>
            </button>
        </div>
    </form>
</template>
<style></style>
