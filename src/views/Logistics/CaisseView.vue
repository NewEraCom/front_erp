<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { CardOne, CardCaisse, CardOneSkeleton } from '@/ui';
import { CaisseTable ,ValidateCaisse} from './components';
import { useLogisticsStore } from '@/store';
import { logisticsService } from '@/services';
import { formater } from '@/utils';

const logisticsStore = useLogisticsStore();
const isLoading = ref(false);
const caisse = ref(computed(() => logisticsStore.opertationCaisse.data));
const stats = ref(computed(() => logisticsStore.opertationCaisse.stats));
const stats_analyse = ref(computed(() => logisticsStore.caisse.stats));

onMounted(async () => {
    await logisticsService.getOperationCaisse();
    await logisticsService.getCaisse();
});

onUnmounted(() => {
    logisticsStore.clearOperationCaisse();
    logisticsStore.clearCaisse();
});
const Validate = async () => {
     isLoading.value = true;


    await logisticsService.validateCaisse(logisticsStore.ItemId).then(() => {
     isLoading.value = false;
      $("#validate-caisse-modal").modal("hide");
    
   });
  // console.log($('#validateInput').val());
};
</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Caisse</span></h5>
        <div v-if="stats_analyse" class="row">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4 gap-2">
                <CardCaisse :stats="stats_analyse" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4 gap-2">
                <CardOne title="Demande en cours" :count="formater.number(stats.requested)" color="bg-label-warning"
                    icon="ti ti-cash" card-color="card-border-shadow-warning" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4 gap-2">
                <CardOne title="Demande livrée" :count="formater.number(stats.delivered)" color="bg-label-success"
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
                            <button class="btn btn-primary">
                                <i class="ti ti-plus me-2"></i>
                                Ajouter un louer
                            </button>
                        </div>

                        <div v-if="caisse != null" class="card-body border-top pt-4">
                            <CaisseTable :caisse="caisse" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ValidateCaisse 
        id="validate-caisse-modal"
        :isLoading="isLoading"
      :method="Validate"
      :itemid="logisticsStore.ItemId"
        />
    </div>
</template>