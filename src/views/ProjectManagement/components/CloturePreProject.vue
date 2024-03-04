<script setup>
import { ref, computed } from 'vue';
import {PMService} from '@/services';
import {usePMStore} from '@/store';

import { CustomSelect } from '@/ui';

const PMStore = usePMStore();

const props = defineProps({
    id: {
        type: Number,
        required: true
    },
    typeProject: {
        type: String,
        required: true
    },
    numberLots: {
        type: Array,
        default: () => [],
        required: false
    }
});

const projectManager = ref(computed(() => PMStore.projectManager));

const isLoading = ref(false);
const cautionDefinitif = ref(null);
const duration = ref(null);
const projectManagerSelect = ref('-');
const lots = ref([]);

const ClotureSimple = async () => {
    if (projectManagerSelect.value == '-') {
        alert('Veuillez choisir un chef de projet');
        return;
    }
    projectManagerSelect.value = projectManagerSelect.value.key;

    isLoading.value = true;
    const formData = new FormData();
    formData.append('id', props.id);
    formData.append('project_manager', projectManagerSelect.value);
    formData.append('caution_definitif', cautionDefinitif.value);
    formData.append('duration', duration.value);
    await PMService.clotureSimple(formData).then(() => {
        isLoading.value = false;
        $('#cloture').modal('hide');
    });
};

const ClotureComplex = async () => {
    if (projectManagerSelect.value == '-') {
        alert('Veuillez choisir un chef de projet');
        return;
    }

    projectManagerSelect.value = projectManagerSelect.value.key;
    isLoading.value = true;
    const formData = new FormData();
    formData.append('id', props.id);
    formData.append('lots', lots.value);
    formData.append('project_manager', projectManagerSelect.value);
    formData.append('caution_definitif', cautionDefinitif.value);
    formData.append('duration', duration.value);
    await PMService.clotureComplex(formData).then(() => {
        isLoading.value = false;
        $('#cloture').modal('hide');
    });
};

const toggleLot = (id) => {
    if (lots.value.includes(id)) {
        lots.value = lots.value.filter((lotId) => lotId !== id);
    } else {
        lots.value.push(id);
    }
};
</script>
<template>
    <div>
        <form v-if="typeProject == 'simple'" @submit.prevent="ClotureSimple">
            <div class="modal-body ">
                <p>Êtes-vous sûr de vouloir marquer ce projet comme projet gagné ?</p>
                <div class="mb-3">
                    <CustomSelect
                        v-if="projectManager != null"
                        v-model="projectManagerSelect"
                        placeholder="Choisir un employee"
                        label="Chef de projet"
                        :data="
                            projectManager.map((item) => ({
                                key: item.id,
                                value: item.employee.first_name + ' ' + item.employee.last_name
                            }))
                        "
                    />
                </div>
                <div class="mb-3">
                    <label id="cautionDefinitif" class="form-label mb-2">Caution définitif</label>
                    <input
                        id="cautionDefinitif"
                        v-model="cautionDefinitif"
                        class="form-control"
                        placeholder="Entrez le montant de caution définitif"
                        type="number"
                        tabindex="0"
                        required
                    />
                </div>
                <div class="mb-3">
                    <label id="duration" class="form-label mb-2">
                        Durée du projet <span class="text-muted">(Jours)</span>
                    </label>
                    <input
                        id="duration"
                        v-model="duration"
                        class="form-control"
                        placeholder="Entrez la durée du projet"
                        type="number"
                        tabindex="0"
                        required
                    />
                </div>
            </div>
            <div class="modal-footer ">
                <button type="button" class="btn btn-label-outline-dark" data-bs-dismiss="modal">
                    Fermer
                </button>
                <button type="submit" :disabled="isLoading" class="btn btn-primary">
                    <span v-if="isLoading" class="d-flex align-items-center">
                        <div class="spinner-border spinner-border-sm text-white" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </span>
                    <span v-else>Terminer </span>
                </button>
            </div>
        </form>
        <form v-else @submit.prevent="ClotureComplex">
            <div class="modal-body ">
                <div class="mb-3">
                    <CustomSelect
                        v-if="projectManager != null"
                        v-model="projectManagerSelect"
                        placeholder="Choisir un employee"
                        label="Chef de projet"
                        :data="
                            projectManager.map((item) => ({
                                key: item.id,
                                value: item.employee.first_name + ' ' + item.employee.last_name
                            }))
                        "
                    />
                </div>
                <div class="mb-3">
                    <label id="cautionDefinitif" class="form-label mb-2">Caution définitif</label>
                    <input
                        id="cautionDefinitif"
                        v-model="cautionDefinitif"
                        class="form-control"
                        placeholder="Entrez le montant de caution définitif"
                        type="number"
                        tabindex="0"
                        required
                    />
                </div>
                <div class="mb-3">
                    <label id="duration" class="form-label mb-2">
                        Durée du projet <span class="text-muted">(Jours)</span>
                    </label>
                    <input
                        id="duration"
                        v-model="duration"
                        class="form-control"
                        placeholder="Entrez la durée du projet"
                        type="number"
                        tabindex="0"
                        required
                    />
                </div>
                <div class="mb-2 mt-1">
                    <label for="" class="form-label">Choisissez un lot</label>
                </div>
                <div v-for="(item, key) in numberLots" :key="item.id" class="mb-3">
                    <div class="d-flex border rounded p-2">
                        <span> Lot N° {{ key + 1 }} : {{ item.localite }} </span>
                        <div class="ms-auto form-check">
                            <input
                                class="form-check-input"
                                type="checkbox"
                                :value="item.id"
                                :checked="lots?.includes(item.id)"
                                @change="toggleLot(item.id)"
                            />
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
                        <div class="spinner-border spinner-border-sm text-white" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </span>
                    <span v-else>Terminer </span>
                </button>
            </div>
        </form>
    </div>
</template>
