<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const props = defineProps({
    title: {
        type: String,
        default: 'Statistique des employés'
    },
    subtitle: {
        type: String,
        default: 'Nombre d\'employés par mois en '
    }, color: {
        type: String,
        default: 'rgb(234,83,84)'
    }, data: {
        type: Object,
        default: () => ({})
    }, pin: {
        type: String,
        default: 'total_employee'
    }, type: {
        type: String,
        default: 'bar'
    }, legened: {
        type: String,
        default: 'Employees'
    }
});

const year = new Date().getFullYear();
const value = ref([]);
const chartCanvas = ref(null);

const months = [];
const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];


for (let i = 0; i < 12; i++) {
    months.push(`${monthNames[i]} ${year}`);
}

const chartData = ref({});

const fetchData = async () => {
    value.value = props.data;
};

const initializeChart = () => {
    for (let i = 0; i < months.length; i++) {
        chartData.value[months[i]] = 0;
    }

    for (let i = 0; i < value.value.length; i++) {
        const month = value.value[i].mounth;
        chartData.value[month] = value.value[i][props.pin];
    }

    new Chart(chartCanvas.value.getContext('2d'), {
        type: props.type,
        data: {
            labels: months,
            datasets: [
                {
                    type: props.type,
                    label: props.legened,
                    data: chartData.value,
                    backgroundColor: props.color,
                    borderColor: props.color,
                    borderWidth: 1,
                    borderRadius: 25, // Set the borderRadius for the bars
                    barThickness: 20
                }
            ]
        },
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
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 12,
                            weight: 'medium',
                            family: 'Plus Jakarta Sans, sans-serif'
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        display: true,
                        color: '#ebedef',
                        borderDash: [3, 3]
                    },
                    ticks: {
                        font: {
                            size: 14,
                            family: 'Plus Jakarta Sans, sans-serif'
                        }
                    },
                    suggestedMax: Math.ceil(50)
                }
            }
        }
    });
};

onMounted(async () => {
    await fetchData();
    initializeChart();
});

</script>
<template>
    <div class="card card-border-shadow-primary">
        <div class="card-header pb-2 mb-1">
            <div class="card-title mb-1">
                <h5 class="m-0 me-2 fw-bold">{{ title }}</h5>
                <small class="text-muted"> {{ subtitle + ' ' + year }}</small>
            </div>
        </div>
        <div class="card-body">
            <canvas ref="chartCanvas"></canvas>
        </div>
    </div>
</template>

<style>
.chart-height {
    height: 450px !important;
}
</style>
