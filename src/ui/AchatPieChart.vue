<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Chart as ChartJS } from 'chart.js';


const chartId = 'achat-chart-pie';
const props = defineProps({
    data: {
        type: Array,
        default: () => ([])
    }
});
const empty = ref(false);

let achatStat = props.data;
const generatePieChart = async () => {
    const labels = [];
    const data = [];

    achatStat.forEach((element) => {
        labels.push(element.code);
        data.push(element.achat);
    });
    console.log(props.data);
    console.log(achatStat);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Achat Stat',
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
                            size: 16,
                            weight: 'medium',
                            font: 'Plus Jakarta Sans'
                        }
                    }
                }
            }
        }
    });
    if (chartData.datasets[0].data.length === 0) {
        empty.value = true;
    } else {
        empty.value = false;
    }
};
const fetchData = async () => {
    achatStat = props.data;
};
onMounted(async () => {
    await fetchData();
    generatePieChart();
});
</script>

<template>
    <div class="card card-border-shadow-primary h-100">
        <div class="card-header pb-2 mb-1">
            <div class="card-title mb-1">
                <h5 class="m-0 me-2 fw-bold">Statistique des Achats par Projets</h5>
                <small class="text-muted">Statistique des Achats par Projets</small>
            </div>
        </div>
        <div v-if="!empty" class="card-body h-100 mt-4">
            <canvas :id="chartId" style="height: 100px !important; width: 100%;"></canvas>
        </div>
        <div v-else class="card-body mt-4 text-center">
            <img src="@/assets/img/Empty.png" width="180px" alt="" srcset="" class="mt-5" />
            <h6 class="fw-bold mt-4">Aucune donnée disponible</h6>
            <p>Il n'y a aucune donnée à afficher pour le moment</p>
        </div>
    </div>
</template>

<style scoped>
.h-100 {
    height: 900px !important;
}
</style>

