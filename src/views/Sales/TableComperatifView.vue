<script setup>
import { onMounted, ref, onUnmounted, computed } from 'vue';
import { useSalesStore, useSharedStore } from '@/store';
import { sharedService, salesService } from '@/services';
import { CustomSelect } from '@/ui';
import { useRouter } from 'vue-router';
const router = useRouter();
const props = defineProps({
    id: {
        type: String,
        required: true
    }
});
const sharedStore = useSharedStore();
const salesStore = useSalesStore();
const fournisseurs = ref(computed(() => sharedStore.fournisseurs.data));
const article = ref(salesStore.article);
onMounted(async () => {
    await sharedService.getFournisseur();
    // fournisseurs.value = sharedStore.fournisseurs.data;
    if (article.value === null) {
        router.push({ name: 'PurchaseOrderDetails', params: { id: props.id } });

    }
});
const fournisseur1 = ref('');
const fournisseur2 = ref('');
const fournisseur3 = ref('');

const Submit = async () => {

    const payload = {
        data: article.value.map((article) => ({
            article_id: article.id,
            fournisseur1_id: fournisseur1.value.key,
            fournisseur2_id: fournisseur2.value.key,
            fournisseur3_id: fournisseur3.value.key,
            fournisseur1_prix: article.fournisseur1_prix,
            fournisseur2_prix: article.fournisseur2_prix,
            fournisseur3_prix: article.fournisseur3_prix
        }))
    };

    try {
        await salesService.insertTableComperatif(payload)
            .then((res) => {
                console.log(res);
                router.push({ name: 'PurchaseOrderDetails', params: { id: props.id } });

            })
            .catch((e) => {
                console.error(e);
            });
    } catch (error) {
        console.log('error : ' + error);
    }
    console.log(payload);
};
onUnmounted(() => {
    sharedStore.article = null;
});
</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <h5 class="py-3 mb-4">
            <span class="text-muted fw-light">Dashboard / Demande / </span> Table Comperatif
        </h5>
        <div class="col-xl-12 col-md-8 col-12 mb-md-0 mb-4">
            <div class="card card-border-shadow-primary invoice-preview-card">
                <div class="card-body">
                    <form @submit.prevent="Submit" enctype="multipart/form-data">
                        <div class="">
                            <div class="row">
                                <div class="col-12">
                                    <div class="d-flex justify-content-between">
                                        <div class="col-sm-4 m-1">
                                            <div class="mb-3" v-if="fournisseurs">
                                                <CustomSelect v-model="fournisseur1"
                                                    placeholder="Choisir un fournisseur" label="Fournisseur 1" :data="fournisseurs.filter((item) => item.is_active == 1).map((item) => ({
                        key: item.id,
                        value: item.raison_social
                    }))
                        " />

                                            </div>
                                        </div>
                                        <div class="col-sm-4 m-1">
                                            <div class="mb-3" v-if="fournisseurs">
                                                <CustomSelect v-model="fournisseur2"
                                                    placeholder="Choisir un fournisseur" label="Fournisseur 1" :data="fournisseurs.filter((item) => item.is_active == 1).map((item) => ({
                        key: item.id,
                        value: item.raison_social
                    }))
                        " />

                                            </div>
                                        </div>
                                        <div class="col-sm-4 m-1">
                                            <div class="mb-3" v-if="fournisseurs">
                                                <CustomSelect v-model="fournisseur3"
                                                    placeholder="Choisir un fournisseur" label="Fournisseur 1" :data="fournisseurs.filter((item) => item.is_active == 1).map((item) => ({
                        key: item.id,
                        value: item.raison_social
                    }))
                        " />

                                            </div>
                                        </div>
                                    </div>
                                    <div class="table-responsive mt-4">
                                        <table class="table">
                                            <thead class="table-light">
                                                <tr>
                                                    <th>Article</th>
                                                    <th class="fw-bold text-center">prix Fournisseur 1</th>
                                                    <th class="fw-bold text-center">prix Fournisseur 2</th>
                                                    <th class="fw-bold text-center">prix Fournisseur 3</th>
                                                </tr>
                                            </thead>
                                            <tbody v-if="article">
                                                <tr v-for="(item, index) in article" :key="index">
                                                    <td>
                                                        {{ item.article.article }}
                                                    </td>
                                                    <td class="text-center text-truncate">
                                                        <input type="number" class="form-control"
                                                            v-model="item.fournisseur1_prix" />
                                                    </td>
                                                    <td class="text-center text-truncate">
                                                        <input type="number" class="form-control"
                                                            v-model="item.fournisseur2_prix" />
                                                    </td>
                                                    <td class="text-center text-truncate">
                                                        <input type="number" class="form-control"
                                                            v-model="item.fournisseur3_prix" />
                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tbody v-else>
                                                <tr class="text-center">
                                                    <td colspan="7">Aucun Article</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer mt-5">
                            <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                                Fermer
                            </button>
                            <button type="submit" :disabled="isLoading" class="btn btn-primary">
                                <span v-if="isLoading" class="d-flex align-items-center">
                                    <div class="spinner-border spinner-border-sm text-white me-2" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                    Chargement...
                                </span>
                                <span v-else> Terminer</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- </Modal> -->
</template>

<style>
.modal-xl {
    max-width: 90%;
}
</style>
