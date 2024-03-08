<script setup lang="ts">
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { ref } from 'vue';

const props = defineProps({
    rented: {
        type: Object,
        required: true
    }
});

const chartData = ref(props.rented);

const chartCanvas = ref(null);

const generatePieChart = async () => {

    new Chart(chartCanvas.value.getContext('2d'), {
        type: 'doughnut',
        data: chartData.value,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        font: {
                            size: 14,
                            weight: 'medium',
                            font: 'Plus Jakarta Sans'
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: false,
                },
                y: {
                    display: false,
                }
            }
        }
    });
};

generatePieChart();

</script>

<template>
    <div class="card card-border-shadow-primary h-100">
        <div class="card-header pb-2 mb-1">
            <div class="card-title mb-1">
                <h5 class="m-0 me-2 fw-bold">Louer</h5>
                <small class="text-muted">Statistique des locaux loués</small>
            </div>
        </div>
        <div class="card-body mt-4">
            <canvas ref="chartCanvas" style="height: 500px; width: 100%;"></canvas>
        </div>
    </div>
</template>
