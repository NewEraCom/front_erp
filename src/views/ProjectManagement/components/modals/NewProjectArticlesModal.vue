<script setup lang="ts">
import { ref, computed } from 'vue';
import { Modal } from '@/ui';
import { pmService } from '@/services';
import { useToast } from 'vue-toastification';
import { usePMStore } from '@/store';
import * as XLSX from 'xlsx';
const toast = useToast();


const props = defineProps({
    pre_project_id: {
        type: String,
        default: null,
    },
});
const isUploadVisible = ref(false);
const chunk = (array: any[], size: number) => {
    return Array.from({ length: Math.ceil(array.length / size) }, (v, i) =>
        array.slice(i * size, i * size + size)
    );
};
const formData = ref({

    pre_project_id: props.pre_project_id,
    articles: [],
});



let articles = ref( [
{ article: '', montant: 0 ,qte: 0 ,prix_ht: 0 , prix_ttc: 0 ,code:0,type_cat:''}
]);

const initialLength = articles.value.length;

const addItem = () => {
    articles.value.push({ article: '', montant: 0 ,qte:0,prix_ht: 0 , prix_ttc: 0 ,code:0,type_cat:''}
);
};

const removeItem = (index) => {
    if (index >= initialLength) {
        articles.value.splice(index, 1);
    }
};

const chunkedArticles = computed(() => chunk(articles.value, 2));


const isLoading = ref(false);

const submit = async () => {
    formData.value.articles = articles.value;
    isLoading.value = true;
    console.log(formData.value);

    await pmService.insertArticles(formData.value)
        .then(() => {
            $('#new-articles').modal('hide');
            isLoading.value = false;
            toast.success('Articles ajoutés avec succès');
        })
        .catch((e) => {
            console.error(e);
        });
    

};
const toggleUpload = () => {
  isUploadVisible.value = !isUploadVisible.value;
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    jsonData.shift(); // remove headers
    articles.value = jsonData.map((row) => ({
      article: row[0],
      montant: row[1],
      qte: row[2],
      unite: row[3],
      prix_ht: row[4],
      prix_ttc: row[5],
      code: row[6],
      type_cat: row[7],
    }));
  };
  reader.readAsArrayBuffer(file);
};
</script>
<template>
    <Modal id="new-articles" title="Ajouter les articles du projet" size="modal-xl">
        <form @submit.prevent="submit">
            <div class="modal-body">
                <div class="row" v-for="(row, rowIndex) in chunkedArticles" :key="'row-' + rowIndex" v-if="!isUploadVisible">
                    <div class="col-md-12" v-for="(item, index) in row" :key="'item-' + index">
                        <div class="repeater-wrapper pt-0 pt-md-4">
                            <div class="d-flex border rounded position-relative pe-0">
                                <div class="row w-100 p-3">
                                    <div class="col-md-6 col-12 mb-md-0 mb-3">
                                        <div class="mb-3">
                                            <label for="">Article :</label>
                                            <input type="text" class="form-control" v-model="item.article"
                                                
                                                placeholder="Designation" required>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-12 mb-md-0 mb-3">
                                        <div class="mb-3">
                                            <label for="">Unite :</label>
                                            <input type="number" class="form-control" v-model="item.unite"
                                                placeholder="Choisir un Montant" required>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-12 mb-md-0 mb-3">
                                        <div class="mb-3">
                                            <label for="">Code :</label>
                                            <input type="number" class="form-control" v-model="item.code"
                                                placeholder="Choisir un Montant" required>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-12 mb-md-0 mb-3">
                                        <div class="mb-3">
                                            <label for="">Category :</label>
                                            <input type="number" class="form-control" v-model="item.type_cat"
                                                placeholder="Choisir un Montant" required>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-12 mb-md-0 mb-3">
                                        <div class="mb-3">
                                            <label for="">Quantite :</label>
                                            <input type="number" class="form-control" v-model="item.qte"
                                                placeholder="Choisir un Montant" required>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-12 mb-md-0 mb-3">
                                        <div class="mb-3">
                                            <label for="">Prix HT :</label>
                                            <input type="number" class="form-control" v-model="item.prix_ht"
                                                placeholder="Choisir un Montant" required>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-12 mb-md-0 mb-3">
                                        <div class="mb-3">
                                            <label for="">Prix TTC :</label>
                                            <input type="number" class="form-control" v-model="item.prix_ttc"
                                                placeholder="Choisir un Montant" required>
                                        </div>
                                    </div>
                                </div>
                                <!-- <div v-if="rowIndex * 2 + index >= initialLength"
                                    class="d-flex flex-column align-items-center justify-content-between border-start p-2">
                                    <i class="ti ti-x cursor-pointer"
                                        @click="removeItem(rowIndex * 2 + index)"></i>
                                </div> -->
                                <div
                                    class="d-flex flex-column align-items-center justify-content-between border-start p-2"
                                    v-if="rowIndex * 2 + index >= initialLength">
                                    <i class="ti ti-x cursor-pointer fw-bold" @click="removeItem(rowIndex * 2 + index)"></i>
                                    <i class="ti ti-plus cursor-pointer fw-bold" 
                                        @click="addItem"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row pt-2">
                    <div class="col-sm-12 float-end">
                    <button type="button" class="btn btn-label-dark btn-sm mx-2" @click="toggleUpload">
                        <i class="ti ti-upload me-2"></i>Upload Excel
                    </button>
                    <input v-if="isUploadVisible" type="file" @change="handleFileUpload" class="form-control mt-3" />
                    </div>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                    Fermer
                </button>
                <button type="submit" :disabled="isLoading" class="btn btn-primary m-0">
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
