<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { logisticsService, salesService } from '@/services';
import { useLogisticsStore, useSalesStore } from '@/store';
import { CardOne } from '@/ui';
import { CaisseTable ,DetailsCaisseOperation} from '../Logistics/components';
import { ValidateCaisse } from '../Logistics/components';


const salesStore = useSalesStore();
const logisticsStore = useLogisticsStore();


const stats = ref(computed(() => salesStore.demande_caisse.stats));
const caisse = ref(computed(() => salesStore.demande_caisse.data));
const isLoading = ref(false);
onMounted(async () => {
    await salesService.getCaisseOperation();
});

onUnmounted(() => {
    salesStore.clearPurchaseOrders();
});
const Validate = async () => {
     isLoading.value = true;
    await logisticsService.validateCaisse(logisticsStore.selectedItem.id).then(() => {
     isLoading.value = false;
      $('#validate-caisse-modal').modal('hide');
    
   });
  // console.log($('#validateInput').val());
};
</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Demande de caisse</span>
        </h5>
        <div v-if="stats" class="row g-3">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardOne title="Demande en attente" :count="String(stats.total)" color="bg-label-primary"
                    icon="ti-shopping-cart" card-color="card-border-shadow-primary" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardOne title="Demande en cours" :count="String(stats.pending)" color="bg-label-warning"
                    icon="ti-shopping-cart" card-color="card-border-shadow-warning" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                <CardOne title="Demande traitée" :count="String(stats.ongoing)" color="bg-label-success"
                    icon="ti-shopping-cart" card-color="card-border-shadow-success" />
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-12">
                <div class="card">
                    <div class="card card-border-shadow-primary">
                        <div class="card-header">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 class="fw-bold mb-1">Demande de caisse</h5>
                                    <small class="fw-bold mb-1 text-muted">Liste des demandes de caisse</small>
                                </div>
                            </div>
                        </div>
                        <div v-if="caisse != null" class="card-body border-top pt-4">
                            <CaisseTable :caisse="caisse" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <DetailsCaisseOperation />

        <ValidateCaisse 
        id="validate-caisse-modal"
        :isLoading="isLoading"
      :method="Validate"
      :itemid="logisticsStore.ItemId"
        />
    </div>
</template>