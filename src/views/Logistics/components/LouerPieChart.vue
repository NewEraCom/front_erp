<script setup lang="ts">
import { useLogisticsStore } from '@/store';
import { computed, ref, onMounted } from 'vue';
import { Chart as ChartJS } from 'chart.js';
import { logisticsService } from '@/services';

const logisticsStore = useLogisticsStore();
const state = ref(computed(() => logisticsStore.louer.data));
const chartId = 'louer-chart-pie';

const empty = ref(false);

const generatePieChart = async () => {
    const labels = [];
    const data = [];
    const louerStat = state.value;

    console.log(louerStat);

    louerStat.forEach((element) => {
        labels.push(element.type);
        data.push(element.montant);
    });

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Louer Stat',
                data: data,
                backgroundColor: [
                    'rgb(252, 186, 3)',
                    'rgb(234,83,84)',
                    'rgb(41,199,111)',
                    'rgb(136, 3, 252)',
                    'rgb(3, 252, 252)',
                    'rgb(252, 3, 194)',
                    'rgb(227, 154, 9)'
                ],
                hoverOffset: 4
            }
        ]
    };

    const ctx = document.getElementById(chartId);
    const piechart = new ChartJS(ctx, {
        type: 'doughnut',
        data: chartData,

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
        }
    });
    if (chartData.datasets[0].data.length === 0) {
        empty.value = true;
    } else {
        empty.value = false;
    }
};
onMounted(async () => {
    await logisticsService.getLouer();
    generatePieChart();
});
</script>

<template>
    <div class="card card-border-shadow-primary h-100">
        <div class="card-header pb-2 mb-1">
            <div class="card-title mb-1">
                <h5 class="m-0 me-2 fw-bold">Louer</h5>
                <small class="text-muted">Statistique des locaux loués</small>
            </div>
        </div>
        <div v-if="!empty" class="card-body mt-4">
            <canvas :id="chartId"></canvas>
        </div>
        <div v-else class="card-body mt-4 text-center">
            <img src="@/assets/img/Empty.png" width="180px" alt="" srcset="" class="mt-5" />
            <h6 class="fw-bold mt-4">Aucune donnée disponible</h6>
            <p>Il n'y a aucune donnée à afficher pour le moment</p>
        </div>
    </div>
</template>
