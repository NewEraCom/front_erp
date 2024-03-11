<script setup>
import { useLogisticsStore } from '@/store';
import { computed, onMounted, ref, watch } from 'vue';
import Chart from 'chart.js/auto';

const logisticsStore = useLogisticsStore();
const state = ref(computed(() => logisticsStore.opertationCaisse.data));
const year = new Date().getFullYear();


const generateBarChart = () => {
    const labels = {};
    const dataEntree = Array.from({ length: 12 }, (v, i) => 0);
    const dataSortie = Array.from({ length: 12 }, (v, i) => 0);

    const caisseOperation = state.value;

    for (let i = 1; i < 13; i++) {
        labels[`${i}-${year}`] = true;
    }
    caisseOperation.forEach((element) => {
        // generate the dates mm-2023 for this year
        const month = parseInt(element.date_operation.split('-')[1]) - 1;
        if (element.operation === 'entree') {
            dataEntree[month] = element.montant;
        } else if (element.operation === 'sortie') {
            dataSortie[month] = element.montant;
        }
    });

    const chartData = {
        labels: Object.keys(labels),
        datasets: [
            {
                label: 'Entree',
                data: dataEntree,
                backgroundColor: 'rgb(41,199,111)',
                borderColor: 'rgb(41,199,111)',
                borderWidth: 1,
                borderRadius: 5, // Set the borderRadius for the bars
                barThickness: 20
            },
            {
                label: 'Sortie',
                data: dataSortie,
                backgroundColor: 'rgb(234,83,84)',
                borderColor: 'rgb(234,83,84)',
                borderWidth: 1,
                borderRadius: 5,
                barThickness: 20
            }
        ]
    };

    const maxDataValueE = Math.max(...dataEntree); // Find the maximum data value
    const maxDataValueS = Math.max(...dataSortie); // Find the maximum data value
    var maxDataValue = 0;

    if (maxDataValueE > maxDataValueS) {
        maxDataValue = maxDataValueE;
    } else {
        maxDataValue = maxDataValueS;
    }

    const ctx = document.getElementById('caisse-bar-chart');

    const caisseBarChart = new Chart(ctx, {
        type: 'bar',
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
            scales: {
                x: {
                    grid: {
                        display: false // Set display to false to hide the x-axis grid
                    },
                    ticks: {
                        font: {
                            size: 12,
                            weight: 'medium',
                            family: 'Plus Jakarta Sans, sans-serif' // set the font family for the x-axis labels
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        display: true,
                        color: '#ebedef',
                        borderDash: [3, 3] // Set borderDash to an array of numbers to add a dash pattern to the grid lines
                    },
                    ticks: {
                        font: {
                            size: 14, // set the font size for the y-axis labels
                            family: 'Plus Jakarta Sans, sans-serif' // set the font family for the y-axis labels
                        }
                    },
                    suggestedMax: Math.ceil(maxDataValue * 1.1) // Set a suggested maximum value higher than the max data value
                }
            }
        }
    });
};

watch(state, async () => {
    generateBarChart();
});

onMounted(() => {
    generateBarChart();

});
</script>

<template>
    <div class="card h-100 card-border-shadow-primary">
        <div class="card-header pb-2 mb-1">
            <div class="card-title mb-1">
                <h5 class="m-0 me-2 fw-bold">Transactions du Caisse</h5>
                <small class="text-muted">Statistique du caisse pour {{ year }}</small>
            </div>
        </div>
        <div class="card-body">
            <canvas id="caisse-bar-chart"></canvas>
        </div>
    </div>
</template>
