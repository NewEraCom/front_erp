<script setup lang="ts">
const props = defineProps({
  male: Number,
  female: Number,
  cardColor: String
});

const calculatePercentage = (value) => {
  const total = Number(props.male) + Number(props.female);
  return ((value / total) * 100).toFixed(2);
};
</script>

<template>
  <div class="card h-100 card-border-shadow-warning bg-gradient-warning text-dark" p-0>
    <div class="card-body m-0">
      <div class="row p-0">
        <div class="col-4">
          <div class="d-flex gap-2 align-items-center mb-2">
            <span class="badge bg-label-success p-1 rounde"><i class="ti ti-gender-male"></i></span>
            <p class="mb-0">Homme</p>
          </div>
          <h5 class="mb-0 pt-1 text-dark fw-bold">{{ calculatePercentage(male) }} %</h5>
          <small class="text-dark">{{ male }}</small>
        </div>
        <div class="col-4">
          <div class="divider divider-vertical">
            <div class="divider-text bg-white rounded-circle">
              <i class="ti ti-arrows-exchange-2 text-warning"></i>
            </div>
          </div>
        </div>
        <div class="col-4 text-end">
          <div class="d-flex gap-2 justify-content-end align-items-center mb-2">
            <p class="mb-0">Femme</p>
            <span class="badge bg-label-warning p-1 rounded"
              ><i class="ti ti-gender-female ti-xs"></i
            ></span>
          </div>
          <h5 class="mb-0 pt-1 text-dark fw-bold">{{ calculatePercentage(female) }}%</h5>
          <small class="text-dark">{{ female }}</small>
        </div>
      </div>
    </div>
  </div>
</template>
