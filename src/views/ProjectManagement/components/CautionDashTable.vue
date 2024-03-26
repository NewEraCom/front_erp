<script setup lang="ts">
import { financeService } from '@/services';
import { useFinanceStore } from '@/store';
import { computed, onMounted, ref } from 'vue'

const FinanceStore = useFinanceStore();

onMounted(async () => {
  await financeService.getCaution();
});
const statsObject = computed(() => {
  const statsArray = FinanceStore.stats;
  let tempStatsObject = {};
  for (let stat of statsArray) {
    tempStatsObject[stat.type] = stat.total;
  }
  return tempStatsObject;
});
</script>

<template>
  <div class="card-body">
    <ul class="p-0 m-0">
      <li class="d-flex align-items-center">
        <div class="badge bg-label-primary me-3 rounded p-2">
          <i class="ti ti-currency-dollar ti-sm"></i>
        </div><br>
        <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
          <div class="user-progress d-flex align-items-center gap-1">
            <h6 class="mb-0">Caution Definitif Recuperer</h6>
            <br /><br>
          </div>
          <div class="user-progress d-flex align-items-center gap-1">
            <h6 class="mb-0 text-danger">{{statsObject.def_in}} MAD</h6>
          </div>
        </div>
      </li><br>
      <li class="d-flex align-items-center">
        <div class="badge bg-label-primary me-3 rounded p-2">
          <i class="ti ti-browser-check ti-sm"></i>
        </div><br>
        <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
          <div class="user-progress d-flex align-items-center gap-1">
            <h6 class="mb-0">Caution Definitif Non Recuperer</h6>
            <br /><br>
          </div>
          <div class="user-progress d-flex align-items-center gap-1">
            <h6 class="mb-0 text-danger">{{statsObject.def_out}} MAD</h6>
          </div>
        </div>
      </li><br>
      <li class="d-flex align-items-center">
        <div class="badge bg-label-primary me-3 rounded p-2">
          <i class="ti ti-credit-card ti-sm"></i>
        </div><br>
        <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
          <div class="user-progress d-flex align-items-center gap-1">
            <h6 class="mb-0">Caution Definitif Provisoire</h6>
            <br /><br>
          </div>
          <div class="user-progress d-flex align-items-center gap-1">
            <h6 class="mb-0 text-danger">{{statsObject.in}} MAD</h6>
          </div>
        </div>
      </li><br>
      <li class="d-flex align-items-center">
        <div class="badge bg-label-primary me-3 rounded p-2">
          <i class="ti ti-wallet ti-sm"></i>
        </div><br>
        <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
          <div class="user-progress d-flex align-items-center gap-1">
            <h6 class="mb-0">Caution Definitif Non Provisoire</h6>
            <br /><br>
          </div>
          <div class="user-progress d-flex align-items-center gap-1">
            <h6 class="mb-0 text-danger">{{statsObject.out}} MAD</h6>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style>
.ti-sm {
    font-size: 1.376rem !important;
}
</style>
