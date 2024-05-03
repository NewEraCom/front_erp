<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { CardOne, CardCaisse, CardOneSkeleton, DeleteModal } from '@/ui';
import { CaisseTable, NewOperationModal, DetailsCaisseOperation } from './components';
import { watch } from 'vue';
import { useLogisticsStore } from '@/store';
import { logisticsService } from '@/services';
import { formater } from '@/utils';
import { ValidateCaisse } from './components';
import { useToast } from 'vue-toastification';

const toast = useToast();
const logisticsStore = useLogisticsStore();
const isLoading = ref(false);
const caisse = ref(computed(() => logisticsStore.opertationCaisse.data));
const stats = ref(computed(() => logisticsStore.opertationCaisse.stats));
const stats_analyse = ref(computed(() => logisticsStore.caisse.stats));

let data = ref({
    caisse: null,
    stats: null,
    stats_analyse: null,
});

onMounted(async () => {
    await logisticsService.getOperationCaisse('logistics');
    await logisticsService.getCaisse();
    data.value.caisse = caisse.value;
    data.value.stats = stats.value;
    data.value.stats_analyse = stats_analyse.value;
});


onUnmounted(() => {
    logisticsStore.clearOperationCaisse();
    logisticsStore.clearCaisse();
});

watch(caisse, () => {
    data.value.caisse = caisse.value;
}, { deep: true });

const Validate = async () => {
    isLoading.value = true;
    await logisticsService.validateCaisse(logisticsStore.selectedItem.id).then(() => {
        isLoading.value = false;
        toast.success('Validé avec succès');
        $('#validate-caisse-modal').modal('hide');

    });
    // console.log($('#validateInput').val());
};

</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Caisse</span></h5>
        <div v-if="data.stats_analyse" class="row g-3">
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-4 col-xxl-4 gap-2">
                <CardCaisse :stats="data.stats_analyse" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4 gap-2">
                <CardOne title="Demande en cours" :count="formater.number(data.stats.ongoing)" color="bg-label-warning"
                    icon="ti ti-cash" card-color="card-border-shadow-warning" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4 gap-2">
                <CardOne title="Demande livrée" :count="formater.number(data.stats.delivered)" color="bg-label-success"
                    icon="ti ti-cash" card-color="card-border-shadow-success" />
            </div>
        </div>
        <div v-else class="row">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardOneSkeleton />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardOneSkeleton />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardOneSkeleton />
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-12">
                <div class="card">
                    <div class="card card-border-shadow-primary">
                        <div class="card-header d-flex align-items-center">
                            <div class="me-auto">
                                <h5 class="fw-bold mb-1">Liste des opérations de caisse</h5>
                                <small class="fw-bold mb-1 text-muted">Liste des opérations de caisse</small>
                            </div>
                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newOperation">
                                <i class="ti ti-plus me-2"></i>
                                Ajouter une opération
                            </button>
                        </div>

                        <div v-if="data.caisse != null" class="card-body border-top pt-4">
                            <CaisseTable :caisse="data.caisse" />
                        </div>
                        <div v-else class="card-body border-top pt-4 d-flex align-items-center justify-content-center"
                            style="height: 650px;">
                            <div class="row mt-5">
                                <div class="col-12 text-center">
                                    <h5>Chargement des données...</h5>
                                    <div class="spinner-border text-primary mt-4" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <NewOperationModal />
        <DetailsCaisseOperation />
        <DeleteModal title="Supprimer un opération" text="Voulez-vous vraiment supprimer cette opération ?"
            textButton="Oui, Supprimer" :action="() => logisticsService.deleteCaisseOperation()" />
        <ValidateCaisse id="validate-caisse-modal" :isLoading="isLoading" :method="Validate"
             />

    </div>
</template>