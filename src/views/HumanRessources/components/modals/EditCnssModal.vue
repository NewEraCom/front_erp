<script setup lang="ts">
import { ref, watch } from 'vue';
import { Modal } from '@/ui';

const isLoading = ref(false);

const props = defineProps({
    id: {
        type: Object,
        required: true,
    },
    oldCnss: {
        type: Number,
        required: true,
    },

});


const formData = ref({
    id: null,
    cnss: null,
    copie_cnss: null,
});

const handleFileChange = (e, type) => {
    formData.value[type] = e.target.files[0];
};

const submit = () => {
    isLoading.value = true;
    console.log(props.id);
    setTimeout(() => {
        isLoading.value = false;
    }, 2000);
};

watch(() => props.oldCnss, (value) => {
    formData.value.cnss = value;
});


</script>

<template>
    <Modal id="editInfoCnss" title="Modifier les informations CNSS" size="modal-md">
        <form @submit.prevent="submit">
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="newSalary" class="form-label">
                                Numéro CNSS
                                <span class="text-danger font-18">*</span>
                            </label>
                            <input id="newSalary" v-model="formData.cnss" class="form-control"
                                placeholder="Saisir le nouveau salaire" type="number" required />
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="mb-3">
                            <label for="copie_rib" class="form-label">Copie RIB
                                <span class="text-danger">*</span>
                            </label>
                            <input id="copie_rib" ref="rib_copie" class="form-control" placeholder="Choisir le fichier"
                                type="file" tabindex="0" name="copie_rib" required
                                @change="e => handleFileChange(e, 'rib')" />
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
                        <div class="spinner-border spinner-border-sm text-white" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </span>
                    <span v-else> Modifier</span>
                </button>
            </div>
        </form>
    </Modal>
</template>