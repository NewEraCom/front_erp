<script setup lang="ts">
import { ref } from 'vue';
import { Modal } from '@/ui';
import { utils, writeFile } from 'xlsx';
const isLoading = ref(false);

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    data:{
        type: Array,
        required: true,
    
    },
    headers: {
        type: Array,
        required: true,
    }
    
});

const message = ref(null);





const downloadFile = async () => {
    try {
        isLoading.value = true;
        const data = props.data.map(item => {
            return props.headers.reduce((acc, header) => {
                acc[header.text] = item[header.value];
                return acc;
            }, {});
        });
        const ws = utils.json_to_sheet(data);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, 'Sheet1');
        writeFile(wb, 'output.xlsx');
        isLoading.value = false;
    } catch (error) {
        isLoading.value = false;
        console.log(error);
    }
};

</script>
<template>
    <Modal id="details-modal" :title="title" size="modal-md">
            <div class="modal-body">
                <div class="row">
                    
                    <div class="col-sm-12">
                        <p class="text-danger">* Ne modifiez aucune information existante du fichier</p>
                    </div>
                    <!-- <div class="col-sm-12">
                        <button type="button" @click="downloadFile"
                            class="bg-primary p-3 w-100 rounded text-white border-none">
                            <i class="ti ti-download me-2"></i>
                            Télécharger le modèle
                        </button>

                    </div> -->
                </div>
            </div>
            <div class="modal-footer">
                <div v-if="message != null" class="alert alert-danger" role="alert">
                    <span class="message-error"> {{ message }}</span>
                </div>
                <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                    Fermer
                </button>
                <button type="submit" :disabled="isLoading" class="btn btn-primary" @click="downloadFile">
                    <span v-if="isLoading" class="d-flex align-items-center">
                        <div class="spinner-border spinner-border-sm text-white" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </span>
                    <span v-else> Terminer</span>
                </button>
            </div>
    </Modal>
</template>