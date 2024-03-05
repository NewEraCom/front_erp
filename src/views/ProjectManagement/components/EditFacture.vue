<script setup>
import { computed, ref, onMounted, watch, watchEffect } from 'vue';
import { Modal } from '@/ui';
import {usePMStore} from '@/store';
import { pmService } from '@/services'


const props = defineProps({
    facture: Object
});
const PMStore = usePMStore();
const comps = ref([]);
const articles = ref();
const selectedArticle = ref();
const checkboxChecked = ref(false);
const cards = ref([]);
const inputs = ref([]);
const OldData = ref([]);
watch(async () => {
    comps.value = PMStore.composants || [];
});
watch(props, () => {
    if (props.facture) {
        OldData.value = props.facture;
    }
});
watchEffect(() => {
    if (comps.value.length > 0) {
        inputs.value = comps.value.map(() => ({ type: '', value: '', composant_id: '' }));
    }
});
watch(async () => {
    try {
        if (props.facture) {
            await pmService.getBorderaux(props.facture.project_id);
            articles.value = PMStore.borderaux;
        }
    } catch (error) {
        console.error('Error in onMounted:', error);
    }
});
const addCard = () => {
    if (selectedArticle.value) {
        if (!OldData.value.facture_article) {
            OldData.value.facture_article = [];
        }
        OldData.value.facture_article.push({
            article: selectedArticle.value,
            checkboxChecked: checkboxChecked.value,
            titre_article: selectedArticle.value.name // Initialize titre_article with the current name of the article
        });
    }
};

const removeCard = (index) => {
    if (OldData.value.facture_article) {
        OldData.value.facture_article.splice(index, 1);
    }
};
// const handleFileChange = (event, index) => {
//     const fileInput = event.target;
//     const file = fileInput.files[0];

//     if (file) {
//         if (!OldData.value.facture_attachement[index]) {
//             OldData.value.facture_attachement[index] = {};
//         }
//         OldData.value.facture_attachement[index].value = file;
//     }
// };
const handleFileChange =(event, index) =>{
        const file = event.target.files[0];
        OldData.value.facture_attachement[index].file = file;
    }

const submit = async () => {
    const payload = {
        articles: OldData.value.facture_article.map((article) => ({
            article_id: article.article.id,
            ...(article.titre_article !== null && article.titre_article !== undefined && { newName: article.titre_article })
        })),
        composants: OldData.value.facture_attachement.map((attachement) => ({
            type: attachement.composent.type,
            value: attachement.composent.type === 'file' ? attachement.file : attachement.value, // Use attachement.file for 'file' type
            composant_id: attachement.composant_id
        })),
        project_id: OldData.value.project_id,
        facture_id: OldData.value.id
    };

    console.log(payload);

    const formData = new FormData();

    // Add articles to formData
    payload.articles.forEach((article, index) => {
        for (const key in article) {
            formData.append(`articles[${index}][${key}]`, article[key]);
        }
    });

    // Add composants to formData
    payload.composants.forEach((composant, index) => {
        formData.append(`composants[${index}][type]`, composant.type);
        formData.append(`composants[${index}][composant_id]`, composant.composant_id);

        if (composant.type === 'file') {
            if (composant.value instanceof File) {
                formData.append(`composants[${index}][value]`, composant.value);
            } 
        } else {
            formData.append(`composants[${index}][value]`, composant.value || '');
        }
    });

    // Add project_id and facture_id to formData
    formData.append('project_id', payload.project_id);
    formData.append('facture_id', payload.facture_id);
    try {
        await pmService.updateFacture(formData)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    } catch (error) {}
};
</script>
<template>
    <Modal id="edit-facture" title="Edit Attachements de la Facture" class-name="modal-xl">
        <form @submit.prevent="submit" enctype="multipart/form-data">
            <div class="modal-body">
                <div class="d-flex flex-wrap">
                    <div
                        class="col-sm-6"
                        v-for="(comp, index) in OldData.facture_attachement"
                        :key="comp.id"
                    >
                        <div class="mb-3 m-1">
                            <label :for="`input-${comp.composent.id}`">{{
                                comp.composent.label
                            }}</label>
                            <input
                                v-if="
                                    comp.composent.type !== 'select' &&
                                    comp.composent.type !== 'file'
                                "
                                :type="comp.composent.type"
                                :id="`input-${comp.composent.id}`"
                                name="myfile"
                                class="form-control"
                                v-model="comp.value"
                            />
                            <input
                                v-else-if="comp.composent.type === 'file'"
                                type="file"
                                :id="`input-${comp.composent.id}`"
                                name="myfile"
                                class="form-control"
                                @change="handleFileChange($event, index)"
                            />
                            <select
                                v-else
                                :id="`input-${comp.composent.id}`"
                                class="form-select"
                                v-model="comp.value"
                            >
                                <option selected disabled>Selectionner un choix</option>
                                <option
                                    v-for="option in comp.composent.options.split(',')"
                                    :key="option"
                                    :value="option"
                                >
                                    {{ option }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <!-- Article select -->
                <div class="col-sm-6">
                    <div class="mb-3">
                        <label for="article-select">Article</label>
                        <select id="article-select" v-model="selectedArticle" class="form-select">
                            <option disabled value="">Please select an article</option>
                            <option v-for="article in articles" :key="article.id" :value="article">
                                {{ article.article }}
                            </option>
                        </select>
                    </div>
                </div>
                <!-- Additional inputs -->
                <!-- Add card button -->
                <div class="mb-3">
                    <button class="btn btn-primary" type="button" @click="addCard">
                        Add article
                    </button>
                </div>

                <!-- Cards -->
                <div class="col-12" v-for="(card, index) in OldData.facture_article" :key="index">
                    <div class="repeater-wrapper pt-0 pt-md-4">
                        <div class="d-flex border rounded position-relative pe-0">
                            <div class="row w-100 p-3">
                                <div class="col-md-4 col-12 mb-md-0 mb-3">
                                    <div class="mb-3">
                                        <label for="input1">Article titre</label>
                                        <input
                                            id="input1"
                                            disabled
                                            class="form-control item-details mb-3"
                                            :value="card.article.article"
                                        />
                                    </div>
                                </div>

                                <div class="col-md-4 col-12 text-center mb-md-0 mb-3">
                                    <div class="mb-3">
                                        <input
                                            type="checkbox"
                                            id="checkbox"
                                            v-model="card.checkboxChecked"
                                        />
                                        <label for="checkbox">Changer Noms Article</label>
                                    </div>
                                </div>

                                <div class="col-md-4 col-12">
                                    <div class="mb-3">
                                        <label for="input2">Nouveau titre</label>
                                        <!-- Render this input field when card.article.article is not null or empty -->
                                        <input
                                            id="input2"
                                            class="form-control"
                                            :disabled="
                                                !card.article.article || !card.checkboxChecked
                                            "
                                            v-model="card.titre_article"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div
                                class="d-flex flex-column align-items-center justify-content-between border-start p-2"
                            >
                                <i class="ti ti-x cursor-pointer" @click="removeCard(index)"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                    Fermer
                </button>
                <button type="submit" :disabled="isLoading" class="btn btn-primary">
                    <span v-if="isLoading" class="d-flex align-items-center">
                        <div class="spinner-border spinner-border-sm text-white me-2" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </span>
                    <span v-else> Terminer</span>
                </button>
            </div>
        </form>
    </Modal>
</template>
