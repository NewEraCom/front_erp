<script setup>
import { ref } from 'vue';
import { PMService } from '@/services';
const props = defineProps({
    id: {
        type: Number,
        required: true
    }
});

const lots = ref(0);
const caution = ref([]);
const montantMarhce = ref([]);
const localite = ref([]);
const check = ref(false);

const isLoading = ref(false);

const submit = async () => {
    if (lots.value == 0 || lots.value == null) return alert('Veuillez entrer le nombre de lots');

    isLoading.value = true;

    const formData = new FormData();
    formData.append('id', props.id);
    formData.append('lots', lots.value);
    formData.append('caution', caution.value);
    formData.append('montant_marche', montantMarhce.value);
    formData.append('localite', localite.value);
    formData.append('caution_group', check.value);

    await PMService.addLots(formData).then(() => {
        isLoading.value = false;
        $('#add-lots').modal('hide');
    });
};
</script>
<template>
    <form @submit.prevent="submit">
        <div class="modal-body m-0 p-0">
            <div class="row">
                <div class="col-sm-12">
                    <div class="mb-3">
                        <label for="numberLot" class="form-label mb-2">Nombre de lots </label>
                        <input
                            id="numberLot"
                            v-model="lots"
                            class="form-control"
                            placeholder="Entrez le nomber de lot"
                            type="number"
                            tabindex="0"
                            required
                        />
                    </div>
                </div>
            </div>
            <div v-for="index in lots" :key="index" class="row">
                <div class="col-sm-4">
                    <div class="mb-3">
                        <label :for="'lot' + index" class="form-label mb-2">
                            Localite de lot N°{{ index }}
                        </label>
                        <input
                            :id="'lot' + index"
                            v-model="localite[index]"
                            class="form-control"
                            type="text"
                            tabindex="0"
                            required
                        />
                    </div>
                </div>

                <div class="col-sm-4">
                    <div class="mb-3">
                        <label for="nameEx" class="form-label mb-2">
                            Caution de lot N°{{ index }}
                        </label>
                        <input
                            id="nameEx"
                            v-model="caution[index]"
                            class="form-control"
                            type="number"
                            tabindex="0"
                            required
                        />
                    </div>
                </div>

                <div class="col-sm-4">
                    <div class="mb-3">
                        <label for="nameEx" class="form-label mb-2">
                            Montant de marche N°{{ index }}
                        </label>
                        <input
                            id="nameEx"
                            v-model="montantMarhce[index]"
                            class="form-control"
                            type="number"
                            tabindex="0"
                            required
                        />
                    </div>
                </div>
            </div>
            <div v-if="lots != 0 && lots != null" class="col-12">
                <div class="form-check mt-3">
                    <input
                        id="defaultCheck1"
                        v-model="check"
                        class="form-check-input"
                        type="checkbox"
                        value="true"
                    />
                    <label class="form-check-label" for="defaultCheck1">
                        Demander le caution provisoire en groupe
                    </label>
                </div>
            </div>
        </div>
        <div class="modal-footer m-0 p-0">
            <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                Fermer
            </button>
            <button type="submit" :disabled="isLoading" class="btn btn-primary me-0">
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
